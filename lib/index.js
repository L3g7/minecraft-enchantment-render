"use strict";

export { MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN } from "./models.js";

import { GLINT_TEXTURE, ModelType } from "./models.js";
import { draw } from "./draw.js";
import { setupShader, loadTexture, loadTextureFromURL } from "./setup.js";

/**
 * @typedef {Object} RenderOptions
 * @property {ModelType} modelType
 * @property {string} textureURL
 * @property {boolean} [enchanted=false]
 * @property {boolean} [inInventory=false] - Applies padding to match rendering of Minecraft items in inventory.
 * @property {WebGLContextAttributes} [glContext={antialias: false}]
 */

/**
 * @param {HTMLCanvasElement} canvas
 * @param {RenderOptions} renderOptions
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

    function render() {
        draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
