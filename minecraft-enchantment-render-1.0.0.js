// minecraft-enchantment-render v1.0.0
// 
// MIT License
// 
// Copyright (c) 2025 L3g7
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// lib/models.js
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

class ModelType {
  constructor(generator) {
    this.generator = generator;
  }
  create(gl) {
    /**
         * @param {WebGLRenderingContext} gl
         * @returns {Model}
         */
    return this.generator(gl);
  }
}
var GLINT_TEXTURE_RAW = [
  104,
  49,
  91,
  56,
  79,
  98,
  109,
  89,
  86,
  113,
  107,
  132,
  130,
  160,
  108,
  106,
  116,
  109,
  163,
  221,
  184,
  160,
  149,
  131,
  134,
  134,
  63,
  24,
  65,
  78,
  94,
  125,
  121,
  121,
  131,
  93,
  126,
  143,
  144,
  166,
  155,
  189,
  204,
  255,
  229,
  218,
  209,
  197,
  154,
  105,
  104,
  156,
  139,
  137,
  87,
  80,
  111,
  87,
  95,
  103,
  108,
  148,
  152,
  75
];
var GLINT_TEXTURE = new ImageData(new Uint8ClampedArray(new Array(64).fill(GLINT_TEXTURE_RAW.map((c) => [
  c * 128 / 255,
  c * 64 / 255,
  c * 204 / 255,
  255
])).flat(2)), 64, 64);
/**
 * Simple 2D plane / Minecraft item.
 */
