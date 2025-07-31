"use strict";

export { MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN, ModelType } from "./models.js";
export { TextureAltlas, createAtlas } from "./atlas.js";

import { GLINT_TEXTURE, ModelType } from "./models.js";
import { draw, resetDraw } from "./draw.js";
import { setupShader, loadTexture, loadTextureAuto } from "./setup.js";

/**
 * @typedef {Object} RenderOptions
 * @property {ModelType} modelType - One of {@link MODEL_CUBE}, {@link MODEL_ITEM}, {@link MODEL_SKULL_COMPACT}, {@link MODEL_SKULL_SKIN}.
 * @property {string|ImageData} texture - A URL to the model texture or a {@link TextureAltlas} cutout.
 * @property {boolean} [enchanted=false] - Applies Minecraft's enchantment glint.
 * @property {boolean} [inInventory=false] - Applies padding to match rendering of Minecraft items in inventory.
 * @property {[number, number, number]} [translation=[0, 0, 0]] - Applies a translation to the model.
 * @property {number} [scale=1] - Scales the model.
 * @public
 */

/**
 * Creates a new renderer.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {RenderOptions} renderOptions - What to render.
 * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
 * @returns {Promise<Renderer>}
 * @public
 */
export function createRenderer(canvas, renderOptions, contextAttributes) {
    return createMultiRenderer(canvas, [renderOptions], contextAttributes);
}

/**
 * Creates a new renderer with multiple models.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {RenderOptions[]} renderOptionsArray - What to render.
 * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
 * @returns {Promise<Renderer>}
 * @public
 */
export async function createMultiRenderer(canvas, renderOptionsArray, contextAttributes) {
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

    const programInfo = setupShader(gl);

    let drawCalls = [() => resetDraw(gl, true)];
    for (let renderOptions of renderOptionsArray) {
        // Load texture
        const texture = await loadTextureAuto(gl, renderOptions.texture);
        const glintTexture = renderOptions.enchanted ? loadTexture(gl, GLINT_TEXTURE, 64, 64) : null;

        // Create draw call
        const model = renderOptions.modelType.create(gl);
        const translation = renderOptions.translation || [0, 0, 0];
        const scaleMul = 1 / (renderOptions.scale || 1); // Take inverse of scale so that bigger scale = bigger model
        drawCalls.push(() => draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture, translation, scaleMul));
    }

    // Start render loop
    let activeHandle;

    function render() {
        drawCalls.forEach(call => call());
        if (activeHandle)
            activeHandle = requestAnimationFrame(render);
    }
    activeHandle = requestAnimationFrame(render);

    return new Renderer(() => {
        cancelAnimationFrame(activeHandle);
        activeHandle = null;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
    });
}

/**
 * An active render. See {@link createRenderer}.
 * @public
 * @hideconstructor
 */
export class Renderer {
    constructor(destroyFunc) {
        this.destroyFunc = destroyFunc;
    }

    /**
     * Destroys the renderer.
     * @public
     */
    destroy() {
        this.destroyFunc();
    }
}
