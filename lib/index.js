"use strict";

export { MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN, ModelType } from "./models.js";
export { TextureAltlas, createAtlas } from "./atlas.js";

import { GLINT_TEXTURE, ModelType } from "./models.js";
import { draw, resetDraw } from "./draw.js";
import { setupShader, loadTexture, loadTextureAuto } from "./setup.js";

/**
 * @typedef {Object} ModelData
 * @property {ModelType} modelType - One of {@link MODEL_CUBE}, {@link MODEL_ITEM}, {@link MODEL_SKULL_COMPACT}, {@link MODEL_SKULL_SKIN}.
 * @property {string|TexImageSource} texture - A URL to the model texture, a {@link TextureAltlas} cutout or an arbitrary image.
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
    let renderer = new Renderer(canvas, contextAttributes);
    renderer.models = models;
    return renderer;
}

/**
 * A model renderer. See {@link createRenderer}.
 * @public
 */
export class Renderer {

    /**
     * The models to render.
     * @type {ModelData[]}
     * @public
     */
    models;

    /**
     * Creates a new renderer.
     * @param {HTMLCanvasElement} canvas - The canvas to render on.
     * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
     * @public
     */
    constructor(canvas, contextAttributes) {
        if (!window.glMatrix?.mat4) {
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

        this.gl = gl;
        this.programInfo = setupShader(gl);
        this.models = [];

        // Start render loop
        let activeHandle;

        const render = async () => {
            resetDraw(gl, true);
            for (let model of this.models) {
                await this.prepareDraw(model);
                model.draw();
            }

            if (activeHandle)
                activeHandle = requestAnimationFrame(render);
        }
        activeHandle = requestAnimationFrame(render);

        this.destroyFunc = () => {
            cancelAnimationFrame(activeHandle);
            activeHandle = null;
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }

    /**
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
        modelData.draw = () => draw(this.gl, this.programInfo, modelData.inInventory, model, texture, glintTexture, translation, scaleMul);
    }

    /**
     * Destroys the renderer.
     * @public
     */
    destroy() {
        this.destroyFunc();
    }
}