var MODEL_ITEM = new ModelType((gl) => {
  const position = positionsBuf(gl, positions(1, [
    [1, 1, 1],
    [0, 1, 1],
    [0, 0, 1],
    [1, 0, 1]
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
    scalePadded: 1,
    scaleUnpadded: 1,
    is3D: false
  };
});
/**
 * Simple cube / Minecraft block.
 */
var MODEL_CUBE = new ModelType((gl) => {
  const position = positionsBuf(gl, positions(1, [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
    [0, 0, 1],
    [1, 0, 1]
  ]));
  const indices = indicesBuf(gl, 3);
  const texture = textureBuf(gl, 2, [
    [0, 0],
    [0, 1],
    [1, 0]
  ]);
  const lighting = lightingBuf(gl, [
    255,
    148,
    142
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
 */
var MODEL_SKULL_SKIN = new ModelType((gl) => {
  const position = positionsBuf(gl, [
    positions(8 / 16, [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
      [1, 0, 1]
    ]),
    positions(8.5 / 16, [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 0],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ])
  ]);
  const indices = indicesBuf(gl, 9);
  const texture = textureBuf(gl, 8, [
    [1, 0],
    [0, 1],
    [1, 1],
    [5, 0],
    [6, 0],
    [4, 1],
    [6, 1],
    [5, 1],
    [7, 1]
  ]);
  const lighting = lightingBuf(gl, [
    255,
    162,
    111,
    255,
    102,
    162,
    190,
    111,
    184
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
 */
var MODEL_SKULL_COMPACT = new ModelType((gl) => {
  const position = positionsBuf(gl, [
    positions(8 / 16, [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
      [1, 0, 1]
    ]),
    positions(8.5 / 16, [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 0],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ])
  ]);
  const indices = indicesBuf(gl, 9);
  const texture = textureBuf(gl, 3, [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, 0],
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2]
  ]);
  const lighting = lightingBuf(gl, [
    255,
    162,
    111,
    255,
    102,
    162,
    190,
    111,
    184
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
 * @param {number} scale
 * @param {number[][]} positions - For each rectangle 4 arrays with 3 entries of 0 or 1 - just look at the usages idk what to write
 * @returns {number[]}
 */
function positions(scale, positions2) {
  return positions2.flat().map((v) => (v * 2 - 1) * scale);
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
  let vertexData = [...Array(rectangleCount).keys()].map((i) => [i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3]).flat();
  return buf(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexData));
}
/**
 * @param {WebGLRenderingContext} gl
 * @param {number} units - How many units the texture is split into, per axis
 * @param {number[][]} data - For each rect [u, v] in units
 * @returns {WebGLBuffer}
 */
function textureBuf(gl, units, data) {
  let vertexData = data.map((d) => [
    d[0] + 1,
    d[1] + 0,
    d[0] + 0,
    d[1] + 0,
    d[0] + 0,
    d[1] + 1,
    d[0] + 1,
    d[1] + 1
  ]).flat().map((v) => v / units);
  return buf(gl, gl.ARRAY_BUFFER, new Float32Array(vertexData));
}
/**
 * @param {WebGLRenderingContext} gl
 * @param {number[]} data - Prebaked lighting, one value 0 - 255 for each rect
 * @returns {WebGLBuffer}
 */
function lightingBuf(gl, data) {
  let vertexData = data.map((v) => v / 255).map((v) => [v, v, v]).map((v) => [v, v, v, v]).flat(2);
  return buf(gl, gl.ARRAY_BUFFER, new Float32Array(vertexData));
}
// lib/draw.js
var { mat3, mat4 } = window.glMatrix || {};
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
 * @param {WebGLTexture} glintTexture
 */
function draw(gl, programInfo, addPadding, model, modelTexture, glintTexture) {
  gl.clearColor(0, 0, 0, 0);
  gl.clearDepth(1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.depthMask(true);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const scale = addPadding ? model.scalePadded : model.scaleUnpadded;
  const projectionMatrix = mat4.create();
  mat4.ortho(projectionMatrix, -aspect * scale, aspect * scale, -scale, scale, -10, 10);
  const modelViewMatrix = mat4.create();
  if (model.is3D) {
    mat4.rotate(modelViewMatrix, modelViewMatrix, 30 * Math.PI / 180, [1, 0, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, 45 * Math.PI / 180, [0, 1, 0]);
  }
  setAttribute(gl, programInfo.locations.aVertexPositions, model.position, 3);
  setAttribute(gl, programInfo.locations.aTextureCoord, model.texture, 2);
  setAttribute(gl, programInfo.locations.aLighting, model.lighting, 3);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indices);
  gl.useProgram(programInfo.program);
  gl.uniform1i(programInfo.locations.uLightingActive, 1);
  gl.uniformMatrix4fv(programInfo.locations.uProjectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.locations.uModelViewMatrix, false, modelViewMatrix);
  gl.uniformMatrix3fv(programInfo.locations.uTextureMatrix, false, mat3.create());
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, modelTexture);
  gl.uniform1i(programInfo.locations.uTexture, 0);
  gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0);
  if (!glintTexture) {
    return;
  }
  gl.depthMask(false);
  gl.depthFunc(gl.EQUAL);
  gl.uniform1i(programInfo.locations.uLightingActive, 0);
  gl.blendFunc(gl.SRC_COLOR, gl.ONE);
  gl.bindTexture(gl.TEXTURE_2D, glintTexture);
  let textureMatrix = mat3.create();
  const SCALE = 0.5;
  mat3.scale(textureMatrix, textureMatrix, [SCALE, SCALE, SCALE]);
  let offsetA = getSystemTime() % 3000 / 3000 / SCALE;
  mat3.translate(textureMatrix, textureMatrix, [offsetA, 0]);
  mat3.rotate(textureMatrix, textureMatrix, deg2rad(-50), [0, 0, 1]);
  gl.uniformMatrix3fv(programInfo.locations.uTextureMatrix, false, textureMatrix);
  gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0);
  textureMatrix = mat3.create();
  mat3.scale(textureMatrix, textureMatrix, [SCALE, SCALE, SCALE]);
  let offsetB = getSystemTime() % 4873 / 4873 / SCALE;
  mat3.translate(textureMatrix, textureMatrix, [-offsetB, 0]);
  mat3.rotate(textureMatrix, textureMatrix, deg2rad(10), [0, 0, 1]);
  gl.uniformMatrix3fv(programInfo.locations.uTextureMatrix, false, textureMatrix);
  gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0);
}
/**
 * @param {number} i
 * @returns {number}
 */
function deg2rad(i) {
  return i * Math.PI / 180;
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
  gl.vertexAttribPointer(location, bufferEntrySize, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(location);
}

// lib/setup.js
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
var VERTEX_SHADER = [
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
  "}"
].join("");
var FRAGMENT_SHADER = [
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
  "}"
].join("");
/**
 * @param {WebGLRenderingContext} gl
 * @returns {ProgramInfo}
 */
function setupShader(gl) {
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
      uTexture: gl.getUniformLocation(shaderProgram, "uTexture")
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
 * @returns {Promise<WebGLTexture>}
 */
function loadTextureFromURL(gl, url) {
  return new Promise((resolve, reject) => {
    const image = new Image;
    image.onload = () => {
      resolve(loadTexture(gl, image, image.width, image.height));
    };
    image.onerror = (cause) => {
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
function loadTexture(gl, data, w, h) {
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
 * @param {number} value
 * @returns {boolean}
 */
function isPowerOf2(value) {
  return (value & value - 1) === 0;
}

// lib/index.js
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
async function createRenderer(canvas, renderOptions) {
  if (!window.glMatrix?.mat4) {
    throw new Error("Could not find matrix library. Please ensure you include glMatrix v3.");
  }
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
export {
  createRenderer,
  MODEL_SKULL_SKIN,
  MODEL_SKULL_COMPACT,
  MODEL_ITEM,
  MODEL_CUBE
};

//# debugId=A222980FBB61A7BC64756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliXFxtb2RlbHMuanMiLCAibGliXFxkcmF3LmpzIiwgImxpYlxcc2V0dXAuanMiLCAibGliXFxpbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJcInVzZSBzdHJpY3RcIjtcblxuLyohKlxuICogQHR5cGVkZWYge09iamVjdH0gTW9kZWxcbiAqIEBwcm9wZXJ0eSB7V2ViR0xCdWZmZXJ9IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBpbmRpY2VzXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSB0ZXh0dXJlXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBsaWdodGluZyAtIFByZWJha2VkIGxpZ2h0aW5nXG4gKiBAcHJvcGVydHkge251bWJlcn0gdmVydGV4Q291bnRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzY2FsZVBhZGRlZCAtIE9ydGhvIG1hdHJpeCBzY2FsaW5nIHdoZW4gYWRkUGFkZGluZz10cnVlXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2NhbGVVbnBhZGRlZCAtIE9ydGhvIG1hdHJpeCBzY2FsaW5nIHdoZW4gYWRkUGFkZGluZz1mYWxzZVxuICogQHByb3BlcnR5IHtib29sZWFufSBpczNEIC0gV2hldGhlciB0byBhcHBseSAzMMKwIHJvdGF0aW9uIGZvciBpc29tZXRyaWMgdmlld1xuICovXG5cbmV4cG9ydCBjbGFzcyBNb2RlbFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcikge1xuICAgICAgICB0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvcjtcbiAgICB9XG5cbiAgICAvKiEqXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHJldHVybnMge01vZGVsfVxuICAgICAqL1xuICAgIGNyZWF0ZShnbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0b3IoZ2wpO1xuICAgIH1cbn1cblxuLy8gRXh0cmFjdGVkIGZyb20gaHR0cHM6Ly9tY2Fzc2V0LmNsb3VkLzEuOC45L2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvbWlzYy9lbmNoYW50ZWRfaXRlbV9nbGludC5wbmdcbi8vIEZpcnN0IHJvdywgb25seSBSIGNvbXBvbmVudFxuY29uc3QgR0xJTlRfVEVYVFVSRV9SQVcgPSBbXG4gICAgMHg2OCwgMHgzMSwgMHg1QiwgMHgzOCwgMHg0RiwgMHg2MiwgMHg2RCwgMHg1OSwgMHg1NiwgMHg3MSwgMHg2QiwgMHg4NCwgMHg4MiwgMHhBMCwgMHg2QywgMHg2QSxcbiAgICAweDc0LCAweDZELCAweEEzLCAweERELCAweEI4LCAweEEwLCAweDk1LCAweDgzLCAweDg2LCAweDg2LCAweDNGLCAweDE4LCAweDQxLCAweDRFLCAweDVFLCAweDdELFxuICAgIDB4NzksIDB4NzksIDB4ODMsIDB4NUQsIDB4N0UsIDB4OEYsIDB4OTAsIDB4QTYsIDB4OUIsIDB4QkQsIDB4Q0MsIDB4RkYsIDB4RTUsIDB4REEsIDB4RDEsIDB4QzUsXG4gICAgMHg5QSwgMHg2OSwgMHg2OCwgMHg5QywgMHg4QiwgMHg4OSwgMHg1NywgMHg1MCwgMHg2RiwgMHg1NywgMHg1RiwgMHg2NywgMHg2QywgMHg5NCwgMHg5OCwgMHg0QlxuXTtcblxuLy8gVW5jb21wcmVzc2VkIHRleHR1cmVcbmV4cG9ydCBjb25zdCBHTElOVF9URVhUVVJFID0gbmV3IEltYWdlRGF0YShuZXcgVWludDhDbGFtcGVkQXJyYXkobmV3IEFycmF5KDY0KS5maWxsKEdMSU5UX1RFWFRVUkVfUkFXLm1hcChjID0+IFtcbiAgICAvLyBNaW5lY3JhZnQgdXNlcyBhIGNvbG9yIG11bHRpcGxpZXIgb2YgMHg4MDQwQ0Mgd2hlbiByZW5kZXJpbmcgdGhlIGVuY2hhbnRtZW50IHRleHR1cmUuXG4gICAgLy8gV2UgYmFrZSBpdCBkaXJlY3RseSBpbnRvIHRoZSB0ZXh0dXJlIGZvciBzaW1wbGljaXR5LlxuICAgIGMgKiAweDgwIC8gMHhGRixcbiAgICBjICogMHg0MCAvIDB4RkYsXG4gICAgYyAqIDB4Q0MgLyAweEZGLFxuICAgIDB4RkYsXG5dKSkuZmxhdCgyKSksIDY0LCA2NCk7XG5cbi8qISpcbiAqIFNpbXBsZSAyRCBwbGFuZSAvIE1pbmVjcmFmdCBpdGVtLlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfSVRFTSA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gcG9zaXRpb25zQnVmKGdsLCBwb3NpdGlvbnMoMSwgW1xuICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sXG4gICAgXSkpO1xuXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDEpO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDEsIFtcbiAgICAgICAgWzAsIDBdXG4gICAgXSk7XG5cbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXG4gICAgICAgIDI1NVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9zaXRpb24sXG4gICAgICAgIGluZGljZXMsXG4gICAgICAgIHRleHR1cmUsXG4gICAgICAgIGxpZ2h0aW5nLFxuICAgICAgICB2ZXJ0ZXhDb3VudDogNiAqIDEsXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjAsXG4gICAgICAgIHNjYWxlVW5wYWRkZWQ6IDEuMCxcbiAgICAgICAgaXMzRDogZmFsc2VcbiAgICB9O1xufSk7XG5cbi8qISpcbiAqIFNpbXBsZSBjdWJlIC8gTWluZWNyYWZ0IGJsb2NrLlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfQ1VCRSA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xuICAgIC8vIFJlbW92ZWQgY3VsbGVkIGZhY2VzXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIHBvc2l0aW9ucygxLCBbXG4gICAgICAgIFswLCAxLCAxXSwgWzEsIDEsIDFdLCBbMSwgMSwgMF0sIFswLCAxLCAwXSwgLy8gVG9wXG4gICAgICAgIFswLCAxLCAxXSwgWzAsIDEsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgLy8gTGVmdFxuICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFJpZ2h0XG4gICAgXSkpO1xuXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDMpO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDIsIFtcbiAgICAgICAgWzAsIDBdLCAvLyBUb3BcbiAgICAgICAgWzAsIDFdLCAvLyBMZWZ0XG4gICAgICAgIFsxLCAwXSwgLy8gUmlnaHRcbiAgICBdKTtcblxuICAgIGNvbnN0IGxpZ2h0aW5nID0gbGlnaHRpbmdCdWYoZ2wsIFtcbiAgICAgICAgMjU1LCAvLyBUb3BcbiAgICAgICAgMTQ4LCAvLyBMZWZ0XG4gICAgICAgIDE0MiwgLy8gUmlnaHRcbiAgICBdKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgICBpbmRpY2VzLFxuICAgICAgICB0ZXh0dXJlLFxuICAgICAgICBsaWdodGluZyxcbiAgICAgICAgdmVydGV4Q291bnQ6IDYgKiAzLFxuICAgICAgICBzY2FsZVBhZGRlZDogMS42LFxuICAgICAgICBzY2FsZVVucGFkZGVkOiAxLjU3MzIsXG4gICAgICAgIGlzM0Q6IHRydWVcbiAgICB9O1xufSk7XG5cbi8qISpcbiAqIFNrZWxldG9uIC8gUGxheWVyIHNrdWxsLCB1c2luZyB0aGUgTWluZWNyYWZ0IHNraW4gdGV4dHVyZSBsYXlvdXQuXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9TS1VMTF9TS0lOID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XG4gICAgLy8gUmVtb3ZlZCBjdWxsZWQgZmFjZXNcbiAgICBjb25zdCBwb3NpdGlvbiA9IHBvc2l0aW9uc0J1ZihnbCwgW1xuICAgICAgICBwb3NpdGlvbnMoOCAvIDE2LCBbXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIC8vIExvd2VyLCBUb3BcbiAgICAgICAgICAgIFswLCAxLCAxXSwgWzAsIDEsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgLy8gTG93ZXIsIExlZnRcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gTG93ZXIsIFJpZ2h0XG4gICAgICAgIF0pLFxuICAgICAgICBwb3NpdGlvbnMoOC41IC8gMTYsIFtcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gVXBwZXIsIFRvcFxuICAgICAgICAgICAgWzEsIDAsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLCAvLyBVcHBlciwgQm90dG9tXG4gICAgICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIFVwcGVyLCBMZWZ0XG4gICAgICAgICAgICBbMSwgMSwgMF0sIFsxLCAxLCAxXSwgWzEsIDAsIDFdLCBbMSwgMCwgMF0sIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XG4gICAgICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFVwcGVyLCBSaWdodFxuICAgICAgICAgICAgWzAsIDEsIDBdLCBbMSwgMSwgMF0sIFsxLCAwLCAwXSwgWzAsIDAsIDBdLCAvLyBVcHBlciwgQmFjayBMZWZ0XG4gICAgICAgIF0pXG4gICAgXSk7XG5cbiAgICBjb25zdCBpbmRpY2VzID0gaW5kaWNlc0J1ZihnbCwgOSk7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUJ1ZihnbCwgOCwgW1xuICAgICAgICBbMSwgMF0sIC8vIExvd2VyLCBUb3BcbiAgICAgICAgWzAsIDFdLCAvLyBMb3dlciwgTGVmdFxuICAgICAgICBbMSwgMV0sIC8vIExvd2VyLCBSaWdodFxuICAgICAgICBbNSwgMF0sIC8vIFVwcGVyLCBUb3BcbiAgICAgICAgWzYsIDBdLCAvLyBVcHBlciwgQm90dG9tXG4gICAgICAgIFs0LCAxXSwgLy8gVXBwZXIsIExlZnRcbiAgICAgICAgWzYsIDFdLCAvLyBVcHBlciwgQmFjayBSaWdodFxuICAgICAgICBbNSwgMV0sIC8vIFVwcGVyLCBSaWdodFxuICAgICAgICBbNywgMV0sIC8vIFVwcGVyLCBCYWNrIExlZnRcbiAgICBdKTtcblxuICAgIGNvbnN0IGxpZ2h0aW5nID0gbGlnaHRpbmdCdWYoZ2wsIFtcbiAgICAgICAgMjU1LCAvLyBMb3dlciwgVG9wXG4gICAgICAgIDE2MiwgLy8gTG93ZXIsIExlZnRcbiAgICAgICAgMTExLCAvLyBMb3dlciwgUmlnaHRcbiAgICAgICAgMjU1LCAvLyBVcHBlciwgVG9wXG4gICAgICAgIDEwMiwgLy8gVXBwZXIsIEJvdHRvbVxuICAgICAgICAxNjIsIC8vIFVwcGVyLCBMZWZ0XG4gICAgICAgIDE5MCwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcbiAgICAgICAgMTExLCAvLyBVcHBlciwgUmlnaHRcbiAgICAgICAgMTg0LCAvLyBVcHBlciwgQmFjayBMZWZ0XG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgaW5kaWNlcyxcbiAgICAgICAgdGV4dHVyZSxcbiAgICAgICAgbGlnaHRpbmcsXG4gICAgICAgIHZlcnRleENvdW50OiA2ICogOSxcbiAgICAgICAgc2NhbGVQYWRkZWQ6IDEuMTIsXG4gICAgICAgIHNjYWxlVW5wYWRkZWQ6IDAuODM2LFxuICAgICAgICBpczNEOiB0cnVlXG4gICAgfTtcbn0pO1xuXG4vKiEqXG4gKiBTa2VsZXRvbiAvIFBsYXllciBza3VsbCwgdXNpbmcgYSBjb21wYWN0IHRleHR1cmUgbGF5b3V0LlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfU0tVTExfQ09NUEFDVCA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xuICAgIC8vIFJlbW92ZWQgY3VsbGVkIGZhY2VzXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIFtcbiAgICAgICAgcG9zaXRpb25zKDggLyAxNiwgW1xuICAgICAgICAgICAgWzEsIDEsIDBdLCBbMCwgMSwgMF0sIFswLCAxLCAxXSwgWzEsIDEsIDFdLCAvLyBMb3dlciwgVG9wXG4gICAgICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIExvd2VyLCBMZWZ0XG4gICAgICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIExvd2VyLCBSaWdodFxuICAgICAgICBdKSxcbiAgICAgICAgcG9zaXRpb25zKDguNSAvIDE2LCBbXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIC8vIFVwcGVyLCBUb3BcbiAgICAgICAgICAgIFsxLCAwLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gVXBwZXIsIEJvdHRvbVxuICAgICAgICAgICAgWzAsIDEsIDFdLCBbMCwgMSwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCAvLyBVcHBlciwgTGVmdFxuICAgICAgICAgICAgWzEsIDEsIDBdLCBbMSwgMSwgMV0sIFsxLCAwLCAxXSwgWzEsIDAsIDBdLCAvLyBVcHBlciwgQmFjayBSaWdodFxuICAgICAgICAgICAgWzEsIDEsIDFdLCBbMCwgMSwgMV0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLCAvLyBVcHBlciwgUmlnaHRcbiAgICAgICAgICAgIFswLCAxLCAwXSwgWzEsIDEsIDBdLCBbMSwgMCwgMF0sIFswLCAwLCAwXSwgLy8gVXBwZXIsIEJhY2sgTGVmdFxuICAgICAgICBdKVxuICAgIF0pO1xuXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDkpO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDMsIFtcbiAgICAgICAgWzAsIDBdLCAvLyBMb3dlciwgVG9wXG4gICAgICAgIFswLCAxXSwgLy8gTG93ZXIsIExlZnRcbiAgICAgICAgWzEsIDBdLCAvLyBMb3dlciwgUmlnaHRcbiAgICAgICAgWzIsIDBdLCAvLyBVcHBlciwgVG9wXG4gICAgICAgIFswLCAyXSwgLy8gVXBwZXIsIEJvdHRvbVxuICAgICAgICBbMSwgMV0sIC8vIFVwcGVyLCBMZWZ0XG4gICAgICAgIFsxLCAyXSwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcbiAgICAgICAgWzIsIDFdLCAvLyBVcHBlciwgUmlnaHRcbiAgICAgICAgWzIsIDJdLCAvLyBVcHBlciwgQmFjayBMZWZ0XG4gICAgXSk7XG5cbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXG4gICAgICAgIDI1NSwgLy8gTG93ZXIsIFRvcFxuICAgICAgICAxNjIsIC8vIExvd2VyLCBMZWZ0XG4gICAgICAgIDExMSwgLy8gTG93ZXIsIFJpZ2h0XG4gICAgICAgIDI1NSwgLy8gVXBwZXIsIFRvcFxuICAgICAgICAxMDIsIC8vIFVwcGVyLCBCb3R0b21cbiAgICAgICAgMTYyLCAvLyBVcHBlciwgTGVmdFxuICAgICAgICAxOTAsIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XG4gICAgICAgIDExMSwgLy8gVXBwZXIsIFJpZ2h0XG4gICAgICAgIDE4NCwgLy8gVXBwZXIsIEJhY2sgTGVmdFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9zaXRpb24sXG4gICAgICAgIGluZGljZXMsXG4gICAgICAgIHRleHR1cmUsXG4gICAgICAgIGxpZ2h0aW5nLFxuICAgICAgICB2ZXJ0ZXhDb3VudDogNiAqIDksXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjEyLFxuICAgICAgICBzY2FsZVVucGFkZGVkOiAwLjgzNixcbiAgICAgICAgaXMzRDogdHJ1ZVxuICAgIH07XG59KTtcblxuLy8gSGVscGVyIGZ1bmN0aW9uc1xuXG4vKiEqXG4gKiBAcGFyYW0ge251bWJlcn0gc2NhbGVcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gcG9zaXRpb25zIC0gRm9yIGVhY2ggcmVjdGFuZ2xlIDQgYXJyYXlzIHdpdGggMyBlbnRyaWVzIG9mIDAgb3IgMSAtIGp1c3QgbG9vayBhdCB0aGUgdXNhZ2VzIGlkayB3aGF0IHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyW119XG4gKi9cbmZ1bmN0aW9uIHBvc2l0aW9ucyhzY2FsZSwgcG9zaXRpb25zKSB7XG4gICAgcmV0dXJuIHBvc2l0aW9uc1xuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC5tYXAodiA9PiAoKHYgKiAyKSAtIDEpICogc2NhbGUpO1xufVxuXG4vKiEqXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAqIEBwYXJhbSB7R0xlbnVtfSB0YXJnZXRcbiAqIEBwYXJhbSB7QWxsb3dTaGFyZWRCdWZmZXJTb3VyY2V9IGRhdGFcbiAqIEByZXR1cm5zIHtXZWJHTEJ1ZmZlcn1cbiAqL1xuZnVuY3Rpb24gYnVmKGdsLCB0YXJnZXQsIGRhdGEpIHtcbiAgICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKHRhcmdldCwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIHJldHVybiBidWZmZXI7XG59XG5cbi8qISpcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YSAtIHNlZSBwb3NpdGlvbnNcbiAqIEByZXR1cm5zIHtXZWJHTEJ1ZmZlcn1cbiAqL1xuZnVuY3Rpb24gcG9zaXRpb25zQnVmKGdsLCBkYXRhKSB7XG4gICAgcmV0dXJuIGJ1ZihnbCwgZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGRhdGEuZmxhdCgpKSk7XG59XG5cbi8qISpcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICogQHBhcmFtIHtudW1iZXJ9IHJlY3RhbmdsZUNvdW50XG4gKiBAcmV0dXJucyB7V2ViR0xCdWZmZXJ9XG4gKi9cbmZ1bmN0aW9uIGluZGljZXNCdWYoZ2wsIHJlY3RhbmdsZUNvdW50KSB7XG4gICAgbGV0IHZlcnRleERhdGEgPSBbLi4uQXJyYXkocmVjdGFuZ2xlQ291bnQpLmtleXMoKV1cbiAgICAgICAgLm1hcChpID0+IChbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyLCBpICogNCwgaSAqIDQgKyAyLCBpICogNCArIDNdKSlcbiAgICAgICAgLmZsYXQoKTtcblxuICAgIHJldHVybiBidWYoZ2wsIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodmVydGV4RGF0YSkpO1xufVxuXG4vKiEqXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAqIEBwYXJhbSB7bnVtYmVyfSB1bml0cyAtIEhvdyBtYW55IHVuaXRzIHRoZSB0ZXh0dXJlIGlzIHNwbGl0IGludG8sIHBlciBheGlzXG4gKiBAcGFyYW0ge251bWJlcltdW119IGRhdGEgLSBGb3IgZWFjaCByZWN0IFt1LCB2XSBpbiB1bml0c1xuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxuICovXG5mdW5jdGlvbiB0ZXh0dXJlQnVmKGdsLCB1bml0cywgZGF0YSkge1xuICAgIGxldCB2ZXJ0ZXhEYXRhID0gZGF0YS5tYXAoZCA9PiAoW1xuICAgICAgICAvLyBUZXh0dXJlcyBnbyBDQ1dcbiAgICAgICAgZFswXSArIDEuMCwgZFsxXSArIDAuMCxcbiAgICAgICAgZFswXSArIDAuMCwgZFsxXSArIDAuMCxcbiAgICAgICAgZFswXSArIDAuMCwgZFsxXSArIDEuMCxcbiAgICAgICAgZFswXSArIDEuMCwgZFsxXSArIDEuMFxuICAgIF0pKVxuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC5tYXAodiA9PiB2IC8gdW5pdHMpO1xuXG4gICAgcmV0dXJuIGJ1ZihnbCwgZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRleERhdGEpKTtcbn1cblxuLyohKlxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gKiBAcGFyYW0ge251bWJlcltdfSBkYXRhIC0gUHJlYmFrZWQgbGlnaHRpbmcsIG9uZSB2YWx1ZSAwIC0gMjU1IGZvciBlYWNoIHJlY3RcbiAqIEByZXR1cm5zIHtXZWJHTEJ1ZmZlcn1cbiAqL1xuZnVuY3Rpb24gbGlnaHRpbmdCdWYoZ2wsIGRhdGEpIHtcbiAgICBsZXQgdmVydGV4RGF0YSA9IGRhdGFcbiAgICAgICAgLm1hcCh2ID0+IHYgLyAyNTUpIC8vIE11bHRpcGxpZXIsIDAgLSAxXG4gICAgICAgIC5tYXAodiA9PiBbdiwgdiwgdl0pIC8vIEZvciBlYWNoIGNvbG9yIGNoYW5uZWxcbiAgICAgICAgLm1hcCh2ID0+IFt2LCB2LCB2LCB2XSkgLy8gRm9yIGVhY2ggdmVydGV4IHBlciByZWN0XG4gICAgICAgIC5mbGF0KDIpO1xuXG4gICAgcmV0dXJuIGJ1ZihnbCwgZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRleERhdGEpKTtcbn1cbiIsCiAgICAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHsgbWF0MywgbWF0NCB9ID0gd2luZG93LmdsTWF0cml4IHx8IHt9O1xuXG4vKiEqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL21vZGVscy5qcycpLk1vZGVsfSBNb2RlbFxuICovXG5cbi8qISpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb2dyYW1JbmZvXG4gKiBAcHJvcGVydHkge1dlYkdMUHJvZ3JhbX0gcHJvZ3JhbVxuICogQHByb3BlcnR5IHtQcm9ncmFtTG9jYXRpb25zfSBsb2NhdGlvbnNcbiAqL1xuXG4vKiEqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtTG9jYXRpb25zXG4gKiBAcHJvcGVydHkge0dMaW50fSBhVmVydGV4UG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVQcm9qZWN0aW9uTWF0cml4XG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TW9kZWxWaWV3TWF0cml4XG4gKiBAcHJvcGVydHkge0dMaW50fSBhVGV4dHVyZUNvb3JkXG4gKiBAcHJvcGVydHkge0dMaW50fSBhTGlnaHRpbmdcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVMaWdodGluZ0FjdGl2ZVxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVRleHR1cmVNYXRyaXhcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVUZXh0dXJlXG4gKi9cblxuLyohKlxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gKiBAcGFyYW0ge1Byb2dyYW1JbmZvfSBwcm9ncmFtSW5mb1xuICogQHBhcmFtIHtib29sZWFufSBhZGRQYWRkaW5nXG4gKiBAcGFyYW0ge01vZGVsfSBtb2RlbFxuICogQHBhcmFtIHtXZWJHTFRleHR1cmV9IG1vZGVsVGV4dHVyZVxuICogQHBhcmFtIHtXZWJHTFRleHR1cmV9IGdsaW50VGV4dHVyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhdyhnbCwgcHJvZ3JhbUluZm8sIGFkZFBhZGRpbmcsIG1vZGVsLCBtb2RlbFRleHR1cmUsIGdsaW50VGV4dHVyZSkge1xuICAgIC8vIFJlc2V0IGNhbnZhc1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcbiAgICBnbC5jbGVhckRlcHRoKDEuMCk7XG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xuICAgIGdsLmRlcHRoTWFzayh0cnVlKTtcblxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICAvLyBDcmVhdGUgcHJvamVjdGlvbiBhbmQgbW9kZWwgdmlldyBtYXRyaXhcbiAgICBjb25zdCBhc3BlY3QgPSBnbC5jYW52YXMuY2xpZW50V2lkdGggLyBnbC5jYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gICAgY29uc3Qgc2NhbGUgPSBhZGRQYWRkaW5nID8gbW9kZWwuc2NhbGVQYWRkZWQgOiBtb2RlbC5zY2FsZVVucGFkZGVkO1xuICAgIGNvbnN0IHByb2plY3Rpb25NYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuICAgIG1hdDQub3J0aG8ocHJvamVjdGlvbk1hdHJpeCwgLWFzcGVjdCAqIHNjYWxlLCBhc3BlY3QgKiBzY2FsZSwgLXNjYWxlLCBzY2FsZSwgLTEwLCAxMCk7XG5cbiAgICBjb25zdCBtb2RlbFZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuICAgIGlmIChtb2RlbC5pczNEKSB7XG4gICAgICAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCAzMCAqIE1hdGguUEkgLyAxODAsIFsxLCAwLCAwXSk7XG4gICAgICAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCA0NSAqIE1hdGguUEkgLyAxODAsIFswLCAxLCAwXSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBzaGFkZXJzXG4gICAgc2V0QXR0cmlidXRlKGdsLCBwcm9ncmFtSW5mby5sb2NhdGlvbnMuYVZlcnRleFBvc2l0aW9ucywgbW9kZWwucG9zaXRpb24sIDMpO1xuICAgIHNldEF0dHJpYnV0ZShnbCwgcHJvZ3JhbUluZm8ubG9jYXRpb25zLmFUZXh0dXJlQ29vcmQsIG1vZGVsLnRleHR1cmUsIDIpO1xuICAgIHNldEF0dHJpYnV0ZShnbCwgcHJvZ3JhbUluZm8ubG9jYXRpb25zLmFMaWdodGluZywgbW9kZWwubGlnaHRpbmcsIDMpO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbW9kZWwuaW5kaWNlcyk7XG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtSW5mby5wcm9ncmFtKTtcblxuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudUxpZ2h0aW5nQWN0aXZlLCAxKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHByb2dyYW1JbmZvLmxvY2F0aW9ucy51UHJvamVjdGlvbk1hdHJpeCwgZmFsc2UsIHByb2plY3Rpb25NYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVNb2RlbFZpZXdNYXRyaXgsIGZhbHNlLCBtb2RlbFZpZXdNYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVUZXh0dXJlTWF0cml4LCBmYWxzZSwgbWF0My5jcmVhdGUoKSk7XG5cbiAgICAvLyBEcmF3IGN1YmVcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBtb2RlbFRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmUsIDApO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgbW9kZWwudmVydGV4Q291bnQsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcblxuICAgIC8vIERyYXcgZW5jaGFudG1lbnQgZ2xpbnQgKFNlZSBNaW5lY3JhZnQgdjEuOC45IFJlbmRlckl0ZW0jcmVuZGVyRWZmZWN0KElCYWtlZE1vZGVsKSlcbiAgICBpZiAoIWdsaW50VGV4dHVyZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2wuZGVwdGhNYXNrKGZhbHNlKTtcbiAgICBnbC5kZXB0aEZ1bmMoZ2wuRVFVQUwpO1xuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudUxpZ2h0aW5nQWN0aXZlLCAwKTsgLy8gZGlzYWJsZUxpZ2h0aW5nKClcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0NPTE9SLCBnbC5PTkUpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGdsaW50VGV4dHVyZSk7XG4gICAgbGV0IHRleHR1cmVNYXRyaXggPSBtYXQzLmNyZWF0ZSgpOyAvLyBtYXRyaXhNb2RlKEdMX1RFWFRVUkUpXG4gICAgY29uc3QgU0NBTEUgPSAwLjU7IC8vIDE2IC8gOCAoMTYgaW4gTWF0cml4LCA4IGluIHNjYWxlKC4uKSlcbiAgICBtYXQzLnNjYWxlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIFtTQ0FMRSwgU0NBTEUsIFNDQUxFXSk7XG4gICAgbGV0IG9mZnNldEEgPSAoZ2V0U3lzdGVtVGltZSgpICUgMzAwMCkgLyAzMDAwIC8gU0NBTEU7XG4gICAgbWF0My50cmFuc2xhdGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgW29mZnNldEEsIDBdKTtcbiAgICBtYXQzLnJvdGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBkZWcycmFkKC01MCksIFswLCAwLCAxXSk7XG5cbiAgICAvLyByZW5kZXJNb2RlbFxuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVUZXh0dXJlTWF0cml4LCBmYWxzZSwgdGV4dHVyZU1hdHJpeCk7XG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgbW9kZWwudmVydGV4Q291bnQsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcblxuICAgIHRleHR1cmVNYXRyaXggPSBtYXQzLmNyZWF0ZSgpOyAvLyBwb3BNYXRyaXgoKTsgcHVzaE1hdHJpeCgpO1xuICAgIG1hdDMuc2NhbGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgW1NDQUxFLCBTQ0FMRSwgU0NBTEVdKTtcbiAgICBsZXQgb2Zmc2V0QiA9IChnZXRTeXN0ZW1UaW1lKCkgJSA0ODczKSAvIDQ4NzMgLyBTQ0FMRTtcbiAgICBtYXQzLnRyYW5zbGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBbLW9mZnNldEIsIDBdKTtcbiAgICBtYXQzLnJvdGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBkZWcycmFkKDEwKSwgWzAsIDAsIDFdKTtcblxuICAgIC8vIHJlbmRlck1vZGVsXG4gICAgZ2wudW5pZm9ybU1hdHJpeDNmdihwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmVNYXRyaXgsIGZhbHNlLCB0ZXh0dXJlTWF0cml4KTtcbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCBtb2RlbC52ZXJ0ZXhDb3VudCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xufVxuXG4vKiEqXG4gKiBAcGFyYW0ge251bWJlcn0gaVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZGVnMnJhZChpKSB7XG4gICAgcmV0dXJuIGkgKiBNYXRoLlBJIC8gMTgwXG59XG5cbi8qISpcbiAqIFNlZSBNaW5lY3JhZnQuZ2V0U3lzdGVtVGltZSgpXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRTeXN0ZW1UaW1lKCkge1xuICAgIHJldHVybiBEYXRlLm5vdygpO1xufVxuXG4vKiEqXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAqIEBwYXJhbSB7R0x1aW50fSBsb2NhdGlvblxuICogQHBhcmFtIHtXZWJHTEJ1ZmZlcn0gYnVmZmVyXG4gKiBAcGFyYW0ge0dMaW50fSBidWZmZXJFbnRyeVNpemVcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlKGdsLCBsb2NhdGlvbiwgYnVmZmVyLCBidWZmZXJFbnRyeVNpemUpIHtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBidWZmZXJFbnRyeVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCwpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcbn1cbiIsCiAgICAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiEqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb2dyYW1JbmZvXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xQcm9ncmFtfSBwcm9ncmFtXHJcbiAqIEBwcm9wZXJ0eSB7UHJvZ3JhbUxvY2F0aW9uc30gbG9jYXRpb25zXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtTG9jYXRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFWZXJ0ZXhQb3NpdGlvblxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1UHJvamVjdGlvbk1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TW9kZWxWaWV3TWF0cml4XHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFUZXh0dXJlQ29vcmRcclxuICogQHByb3BlcnR5IHtHTGludH0gYUxpZ2h0aW5nXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVMaWdodGluZ0FjdGl2ZVxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZU1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZVxyXG4gKi9cclxuXHJcbmNvbnN0IFZFUlRFWF9TSEFERVIgPSBbXHJcbiAgICBcImF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbjtcIixcclxuICAgIFwidW5pZm9ybSBtYXQ0IHVNb2RlbFZpZXdNYXRyaXg7XCIsXHJcbiAgICBcInVuaWZvcm0gbWF0NCB1UHJvamVjdGlvbk1hdHJpeDtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcImF0dHJpYnV0ZSAgICAgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFxyXG4gICAgXCJ2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcIixcclxuICAgIFwiYXR0cmlidXRlICAgICB2ZWMzIGFMaWdodGluZztcIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMzIHZMaWdodGluZztcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInZvaWQgbWFpbih2b2lkKSB7XCIsXHJcbiAgICBcIiAgICBnbF9Qb3NpdGlvbiA9IHVQcm9qZWN0aW9uTWF0cml4ICogdU1vZGVsVmlld01hdHJpeCAqIGFWZXJ0ZXhQb3NpdGlvbjtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcIiAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcclxuICAgIFwiICAgIHZMaWdodGluZyA9IGFMaWdodGluZztcIixcclxuICAgIFwifVwiLFxyXG5dLmpvaW4oXCJcIik7XHJcblxyXG5jb25zdCBGUkFHTUVOVF9TSEFERVIgPSBbXHJcbiAgICBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1wiLFxyXG4gICAgXCJ1bmlmb3JtIG1hdDMgdVRleHR1cmVNYXRyaXg7IC8qIE9mZnNldCBhcHBsaWVkIHRvIHRleHR1cmUgKi9cIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCJ2YXJ5aW5nIGhpZ2hwIHZlYzMgdkxpZ2h0aW5nOyAvKiBQcmViYWtlZCBsaWdodGluZyAqL1wiLFxyXG4gICAgXCJ1bmlmb3JtIGJvb2wgdUxpZ2h0aW5nQWN0aXZlO1wiLFxyXG4gICAgXCJcIixcclxuICAgIFwidm9pZCBtYWluKCkge1wiLFxyXG4gICAgXCIgICAgaGlnaHAgdmVjNCB0ZXhlbENvbG9yID0gdGV4dHVyZTJEKHVUZXh0dXJlLCAodVRleHR1cmVNYXRyaXggKiB2ZWMzKHZUZXh0dXJlQ29vcmQsIDEuMCkpLnh5KTtcIixcclxuICAgIFwiICAgIGdsX0ZyYWdDb2xvciA9IHRleGVsQ29sb3I7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCIgICAgaWYgKHRleGVsQ29sb3IuYSA9PSAwLjApIHtcIixcclxuICAgIFwiICAgICAgICBkaXNjYXJkO1wiLFxyXG4gICAgXCIgICAgfVwiLFxyXG4gICAgXCJcIixcclxuICAgIFwiICAgIGlmICh1TGlnaHRpbmdBY3RpdmUpIHtcIixcclxuICAgIFwiICAgICAgICBnbF9GcmFnQ29sb3IgKj0gdmVjNCh2TGlnaHRpbmcsIDEpO1wiLFxyXG4gICAgXCIgICAgfVwiLFxyXG4gICAgXCJ9XCIsXHJcbl0uam9pbihcIlwiKTtcclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEByZXR1cm5zIHtQcm9ncmFtSW5mb31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFNoYWRlcihnbCkge1xyXG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gbG9hZFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgVkVSVEVYX1NIQURFUik7XHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGxvYWRTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgRlJBR01FTlRfU0hBREVSKTtcclxuXHJcbiAgICBjb25zdCBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHNoYWRlclByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgIGFsZXJ0KGBVbmFibGUgdG8gaW5pdGlhbGl6ZSB0aGUgc2hhZGVyIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2coc2hhZGVyUHJvZ3JhbSl9YCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxyXG4gICAgICAgIGxvY2F0aW9uczoge1xyXG4gICAgICAgICAgICBhVmVydGV4UG9zaXRpb246IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpLFxyXG4gICAgICAgICAgICB1UHJvamVjdGlvbk1hdHJpeDogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidVByb2plY3Rpb25NYXRyaXhcIiksXHJcbiAgICAgICAgICAgIHVNb2RlbFZpZXdNYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVNb2RlbFZpZXdNYXRyaXhcIiksXHJcblxyXG4gICAgICAgICAgICBhVGV4dHVyZUNvb3JkOiBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIiksXHJcbiAgICAgICAgICAgIGFMaWdodGluZzogZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgXCJhTGlnaHRpbmdcIiksXHJcbiAgICAgICAgICAgIHVMaWdodGluZ0FjdGl2ZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidUxpZ2h0aW5nQWN0aXZlXCIpLFxyXG5cclxuICAgICAgICAgICAgdVRleHR1cmVNYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVUZXh0dXJlTWF0cml4XCIpLFxyXG4gICAgICAgICAgICB1VGV4dHVyZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidVRleHR1cmVcIiksXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtHTGVudW19IHR5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxyXG4gKiBAcmV0dXJucyB7P1dlYkdMU2hhZGVyfVxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XHJcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XHJcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgYWxlcnQoYEFuIGVycm9yIG9jY3VycmVkIGNvbXBpbGluZyB0aGUgc2hhZGVyczogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCk7XHJcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNoYWRlcjtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxXZWJHTFRleHR1cmU+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlRnJvbVVSTChnbCwgdXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGxvYWRUZXh0dXJlKGdsLCBpbWFnZSwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IGNhdXNlID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgQ291bGQgbm90IGxvYWQgdGV4dHVyZSBcIiR7dXJsfVwiLmAsIHtcclxuICAgICAgICAgICAgICAgIGNhdXNlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLnNyYyA9IHVybDtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge1RleEltYWdlU291cmNlfSBkYXRhXHJcbiAqIEByZXR1cm5zIHtXZWJHTFRleHR1cmV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRleHR1cmUoZ2wsIGRhdGEsIHcsIGgpIHtcclxuICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcblxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xyXG5cclxuICAgIGlmIChpc1Bvd2VyT2YyKHcpICYmIGlzUG93ZXJPZjIoaCkpIHtcclxuICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG4gICAgcmV0dXJuIHRleHR1cmU7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNQb3dlck9mMih2YWx1ZSkge1xyXG4gICAgcmV0dXJuICh2YWx1ZSAmICh2YWx1ZSAtIDEpKSA9PT0gMDtcclxufVxyXG4iLAogICAgIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgeyBNT0RFTF9DVUJFLCBNT0RFTF9JVEVNLCBNT0RFTF9TS1VMTF9DT01QQUNULCBNT0RFTF9TS1VMTF9TS0lOIH0gZnJvbSBcIi4vbW9kZWxzLmpzXCI7XG5cbmltcG9ydCB7IEdMSU5UX1RFWFRVUkUsIE1vZGVsVHlwZSB9IGZyb20gXCIuL21vZGVscy5qc1wiO1xuaW1wb3J0IHsgZHJhdyB9IGZyb20gXCIuL2RyYXcuanNcIjtcbmltcG9ydCB7IHNldHVwU2hhZGVyLCBsb2FkVGV4dHVyZSwgbG9hZFRleHR1cmVGcm9tVVJMIH0gZnJvbSBcIi4vc2V0dXAuanNcIjtcblxuLyohKlxuICogQHR5cGVkZWYge09iamVjdH0gUmVuZGVyT3B0aW9uc1xuICogQHByb3BlcnR5IHtNb2RlbFR5cGV9IG1vZGVsVHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRleHR1cmVVUkxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2VuY2hhbnRlZD1mYWxzZV1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2luSW52ZW50b3J5PWZhbHNlXSAtIEFwcGxpZXMgcGFkZGluZyB0byBtYXRjaCByZW5kZXJpbmcgb2YgTWluZWNyYWZ0IGl0ZW1zIGluIGludmVudG9yeS5cbiAqIEBwcm9wZXJ0eSB7V2ViR0xDb250ZXh0QXR0cmlidXRlc30gW2dsQ29udGV4dD17YW50aWFsaWFzOiBmYWxzZX1dXG4gKi9cblxuLyohKlxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXG4gKiBAcGFyYW0ge1JlbmRlck9wdGlvbnN9IHJlbmRlck9wdGlvbnNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJlbmRlcmVyKGNhbnZhcywgcmVuZGVyT3B0aW9ucykge1xuICAgIGlmICghd2luZG93LmdsTWF0cml4Py5tYXQ0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIG1hdHJpeCBsaWJyYXJ5LiBQbGVhc2UgZW5zdXJlIHlvdSBpbmNsdWRlIGdsTWF0cml4IHYzLlwiKTtcbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlIGFudGlhbGlhcyBieSBkZWZhdWx0XG4gICAgbGV0IGNvbnRleHRBdHRyaWJ1dGVzID0gcmVuZGVyT3B0aW9ucy5nbENvbnRleHQgfHwge307XG4gICAgaWYgKGNvbnRleHRBdHRyaWJ1dGVzLmFudGlhbGlhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRleHRBdHRyaWJ1dGVzLmFudGlhbGlhcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiLCBjb250ZXh0QXR0cmlidXRlcyk7XG4gICAgaWYgKGdsID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBpbml0aWFsaXplIFdlYkdMLiBZb3VyIGJyb3dzZXIgbWF5IG5vdCBzdXBwb3J0IGl0LlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9ncmFtSW5mbyA9IHNldHVwU2hhZGVyKGdsKTtcblxuICAgIGNvbnN0IHRleHR1cmUgPSBhd2FpdCBsb2FkVGV4dHVyZUZyb21VUkwoZ2wsIHJlbmRlck9wdGlvbnMudGV4dHVyZVVSTCk7XG4gICAgY29uc3QgZ2xpbnRUZXh0dXJlID0gcmVuZGVyT3B0aW9ucy5lbmNoYW50ZWQgPyBsb2FkVGV4dHVyZShnbCwgR0xJTlRfVEVYVFVSRSwgNjQsIDY0KSA6IG51bGw7XG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XG5cbiAgICBjb25zdCBtb2RlbCA9IHJlbmRlck9wdGlvbnMubW9kZWxUeXBlLmNyZWF0ZShnbCk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIGRyYXcoZ2wsIHByb2dyYW1JbmZvLCByZW5kZXJPcHRpb25zLmluSW52ZW50b3J5LCBtb2RlbCwgdGV4dHVyZSwgZ2xpbnRUZXh0dXJlKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xufVxuIgogIF0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNPLE1BQU0sVUFBVTtBQUFBLEVBQ25CLFdBQVcsQ0FBQyxXQUFXO0FBQUEsSUFDbkIsS0FBSyxZQUFZO0FBQUE7QUFBQSxFQU9yQixNQUFNLENBQUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFDUCxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQUE7QUFFaEM7QUFJQSxJQUFNLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFDMUY7QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUMxRjtBQUFBLEVBQU07QUFBQSxFQUFN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QUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0wsQ0FBQztBQUFBLEVBRUQsTUFBTSxVQUFVLFdBQVcsSUFBSSxDQUFDO0FBQUEsRUFFaEMsTUFBTSxVQUFVLFdBQVcsSUFBSSxHQUFHO0FBQUEsSUFDOUIsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1QsQ0FBQztBQUFBLEVBRUQsTUFBTSxXQUFXLFlBQVksSUFBSTtBQUFBLElBQzdCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFB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QWMsV0FBVztBQUFBLElBQzNDLGtCQUFrQixZQUFZO0FBQUEsRUFDbEM7QUFBQSxFQUVBLE1BQU0sS0FBSyxPQUFPLFdBQVcsU0FBUyxpQkFBaUI7QUFBQSxFQUN2RCxJQUFJLE9BQU8sTUFBTTtBQUFBLElBQ2IsTUFBTSxJQUFJLE1BQU0sOERBQThEO0FBQUEsRUFDbEY7QUFBQSxFQUVBLE1BQU0sY0FBYyxZQUFZLEVBQUU7QUFBQSxFQUVsQyxNQUFNLFVBQVUsTUFBTSxtQkFBbUIsSUFBSSxjQUFjLFVBQVU7QUFBQSxFQUNyRSxNQUFNLGVBQWUsY0FBYyxZQUFZLFlBQVksSUFBSSxlQUFlLElBQUksRUFBRSxJQUFJO0FBQUEsRUFDeEYsR0FBRyxZQUFZLEdBQUcscUJBQXFCLElBQUk7QUFBQSxFQUUzQyxNQUFNLFFBQVEsY0FBYyxVQUFVLE9BQU8sRUFBRTtBQUFBLEVBRS9DLFNBQVMsTUFBTSxHQUFHO0FBQUEsSUFDZCxLQUFLLElBQUksYUFBYSxjQUFjLGFBQWEsT0FBTyxTQUFTLFlBQVk7QUFBQSxJQUM3RSxzQkFBc0IsTUFBTTtBQUFBO0FBQUEsRUFFaEMsc0JBQXNCLE1BQU07QUFBQTsiLAogICJkZWJ1Z0lkIjogIkEyMjI5ODBGQkI2MUE3QkM2NDc1NkUyMTY0NzU2RTIxIiwKICAibmFtZXMiOiBbXQp9
