"use strict";

export { MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN, ModelType } from "./models.js";
export { TextureAtlas, createAtlas } from "./atlas.js";

import { GLINT_TEXTURE, ModelType } from "./models.js";
import { draw, resetDraw } from "./draw.js";
import { setupShader, loadTexture, loadTextureAuto } from "./setup.js";

/**
 * [w, h] -> renderer.
 * 3D map since we can't use tuples as keys.
 * @type {Map<number, Map<number, WebGLRenderer>>}
 * @private
 */
var sharedRenderers = new Map();

/**
 * @typedef {Object} ContextAttributes
 * @property {boolean} alpha
 * @property {boolean} antialias
 * @property {boolean} depth
 * @property {boolean} desynchronized
 * @property {boolean} failIf
 * @public
 */

/**
 * @typedef {Object} ModelData
 * @property {ModelType} modelType - One of {@link MODEL_CUBE}, {@link MODEL_ITEM}, {@link MODEL_SKULL_COMPACT}, {@link MODEL_SKULL_SKIN}.
 * @property {string|TexImageSource} texture - A URL to the model texture, a {@link TextureAtlas} cutout or an arbitrary image.
 * @property {boolean} [enchanted=false] - Applies Minecraft's enchantment glint.
 * @property {boolean} [inInventory=false] - Applies padding to match rendering of Minecraft items in inventory.
 * @property {[number, number, number]} [translation=[0, 0, 0]] - Applies a translation to the model.
 * @property {number} [scale=1] - Scales the model.
 * @public
 */

/**
 * Creates a new renderer.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {ModelData} modelData - What to render.
 * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
 * @returns {Renderer}
 * @public
 */
export function createRenderer(canvas, modelData, contextAttributes) {
    return createMultiRenderer(canvas, [modelData], contextAttributes);
}

/**
 * Creates a new renderer with multiple models.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {ModelData[]} models - What to render.
 * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
 * @returns {Renderer}
 * @public
 */
export function createMultiRenderer(canvas, models, contextAttributes) {
    return new WebGLRenderer(canvas, contextAttributes, models);
}

/**
 * Creates a new renderer that uses an existing renderer to draw.
 * This can help with WebGL context limits but may affect performance.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {ModelData[]} models - What to render.
 * @param {CanvasRenderingContext2DSettings} [contextAttributes={}] - Arbitrary 2D context attributes.
 * @returns {Renderer|null} - The renderer or null if no existing renderer was available.
 * @public
 */
export function createSharedRenderer(canvas, models, contextAttributes, shared) {
    if (sharedRenderers.has(canvas.width)) {
        let inner = sharedRenderers.get(canvas.width);
        if (inner.has(canvas.height)) {
            return new BlitRenderer(canvas, contextAttributes, inner.get(canvas.height), models);
        }
    }

    return null;
}

/**
 * A model renderer. See {@link createRenderer}.
 * @public
 */
export class Renderer {

    /**
     * The models to render. Can be updated dynamically.
     * @type {ModelData[]}
     * @public
     */
    models;

    /**
     * Creates a new renderer.
     * @param {ModelData[]} - The models to render.
     * @private
     */
    constructor(models) {
        this.models = models;
    }

    /**
     * Destroys the renderer.
     * @public
     */
    destroy() { }
}

/**
 * A renderer targeting WebGL canvases.
 * @private
 */
class WebGLRenderer extends Renderer {

    /**
     * All {@link BlitRenderer}s using this renderer as a backend.
     * @type {BlitRenderer[]}
     * @private
     */
    sharingRenderers;

    /**
     * The pixel buffer used when transfering the image to a 2D canvas.
     * @type {Uint8ClampedArray | null}
     * @private
     */
    pixelBuffer;

