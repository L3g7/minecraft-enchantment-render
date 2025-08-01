"use strict";

/**
 * @typedef {Object} ProgramInfo
 * @property {WebGLProgram} program
 * @property {ProgramLocations} locations
 */

/**
 * @typedef {Object} ProgramLocations
 * @property {GLint} aVertexPosition
 * @property {WebGLUniformLocation} uProjectionMatrix
 * @property {WebGLUniformLocation} uModelViewMatrix
 * @property {GLint} aTextureCoord
 * @property {GLint} aLighting
 * @property {WebGLUniformLocation} uLightingActive
 * @property {WebGLUniformLocation} uTextureMatrix
 * @property {WebGLUniformLocation} uTexture
 */

const VERTEX_SHADER = [
    "attribute vec4 aVertexPosition;",
    "uniform mat4 uModelViewMatrix;",
    "uniform mat4 uProjectionMatrix;",
    "",
    "attribute     vec2 aTextureCoord;",
    "varying highp vec2 vTextureCoord;",
    "attribute     vec3 aLighting;",
    "varying highp vec3 vLighting;",
    "",
    "void main(void) {",
    "    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;",
    "",
    "    vTextureCoord = aTextureCoord;",
    "    vLighting = aLighting;",
    "}",
].join("");

const FRAGMENT_SHADER = [
    "precision highp float;",
    "",
    "uniform sampler2D uTexture;",
    "uniform mat3 uTextureMatrix; /* Offset applied to texture */",
    "varying highp vec2 vTextureCoord;",
    "",
    "varying highp vec3 vLighting; /* Prebaked lighting */",
    "uniform bool uLightingActive;",
    "",
    "void main() {",
    "    highp vec4 texelColor = texture2D(uTexture, (uTextureMatrix * vec3(vTextureCoord, 1.0)).xy);",
    "    gl_FragColor = texelColor;",
    "",
    "    if (texelColor.a == 0.0) {",
    "        discard;",
    "    }",
    "",
    "    if (uLightingActive) {",
    "        gl_FragColor *= vec4(vLighting, 1);",
    "    }",
    "}",
].join("");

/**
 * @param {WebGLRenderingContext} gl
 * @returns {ProgramInfo}
 */
export function setupShader(gl) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }

    return {
        program: shaderProgram,
        locations: {
            aVertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            uProjectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            uModelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),

            aTextureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
            aLighting: gl.getAttribLocation(shaderProgram, "aLighting"),
            uLightingActive: gl.getUniformLocation(shaderProgram, "uLightingActive"),

            uTextureMatrix: gl.getUniformLocation(shaderProgram, "uTextureMatrix"),
            uTexture: gl.getUniformLocation(shaderProgram, "uTexture"),
        }
    };
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {GLenum} type
 * @param {string} source
 * @returns {?WebGLShader}
 */
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
export function loadTextureFromURL(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = cause => {
            reject(new Error(`Could not load texture "${url}".`, {
                cause
            }));
        };
        image.src = url;
    });
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {TexImageSource} data
 * @returns {WebGLTexture}
 */
export function loadTexture(gl, data, w, h) {
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);

    if (isPowerOf2(w) && isPowerOf2(h)) {
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    return texture;
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {string|TexImageSource} texture
 * @returns {Promise<WebGLTexture>}
 */
export async function loadTextureAuto(gl, texture) {
    let image;
    if (typeof texture === "string") {
        image = await loadTextureFromURL(texture);
    } else {
        image = texture;
    }

    return loadTexture(gl, image, image.width, image.height);
}

/**
 * @param {number} value
 * @returns {boolean}
 */
function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}
