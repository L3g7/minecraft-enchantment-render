"use strict";

export { MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN, ModelType } from "./models.js";

import { GLINT_TEXTURE, ModelType } from "./models.js";
import { draw } from "./draw.js";
import { setupShader, loadTexture, loadTextureFromURL } from "./setup.js";

/**
 * @typedef {Object} RenderOptions
 * @property {ModelType} modelType - One of MODEL_CUBE, MODEL-ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN.
 * @property {string} textureURL - The URL to the model texture.
 * @property {boolean} [enchanted=false] - Applies Minecraft's enchantment glint.
 * @property {boolean} [inInventory=false] - Applies padding to match rendering of Minecraft items in inventory.
 * @property {WebGLContextAttributes} [glContext={antialias: false}] - Arbitrary WebGL context attributes.
 * @public
 */

/**
 * Creates and starts a new renderer.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {RenderOptions} renderOptions - What to render.
 * @returns {Promise<Renderer>}
 * @public
 */
export async function createRenderer(canvas, renderOptions) {
    if (!window.glMatrix?.mat4) {
        throw new Error("Could not find matrix library. Please ensure you include glMatrix v3.");
    }

    // Disable antialias by default
    let contextAttributes = renderOptions.glContext || {};
    if (contextAttributes.antialias === undefined) {
        contextAttributes.antialias = false;
    }

    const gl = canvas.getContext("webgl", contextAttributes);
    if (gl === null) {
        throw new Error("Could not initialize WebGL. Your browser may not support it.");
    }

    const programInfo = setupShader(gl);

    const texture = await loadTextureFromURL(gl, renderOptions.textureURL);
    const glintTexture = renderOptions.enchanted ? loadTexture(gl, GLINT_TEXTURE, 64, 64) : null;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const model = renderOptions.modelType.create(gl);

    let active = true;
    function render() {
        draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture);
        if (active)
            requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    return new Renderer(() => active = false);
}

/**
 * An active render.
 * @public
 * @hideconstructor
 */
export class Renderer {
    constructor(cancelFunc) {
        this.cancelFunc = cancelFunc;
    }

    /**
     * Destroys the renderer.
     * @public
     */
    destroy() {
        this.cancelFunc();
    }
}