    /**
     * Creates a new renderer.
     * @param {HTMLCanvasElement} canvas - The canvas to render on.
     * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
     * @param {ModelData[]} models - The models to render.
     * @private
     */
    constructor(canvas, contextAttributes, models) {
        super(models);
        this.sharingRenderers = [];
        this.pixelBuffer = null;

        if (!self?.glMatrix?.mat4) {
            throw new Error("Could not find matrix library. Please ensure you include glMatrix v3.");
        }

        // Disable antialias by default
        contextAttributes ||= {};
        if (contextAttributes.antialias === undefined) {
            contextAttributes.antialias = false;
        }

        const gl = canvas.getContext("webgl", contextAttributes);
        if (gl === null) {
            throw new Error("Could not initialize WebGL. Your browser may not support it.");
        }

        if (!sharedRenderers.has(gl.canvas.width)) {
            sharedRenderers.set(gl.canvas.width, new Map());
        }
        sharedRenderers.get(gl.canvas.width).set(gl.canvas.height, this);
        this.gl = gl;
        this.programInfo = setupShader(gl);

        // Start render loop
        const render = async () => {
            await this.renderFrame();
            if (this.activeHandle)
                this.activeHandle = requestAnimationFrame(render);
        }
        this.activeHandle = requestAnimationFrame(render);
    }

    /**
     * @private
     */
    async renderFrame() {
        let w = this.gl.canvas.width;
        let h = this.gl.canvas.height;
        for (let blitRenderer of this.sharingRenderers) {
            await this.renderModels(blitRenderer.models, true);
            if (this.pixelBuffer == null) {
                this.pixelBuffer = new Uint8ClampedArray(w * h * 4,);
            }

            this.gl.readPixels(0, 0, w, h, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.pixelBuffer);
            blitRenderer.copy(this.pixelBuffer);
        }

        await this.renderModels(this.models, false);
    }

    /**
     * @param {ModelData[]} - The models to render.
     * @param {boolean} flip
     * @private
     */
    async renderModels(models, flip) {
        resetDraw(this.gl, true);
        for (let model of models) {
            await this.prepareDraw(model);
            model.draw(flip);
        }
    }

    /**
     * Initializes the ModelData#draw function.
     * @param {ModelData} modelData
     * @private
     */
    async prepareDraw(modelData) {
        if (modelData.draw) {
            return;
        }

        // Load texture
        const texture = await loadTextureAuto(this.gl, modelData.texture);
        const glintTexture = modelData.enchanted ? loadTexture(this.gl, GLINT_TEXTURE, 64, 64) : null;

        // Create draw call
        const model = modelData.modelType.create(this.gl);
        const translation = modelData.translation || [0, 0, 0];
        const scaleMul = 1 / (modelData.scale || 1); // Take inverse of scale so that bigger scale = bigger model
        modelData.draw = flip => draw(this.gl, this.programInfo, modelData.inInventory, model, texture, glintTexture, translation, scaleMul, flip);
    }

    /**
     * Destroys the renderer.
     * @public
     */
    destroy() {
        if (this.activeHandle != null) {
            cancelAnimationFrame(this.activeHandle);
            this.activeHandle = null;
            this.gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
    }
}

/**
 * A renderer targeting 2D canvases by copying the image from a {@link WebGLRenderer}.
 * @private
 */
class BlitRenderer extends Renderer {

    /**
     * Creates a new renderer.
     * @param {HTMLCanvasElement} canvas - The canvas to render on.
     * @param {CanvasRenderingContext2DSettings} [contextAttributes={}] - Arbitrary 2D context attributes.
     * @param {WebGLRenderer} renderer - The underlying renderer.
     * @param {ModelData[]} models - The models to render.
     * @private
     */
    constructor(canvas, contextAttributes, renderer, models) {
        super(models);
        this.ctx = canvas.getContext("2d", contextAttributes || {});
        this.backend = renderer;
        this.backend.sharingRenderers.push(this);
    }

    /**
     * Copies the image to the target canvas.
     * @param {Uint8ClampedArray} pixels
     */
    copy(pixels) {
        this.ctx.putImageData(new ImageData(pixels, this.ctx.canvas.width, this.ctx.canvas.height), 0, 0);
    }

    /**
     * Destroys the renderer.
     * @public
     */
    destroy() {
        let idx = this.backend.sharingRenderers.indexOf(this);
        if (idx !== -1) {
            this.backend.sharingRenderers.splice(idx, 1);
        }
    }
}
