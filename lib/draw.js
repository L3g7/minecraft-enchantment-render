"use strict";

const { mat3, mat4 } = window.glMatrix || {};

/**
 * @typedef {import('./models.js').Model} Model
 */

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

/**
 * @param {WebGLRenderingContext} gl
 * @param {ProgramInfo} programInfo
 * @param {boolean} addPadding
 * @param {Model} model
 * @param {WebGLTexture} modelTexture
 * @param {WebGLTexture|null} glintTexture
 * @param {[number, number, number]} translation
 * @param {number} scaleMul
 */
export function draw(gl, programInfo, addPadding, model, modelTexture, glintTexture, translation, scaleMul) {
    // Create projection and model view matrix
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -aspect, aspect, -1, 1, -10, 10);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, translation);

    const scale = 1 / ((addPadding ? model.scalePadded : model.scaleUnpadded) * scaleMul);
    mat4.scale(modelViewMatrix, modelViewMatrix, [scale, scale, scale]);

    if (model.is3D) {
        mat4.rotate(modelViewMatrix, modelViewMatrix, 30 * Math.PI / 180, [1, 0, 0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, 45 * Math.PI / 180, [0, 1, 0]);
    }

    // Initialize shaders
    setAttribute(gl, programInfo.locations.aVertexPositions, model.position, 3);
    setAttribute(gl, programInfo.locations.aTextureCoord, model.texture, 2);
    setAttribute(gl, programInfo.locations.aLighting, model.lighting, 3);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indices);
    gl.useProgram(programInfo.program);

    gl.uniform1i(programInfo.locations.uLightingActive, 1);
    gl.uniformMatrix4fv(programInfo.locations.uProjectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.locations.uModelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix3fv(programInfo.locations.uTextureMatrix, false, mat3.create());

    // Draw model
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, modelTexture);
    gl.uniform1i(programInfo.locations.uTexture, 0);

    gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0);

    // Draw enchantment glint
    if (!glintTexture) {
        return;
    }

    // See Minecraft v1.8.9 RenderItem#renderEffect(IBakedModel)
    gl.depthMask(false);
    gl.depthFunc(gl.EQUAL);
    gl.uniform1i(programInfo.locations.uLightingActive, 0); // disableLighting()
    gl.blendFunc(gl.SRC_COLOR, gl.ONE);
    gl.bindTexture(gl.TEXTURE_2D, glintTexture);
    let textureMatrix = mat3.create(); // matrixMode(GL_TEXTURE)
    const SCALE = 0.5; // 16 / 8 (16 in Matrix, 8 in scale(..))
    mat3.scale(textureMatrix, textureMatrix, [SCALE, SCALE, SCALE]);
    let offsetA = (getSystemTime() % 3000) / 3000 / SCALE;
    mat3.translate(textureMatrix, textureMatrix, [offsetA, 0]);
    mat3.rotate(textureMatrix, textureMatrix, deg2rad(-50), [0, 0, 1]);

    // renderModel
    gl.uniformMatrix3fv(programInfo.locations.uTextureMatrix, false, textureMatrix);
    gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0);

    textureMatrix = mat3.create(); // popMatrix(); pushMatrix();
    mat3.scale(textureMatrix, textureMatrix, [SCALE, SCALE, SCALE]);
    let offsetB = (getSystemTime() % 4873) / 4873 / SCALE;
    mat3.translate(textureMatrix, textureMatrix, [-offsetB, 0]);
    mat3.rotate(textureMatrix, textureMatrix, deg2rad(10), [0, 0, 1]);

    // renderModel
    gl.uniformMatrix3fv(programInfo.locations.uTextureMatrix, false, textureMatrix);
    gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0);

    resetDraw(gl, false);
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {boolean} clear
 */
export function resetDraw(gl, clear) {
    // Reset canvas
    if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

/**
 * @param {number} i
 * @returns {number}
 */
function deg2rad(i) {
    return i * Math.PI / 180
}

/**
 * See Minecraft.getSystemTime()
 * @returns {number}
 */
function getSystemTime() {
    return Date.now();
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {GLuint} location
 * @param {WebGLBuffer} buffer
 * @param {GLint} bufferEntrySize
 */
function setAttribute(gl, location, buffer, bufferEntrySize) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(location, bufferEntrySize, gl.FLOAT, false, 0, 0,);
    gl.enableVertexAttribArray(location);
}
