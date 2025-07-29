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
/**
 * One of MODEL_CUBE, MODEL_ITEM, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN.
 * @public
 * @hideconstructor
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
 * @type {ModelType}
 * @public
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
 * @type {ModelType}
 * @public
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
 * @type {ModelType}
 * @public
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
 * @type {ModelType}
 * @public
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

class Renderer {
  constructor(cancelFunc) {
    this.cancelFunc = cancelFunc;
  }
  destroy() {
    /**
         * Destroys the renderer.
         * @public
         */
    this.cancelFunc();
  }
}
export {
  createRenderer,
  Renderer,
  ModelType,
  MODEL_SKULL_SKIN,
  MODEL_SKULL_COMPACT,
  MODEL_ITEM,
  MODEL_CUBE
};

//# debugId=66E5A294540085B364756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliXFxtb2RlbHMuanMiLCAibGliXFxkcmF3LmpzIiwgImxpYlxcc2V0dXAuanMiLCAibGliXFxpbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gTW9kZWxcclxuICogQHByb3BlcnR5IHtXZWJHTEJ1ZmZlcn0gcG9zaXRpb25cclxuICogQHByb3BlcnR5IHtXZWJHTEJ1ZmZlcn0gaW5kaWNlc1xyXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSB0ZXh0dXJlXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xCdWZmZXJ9IGxpZ2h0aW5nIC0gUHJlYmFrZWQgbGlnaHRpbmdcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHZlcnRleENvdW50XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzY2FsZVBhZGRlZCAtIE9ydGhvIG1hdHJpeCBzY2FsaW5nIHdoZW4gYWRkUGFkZGluZz10cnVlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzY2FsZVVucGFkZGVkIC0gT3J0aG8gbWF0cml4IHNjYWxpbmcgd2hlbiBhZGRQYWRkaW5nPWZhbHNlXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXMzRCAtIFdoZXRoZXIgdG8gYXBwbHkgMzDCsCByb3RhdGlvbiBmb3IgaXNvbWV0cmljIHZpZXdcclxuICovXHJcblxyXG4vKiEqXHJcbiAqIE9uZSBvZiBNT0RFTF9DVUJFLCBNT0RFTF9JVEVNLCBNT0RFTF9TS1VMTF9DT01QQUNULCBNT0RFTF9TS1VMTF9TS0lOLlxyXG4gKiBAcHVibGljXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RlbFR5cGUge1xyXG4gICAgY29uc3RydWN0b3IoZ2VuZXJhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyohKlxyXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAgICAgKiBAcmV0dXJucyB7TW9kZWx9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZShnbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRvcihnbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4dHJhY3RlZCBmcm9tIGh0dHBzOi8vbWNhc3NldC5jbG91ZC8xLjguOS9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL21pc2MvZW5jaGFudGVkX2l0ZW1fZ2xpbnQucG5nXHJcbi8vIEZpcnN0IHJvdywgb25seSBSIGNvbXBvbmVudFxyXG5jb25zdCBHTElOVF9URVhUVVJFX1JBVyA9IFtcclxuICAgIDB4NjgsIDB4MzEsIDB4NUIsIDB4MzgsIDB4NEYsIDB4NjIsIDB4NkQsIDB4NTksIDB4NTYsIDB4NzEsIDB4NkIsIDB4ODQsIDB4ODIsIDB4QTAsIDB4NkMsIDB4NkEsXHJcbiAgICAweDc0LCAweDZELCAweEEzLCAweERELCAweEI4LCAweEEwLCAweDk1LCAweDgzLCAweDg2LCAweDg2LCAweDNGLCAweDE4LCAweDQxLCAweDRFLCAweDVFLCAweDdELFxyXG4gICAgMHg3OSwgMHg3OSwgMHg4MywgMHg1RCwgMHg3RSwgMHg4RiwgMHg5MCwgMHhBNiwgMHg5QiwgMHhCRCwgMHhDQywgMHhGRiwgMHhFNSwgMHhEQSwgMHhEMSwgMHhDNSxcclxuICAgIDB4OUEsIDB4NjksIDB4NjgsIDB4OUMsIDB4OEIsIDB4ODksIDB4NTcsIDB4NTAsIDB4NkYsIDB4NTcsIDB4NUYsIDB4NjcsIDB4NkMsIDB4OTQsIDB4OTgsIDB4NEJcclxuXTtcclxuXHJcbi8vIFVuY29tcHJlc3NlZCB0ZXh0dXJlXHJcbmV4cG9ydCBjb25zdCBHTElOVF9URVhUVVJFID0gbmV3IEltYWdlRGF0YShuZXcgVWludDhDbGFtcGVkQXJyYXkobmV3IEFycmF5KDY0KS5maWxsKEdMSU5UX1RFWFRVUkVfUkFXLm1hcChjID0+IFtcclxuICAgIC8vIE1pbmVjcmFmdCB1c2VzIGEgY29sb3IgbXVsdGlwbGllciBvZiAweDgwNDBDQyB3aGVuIHJlbmRlcmluZyB0aGUgZW5jaGFudG1lbnQgdGV4dHVyZS5cclxuICAgIC8vIFdlIGJha2UgaXQgZGlyZWN0bHkgaW50byB0aGUgdGV4dHVyZSBmb3Igc2ltcGxpY2l0eS5cclxuICAgIGMgKiAweDgwIC8gMHhGRixcclxuICAgIGMgKiAweDQwIC8gMHhGRixcclxuICAgIGMgKiAweENDIC8gMHhGRixcclxuICAgIDB4RkYsXHJcbl0pKS5mbGF0KDIpKSwgNjQsIDY0KTtcclxuXHJcbi8qISpcclxuICogU2ltcGxlIDJEIHBsYW5lIC8gTWluZWNyYWZ0IGl0ZW0uXHJcbiAqIEB0eXBlIHtNb2RlbFR5cGV9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBjb25zdCBNT0RFTF9JVEVNID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHBvc2l0aW9uc0J1ZihnbCwgcG9zaXRpb25zKDEsIFtcclxuICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sXHJcbiAgICBdKSk7XHJcblxyXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDEpO1xyXG5cclxuICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlQnVmKGdsLCAxLCBbXHJcbiAgICAgICAgWzAsIDBdXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXHJcbiAgICAgICAgMjU1XHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBvc2l0aW9uLFxyXG4gICAgICAgIGluZGljZXMsXHJcbiAgICAgICAgdGV4dHVyZSxcclxuICAgICAgICBsaWdodGluZyxcclxuICAgICAgICB2ZXJ0ZXhDb3VudDogNiAqIDEsXHJcbiAgICAgICAgc2NhbGVQYWRkZWQ6IDEuMCxcclxuICAgICAgICBzY2FsZVVucGFkZGVkOiAxLjAsXHJcbiAgICAgICAgaXMzRDogZmFsc2VcclxuICAgIH07XHJcbn0pO1xyXG5cclxuLyohKlxyXG4gKiBTaW1wbGUgY3ViZSAvIE1pbmVjcmFmdCBibG9jay5cclxuICogQHR5cGUge01vZGVsVHlwZX1cclxuICogQHB1YmxpY1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE1PREVMX0NVQkUgPSBuZXcgTW9kZWxUeXBlKGdsID0+IHtcclxuICAgIC8vIFJlbW92ZWQgY3VsbGVkIGZhY2VzXHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHBvc2l0aW9uc0J1ZihnbCwgcG9zaXRpb25zKDEsIFtcclxuICAgICAgICBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgWzEsIDEsIDBdLCBbMCwgMSwgMF0sIC8vIFRvcFxyXG4gICAgICAgIFswLCAxLCAxXSwgWzAsIDEsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgLy8gTGVmdFxyXG4gICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gUmlnaHRcclxuICAgIF0pKTtcclxuXHJcbiAgICBjb25zdCBpbmRpY2VzID0gaW5kaWNlc0J1ZihnbCwgMyk7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDIsIFtcclxuICAgICAgICBbMCwgMF0sIC8vIFRvcFxyXG4gICAgICAgIFswLCAxXSwgLy8gTGVmdFxyXG4gICAgICAgIFsxLCAwXSwgLy8gUmlnaHRcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IGxpZ2h0aW5nID0gbGlnaHRpbmdCdWYoZ2wsIFtcclxuICAgICAgICAyNTUsIC8vIFRvcFxyXG4gICAgICAgIDE0OCwgLy8gTGVmdFxyXG4gICAgICAgIDE0MiwgLy8gUmlnaHRcclxuICAgIF0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcG9zaXRpb24sXHJcbiAgICAgICAgaW5kaWNlcyxcclxuICAgICAgICB0ZXh0dXJlLFxyXG4gICAgICAgIGxpZ2h0aW5nLFxyXG4gICAgICAgIHZlcnRleENvdW50OiA2ICogMyxcclxuICAgICAgICBzY2FsZVBhZGRlZDogMS42LFxyXG4gICAgICAgIHNjYWxlVW5wYWRkZWQ6IDEuNTczMixcclxuICAgICAgICBpczNEOiB0cnVlXHJcbiAgICB9O1xyXG59KTtcclxuXHJcbi8qISpcclxuICogU2tlbGV0b24gLyBQbGF5ZXIgc2t1bGwsIHVzaW5nIHRoZSBNaW5lY3JhZnQgc2tpbiB0ZXh0dXJlIGxheW91dC5cclxuICogQHR5cGUge01vZGVsVHlwZX1cclxuICogQHB1YmxpY1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE1PREVMX1NLVUxMX1NLSU4gPSBuZXcgTW9kZWxUeXBlKGdsID0+IHtcclxuICAgIC8vIFJlbW92ZWQgY3VsbGVkIGZhY2VzXHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHBvc2l0aW9uc0J1ZihnbCwgW1xyXG4gICAgICAgIHBvc2l0aW9ucyg4IC8gMTYsIFtcclxuICAgICAgICAgICAgWzEsIDEsIDBdLCBbMCwgMSwgMF0sIFswLCAxLCAxXSwgWzEsIDEsIDFdLCAvLyBMb3dlciwgVG9wXHJcbiAgICAgICAgICAgIFswLCAxLCAxXSwgWzAsIDEsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgLy8gTG93ZXIsIExlZnRcclxuICAgICAgICAgICAgWzEsIDEsIDFdLCBbMCwgMSwgMV0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLCAvLyBMb3dlciwgUmlnaHRcclxuICAgICAgICBdKSxcclxuICAgICAgICBwb3NpdGlvbnMoOC41IC8gMTYsIFtcclxuICAgICAgICAgICAgWzEsIDEsIDBdLCBbMCwgMSwgMF0sIFswLCAxLCAxXSwgWzEsIDEsIDFdLCAvLyBVcHBlciwgVG9wXHJcbiAgICAgICAgICAgIFsxLCAwLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gVXBwZXIsIEJvdHRvbVxyXG4gICAgICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIFVwcGVyLCBMZWZ0XHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzEsIDEsIDFdLCBbMSwgMCwgMV0sIFsxLCAwLCAwXSwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcclxuICAgICAgICAgICAgWzEsIDEsIDFdLCBbMCwgMSwgMV0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLCAvLyBVcHBlciwgUmlnaHRcclxuICAgICAgICAgICAgWzAsIDEsIDBdLCBbMSwgMSwgMF0sIFsxLCAwLCAwXSwgWzAsIDAsIDBdLCAvLyBVcHBlciwgQmFjayBMZWZ0XHJcbiAgICAgICAgXSlcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IGluZGljZXMgPSBpbmRpY2VzQnVmKGdsLCA5KTtcclxuXHJcbiAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUJ1ZihnbCwgOCwgW1xyXG4gICAgICAgIFsxLCAwXSwgLy8gTG93ZXIsIFRvcFxyXG4gICAgICAgIFswLCAxXSwgLy8gTG93ZXIsIExlZnRcclxuICAgICAgICBbMSwgMV0sIC8vIExvd2VyLCBSaWdodFxyXG4gICAgICAgIFs1LCAwXSwgLy8gVXBwZXIsIFRvcFxyXG4gICAgICAgIFs2LCAwXSwgLy8gVXBwZXIsIEJvdHRvbVxyXG4gICAgICAgIFs0LCAxXSwgLy8gVXBwZXIsIExlZnRcclxuICAgICAgICBbNiwgMV0sIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XHJcbiAgICAgICAgWzUsIDFdLCAvLyBVcHBlciwgUmlnaHRcclxuICAgICAgICBbNywgMV0sIC8vIFVwcGVyLCBCYWNrIExlZnRcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IGxpZ2h0aW5nID0gbGlnaHRpbmdCdWYoZ2wsIFtcclxuICAgICAgICAyNTUsIC8vIExvd2VyLCBUb3BcclxuICAgICAgICAxNjIsIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgMTExLCAvLyBMb3dlciwgUmlnaHRcclxuICAgICAgICAyNTUsIC8vIFVwcGVyLCBUb3BcclxuICAgICAgICAxMDIsIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICAxNjIsIC8vIFVwcGVyLCBMZWZ0XHJcbiAgICAgICAgMTkwLCAvLyBVcHBlciwgQmFjayBSaWdodFxyXG4gICAgICAgIDExMSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgMTg0LCAvLyBVcHBlciwgQmFjayBMZWZ0XHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBvc2l0aW9uLFxyXG4gICAgICAgIGluZGljZXMsXHJcbiAgICAgICAgdGV4dHVyZSxcclxuICAgICAgICBsaWdodGluZyxcclxuICAgICAgICB2ZXJ0ZXhDb3VudDogNiAqIDksXHJcbiAgICAgICAgc2NhbGVQYWRkZWQ6IDEuMTIsXHJcbiAgICAgICAgc2NhbGVVbnBhZGRlZDogMC44MzYsXHJcbiAgICAgICAgaXMzRDogdHJ1ZVxyXG4gICAgfTtcclxufSk7XHJcblxyXG4vKiEqXHJcbiAqIFNrZWxldG9uIC8gUGxheWVyIHNrdWxsLCB1c2luZyBhIGNvbXBhY3QgdGV4dHVyZSBsYXlvdXQuXHJcbiAqIEB0eXBlIHtNb2RlbFR5cGV9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBjb25zdCBNT0RFTF9TS1VMTF9DT01QQUNUID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XHJcbiAgICAvLyBSZW1vdmVkIGN1bGxlZCBmYWNlc1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIFtcclxuICAgICAgICBwb3NpdGlvbnMoOCAvIDE2LCBbXHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gTG93ZXIsIFRvcFxyXG4gICAgICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgcG9zaXRpb25zKDguNSAvIDE2LCBbXHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gVXBwZXIsIFRvcFxyXG4gICAgICAgICAgICBbMSwgMCwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICAgICAgWzAsIDEsIDFdLCBbMCwgMSwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFsxLCAxLCAxXSwgWzEsIDAsIDFdLCBbMSwgMCwgMF0sIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XHJcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgICAgIFswLCAxLCAwXSwgWzEsIDEsIDBdLCBbMSwgMCwgMF0sIFswLCAwLCAwXSwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgICAgIF0pXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBpbmRpY2VzID0gaW5kaWNlc0J1ZihnbCwgOSk7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDMsIFtcclxuICAgICAgICBbMCwgMF0sIC8vIExvd2VyLCBUb3BcclxuICAgICAgICBbMCwgMV0sIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgWzEsIDBdLCAvLyBMb3dlciwgUmlnaHRcclxuICAgICAgICBbMiwgMF0sIC8vIFVwcGVyLCBUb3BcclxuICAgICAgICBbMCwgMl0sIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICBbMSwgMV0sIC8vIFVwcGVyLCBMZWZ0XHJcbiAgICAgICAgWzEsIDJdLCAvLyBVcHBlciwgQmFjayBSaWdodFxyXG4gICAgICAgIFsyLCAxXSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgWzIsIDJdLCAvLyBVcHBlciwgQmFjayBMZWZ0XHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXHJcbiAgICAgICAgMjU1LCAvLyBMb3dlciwgVG9wXHJcbiAgICAgICAgMTYyLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgIDExMSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgMjU1LCAvLyBVcHBlciwgVG9wXHJcbiAgICAgICAgMTAyLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgMTYyLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgIDE5MCwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcclxuICAgICAgICAxMTEsIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgIDE4NCwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICBpbmRpY2VzLFxyXG4gICAgICAgIHRleHR1cmUsXHJcbiAgICAgICAgbGlnaHRpbmcsXHJcbiAgICAgICAgdmVydGV4Q291bnQ6IDYgKiA5LFxyXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjEyLFxyXG4gICAgICAgIHNjYWxlVW5wYWRkZWQ6IDAuODM2LFxyXG4gICAgICAgIGlzM0Q6IHRydWVcclxuICAgIH07XHJcbn0pO1xyXG5cclxuLy8gSGVscGVyIGZ1bmN0aW9uc1xyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2NhbGVcclxuICogQHBhcmFtIHtudW1iZXJbXVtdfSBwb3NpdGlvbnMgLSBGb3IgZWFjaCByZWN0YW5nbGUgNCBhcnJheXMgd2l0aCAzIGVudHJpZXMgb2YgMCBvciAxIC0ganVzdCBsb29rIGF0IHRoZSB1c2FnZXMgaWRrIHdoYXQgdG8gd3JpdGVcclxuICogQHJldHVybnMge251bWJlcltdfVxyXG4gKi9cclxuZnVuY3Rpb24gcG9zaXRpb25zKHNjYWxlLCBwb3NpdGlvbnMpIHtcclxuICAgIHJldHVybiBwb3NpdGlvbnNcclxuICAgICAgICAuZmxhdCgpXHJcbiAgICAgICAgLm1hcCh2ID0+ICgodiAqIDIpIC0gMSkgKiBzY2FsZSk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7R0xlbnVtfSB0YXJnZXRcclxuICogQHBhcmFtIHtBbGxvd1NoYXJlZEJ1ZmZlclNvdXJjZX0gZGF0YVxyXG4gKiBAcmV0dXJucyB7V2ViR0xCdWZmZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBidWYoZ2wsIHRhcmdldCwgZGF0YSkge1xyXG4gICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcclxuICAgIGdsLmJ1ZmZlckRhdGEodGFyZ2V0LCBkYXRhLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICByZXR1cm4gYnVmZmVyO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge251bWJlcltdfSBkYXRhIC0gc2VlIHBvc2l0aW9uc1xyXG4gKiBAcmV0dXJucyB7V2ViR0xCdWZmZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBwb3NpdGlvbnNCdWYoZ2wsIGRhdGEpIHtcclxuICAgIHJldHVybiBidWYoZ2wsIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhLmZsYXQoKSkpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmVjdGFuZ2xlQ291bnRcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gaW5kaWNlc0J1ZihnbCwgcmVjdGFuZ2xlQ291bnQpIHtcclxuICAgIGxldCB2ZXJ0ZXhEYXRhID0gWy4uLkFycmF5KHJlY3RhbmdsZUNvdW50KS5rZXlzKCldXHJcbiAgICAgICAgLm1hcChpID0+IChbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyLCBpICogNCwgaSAqIDQgKyAyLCBpICogNCArIDNdKSlcclxuICAgICAgICAuZmxhdCgpO1xyXG5cclxuICAgIHJldHVybiBidWYoZ2wsIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodmVydGV4RGF0YSkpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdW5pdHMgLSBIb3cgbWFueSB1bml0cyB0aGUgdGV4dHVyZSBpcyBzcGxpdCBpbnRvLCBwZXIgYXhpc1xyXG4gKiBAcGFyYW0ge251bWJlcltdW119IGRhdGEgLSBGb3IgZWFjaCByZWN0IFt1LCB2XSBpbiB1bml0c1xyXG4gKiBAcmV0dXJucyB7V2ViR0xCdWZmZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0ZXh0dXJlQnVmKGdsLCB1bml0cywgZGF0YSkge1xyXG4gICAgbGV0IHZlcnRleERhdGEgPSBkYXRhLm1hcChkID0+IChbXHJcbiAgICAgICAgLy8gVGV4dHVyZXMgZ28gQ0NXXHJcbiAgICAgICAgZFswXSArIDEuMCwgZFsxXSArIDAuMCxcclxuICAgICAgICBkWzBdICsgMC4wLCBkWzFdICsgMC4wLFxyXG4gICAgICAgIGRbMF0gKyAwLjAsIGRbMV0gKyAxLjAsXHJcbiAgICAgICAgZFswXSArIDEuMCwgZFsxXSArIDEuMFxyXG4gICAgXSkpXHJcbiAgICAgICAgLmZsYXQoKVxyXG4gICAgICAgIC5tYXAodiA9PiB2IC8gdW5pdHMpO1xyXG5cclxuICAgIHJldHVybiBidWYoZ2wsIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhEYXRhKSk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7bnVtYmVyW119IGRhdGEgLSBQcmViYWtlZCBsaWdodGluZywgb25lIHZhbHVlIDAgLSAyNTUgZm9yIGVhY2ggcmVjdFxyXG4gKiBAcmV0dXJucyB7V2ViR0xCdWZmZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBsaWdodGluZ0J1ZihnbCwgZGF0YSkge1xyXG4gICAgbGV0IHZlcnRleERhdGEgPSBkYXRhXHJcbiAgICAgICAgLm1hcCh2ID0+IHYgLyAyNTUpIC8vIE11bHRpcGxpZXIsIDAgLSAxXHJcbiAgICAgICAgLm1hcCh2ID0+IFt2LCB2LCB2XSkgLy8gRm9yIGVhY2ggY29sb3IgY2hhbm5lbFxyXG4gICAgICAgIC5tYXAodiA9PiBbdiwgdiwgdiwgdl0pIC8vIEZvciBlYWNoIHZlcnRleCBwZXIgcmVjdFxyXG4gICAgICAgIC5mbGF0KDIpO1xyXG5cclxuICAgIHJldHVybiBidWYoZ2wsIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhEYXRhKSk7XHJcbn1cclxuIiwKICAgICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmNvbnN0IHsgbWF0MywgbWF0NCB9ID0gd2luZG93LmdsTWF0cml4IHx8IHt9O1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL21vZGVscy5qcycpLk1vZGVsfSBNb2RlbFxyXG4gKi9cclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gUHJvZ3JhbUluZm9cclxuICogQHByb3BlcnR5IHtXZWJHTFByb2dyYW19IHByb2dyYW1cclxuICogQHByb3BlcnR5IHtQcm9ncmFtTG9jYXRpb25zfSBsb2NhdGlvbnNcclxuICovXHJcblxyXG4vKiEqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb2dyYW1Mb2NhdGlvbnNcclxuICogQHByb3BlcnR5IHtHTGludH0gYVZlcnRleFBvc2l0aW9uXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVQcm9qZWN0aW9uTWF0cml4XHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVNb2RlbFZpZXdNYXRyaXhcclxuICogQHByb3BlcnR5IHtHTGludH0gYVRleHR1cmVDb29yZFxyXG4gKiBAcHJvcGVydHkge0dMaW50fSBhTGlnaHRpbmdcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdUxpZ2h0aW5nQWN0aXZlXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVUZXh0dXJlTWF0cml4XHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVUZXh0dXJlXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtQcm9ncmFtSW5mb30gcHJvZ3JhbUluZm9cclxuICogQHBhcmFtIHtib29sZWFufSBhZGRQYWRkaW5nXHJcbiAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsXHJcbiAqIEBwYXJhbSB7V2ViR0xUZXh0dXJlfSBtb2RlbFRleHR1cmVcclxuICogQHBhcmFtIHtXZWJHTFRleHR1cmV9IGdsaW50VGV4dHVyZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcoZ2wsIHByb2dyYW1JbmZvLCBhZGRQYWRkaW5nLCBtb2RlbCwgbW9kZWxUZXh0dXJlLCBnbGludFRleHR1cmUpIHtcclxuICAgIC8vIFJlc2V0IGNhbnZhc1xyXG4gICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAwLjApO1xyXG4gICAgZ2wuY2xlYXJEZXB0aCgxLjApO1xyXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xyXG4gICAgZ2wuZGVwdGhNYXNrKHRydWUpO1xyXG5cclxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XHJcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgcHJvamVjdGlvbiBhbmQgbW9kZWwgdmlldyBtYXRyaXhcclxuICAgIGNvbnN0IGFzcGVjdCA9IGdsLmNhbnZhcy5jbGllbnRXaWR0aCAvIGdsLmNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgY29uc3Qgc2NhbGUgPSBhZGRQYWRkaW5nID8gbW9kZWwuc2NhbGVQYWRkZWQgOiBtb2RlbC5zY2FsZVVucGFkZGVkO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbk1hdHJpeCA9IG1hdDQuY3JlYXRlKCk7XHJcbiAgICBtYXQ0Lm9ydGhvKHByb2plY3Rpb25NYXRyaXgsIC1hc3BlY3QgKiBzY2FsZSwgYXNwZWN0ICogc2NhbGUsIC1zY2FsZSwgc2NhbGUsIC0xMCwgMTApO1xyXG5cclxuICAgIGNvbnN0IG1vZGVsVmlld01hdHJpeCA9IG1hdDQuY3JlYXRlKCk7XHJcbiAgICBpZiAobW9kZWwuaXMzRCkge1xyXG4gICAgICAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCAzMCAqIE1hdGguUEkgLyAxODAsIFsxLCAwLCAwXSk7XHJcbiAgICAgICAgbWF0NC5yb3RhdGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIDQ1ICogTWF0aC5QSSAvIDE4MCwgWzAsIDEsIDBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHNoYWRlcnNcclxuICAgIHNldEF0dHJpYnV0ZShnbCwgcHJvZ3JhbUluZm8ubG9jYXRpb25zLmFWZXJ0ZXhQb3NpdGlvbnMsIG1vZGVsLnBvc2l0aW9uLCAzKTtcclxuICAgIHNldEF0dHJpYnV0ZShnbCwgcHJvZ3JhbUluZm8ubG9jYXRpb25zLmFUZXh0dXJlQ29vcmQsIG1vZGVsLnRleHR1cmUsIDIpO1xyXG4gICAgc2V0QXR0cmlidXRlKGdsLCBwcm9ncmFtSW5mby5sb2NhdGlvbnMuYUxpZ2h0aW5nLCBtb2RlbC5saWdodGluZywgMyk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbW9kZWwuaW5kaWNlcyk7XHJcbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW1JbmZvLnByb2dyYW0pO1xyXG5cclxuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudUxpZ2h0aW5nQWN0aXZlLCAxKTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVQcm9qZWN0aW9uTWF0cml4LCBmYWxzZSwgcHJvamVjdGlvbk1hdHJpeCk7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHByb2dyYW1JbmZvLmxvY2F0aW9ucy51TW9kZWxWaWV3TWF0cml4LCBmYWxzZSwgbW9kZWxWaWV3TWF0cml4KTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVUZXh0dXJlTWF0cml4LCBmYWxzZSwgbWF0My5jcmVhdGUoKSk7XHJcblxyXG4gICAgLy8gRHJhdyBjdWJlXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG1vZGVsVGV4dHVyZSk7XHJcbiAgICBnbC51bmlmb3JtMWkocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVUZXh0dXJlLCAwKTtcclxuXHJcbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCBtb2RlbC52ZXJ0ZXhDb3VudCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xyXG5cclxuICAgIC8vIERyYXcgZW5jaGFudG1lbnQgZ2xpbnQgKFNlZSBNaW5lY3JhZnQgdjEuOC45IFJlbmRlckl0ZW0jcmVuZGVyRWZmZWN0KElCYWtlZE1vZGVsKSlcclxuICAgIGlmICghZ2xpbnRUZXh0dXJlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmRlcHRoTWFzayhmYWxzZSk7XHJcbiAgICBnbC5kZXB0aEZ1bmMoZ2wuRVFVQUwpO1xyXG4gICAgZ2wudW5pZm9ybTFpKHByb2dyYW1JbmZvLmxvY2F0aW9ucy51TGlnaHRpbmdBY3RpdmUsIDApOyAvLyBkaXNhYmxlTGlnaHRpbmcoKVxyXG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19DT0xPUiwgZ2wuT05FKTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGdsaW50VGV4dHVyZSk7XHJcbiAgICBsZXQgdGV4dHVyZU1hdHJpeCA9IG1hdDMuY3JlYXRlKCk7IC8vIG1hdHJpeE1vZGUoR0xfVEVYVFVSRSlcclxuICAgIGNvbnN0IFNDQUxFID0gMC41OyAvLyAxNiAvIDggKDE2IGluIE1hdHJpeCwgOCBpbiBzY2FsZSguLikpXHJcbiAgICBtYXQzLnNjYWxlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIFtTQ0FMRSwgU0NBTEUsIFNDQUxFXSk7XHJcbiAgICBsZXQgb2Zmc2V0QSA9IChnZXRTeXN0ZW1UaW1lKCkgJSAzMDAwKSAvIDMwMDAgLyBTQ0FMRTtcclxuICAgIG1hdDMudHJhbnNsYXRlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIFtvZmZzZXRBLCAwXSk7XHJcbiAgICBtYXQzLnJvdGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBkZWcycmFkKC01MCksIFswLCAwLCAxXSk7XHJcblxyXG4gICAgLy8gcmVuZGVyTW9kZWxcclxuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVUZXh0dXJlTWF0cml4LCBmYWxzZSwgdGV4dHVyZU1hdHJpeCk7XHJcbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCBtb2RlbC52ZXJ0ZXhDb3VudCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xyXG5cclxuICAgIHRleHR1cmVNYXRyaXggPSBtYXQzLmNyZWF0ZSgpOyAvLyBwb3BNYXRyaXgoKTsgcHVzaE1hdHJpeCgpO1xyXG4gICAgbWF0My5zY2FsZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBbU0NBTEUsIFNDQUxFLCBTQ0FMRV0pO1xyXG4gICAgbGV0IG9mZnNldEIgPSAoZ2V0U3lzdGVtVGltZSgpICUgNDg3MykgLyA0ODczIC8gU0NBTEU7XHJcbiAgICBtYXQzLnRyYW5zbGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBbLW9mZnNldEIsIDBdKTtcclxuICAgIG1hdDMucm90YXRlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIGRlZzJyYWQoMTApLCBbMCwgMCwgMV0pO1xyXG5cclxuICAgIC8vIHJlbmRlck1vZGVsXHJcbiAgICBnbC51bmlmb3JtTWF0cml4M2Z2KHByb2dyYW1JbmZvLmxvY2F0aW9ucy51VGV4dHVyZU1hdHJpeCwgZmFsc2UsIHRleHR1cmVNYXRyaXgpO1xyXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgbW9kZWwudmVydGV4Q291bnQsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZGVnMnJhZChpKSB7XHJcbiAgICByZXR1cm4gaSAqIE1hdGguUEkgLyAxODBcclxufVxyXG5cclxuLyohKlxyXG4gKiBTZWUgTWluZWNyYWZ0LmdldFN5c3RlbVRpbWUoKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U3lzdGVtVGltZSgpIHtcclxuICAgIHJldHVybiBEYXRlLm5vdygpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge0dMdWludH0gbG9jYXRpb25cclxuICogQHBhcmFtIHtXZWJHTEJ1ZmZlcn0gYnVmZmVyXHJcbiAqIEBwYXJhbSB7R0xpbnR9IGJ1ZmZlckVudHJ5U2l6ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKGdsLCBsb2NhdGlvbiwgYnVmZmVyLCBidWZmZXJFbnRyeVNpemUpIHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NhdGlvbiwgYnVmZmVyRW50cnlTaXplLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDAsKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxufVxyXG4iLAogICAgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtSW5mb1xyXG4gKiBAcHJvcGVydHkge1dlYkdMUHJvZ3JhbX0gcHJvZ3JhbVxyXG4gKiBAcHJvcGVydHkge1Byb2dyYW1Mb2NhdGlvbnN9IGxvY2F0aW9uc1xyXG4gKi9cclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gUHJvZ3JhbUxvY2F0aW9uc1xyXG4gKiBAcHJvcGVydHkge0dMaW50fSBhVmVydGV4UG9zaXRpb25cclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVByb2plY3Rpb25NYXRyaXhcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdU1vZGVsVmlld01hdHJpeFxyXG4gKiBAcHJvcGVydHkge0dMaW50fSBhVGV4dHVyZUNvb3JkXHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFMaWdodGluZ1xyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TGlnaHRpbmdBY3RpdmVcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVRleHR1cmVNYXRyaXhcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVRleHR1cmVcclxuICovXHJcblxyXG5jb25zdCBWRVJURVhfU0hBREVSID0gW1xyXG4gICAgXCJhdHRyaWJ1dGUgdmVjNCBhVmVydGV4UG9zaXRpb247XCIsXHJcbiAgICBcInVuaWZvcm0gbWF0NCB1TW9kZWxWaWV3TWF0cml4O1wiLFxyXG4gICAgXCJ1bmlmb3JtIG1hdDQgdVByb2plY3Rpb25NYXRyaXg7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCJhdHRyaWJ1dGUgICAgIHZlYzIgYVRleHR1cmVDb29yZDtcIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXHJcbiAgICBcImF0dHJpYnV0ZSAgICAgdmVjMyBhTGlnaHRpbmc7XCIsXHJcbiAgICBcInZhcnlpbmcgaGlnaHAgdmVjMyB2TGlnaHRpbmc7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCJ2b2lkIG1haW4odm9pZCkge1wiLFxyXG4gICAgXCIgICAgZ2xfUG9zaXRpb24gPSB1UHJvamVjdGlvbk1hdHJpeCAqIHVNb2RlbFZpZXdNYXRyaXggKiBhVmVydGV4UG9zaXRpb247XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCIgICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXHJcbiAgICBcIiAgICB2TGlnaHRpbmcgPSBhTGlnaHRpbmc7XCIsXHJcbiAgICBcIn1cIixcclxuXS5qb2luKFwiXCIpO1xyXG5cclxuY29uc3QgRlJBR01FTlRfU0hBREVSID0gW1xyXG4gICAgXCJwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB1VGV4dHVyZTtcIixcclxuICAgIFwidW5pZm9ybSBtYXQzIHVUZXh0dXJlTWF0cml4OyAvKiBPZmZzZXQgYXBwbGllZCB0byB0ZXh0dXJlICovXCIsXHJcbiAgICBcInZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxyXG4gICAgXCJcIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMzIHZMaWdodGluZzsgLyogUHJlYmFrZWQgbGlnaHRpbmcgKi9cIixcclxuICAgIFwidW5pZm9ybSBib29sIHVMaWdodGluZ0FjdGl2ZTtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInZvaWQgbWFpbigpIHtcIixcclxuICAgIFwiICAgIGhpZ2hwIHZlYzQgdGV4ZWxDb2xvciA9IHRleHR1cmUyRCh1VGV4dHVyZSwgKHVUZXh0dXJlTWF0cml4ICogdmVjMyh2VGV4dHVyZUNvb3JkLCAxLjApKS54eSk7XCIsXHJcbiAgICBcIiAgICBnbF9GcmFnQ29sb3IgPSB0ZXhlbENvbG9yO1wiLFxyXG4gICAgXCJcIixcclxuICAgIFwiICAgIGlmICh0ZXhlbENvbG9yLmEgPT0gMC4wKSB7XCIsXHJcbiAgICBcIiAgICAgICAgZGlzY2FyZDtcIixcclxuICAgIFwiICAgIH1cIixcclxuICAgIFwiXCIsXHJcbiAgICBcIiAgICBpZiAodUxpZ2h0aW5nQWN0aXZlKSB7XCIsXHJcbiAgICBcIiAgICAgICAgZ2xfRnJhZ0NvbG9yICo9IHZlYzQodkxpZ2h0aW5nLCAxKTtcIixcclxuICAgIFwiICAgIH1cIixcclxuICAgIFwifVwiLFxyXG5dLmpvaW4oXCJcIik7XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcmV0dXJucyB7UHJvZ3JhbUluZm99XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBTaGFkZXIoZ2wpIHtcclxuICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IGxvYWRTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIFZFUlRFWF9TSEFERVIpO1xyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBsb2FkU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIEZSQUdNRU5UX1NIQURFUik7XHJcblxyXG4gICAgY29uc3Qgc2hhZGVyUHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcclxuICAgIGdsLmxpbmtQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihzaGFkZXJQcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICBhbGVydChgVW5hYmxlIHRvIGluaXRpYWxpemUgdGhlIHNoYWRlciBwcm9ncmFtOiAke2dsLmdldFByb2dyYW1JbmZvTG9nKHNoYWRlclByb2dyYW0pfWApO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvZ3JhbTogc2hhZGVyUHJvZ3JhbSxcclxuICAgICAgICBsb2NhdGlvbnM6IHtcclxuICAgICAgICAgICAgYVZlcnRleFBvc2l0aW9uOiBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcImFWZXJ0ZXhQb3NpdGlvblwiKSxcclxuICAgICAgICAgICAgdVByb2plY3Rpb25NYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVQcm9qZWN0aW9uTWF0cml4XCIpLFxyXG4gICAgICAgICAgICB1TW9kZWxWaWV3TWF0cml4OiBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgXCJ1TW9kZWxWaWV3TWF0cml4XCIpLFxyXG5cclxuICAgICAgICAgICAgYVRleHR1cmVDb29yZDogZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgXCJhVGV4dHVyZUNvb3JkXCIpLFxyXG4gICAgICAgICAgICBhTGlnaHRpbmc6IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwiYUxpZ2h0aW5nXCIpLFxyXG4gICAgICAgICAgICB1TGlnaHRpbmdBY3RpdmU6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVMaWdodGluZ0FjdGl2ZVwiKSxcclxuXHJcbiAgICAgICAgICAgIHVUZXh0dXJlTWF0cml4OiBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgXCJ1VGV4dHVyZU1hdHJpeFwiKSxcclxuICAgICAgICAgICAgdVRleHR1cmU6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVUZXh0dXJlXCIpLFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7R0xlbnVtfSB0eXBlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VcclxuICogQHJldHVybnMgez9XZWJHTFNoYWRlcn1cclxuICovXHJcbmZ1bmN0aW9uIGxvYWRTaGFkZXIoZ2wsIHR5cGUsIHNvdXJjZSkge1xyXG4gICAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xyXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcclxuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuXHJcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgIGFsZXJ0KGBBbiBlcnJvciBvY2N1cnJlZCBjb21waWxpbmcgdGhlIHNoYWRlcnM6ICR7Z2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpfWApO1xyXG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzaGFkZXI7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcclxuICogQHJldHVybnMge1Byb21pc2U8V2ViR0xUZXh0dXJlPn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZUZyb21VUkwoZ2wsIHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShsb2FkVGV4dHVyZShnbCwgaW1hZ2UsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSBjYXVzZSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYENvdWxkIG5vdCBsb2FkIHRleHR1cmUgXCIke3VybH1cIi5gLCB7XHJcbiAgICAgICAgICAgICAgICBjYXVzZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtUZXhJbWFnZVNvdXJjZX0gZGF0YVxyXG4gKiBAcmV0dXJucyB7V2ViR0xUZXh0dXJlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlKGdsLCBkYXRhLCB3LCBoKSB7XHJcbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG5cclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcclxuXHJcbiAgICBpZiAoaXNQb3dlck9mMih3KSAmJiBpc1Bvd2VyT2YyKGgpKSB7XHJcbiAgICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwKICAgICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydCB7IE1PREVMX0NVQkUsIE1PREVMX0lURU0sIE1PREVMX1NLVUxMX0NPTVBBQ1QsIE1PREVMX1NLVUxMX1NLSU4sIE1vZGVsVHlwZSB9IGZyb20gXCIuL21vZGVscy5qc1wiO1xyXG5cclxuaW1wb3J0IHsgR0xJTlRfVEVYVFVSRSwgTW9kZWxUeXBlIH0gZnJvbSBcIi4vbW9kZWxzLmpzXCI7XHJcbmltcG9ydCB7IGRyYXcgfSBmcm9tIFwiLi9kcmF3LmpzXCI7XHJcbmltcG9ydCB7IHNldHVwU2hhZGVyLCBsb2FkVGV4dHVyZSwgbG9hZFRleHR1cmVGcm9tVVJMIH0gZnJvbSBcIi4vc2V0dXAuanNcIjtcclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gUmVuZGVyT3B0aW9uc1xyXG4gKiBAcHJvcGVydHkge01vZGVsVHlwZX0gbW9kZWxUeXBlIC0gT25lIG9mIE1PREVMX0NVQkUsIE1PREVMLUlURU0sIE1PREVMX1NLVUxMX0NPTVBBQ1QsIE1PREVMX1NLVUxMX1NLSU4uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0ZXh0dXJlVVJMIC0gVGhlIFVSTCB0byB0aGUgbW9kZWwgdGV4dHVyZS5cclxuICogQHByb3BlcnR5IHtib29sZWFufSBbZW5jaGFudGVkPWZhbHNlXSAtIEFwcGxpZXMgTWluZWNyYWZ0J3MgZW5jaGFudG1lbnQgZ2xpbnQuXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2luSW52ZW50b3J5PWZhbHNlXSAtIEFwcGxpZXMgcGFkZGluZyB0byBtYXRjaCByZW5kZXJpbmcgb2YgTWluZWNyYWZ0IGl0ZW1zIGluIGludmVudG9yeS5cclxuICogQHByb3BlcnR5IHtXZWJHTENvbnRleHRBdHRyaWJ1dGVzfSBbZ2xDb250ZXh0PXthbnRpYWxpYXM6IGZhbHNlfV0gLSBBcmJpdHJhcnkgV2ViR0wgY29udGV4dCBhdHRyaWJ1dGVzLlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBDcmVhdGVzIGFuZCBzdGFydHMgYSBuZXcgcmVuZGVyZXIuXHJcbiAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhcyAtIFRoZSBjYW52YXMgdG8gcmVuZGVyIG9uLlxyXG4gKiBAcGFyYW0ge1JlbmRlck9wdGlvbnN9IHJlbmRlck9wdGlvbnMgLSBXaGF0IHRvIHJlbmRlci5cclxuICogQHJldHVybnMge1Byb21pc2U8UmVuZGVyZXI+fVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUmVuZGVyZXIoY2FudmFzLCByZW5kZXJPcHRpb25zKSB7XHJcbiAgICBpZiAoIXdpbmRvdy5nbE1hdHJpeD8ubWF0NCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIG1hdHJpeCBsaWJyYXJ5LiBQbGVhc2UgZW5zdXJlIHlvdSBpbmNsdWRlIGdsTWF0cml4IHYzLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXNhYmxlIGFudGlhbGlhcyBieSBkZWZhdWx0XHJcbiAgICBsZXQgY29udGV4dEF0dHJpYnV0ZXMgPSByZW5kZXJPcHRpb25zLmdsQ29udGV4dCB8fCB7fTtcclxuICAgIGlmIChjb250ZXh0QXR0cmlidXRlcy5hbnRpYWxpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnRleHRBdHRyaWJ1dGVzLmFudGlhbGlhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiLCBjb250ZXh0QXR0cmlidXRlcyk7XHJcbiAgICBpZiAoZ2wgPT09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG1heSBub3Qgc3VwcG9ydCBpdC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvZ3JhbUluZm8gPSBzZXR1cFNoYWRlcihnbCk7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZSA9IGF3YWl0IGxvYWRUZXh0dXJlRnJvbVVSTChnbCwgcmVuZGVyT3B0aW9ucy50ZXh0dXJlVVJMKTtcclxuICAgIGNvbnN0IGdsaW50VGV4dHVyZSA9IHJlbmRlck9wdGlvbnMuZW5jaGFudGVkID8gbG9hZFRleHR1cmUoZ2wsIEdMSU5UX1RFWFRVUkUsIDY0LCA2NCkgOiBudWxsO1xyXG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgbW9kZWwgPSByZW5kZXJPcHRpb25zLm1vZGVsVHlwZS5jcmVhdGUoZ2wpO1xyXG5cclxuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xyXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIGRyYXcoZ2wsIHByb2dyYW1JbmZvLCByZW5kZXJPcHRpb25zLmluSW52ZW50b3J5LCBtb2RlbCwgdGV4dHVyZSwgZ2xpbnRUZXh0dXJlKTtcclxuICAgICAgICBpZiAoYWN0aXZlKVxyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBSZW5kZXJlcigoKSA9PiBhY3RpdmUgPSBmYWxzZSk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQW4gYWN0aXZlIHJlbmRlci5cclxuICogQHB1YmxpY1xyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FuY2VsRnVuYykge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsRnVuYyA9IGNhbmNlbEZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgLyohKlxyXG4gICAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyLlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsRnVuYygpO1xyXG4gICAgfVxyXG59XHJcbiIKICBdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJPLE1BQU0sVUFBVTtBQUFBLEVBQ25CLFdBQVcsQ0FBQyxXQUFXO0FBQUEsSUFDbkIsS0FBSyxZQUFZO0FBQUE7QUFBQSxFQU9yQixNQUFNLENBQUMsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFDUCxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQUE7QUFFaEM7QUFJQSxJQUFNLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtB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RyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUM3QyxDQUFDO0FBQUEsSUFDRCxVQUFVLE1BQU0sSUFBSTtBQUFBLE1BQ2hCLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQzdDLENBQUM7QUFBQSxFQUNMLENBQUM7QUFBQSxFQUVELE1BQU0sVUFBVSxXQUFXLElBQUksQ0FBQztBQUFBLEVBRWhDLE1BQU0sVUFBVSxXQUFXLElBQUksR0FBRztBQUFBLElBQzlCLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULENBQUM7QUFBQSxFQUVELE1BQU0sV0FBVyxZQUFZLElBQUk7QUFBQSxJQUM3QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSixDQUFDO0FBQUEsRUFFRCxPQUFPO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYSxJQUFJO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsTUFBTTtBQUFBLEVBQ1Y7QUFBQSxDQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT00sSUFBTSxzQkFBc0IsSUFBSSxVQUFVLFFBQU07QUFBQSxFQUVuRCxNQUFNLFdBQVcsYUFBYSxJQUFJO0FBQUEsSUFDOUIsVUFBVSxJQUFJLElBQUk7QUFBQSxNQUNkLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQzdDLENBQUM7QUFBQSxJQUNELFVBQVUsTUFBTSxJQUFJO0FBQUEsTUFDaEIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsSUFD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LE1BQU0sY0FBYyxZQUFZLEVBQUU7QUFBQSxFQUVsQyxNQUFNLFVBQVUsTUFBTSxtQkFBbUIsSUFBSSxjQUFjLFVBQVU7QUFBQSxFQUNyRSxNQUFNLGVBQWUsY0FBYyxZQUFZLFlBQVksSUFBSSxlQUFlLElBQUksRUFBRSxJQUFJO0FBQUEsRUFDeEYsR0FBRyxZQUFZLEdBQUcscUJBQXFCLElBQUk7QUFBQSxFQUUzQyxNQUFNLFFBQVEsY0FBYyxVQUFVLE9BQU8sRUFBRTtBQUFBLEVBRS9DLElBQUksU0FBUztBQUFBLEVBQ2IsU0FBUyxNQUFNLEdBQUc7QUFBQSxJQUNkLEtBQUssSUFBSSxhQUFhLGNBQWMsYUFBYSxPQUFPLFNBQVMsWUFBWTtBQUFBLElBQzdFLElBQUk7QUFBQSxNQUNBLHNCQUFzQixNQUFNO0FBQUE7QUFBQSxFQUVwQyxzQkFBc0IsTUFBTTtBQUFBLEVBQzVCLE9BQU8sSUFBSSxTQUFTLE1BQU0sU0FBUyxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFyQyxNQUFNLFNBQVM7QUFBQSxFQUNsQixXQUFXLENBQUMsWUFBWTtBQUFBLElBQ3BCLEtBQUssYUFBYTtBQUFBO0FBQUEsRUFPdEIsT0FBTyxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUNOLEtBQUssV0FBVztBQUFBO0FBRXhCOyIsCiAgImRlYnVnSWQiOiAiNjZFNUEyOTQ1NDAwODVCMzY0NzU2RTIxNjQ3NTZFMjEiLAogICJuYW1lcyI6IFtdCn0=
