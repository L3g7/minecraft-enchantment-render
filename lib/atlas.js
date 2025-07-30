import { loadTextureFromURL } from "./setup.js";

/**
 * @property {string} textureURL - The URL to the model texture.
 * @returns {Promise<TextureAltlas>}
 */
export async function createAtlas(textureURL) {
    return new TextureAltlas(await loadTextureFromURL(textureURL));
}

/**
 * A texture atlas. See {@link createAtlas}.
 * @public
 * @hideconstructor
 */
export class TextureAltlas {
    /**
     * @param {HTMLImageElement} texture
     */
    constructor(texture) {
        let canvas = document.createElement("canvas");
        canvas.width = texture.width;
        canvas.height = texture.height;

        this.ctx = canvas.getContext("2d");
        this.ctx.drawImage(texture, 0, 0, texture.width, texture.height, 0, 0, texture.width, texture.height);
    }

    /**
     * Creates a image cutout.
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {ImageData}
     * @public
     */
    getTexture(x, y, width, height) {
        return this.ctx.getImageData(x, y, width, height);
    }
}
