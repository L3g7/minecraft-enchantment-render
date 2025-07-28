"use strict";

/**
 * @typedef {Object} Model
 * @property {WebGLBuffer} position
 * @property {WebGLBuffer} indices
 * @property {WebGLBuffer} texture
 * @property {WebGLBuffer} lighting - Prebaked lighting
 * @property {number} vertexCount
 * @property {number} scalePadded - Ortho matrix scaling when addPadding=true
 * @property {number} scaleUnpadded - Ortho matrix scaling when addPadding=false
 * @property {boolean} is3D - Whether to apply 30° rotation for isometric view
 */

/**
 * @public
 * @hideconstructor
 */
export class ModelType {
    constructor(generator) {
        this.generator = generator;
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @returns {Model}
     */
    create(gl) {
        return this.generator(gl);
    }
}

// Extracted from https://mcasset.cloud/1.8.9/assets/minecraft/textures/misc/enchanted_item_glint.png
// First row, only R component
const GLINT_TEXTURE_RAW = [
    0x68, 0x31, 0x5B, 0x38, 0x4F, 0x62, 0x6D, 0x59, 0x56, 0x71, 0x6B, 0x84, 0x82, 0xA0, 0x6C, 0x6A,
    0x74, 0x6D, 0xA3, 0xDD, 0xB8, 0xA0, 0x95, 0x83, 0x86, 0x86, 0x3F, 0x18, 0x41, 0x4E, 0x5E, 0x7D,
    0x79, 0x79, 0x83, 0x5D, 0x7E, 0x8F, 0x90, 0xA6, 0x9B, 0xBD, 0xCC, 0xFF, 0xE5, 0xDA, 0xD1, 0xC5,
    0x9A, 0x69, 0x68, 0x9C, 0x8B, 0x89, 0x57, 0x50, 0x6F, 0x57, 0x5F, 0x67, 0x6C, 0x94, 0x98, 0x4B
];

// Uncompressed texture
export const GLINT_TEXTURE = new ImageData(new Uint8ClampedArray(new Array(64).fill(GLINT_TEXTURE_RAW.map(c => [
    // Minecraft uses a color multiplier of 0x8040CC when rendering the enchantment texture.
    // We bake it directly into the texture for simplicity.
    c * 0x80 / 0xFF,
    c * 0x40 / 0xFF,
    c * 0xCC / 0xFF,
    0xFF,
])).flat(2)), 64, 64);

/**
 * Simple 2D plane / Minecraft item.
 * @type {ModelType}
 * @public
 */
export const MODEL_ITEM = new ModelType(gl => {
    const position = positionsBuf(gl, positions(1, [
        [1, 1, 1], [0, 1, 1], [0, 0, 1], [1, 0, 1],
    ]));

    const indices = indicesBuf(gl, 1);

    const texture = textureBuf(gl, 1, [
        [0, 0]
    ]);

    const lighting = lightingBuf(gl, [
        255
    ]);

    return {
        position,
        indices,
        texture,
        lighting,
        vertexCount: 6 * 1,
        scalePadded: 1.0,
        scaleUnpadded: 1.0,
        is3D: false
    };
});

/**
 * Simple cube / Minecraft block.
 * @type {ModelType}
 * @public
 */
export const MODEL_CUBE = new ModelType(gl => {
    // Removed culled faces
    const position = positionsBuf(gl, positions(1, [
        [0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0], // Top
        [0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1], // Left
        [1, 1, 1], [0, 1, 1], [0, 0, 1], [1, 0, 1], // Right
    ]));

    const indices = indicesBuf(gl, 3);

    const texture = textureBuf(gl, 2, [
        [0, 0], // Top
        [0, 1], // Left
        [1, 0], // Right
    ]);

    const lighting = lightingBuf(gl, [
        255, // Top
        148, // Left
        142, // Right
    ]);

    return {
        position,
        indices,
        texture,
        lighting,
        vertexCount: 6 * 3,
        scalePadded: 1.6,
        scaleUnpadded: 1.5732,
        is3D: true
    };
});

/**
 * Skeleton / Player skull, using the Minecraft skin texture layout.
 * @type {ModelType}
 * @public
 */
export const MODEL_SKULL_SKIN = new ModelType(gl => {
    // Removed culled faces
    const position = positionsBuf(gl, [
        positions(8 / 16, [
            [1, 1, 0], [0, 1, 0], [0, 1, 1], [1, 1, 1], // Lower, Top
            [0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1], // Lower, Left
            [1, 1, 1], [0, 1, 1], [0, 0, 1], [1, 0, 1], // Lower, Right
        ]),
        positions(8.5 / 16, [
            [1, 1, 0], [0, 1, 0], [0, 1, 1], [1, 1, 1], // Upper, Top
            [1, 0, 0], [0, 0, 0], [0, 0, 1], [1, 0, 1], // Upper, Bottom
            [0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1], // Upper, Left
            [1, 1, 0], [1, 1, 1], [1, 0, 1], [1, 0, 0], // Upper, Back Right
            [1, 1, 1], [0, 1, 1], [0, 0, 1], [1, 0, 1], // Upper, Right
            [0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, 0], // Upper, Back Left
        ])
    ]);

    const indices = indicesBuf(gl, 9);

    const texture = textureBuf(gl, 8, [
        [1, 0], // Lower, Top
        [0, 1], // Lower, Left
        [1, 1], // Lower, Right
        [5, 0], // Upper, Top
        [6, 0], // Upper, Bottom
        [4, 1], // Upper, Left
        [6, 1], // Upper, Back Right
        [5, 1], // Upper, Right
        [7, 1], // Upper, Back Left
    ]);

    const lighting = lightingBuf(gl, [
        255, // Lower, Top
        162, // Lower, Left
        111, // Lower, Right
        255, // Upper, Top
        102, // Upper, Bottom
        162, // Upper, Left
        190, // Upper, Back Right
        111, // Upper, Right
        184, // Upper, Back Left
    ]);

    return {
        position,
        indices,
        texture,
        lighting,
        vertexCount: 6 * 9,
        scalePadded: 1.12,
        scaleUnpadded: 0.836,
        is3D: true
    };
});

/**
 * Skeleton / Player skull, using a compact texture layout.
 * @type {ModelType}
 * @public
 */
export const MODEL_SKULL_COMPACT = new ModelType(gl => {
    // Removed culled faces
    const position = positionsBuf(gl, [
        positions(8 / 16, [
            [1, 1, 0], [0, 1, 0], [0, 1, 1], [1, 1, 1], // Lower, Top
            [0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1], // Lower, Left
            [1, 1, 1], [0, 1, 1], [0, 0, 1], [1, 0, 1], // Lower, Right
        ]),
        positions(8.5 / 16, [
            [1, 1, 0], [0, 1, 0], [0, 1, 1], [1, 1, 1], // Upper, Top
            [1, 0, 0], [0, 0, 0], [0, 0, 1], [1, 0, 1], // Upper, Bottom
            [0, 1, 1], [0, 1, 0], [0, 0, 0], [0, 0, 1], // Upper, Left
            [1, 1, 0], [1, 1, 1], [1, 0, 1], [1, 0, 0], // Upper, Back Right
            [1, 1, 1], [0, 1, 1], [0, 0, 1], [1, 0, 1], // Upper, Right
            [0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, 0], // Upper, Back Left
        ])
    ]);

    const indices = indicesBuf(gl, 9);

    const texture = textureBuf(gl, 3, [
        [0, 0], // Lower, Top
        [0, 1], // Lower, Left
        [1, 0], // Lower, Right
        [2, 0], // Upper, Top
        [0, 2], // Upper, Bottom
        [1, 1], // Upper, Left
        [1, 2], // Upper, Back Right
        [2, 1], // Upper, Right
        [2, 2], // Upper, Back Left
    ]);

    const lighting = lightingBuf(gl, [
        255, // Lower, Top
        162, // Lower, Left
        111, // Lower, Right
        255, // Upper, Top
        102, // Upper, Bottom
        162, // Upper, Left
        190, // Upper, Back Right
        111, // Upper, Right
        184, // Upper, Back Left
    ]);

    return {
        position,
        indices,
        texture,
        lighting,
        vertexCount: 6 * 9,
        scalePadded: 1.12,
        scaleUnpadded: 0.836,
        is3D: true
    };
});

// Helper functions

/**
 * @param {number} scale
 * @param {number[][]} positions - For each rectangle 4 arrays with 3 entries of 0 or 1 - just look at the usages idk what to write
 * @returns {number[]}
 */
function positions(scale, positions) {
    return positions
        .flat()
        .map(v => ((v * 2) - 1) * scale);
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {GLenum} target
 * @param {AllowSharedBufferSource} data
 * @returns {WebGLBuffer}
 */
function buf(gl, target, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, gl.STATIC_DRAW);
    return buffer;
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {number[]} data - see positions
 * @returns {WebGLBuffer}
 */
function positionsBuf(gl, data) {
    return buf(gl, gl.ARRAY_BUFFER, new Float32Array(data.flat()));
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {number} rectangleCount
 * @returns {WebGLBuffer}
 */
function indicesBuf(gl, rectangleCount) {
    let vertexData = [...Array(rectangleCount).keys()]
        .map(i => ([i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3]))
        .flat();

    return buf(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexData));
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {number} units - How many units the texture is split into, per axis
 * @param {number[][]} data - For each rect [u, v] in units
 * @returns {WebGLBuffer}
 */
function textureBuf(gl, units, data) {
    let vertexData = data.map(d => ([
        // Textures go CCW
        d[0] + 1.0, d[1] + 0.0,
        d[0] + 0.0, d[1] + 0.0,
        d[0] + 0.0, d[1] + 1.0,
        d[0] + 1.0, d[1] + 1.0
    ]))
        .flat()
        .map(v => v / units);

    return buf(gl, gl.ARRAY_BUFFER, new Float32Array(vertexData));
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {number[]} data - Prebaked lighting, one value 0 - 255 for each rect
 * @returns {WebGLBuffer}
 */
function lightingBuf(gl, data) {
    let vertexData = data
        .map(v => v / 255) // Multiplier, 0 - 1
        .map(v => [v, v, v]) // For each color channel
        .map(v => [v, v, v, v]) // For each vertex per rect
        .flat(2);

    return buf(gl, gl.ARRAY_BUFFER, new Float32Array(vertexData));
}
