import { loadTextureFromURL } from "./setup.js";

/**
 * @property {string|TexImageSource} texture - A URL to the model texture or an arbitrary image.
 * @returns {Promise<TextureAltlas>}
 */
export async function createAtlas(texture) {
    let image;
    if (typeof texture === "string") {
        image = await loadTextureFromURL(texture);
    } else {
        image = texture;
    }

    return new TextureAltlas(image);
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
