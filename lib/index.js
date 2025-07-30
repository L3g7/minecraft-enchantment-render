"use strict";

export { MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN, ModelType } from "./models.js";
export { TextureAltlas, createAtlas } from "./atlas.js";

import { GLINT_TEXTURE, ModelType } from "./models.js";
import { draw } from "./draw.js";
import { setupShader, loadTexture, loadTextureFromURL } from "./setup.js";

/**
 * @typedef {Object} RenderOptions
 * @property {ModelType} modelType - One of {@link MODEL_CUBE}, {@link MODEL_ITEM}, {@link MODEL_SKULL_COMPACT}, {@link MODEL_SKULL_SKIN}.
 * @property {string|ImageData} texture - A URL to the model texture or a {@link TextureAltlas} cutout.
 * @property {boolean} [enchanted=false] - Applies Minecraft's enchantment glint.
 * @property {boolean} [inInventory=false] - Applies padding to match rendering of Minecraft items in inventory.
 * @property {WebGLContextAttributes} [glContext={antialias: false}] - Arbitrary WebGL context attributes.
 * @public
 */

/**
 * Creates a new renderer and draws the first frame.
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

    // Load texture
    let image;
    if (typeof renderOptions.texture === "string") {
        image = await loadTextureFromURL(renderOptions.texture);
    } else {
        image = renderOptions.texture;
    }
    const texture = loadTexture(gl, image, image.width, image.height);

    const glintTexture = renderOptions.enchanted ? loadTexture(gl, GLINT_TEXTURE, 64, 64) : null;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // Initialize renderer
    const model = renderOptions.modelType.create(gl);

    let active = true;
    draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture);

    function render() {
        draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture);
        if (active)
            requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    return new Renderer(() => {
        active = false;
        cancelAnimationFrame(render);
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
