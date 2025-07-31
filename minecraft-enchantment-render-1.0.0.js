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
 * One of {@link MODEL_CUBE}, {@link MODEL_ITEM}, {@link MODEL_SKULL_COMPACT}, {@link MODEL_SKULL_SKIN}.
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
    162,
    111
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
 * @returns {Promise<HTMLImageElement>}
 */
function loadTextureFromURL(url) {
  return new Promise((resolve, reject) => {
    const image = new Image;
    image.onload = () => {
      resolve(image);
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
 * @param {WebGLRenderingContext} gl
 * @param {string|ImageData} texture
 * @returns {Promise<WebGLTexture>}
 */
async function loadTextureAuto(gl, texture) {
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
  return (value & value - 1) === 0;
}

// lib/atlas.js
/**
 * @property {string} textureURL - The URL to the model texture.
 * @returns {Promise<TextureAltlas>}
 */
async function createAtlas(textureURL) {
  return new TextureAltlas(await loadTextureFromURL(textureURL));
}
/**
 * A texture atlas. See {@link createAtlas}.
 * @public
 * @hideconstructor
 */

class TextureAltlas {
  constructor(texture) {
    /**
         * @param {HTMLImageElement} texture
         */
    let canvas = document.createElement("canvas");
    canvas.width = texture.width;
    canvas.height = texture.height;
    this.ctx = canvas.getContext("2d");
    this.ctx.drawImage(texture, 0, 0, texture.width, texture.height, 0, 0, texture.width, texture.height);
  }
  getTexture(x, y, width, height) {
    /**
         * Creates a image cutout.
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @returns {ImageData}
         * @public
         */
    return this.ctx.getImageData(x, y, width, height);
  }
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
 * @param {WebGLTexture|null} glintTexture
 * @param {[number, number, number]} translation
 * @param {number} scaleMul
 */
function draw(gl, programInfo, addPadding, model, modelTexture, glintTexture, translation, scaleMul) {
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
  resetDraw(gl, false);
}
/**
 * @param {WebGLRenderingContext} gl
 * @param {boolean} clear
 */
function resetDraw(gl, clear) {
  if (clear) {
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
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

// lib/index.js
/**
 * @typedef {Object} RenderOptions
 * @property {ModelType} modelType - One of {@link MODEL_CUBE}, {@link MODEL_ITEM}, {@link MODEL_SKULL_COMPACT}, {@link MODEL_SKULL_SKIN}.
 * @property {string|ImageData} texture - A URL to the model texture or a {@link TextureAltlas} cutout.
 * @property {boolean} [enchanted=false] - Applies Minecraft's enchantment glint.
 * @property {boolean} [inInventory=false] - Applies padding to match rendering of Minecraft items in inventory.
 * @property {[number, number, number]} [translation=[0, 0, 0]] - Applies a translation to the model.
 * @property {number} [scale=1] - Scales the model.
 * @public
 */
/**
 * Creates a new renderer.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {RenderOptions} renderOptions - What to render.
 * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
 * @returns {Promise<Renderer>}
 * @public
 */
function createRenderer(canvas, renderOptions, contextAttributes) {
  return createMultiRenderer(canvas, [renderOptions], contextAttributes);
}
/**
 * Creates a new renderer with multiple models.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {RenderOptions[]} renderOptionsArray - What to render.
 * @param {WebGLContextAttributes} [contextAttributes={antialias: false}] - Arbitrary WebGL context attributes.
 * @returns {Promise<Renderer>}
 * @public
 */
async function createMultiRenderer(canvas, renderOptionsArray, contextAttributes) {
  if (!window.glMatrix?.mat4) {
    throw new Error("Could not find matrix library. Please ensure you include glMatrix v3.");
  }
  contextAttributes ||= {};
  if (contextAttributes.antialias === undefined) {
    contextAttributes.antialias = false;
  }
  const gl = canvas.getContext("webgl", contextAttributes);
  if (gl === null) {
    throw new Error("Could not initialize WebGL. Your browser may not support it.");
  }
  const programInfo = setupShader(gl);
  let drawCalls = [() => resetDraw(gl, true)];
  for (let renderOptions of renderOptionsArray) {
    const texture = await loadTextureAuto(gl, renderOptions.texture);
    const glintTexture = renderOptions.enchanted ? loadTexture(gl, GLINT_TEXTURE, 64, 64) : null;
    const model = renderOptions.modelType.create(gl);
    const translation = renderOptions.translation || [0, 0, 0];
    const scaleMul = 1 / (renderOptions.scale || 1);
    drawCalls.push(() => draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture, translation, scaleMul));
  }
  let activeHandle;
  function render() {
    drawCalls.forEach((call) => call());
    if (activeHandle)
      activeHandle = requestAnimationFrame(render);
  }
  activeHandle = requestAnimationFrame(render);
  return new Renderer(() => {
    cancelAnimationFrame(activeHandle);
    activeHandle = null;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  });
}
/**
 * An active render. See {@link createRenderer}.
 * @public
 * @hideconstructor
 */

class Renderer {
  constructor(destroyFunc) {
    this.destroyFunc = destroyFunc;
  }
  destroy() {
    /**
         * Destroys the renderer.
         * @public
         */
    this.destroyFunc();
  }
}
export {
  createRenderer,
  createMultiRenderer,
  createAtlas,
  TextureAltlas,
  Renderer,
  ModelType,
  MODEL_SKULL_SKIN,
  MODEL_SKULL_COMPACT,
  MODEL_ITEM,
  MODEL_CUBE
};

//# debugId=871F263FD1CAC03164756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliXFxtb2RlbHMuanMiLCAibGliXFxzZXR1cC5qcyIsICJsaWJcXGF0bGFzLmpzIiwgImxpYlxcZHJhdy5qcyIsICJsaWJcXGluZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWwogICAgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb2RlbFxyXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBwb3NpdGlvblxyXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBpbmRpY2VzXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xCdWZmZXJ9IHRleHR1cmVcclxuICogQHByb3BlcnR5IHtXZWJHTEJ1ZmZlcn0gbGlnaHRpbmcgLSBQcmViYWtlZCBsaWdodGluZ1xyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdmVydGV4Q291bnRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjYWxlUGFkZGVkIC0gT3J0aG8gbWF0cml4IHNjYWxpbmcgd2hlbiBhZGRQYWRkaW5nPXRydWVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjYWxlVW5wYWRkZWQgLSBPcnRobyBtYXRyaXggc2NhbGluZyB3aGVuIGFkZFBhZGRpbmc9ZmFsc2VcclxuICogQHByb3BlcnR5IHtib29sZWFufSBpczNEIC0gV2hldGhlciB0byBhcHBseSAzMMKwIHJvdGF0aW9uIGZvciBpc29tZXRyaWMgdmlld1xyXG4gKi9cclxuXHJcbi8qISpcclxuICogT25lIG9mIHtAbGluayBNT0RFTF9DVUJFfSwge0BsaW5rIE1PREVMX0lURU19LCB7QGxpbmsgTU9ERUxfU0tVTExfQ09NUEFDVH0sIHtAbGluayBNT0RFTF9TS1VMTF9TS0lOfS5cclxuICogQHB1YmxpY1xyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kZWxUeXBlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcikge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qISpcclxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gICAgICogQHJldHVybnMge01vZGVsfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoZ2wpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0b3IoZ2wpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBFeHRyYWN0ZWQgZnJvbSBodHRwczovL21jYXNzZXQuY2xvdWQvMS44LjkvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9taXNjL2VuY2hhbnRlZF9pdGVtX2dsaW50LnBuZ1xyXG4vLyBGaXJzdCByb3csIG9ubHkgUiBjb21wb25lbnRcclxuY29uc3QgR0xJTlRfVEVYVFVSRV9SQVcgPSBbXHJcbiAgICAweDY4LCAweDMxLCAweDVCLCAweDM4LCAweDRGLCAweDYyLCAweDZELCAweDU5LCAweDU2LCAweDcxLCAweDZCLCAweDg0LCAweDgyLCAweEEwLCAweDZDLCAweDZBLFxyXG4gICAgMHg3NCwgMHg2RCwgMHhBMywgMHhERCwgMHhCOCwgMHhBMCwgMHg5NSwgMHg4MywgMHg4NiwgMHg4NiwgMHgzRiwgMHgxOCwgMHg0MSwgMHg0RSwgMHg1RSwgMHg3RCxcclxuICAgIDB4NzksIDB4NzksIDB4ODMsIDB4NUQsIDB4N0UsIDB4OEYsIDB4OTAsIDB4QTYsIDB4OUIsIDB4QkQsIDB4Q0MsIDB4RkYsIDB4RTUsIDB4REEsIDB4RDEsIDB4QzUsXHJcbiAgICAweDlBLCAweDY5LCAweDY4LCAweDlDLCAweDhCLCAweDg5LCAweDU3LCAweDUwLCAweDZGLCAweDU3LCAweDVGLCAweDY3LCAweDZDLCAweDk0LCAweDk4LCAweDRCXHJcbl07XHJcblxyXG4vLyBVbmNvbXByZXNzZWQgdGV4dHVyZVxyXG5leHBvcnQgY29uc3QgR0xJTlRfVEVYVFVSRSA9IG5ldyBJbWFnZURhdGEobmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG5ldyBBcnJheSg2NCkuZmlsbChHTElOVF9URVhUVVJFX1JBVy5tYXAoYyA9PiBbXHJcbiAgICAvLyBNaW5lY3JhZnQgdXNlcyBhIGNvbG9yIG11bHRpcGxpZXIgb2YgMHg4MDQwQ0Mgd2hlbiByZW5kZXJpbmcgdGhlIGVuY2hhbnRtZW50IHRleHR1cmUuXHJcbiAgICAvLyBXZSBiYWtlIGl0IGRpcmVjdGx5IGludG8gdGhlIHRleHR1cmUgZm9yIHNpbXBsaWNpdHkuXHJcbiAgICBjICogMHg4MCAvIDB4RkYsXHJcbiAgICBjICogMHg0MCAvIDB4RkYsXHJcbiAgICBjICogMHhDQyAvIDB4RkYsXHJcbiAgICAweEZGLFxyXG5dKSkuZmxhdCgyKSksIDY0LCA2NCk7XHJcblxyXG4vKiEqXHJcbiAqIFNpbXBsZSAyRCBwbGFuZSAvIE1pbmVjcmFmdCBpdGVtLlxyXG4gKiBAdHlwZSB7TW9kZWxUeXBlfVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTU9ERUxfSVRFTSA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIHBvc2l0aW9ucygxLCBbXHJcbiAgICAgICAgWzEsIDEsIDFdLCBbMCwgMSwgMV0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLFxyXG4gICAgXSkpO1xyXG5cclxuICAgIGNvbnN0IGluZGljZXMgPSBpbmRpY2VzQnVmKGdsLCAxKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUJ1ZihnbCwgMSwgW1xyXG4gICAgICAgIFswLCAwXVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgbGlnaHRpbmcgPSBsaWdodGluZ0J1ZihnbCwgW1xyXG4gICAgICAgIDI1NVxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICBpbmRpY2VzLFxyXG4gICAgICAgIHRleHR1cmUsXHJcbiAgICAgICAgbGlnaHRpbmcsXHJcbiAgICAgICAgdmVydGV4Q291bnQ6IDYgKiAxLFxyXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjAsXHJcbiAgICAgICAgc2NhbGVVbnBhZGRlZDogMS4wLFxyXG4gICAgICAgIGlzM0Q6IGZhbHNlXHJcbiAgICB9O1xyXG59KTtcclxuXHJcbi8qISpcclxuICogU2ltcGxlIGN1YmUgLyBNaW5lY3JhZnQgYmxvY2suXHJcbiAqIEB0eXBlIHtNb2RlbFR5cGV9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBjb25zdCBNT0RFTF9DVUJFID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XHJcbiAgICAvLyBSZW1vdmVkIGN1bGxlZCBmYWNlc1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIHBvc2l0aW9ucygxLCBbXHJcbiAgICAgICAgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCAvLyBUb3BcclxuICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIExlZnRcclxuICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFJpZ2h0XHJcbiAgICBdKSk7XHJcblxyXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDMpO1xyXG5cclxuICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlQnVmKGdsLCAyLCBbXHJcbiAgICAgICAgWzAsIDBdLCAvLyBUb3BcclxuICAgICAgICBbMCwgMV0sIC8vIExlZnRcclxuICAgICAgICBbMSwgMF0sIC8vIFJpZ2h0XHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXHJcbiAgICAgICAgMjU1LCAvLyBUb3BcclxuICAgICAgICAxNjIsIC8vIExlZnRcclxuICAgICAgICAxMTEsIC8vIFJpZ2h0XHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBvc2l0aW9uLFxyXG4gICAgICAgIGluZGljZXMsXHJcbiAgICAgICAgdGV4dHVyZSxcclxuICAgICAgICBsaWdodGluZyxcclxuICAgICAgICB2ZXJ0ZXhDb3VudDogNiAqIDMsXHJcbiAgICAgICAgc2NhbGVQYWRkZWQ6IDEuNixcclxuICAgICAgICBzY2FsZVVucGFkZGVkOiAxLjU3MzIsXHJcbiAgICAgICAgaXMzRDogdHJ1ZVxyXG4gICAgfTtcclxufSk7XHJcblxyXG4vKiEqXHJcbiAqIFNrZWxldG9uIC8gUGxheWVyIHNrdWxsLCB1c2luZyB0aGUgTWluZWNyYWZ0IHNraW4gdGV4dHVyZSBsYXlvdXQuXHJcbiAqIEB0eXBlIHtNb2RlbFR5cGV9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBjb25zdCBNT0RFTF9TS1VMTF9TS0lOID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XHJcbiAgICAvLyBSZW1vdmVkIGN1bGxlZCBmYWNlc1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIFtcclxuICAgICAgICBwb3NpdGlvbnMoOCAvIDE2LCBbXHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gTG93ZXIsIFRvcFxyXG4gICAgICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgcG9zaXRpb25zKDguNSAvIDE2LCBbXHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gVXBwZXIsIFRvcFxyXG4gICAgICAgICAgICBbMSwgMCwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICAgICAgWzAsIDEsIDFdLCBbMCwgMSwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFsxLCAxLCAxXSwgWzEsIDAsIDFdLCBbMSwgMCwgMF0sIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XHJcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgICAgIFswLCAxLCAwXSwgWzEsIDEsIDBdLCBbMSwgMCwgMF0sIFswLCAwLCAwXSwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgICAgIF0pXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBpbmRpY2VzID0gaW5kaWNlc0J1ZihnbCwgOSk7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDgsIFtcclxuICAgICAgICBbMSwgMF0sIC8vIExvd2VyLCBUb3BcclxuICAgICAgICBbMCwgMV0sIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgWzEsIDFdLCAvLyBMb3dlciwgUmlnaHRcclxuICAgICAgICBbNSwgMF0sIC8vIFVwcGVyLCBUb3BcclxuICAgICAgICBbNiwgMF0sIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICBbNCwgMV0sIC8vIFVwcGVyLCBMZWZ0XHJcbiAgICAgICAgWzYsIDFdLCAvLyBVcHBlciwgQmFjayBSaWdodFxyXG4gICAgICAgIFs1LCAxXSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgWzcsIDFdLCAvLyBVcHBlciwgQmFjayBMZWZ0XHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXHJcbiAgICAgICAgMjU1LCAvLyBMb3dlciwgVG9wXHJcbiAgICAgICAgMTYyLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgIDExMSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgMjU1LCAvLyBVcHBlciwgVG9wXHJcbiAgICAgICAgMTAyLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgMTYyLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgIDE5MCwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcclxuICAgICAgICAxMTEsIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgIDE4NCwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICBpbmRpY2VzLFxyXG4gICAgICAgIHRleHR1cmUsXHJcbiAgICAgICAgbGlnaHRpbmcsXHJcbiAgICAgICAgdmVydGV4Q291bnQ6IDYgKiA5LFxyXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjEyLFxyXG4gICAgICAgIHNjYWxlVW5wYWRkZWQ6IDAuODM2LFxyXG4gICAgICAgIGlzM0Q6IHRydWVcclxuICAgIH07XHJcbn0pO1xyXG5cclxuLyohKlxyXG4gKiBTa2VsZXRvbiAvIFBsYXllciBza3VsbCwgdXNpbmcgYSBjb21wYWN0IHRleHR1cmUgbGF5b3V0LlxyXG4gKiBAdHlwZSB7TW9kZWxUeXBlfVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTU9ERUxfU0tVTExfQ09NUEFDVCA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xyXG4gICAgLy8gUmVtb3ZlZCBjdWxsZWQgZmFjZXNcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gcG9zaXRpb25zQnVmKGdsLCBbXHJcbiAgICAgICAgcG9zaXRpb25zKDggLyAxNiwgW1xyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIC8vIExvd2VyLCBUb3BcclxuICAgICAgICAgICAgWzAsIDEsIDFdLCBbMCwgMSwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIExvd2VyLCBSaWdodFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIHBvc2l0aW9ucyg4LjUgLyAxNiwgW1xyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIC8vIFVwcGVyLCBUb3BcclxuICAgICAgICAgICAgWzEsIDAsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgICAgIFswLCAxLCAxXSwgWzAsIDEsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgLy8gVXBwZXIsIExlZnRcclxuICAgICAgICAgICAgWzEsIDEsIDBdLCBbMSwgMSwgMV0sIFsxLCAwLCAxXSwgWzEsIDAsIDBdLCAvLyBVcHBlciwgQmFjayBSaWdodFxyXG4gICAgICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgICAgICBbMCwgMSwgMF0sIFsxLCAxLCAwXSwgWzEsIDAsIDBdLCBbMCwgMCwgMF0sIC8vIFVwcGVyLCBCYWNrIExlZnRcclxuICAgICAgICBdKVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDkpO1xyXG5cclxuICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlQnVmKGdsLCAzLCBbXHJcbiAgICAgICAgWzAsIDBdLCAvLyBMb3dlciwgVG9wXHJcbiAgICAgICAgWzAsIDFdLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgIFsxLCAwXSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgWzIsIDBdLCAvLyBVcHBlciwgVG9wXHJcbiAgICAgICAgWzAsIDJdLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgWzEsIDFdLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgIFsxLCAyXSwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcclxuICAgICAgICBbMiwgMV0sIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgIFsyLCAyXSwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgbGlnaHRpbmcgPSBsaWdodGluZ0J1ZihnbCwgW1xyXG4gICAgICAgIDI1NSwgLy8gTG93ZXIsIFRvcFxyXG4gICAgICAgIDE2MiwgLy8gTG93ZXIsIExlZnRcclxuICAgICAgICAxMTEsIC8vIExvd2VyLCBSaWdodFxyXG4gICAgICAgIDI1NSwgLy8gVXBwZXIsIFRvcFxyXG4gICAgICAgIDEwMiwgLy8gVXBwZXIsIEJvdHRvbVxyXG4gICAgICAgIDE2MiwgLy8gVXBwZXIsIExlZnRcclxuICAgICAgICAxOTAsIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XHJcbiAgICAgICAgMTExLCAvLyBVcHBlciwgUmlnaHRcclxuICAgICAgICAxODQsIC8vIFVwcGVyLCBCYWNrIExlZnRcclxuICAgIF0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcG9zaXRpb24sXHJcbiAgICAgICAgaW5kaWNlcyxcclxuICAgICAgICB0ZXh0dXJlLFxyXG4gICAgICAgIGxpZ2h0aW5nLFxyXG4gICAgICAgIHZlcnRleENvdW50OiA2ICogOSxcclxuICAgICAgICBzY2FsZVBhZGRlZDogMS4xMixcclxuICAgICAgICBzY2FsZVVucGFkZGVkOiAwLjgzNixcclxuICAgICAgICBpczNEOiB0cnVlXHJcbiAgICB9O1xyXG59KTtcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbnNcclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlXHJcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gcG9zaXRpb25zIC0gRm9yIGVhY2ggcmVjdGFuZ2xlIDQgYXJyYXlzIHdpdGggMyBlbnRyaWVzIG9mIDAgb3IgMSAtIGp1c3QgbG9vayBhdCB0aGUgdXNhZ2VzIGlkayB3aGF0IHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJbXX1cclxuICovXHJcbmZ1bmN0aW9uIHBvc2l0aW9ucyhzY2FsZSwgcG9zaXRpb25zKSB7XHJcbiAgICByZXR1cm4gcG9zaXRpb25zXHJcbiAgICAgICAgLmZsYXQoKVxyXG4gICAgICAgIC5tYXAodiA9PiAoKHYgKiAyKSAtIDEpICogc2NhbGUpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge0dMZW51bX0gdGFyZ2V0XHJcbiAqIEBwYXJhbSB7QWxsb3dTaGFyZWRCdWZmZXJTb3VyY2V9IGRhdGFcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gYnVmKGdsLCB0YXJnZXQsIGRhdGEpIHtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKHRhcmdldCwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgcmV0dXJuIGJ1ZmZlcjtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YSAtIHNlZSBwb3NpdGlvbnNcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gcG9zaXRpb25zQnVmKGdsLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5mbGF0KCkpKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtudW1iZXJ9IHJlY3RhbmdsZUNvdW50XHJcbiAqIEByZXR1cm5zIHtXZWJHTEJ1ZmZlcn1cclxuICovXHJcbmZ1bmN0aW9uIGluZGljZXNCdWYoZ2wsIHJlY3RhbmdsZUNvdW50KSB7XHJcbiAgICBsZXQgdmVydGV4RGF0YSA9IFsuLi5BcnJheShyZWN0YW5nbGVDb3VudCkua2V5cygpXVxyXG4gICAgICAgIC5tYXAoaSA9PiAoW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMiwgaSAqIDQsIGkgKiA0ICsgMiwgaSAqIDQgKyAzXSkpXHJcbiAgICAgICAgLmZsYXQoKTtcclxuXHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHZlcnRleERhdGEpKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtudW1iZXJ9IHVuaXRzIC0gSG93IG1hbnkgdW5pdHMgdGhlIHRleHR1cmUgaXMgc3BsaXQgaW50bywgcGVyIGF4aXNcclxuICogQHBhcmFtIHtudW1iZXJbXVtdfSBkYXRhIC0gRm9yIGVhY2ggcmVjdCBbdSwgdl0gaW4gdW5pdHNcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdGV4dHVyZUJ1ZihnbCwgdW5pdHMsIGRhdGEpIHtcclxuICAgIGxldCB2ZXJ0ZXhEYXRhID0gZGF0YS5tYXAoZCA9PiAoW1xyXG4gICAgICAgIC8vIFRleHR1cmVzIGdvIENDV1xyXG4gICAgICAgIGRbMF0gKyAxLjAsIGRbMV0gKyAwLjAsXHJcbiAgICAgICAgZFswXSArIDAuMCwgZFsxXSArIDAuMCxcclxuICAgICAgICBkWzBdICsgMC4wLCBkWzFdICsgMS4wLFxyXG4gICAgICAgIGRbMF0gKyAxLjAsIGRbMV0gKyAxLjBcclxuICAgIF0pKVxyXG4gICAgICAgIC5mbGF0KClcclxuICAgICAgICAubWFwKHYgPT4gdiAvIHVuaXRzKTtcclxuXHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSkpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge251bWJlcltdfSBkYXRhIC0gUHJlYmFrZWQgbGlnaHRpbmcsIG9uZSB2YWx1ZSAwIC0gMjU1IGZvciBlYWNoIHJlY3RcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gbGlnaHRpbmdCdWYoZ2wsIGRhdGEpIHtcclxuICAgIGxldCB2ZXJ0ZXhEYXRhID0gZGF0YVxyXG4gICAgICAgIC5tYXAodiA9PiB2IC8gMjU1KSAvLyBNdWx0aXBsaWVyLCAwIC0gMVxyXG4gICAgICAgIC5tYXAodiA9PiBbdiwgdiwgdl0pIC8vIEZvciBlYWNoIGNvbG9yIGNoYW5uZWxcclxuICAgICAgICAubWFwKHYgPT4gW3YsIHYsIHYsIHZdKSAvLyBGb3IgZWFjaCB2ZXJ0ZXggcGVyIHJlY3RcclxuICAgICAgICAuZmxhdCgyKTtcclxuXHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSkpO1xyXG59XHJcbiIsCiAgICAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiEqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb2dyYW1JbmZvXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xQcm9ncmFtfSBwcm9ncmFtXHJcbiAqIEBwcm9wZXJ0eSB7UHJvZ3JhbUxvY2F0aW9uc30gbG9jYXRpb25zXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtTG9jYXRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFWZXJ0ZXhQb3NpdGlvblxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1UHJvamVjdGlvbk1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TW9kZWxWaWV3TWF0cml4XHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFUZXh0dXJlQ29vcmRcclxuICogQHByb3BlcnR5IHtHTGludH0gYUxpZ2h0aW5nXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVMaWdodGluZ0FjdGl2ZVxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZU1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZVxyXG4gKi9cclxuXHJcbmNvbnN0IFZFUlRFWF9TSEFERVIgPSBbXHJcbiAgICBcImF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbjtcIixcclxuICAgIFwidW5pZm9ybSBtYXQ0IHVNb2RlbFZpZXdNYXRyaXg7XCIsXHJcbiAgICBcInVuaWZvcm0gbWF0NCB1UHJvamVjdGlvbk1hdHJpeDtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcImF0dHJpYnV0ZSAgICAgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFxyXG4gICAgXCJ2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcIixcclxuICAgIFwiYXR0cmlidXRlICAgICB2ZWMzIGFMaWdodGluZztcIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMzIHZMaWdodGluZztcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInZvaWQgbWFpbih2b2lkKSB7XCIsXHJcbiAgICBcIiAgICBnbF9Qb3NpdGlvbiA9IHVQcm9qZWN0aW9uTWF0cml4ICogdU1vZGVsVmlld01hdHJpeCAqIGFWZXJ0ZXhQb3NpdGlvbjtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcIiAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcclxuICAgIFwiICAgIHZMaWdodGluZyA9IGFMaWdodGluZztcIixcclxuICAgIFwifVwiLFxyXG5dLmpvaW4oXCJcIik7XHJcblxyXG5jb25zdCBGUkFHTUVOVF9TSEFERVIgPSBbXHJcbiAgICBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1wiLFxyXG4gICAgXCJ1bmlmb3JtIG1hdDMgdVRleHR1cmVNYXRyaXg7IC8qIE9mZnNldCBhcHBsaWVkIHRvIHRleHR1cmUgKi9cIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCJ2YXJ5aW5nIGhpZ2hwIHZlYzMgdkxpZ2h0aW5nOyAvKiBQcmViYWtlZCBsaWdodGluZyAqL1wiLFxyXG4gICAgXCJ1bmlmb3JtIGJvb2wgdUxpZ2h0aW5nQWN0aXZlO1wiLFxyXG4gICAgXCJcIixcclxuICAgIFwidm9pZCBtYWluKCkge1wiLFxyXG4gICAgXCIgICAgaGlnaHAgdmVjNCB0ZXhlbENvbG9yID0gdGV4dHVyZTJEKHVUZXh0dXJlLCAodVRleHR1cmVNYXRyaXggKiB2ZWMzKHZUZXh0dXJlQ29vcmQsIDEuMCkpLnh5KTtcIixcclxuICAgIFwiICAgIGdsX0ZyYWdDb2xvciA9IHRleGVsQ29sb3I7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCIgICAgaWYgKHRleGVsQ29sb3IuYSA9PSAwLjApIHtcIixcclxuICAgIFwiICAgICAgICBkaXNjYXJkO1wiLFxyXG4gICAgXCIgICAgfVwiLFxyXG4gICAgXCJcIixcclxuICAgIFwiICAgIGlmICh1TGlnaHRpbmdBY3RpdmUpIHtcIixcclxuICAgIFwiICAgICAgICBnbF9GcmFnQ29sb3IgKj0gdmVjNCh2TGlnaHRpbmcsIDEpO1wiLFxyXG4gICAgXCIgICAgfVwiLFxyXG4gICAgXCJ9XCIsXHJcbl0uam9pbihcIlwiKTtcclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEByZXR1cm5zIHtQcm9ncmFtSW5mb31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFNoYWRlcihnbCkge1xyXG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gbG9hZFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgVkVSVEVYX1NIQURFUik7XHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGxvYWRTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgRlJBR01FTlRfU0hBREVSKTtcclxuXHJcbiAgICBjb25zdCBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHNoYWRlclByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgIGFsZXJ0KGBVbmFibGUgdG8gaW5pdGlhbGl6ZSB0aGUgc2hhZGVyIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2coc2hhZGVyUHJvZ3JhbSl9YCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxyXG4gICAgICAgIGxvY2F0aW9uczoge1xyXG4gICAgICAgICAgICBhVmVydGV4UG9zaXRpb246IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpLFxyXG4gICAgICAgICAgICB1UHJvamVjdGlvbk1hdHJpeDogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidVByb2plY3Rpb25NYXRyaXhcIiksXHJcbiAgICAgICAgICAgIHVNb2RlbFZpZXdNYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVNb2RlbFZpZXdNYXRyaXhcIiksXHJcblxyXG4gICAgICAgICAgICBhVGV4dHVyZUNvb3JkOiBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIiksXHJcbiAgICAgICAgICAgIGFMaWdodGluZzogZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgXCJhTGlnaHRpbmdcIiksXHJcbiAgICAgICAgICAgIHVMaWdodGluZ0FjdGl2ZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidUxpZ2h0aW5nQWN0aXZlXCIpLFxyXG5cclxuICAgICAgICAgICAgdVRleHR1cmVNYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVUZXh0dXJlTWF0cml4XCIpLFxyXG4gICAgICAgICAgICB1VGV4dHVyZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidVRleHR1cmVcIiksXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtHTGVudW19IHR5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxyXG4gKiBAcmV0dXJucyB7P1dlYkdMU2hhZGVyfVxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XHJcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XHJcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgYWxlcnQoYEFuIGVycm9yIG9jY3VycmVkIGNvbXBpbGluZyB0aGUgc2hhZGVyczogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCk7XHJcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNoYWRlcjtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZUZyb21VUkwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGltYWdlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSBjYXVzZSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYENvdWxkIG5vdCBsb2FkIHRleHR1cmUgXCIke3VybH1cIi5gLCB7XHJcbiAgICAgICAgICAgICAgICBjYXVzZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtUZXhJbWFnZVNvdXJjZX0gZGF0YVxyXG4gKiBAcmV0dXJucyB7V2ViR0xUZXh0dXJlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlKGdsLCBkYXRhLCB3LCBoKSB7XHJcbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG5cclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcclxuXHJcbiAgICBpZiAoaXNQb3dlck9mMih3KSAmJiBpc1Bvd2VyT2YyKGgpKSB7XHJcbiAgICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge3N0cmluZ3xJbWFnZURhdGF9IHRleHR1cmVcclxuICogQHJldHVybnMge1Byb21pc2U8V2ViR0xUZXh0dXJlPn1cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVGV4dHVyZUF1dG8oZ2wsIHRleHR1cmUpIHtcclxuICAgIGxldCBpbWFnZTtcclxuICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGltYWdlID0gYXdhaXQgbG9hZFRleHR1cmVGcm9tVVJMKHRleHR1cmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbWFnZSA9IHRleHR1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxvYWRUZXh0dXJlKGdsLCBpbWFnZSwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNQb3dlck9mMih2YWx1ZSkge1xyXG4gICAgcmV0dXJuICh2YWx1ZSAmICh2YWx1ZSAtIDEpKSA9PT0gMDtcclxufVxyXG4iLAogICAgImltcG9ydCB7IGxvYWRUZXh0dXJlRnJvbVVSTCB9IGZyb20gXCIuL3NldHVwLmpzXCI7XHJcblxyXG4vKiEqXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0ZXh0dXJlVVJMIC0gVGhlIFVSTCB0byB0aGUgbW9kZWwgdGV4dHVyZS5cclxuICogQHJldHVybnMge1Byb21pc2U8VGV4dHVyZUFsdGxhcz59XHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXRsYXModGV4dHVyZVVSTCkge1xyXG4gICAgcmV0dXJuIG5ldyBUZXh0dXJlQWx0bGFzKGF3YWl0IGxvYWRUZXh0dXJlRnJvbVVSTCh0ZXh0dXJlVVJMKSk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQSB0ZXh0dXJlIGF0bGFzLiBTZWUge0BsaW5rIGNyZWF0ZUF0bGFzfS5cclxuICogQHB1YmxpY1xyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGV4dHVyZUFsdGxhcyB7XHJcbiAgICAvKiEqXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGV4dHVyZSkge1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRleHR1cmUud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRleHR1cmUsIDAsIDAsIHRleHR1cmUud2lkdGgsIHRleHR1cmUuaGVpZ2h0LCAwLCAwLCB0ZXh0dXJlLndpZHRoLCB0ZXh0dXJlLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyohKlxyXG4gICAgICogQ3JlYXRlcyBhIGltYWdlIGN1dG91dC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJucyB7SW1hZ2VEYXRhfVxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICovXHJcbiAgICBnZXRUZXh0dXJlKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcbiIsCiAgICAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5jb25zdCB7IG1hdDMsIG1hdDQgfSA9IHdpbmRvdy5nbE1hdHJpeCB8fCB7fTtcclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9tb2RlbHMuanMnKS5Nb2RlbH0gTW9kZWxcclxuICovXHJcblxyXG4vKiEqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb2dyYW1JbmZvXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xQcm9ncmFtfSBwcm9ncmFtXHJcbiAqIEBwcm9wZXJ0eSB7UHJvZ3JhbUxvY2F0aW9uc30gbG9jYXRpb25zXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtTG9jYXRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFWZXJ0ZXhQb3NpdGlvblxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1UHJvamVjdGlvbk1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TW9kZWxWaWV3TWF0cml4XHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFUZXh0dXJlQ29vcmRcclxuICogQHByb3BlcnR5IHtHTGludH0gYUxpZ2h0aW5nXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVMaWdodGluZ0FjdGl2ZVxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZU1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZVxyXG4gKi9cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7UHJvZ3JhbUluZm99IHByb2dyYW1JbmZvXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWRkUGFkZGluZ1xyXG4gKiBAcGFyYW0ge01vZGVsfSBtb2RlbFxyXG4gKiBAcGFyYW0ge1dlYkdMVGV4dHVyZX0gbW9kZWxUZXh0dXJlXHJcbiAqIEBwYXJhbSB7V2ViR0xUZXh0dXJlfG51bGx9IGdsaW50VGV4dHVyZVxyXG4gKiBAcGFyYW0ge1tudW1iZXIsIG51bWJlciwgbnVtYmVyXX0gdHJhbnNsYXRpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlTXVsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhdyhnbCwgcHJvZ3JhbUluZm8sIGFkZFBhZGRpbmcsIG1vZGVsLCBtb2RlbFRleHR1cmUsIGdsaW50VGV4dHVyZSwgdHJhbnNsYXRpb24sIHNjYWxlTXVsKSB7XHJcbiAgICAvLyBDcmVhdGUgcHJvamVjdGlvbiBhbmQgbW9kZWwgdmlldyBtYXRyaXhcclxuICAgIGNvbnN0IGFzcGVjdCA9IGdsLmNhbnZhcy5jbGllbnRXaWR0aCAvIGdsLmNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcclxuICAgIG1hdDQub3J0aG8ocHJvamVjdGlvbk1hdHJpeCwgLWFzcGVjdCwgYXNwZWN0LCAtMSwgMSwgLTEwLCAxMCk7XHJcblxyXG4gICAgY29uc3QgbW9kZWxWaWV3TWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcclxuICAgIG1hdDQudHJhbnNsYXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCB0cmFuc2xhdGlvbik7XHJcblxyXG4gICAgY29uc3Qgc2NhbGUgPSAxIC8gKChhZGRQYWRkaW5nID8gbW9kZWwuc2NhbGVQYWRkZWQgOiBtb2RlbC5zY2FsZVVucGFkZGVkKSAqIHNjYWxlTXVsKTtcclxuICAgIG1hdDQuc2NhbGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIFtzY2FsZSwgc2NhbGUsIHNjYWxlXSk7XHJcblxyXG4gICAgaWYgKG1vZGVsLmlzM0QpIHtcclxuICAgICAgICBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgMzAgKiBNYXRoLlBJIC8gMTgwLCBbMSwgMCwgMF0pO1xyXG4gICAgICAgIG1hdDQucm90YXRlKG1vZGVsVmlld01hdHJpeCwgbW9kZWxWaWV3TWF0cml4LCA0NSAqIE1hdGguUEkgLyAxODAsIFswLCAxLCAwXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBzaGFkZXJzXHJcbiAgICBzZXRBdHRyaWJ1dGUoZ2wsIHByb2dyYW1JbmZvLmxvY2F0aW9ucy5hVmVydGV4UG9zaXRpb25zLCBtb2RlbC5wb3NpdGlvbiwgMyk7XHJcbiAgICBzZXRBdHRyaWJ1dGUoZ2wsIHByb2dyYW1JbmZvLmxvY2F0aW9ucy5hVGV4dHVyZUNvb3JkLCBtb2RlbC50ZXh0dXJlLCAyKTtcclxuICAgIHNldEF0dHJpYnV0ZShnbCwgcHJvZ3JhbUluZm8ubG9jYXRpb25zLmFMaWdodGluZywgbW9kZWwubGlnaHRpbmcsIDMpO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG1vZGVsLmluZGljZXMpO1xyXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtSW5mby5wcm9ncmFtKTtcclxuXHJcbiAgICBnbC51bmlmb3JtMWkocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVMaWdodGluZ0FjdGl2ZSwgMSk7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHByb2dyYW1JbmZvLmxvY2F0aW9ucy51UHJvamVjdGlvbk1hdHJpeCwgZmFsc2UsIHByb2plY3Rpb25NYXRyaXgpO1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihwcm9ncmFtSW5mby5sb2NhdGlvbnMudU1vZGVsVmlld01hdHJpeCwgZmFsc2UsIG1vZGVsVmlld01hdHJpeCk7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4M2Z2KHByb2dyYW1JbmZvLmxvY2F0aW9ucy51VGV4dHVyZU1hdHJpeCwgZmFsc2UsIG1hdDMuY3JlYXRlKCkpO1xyXG5cclxuICAgIC8vIERyYXcgbW9kZWxcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbW9kZWxUZXh0dXJlKTtcclxuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmUsIDApO1xyXG5cclxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIG1vZGVsLnZlcnRleENvdW50LCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XHJcblxyXG4gICAgLy8gRHJhdyBlbmNoYW50bWVudCBnbGludFxyXG4gICAgaWYgKCFnbGludFRleHR1cmUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VlIE1pbmVjcmFmdCB2MS44LjkgUmVuZGVySXRlbSNyZW5kZXJFZmZlY3QoSUJha2VkTW9kZWwpXHJcbiAgICBnbC5kZXB0aE1hc2soZmFsc2UpO1xyXG4gICAgZ2wuZGVwdGhGdW5jKGdsLkVRVUFMKTtcclxuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudUxpZ2h0aW5nQWN0aXZlLCAwKTsgLy8gZGlzYWJsZUxpZ2h0aW5nKClcclxuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQ09MT1IsIGdsLk9ORSk7XHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBnbGludFRleHR1cmUpO1xyXG4gICAgbGV0IHRleHR1cmVNYXRyaXggPSBtYXQzLmNyZWF0ZSgpOyAvLyBtYXRyaXhNb2RlKEdMX1RFWFRVUkUpXHJcbiAgICBjb25zdCBTQ0FMRSA9IDAuNTsgLy8gMTYgLyA4ICgxNiBpbiBNYXRyaXgsIDggaW4gc2NhbGUoLi4pKVxyXG4gICAgbWF0My5zY2FsZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBbU0NBTEUsIFNDQUxFLCBTQ0FMRV0pO1xyXG4gICAgbGV0IG9mZnNldEEgPSAoZ2V0U3lzdGVtVGltZSgpICUgMzAwMCkgLyAzMDAwIC8gU0NBTEU7XHJcbiAgICBtYXQzLnRyYW5zbGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBbb2Zmc2V0QSwgMF0pO1xyXG4gICAgbWF0My5yb3RhdGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgZGVnMnJhZCgtNTApLCBbMCwgMCwgMV0pO1xyXG5cclxuICAgIC8vIHJlbmRlck1vZGVsXHJcbiAgICBnbC51bmlmb3JtTWF0cml4M2Z2KHByb2dyYW1JbmZvLmxvY2F0aW9ucy51VGV4dHVyZU1hdHJpeCwgZmFsc2UsIHRleHR1cmVNYXRyaXgpO1xyXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgbW9kZWwudmVydGV4Q291bnQsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcclxuXHJcbiAgICB0ZXh0dXJlTWF0cml4ID0gbWF0My5jcmVhdGUoKTsgLy8gcG9wTWF0cml4KCk7IHB1c2hNYXRyaXgoKTtcclxuICAgIG1hdDMuc2NhbGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgW1NDQUxFLCBTQ0FMRSwgU0NBTEVdKTtcclxuICAgIGxldCBvZmZzZXRCID0gKGdldFN5c3RlbVRpbWUoKSAlIDQ4NzMpIC8gNDg3MyAvIFNDQUxFO1xyXG4gICAgbWF0My50cmFuc2xhdGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgWy1vZmZzZXRCLCAwXSk7XHJcbiAgICBtYXQzLnJvdGF0ZSh0ZXh0dXJlTWF0cml4LCB0ZXh0dXJlTWF0cml4LCBkZWcycmFkKDEwKSwgWzAsIDAsIDFdKTtcclxuXHJcbiAgICAvLyByZW5kZXJNb2RlbFxyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDNmdihwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmVNYXRyaXgsIGZhbHNlLCB0ZXh0dXJlTWF0cml4KTtcclxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIG1vZGVsLnZlcnRleENvdW50LCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XHJcblxyXG4gICAgcmVzZXREcmF3KGdsLCBmYWxzZSk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xlYXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldERyYXcoZ2wsIGNsZWFyKSB7XHJcbiAgICAvLyBSZXNldCBjYW52YXNcclxuICAgIGlmIChjbGVhcikge1xyXG4gICAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcclxuICAgICAgICBnbC5jbGVhckRlcHRoKDEuMCk7XHJcbiAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xyXG4gICAgZ2wuZGVwdGhNYXNrKHRydWUpO1xyXG5cclxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XHJcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZGVnMnJhZChpKSB7XHJcbiAgICByZXR1cm4gaSAqIE1hdGguUEkgLyAxODBcclxufVxyXG5cclxuLyohKlxyXG4gKiBTZWUgTWluZWNyYWZ0LmdldFN5c3RlbVRpbWUoKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U3lzdGVtVGltZSgpIHtcclxuICAgIHJldHVybiBEYXRlLm5vdygpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge0dMdWludH0gbG9jYXRpb25cclxuICogQHBhcmFtIHtXZWJHTEJ1ZmZlcn0gYnVmZmVyXHJcbiAqIEBwYXJhbSB7R0xpbnR9IGJ1ZmZlckVudHJ5U2l6ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKGdsLCBsb2NhdGlvbiwgYnVmZmVyLCBidWZmZXJFbnRyeVNpemUpIHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NhdGlvbiwgYnVmZmVyRW50cnlTaXplLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDAsKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxufVxyXG4iLAogICAgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZXhwb3J0IHsgTU9ERUxfQ1VCRSwgTU9ERUxfSVRFTSwgTU9ERUxfU0tVTExfQ09NUEFDVCwgTU9ERUxfU0tVTExfU0tJTiwgTW9kZWxUeXBlIH0gZnJvbSBcIi4vbW9kZWxzLmpzXCI7XHJcbmV4cG9ydCB7IFRleHR1cmVBbHRsYXMsIGNyZWF0ZUF0bGFzIH0gZnJvbSBcIi4vYXRsYXMuanNcIjtcclxuXHJcbmltcG9ydCB7IEdMSU5UX1RFWFRVUkUsIE1vZGVsVHlwZSB9IGZyb20gXCIuL21vZGVscy5qc1wiO1xyXG5pbXBvcnQgeyBkcmF3LCByZXNldERyYXcgfSBmcm9tIFwiLi9kcmF3LmpzXCI7XHJcbmltcG9ydCB7IHNldHVwU2hhZGVyLCBsb2FkVGV4dHVyZSwgbG9hZFRleHR1cmVBdXRvIH0gZnJvbSBcIi4vc2V0dXAuanNcIjtcclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gUmVuZGVyT3B0aW9uc1xyXG4gKiBAcHJvcGVydHkge01vZGVsVHlwZX0gbW9kZWxUeXBlIC0gT25lIG9mIHtAbGluayBNT0RFTF9DVUJFfSwge0BsaW5rIE1PREVMX0lURU19LCB7QGxpbmsgTU9ERUxfU0tVTExfQ09NUEFDVH0sIHtAbGluayBNT0RFTF9TS1VMTF9TS0lOfS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd8SW1hZ2VEYXRhfSB0ZXh0dXJlIC0gQSBVUkwgdG8gdGhlIG1vZGVsIHRleHR1cmUgb3IgYSB7QGxpbmsgVGV4dHVyZUFsdGxhc30gY3V0b3V0LlxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtlbmNoYW50ZWQ9ZmFsc2VdIC0gQXBwbGllcyBNaW5lY3JhZnQncyBlbmNoYW50bWVudCBnbGludC5cclxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW5JbnZlbnRvcnk9ZmFsc2VdIC0gQXBwbGllcyBwYWRkaW5nIHRvIG1hdGNoIHJlbmRlcmluZyBvZiBNaW5lY3JhZnQgaXRlbXMgaW4gaW52ZW50b3J5LlxyXG4gKiBAcHJvcGVydHkge1tudW1iZXIsIG51bWJlciwgbnVtYmVyXX0gW3RyYW5zbGF0aW9uPVswLCAwLCAwXV0gLSBBcHBsaWVzIGEgdHJhbnNsYXRpb24gdG8gdGhlIG1vZGVsLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlPTFdIC0gU2NhbGVzIHRoZSBtb2RlbC5cclxuICogQHB1YmxpY1xyXG4gKi9cclxuXHJcbi8qISpcclxuICogQ3JlYXRlcyBhIG5ldyByZW5kZXJlci5cclxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzIC0gVGhlIGNhbnZhcyB0byByZW5kZXIgb24uXHJcbiAqIEBwYXJhbSB7UmVuZGVyT3B0aW9uc30gcmVuZGVyT3B0aW9ucyAtIFdoYXQgdG8gcmVuZGVyLlxyXG4gKiBAcGFyYW0ge1dlYkdMQ29udGV4dEF0dHJpYnV0ZXN9IFtjb250ZXh0QXR0cmlidXRlcz17YW50aWFsaWFzOiBmYWxzZX1dIC0gQXJiaXRyYXJ5IFdlYkdMIGNvbnRleHQgYXR0cmlidXRlcy5cclxuICogQHJldHVybnMge1Byb21pc2U8UmVuZGVyZXI+fVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVuZGVyZXIoY2FudmFzLCByZW5kZXJPcHRpb25zLCBjb250ZXh0QXR0cmlidXRlcykge1xyXG4gICAgcmV0dXJuIGNyZWF0ZU11bHRpUmVuZGVyZXIoY2FudmFzLCBbcmVuZGVyT3B0aW9uc10sIGNvbnRleHRBdHRyaWJ1dGVzKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHJlbmRlcmVyIHdpdGggbXVsdGlwbGUgbW9kZWxzLlxyXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXMgLSBUaGUgY2FudmFzIHRvIHJlbmRlciBvbi5cclxuICogQHBhcmFtIHtSZW5kZXJPcHRpb25zW119IHJlbmRlck9wdGlvbnNBcnJheSAtIFdoYXQgdG8gcmVuZGVyLlxyXG4gKiBAcGFyYW0ge1dlYkdMQ29udGV4dEF0dHJpYnV0ZXN9IFtjb250ZXh0QXR0cmlidXRlcz17YW50aWFsaWFzOiBmYWxzZX1dIC0gQXJiaXRyYXJ5IFdlYkdMIGNvbnRleHQgYXR0cmlidXRlcy5cclxuICogQHJldHVybnMge1Byb21pc2U8UmVuZGVyZXI+fVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlTXVsdGlSZW5kZXJlcihjYW52YXMsIHJlbmRlck9wdGlvbnNBcnJheSwgY29udGV4dEF0dHJpYnV0ZXMpIHtcclxuICAgIGlmICghd2luZG93LmdsTWF0cml4Py5tYXQ0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgbWF0cml4IGxpYnJhcnkuIFBsZWFzZSBlbnN1cmUgeW91IGluY2x1ZGUgZ2xNYXRyaXggdjMuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc2FibGUgYW50aWFsaWFzIGJ5IGRlZmF1bHRcclxuICAgIGNvbnRleHRBdHRyaWJ1dGVzIHx8PSB7fTtcclxuICAgIGlmIChjb250ZXh0QXR0cmlidXRlcy5hbnRpYWxpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnRleHRBdHRyaWJ1dGVzLmFudGlhbGlhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiLCBjb250ZXh0QXR0cmlidXRlcyk7XHJcbiAgICBpZiAoZ2wgPT09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG1heSBub3Qgc3VwcG9ydCBpdC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvZ3JhbUluZm8gPSBzZXR1cFNoYWRlcihnbCk7XHJcblxyXG4gICAgbGV0IGRyYXdDYWxscyA9IFsoKSA9PiByZXNldERyYXcoZ2wsIHRydWUpXTtcclxuICAgIGZvciAobGV0IHJlbmRlck9wdGlvbnMgb2YgcmVuZGVyT3B0aW9uc0FycmF5KSB7XHJcbiAgICAgICAgLy8gTG9hZCB0ZXh0dXJlXHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IGF3YWl0IGxvYWRUZXh0dXJlQXV0byhnbCwgcmVuZGVyT3B0aW9ucy50ZXh0dXJlKTtcclxuICAgICAgICBjb25zdCBnbGludFRleHR1cmUgPSByZW5kZXJPcHRpb25zLmVuY2hhbnRlZCA/IGxvYWRUZXh0dXJlKGdsLCBHTElOVF9URVhUVVJFLCA2NCwgNjQpIDogbnVsbDtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGRyYXcgY2FsbFxyXG4gICAgICAgIGNvbnN0IG1vZGVsID0gcmVuZGVyT3B0aW9ucy5tb2RlbFR5cGUuY3JlYXRlKGdsKTtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHJlbmRlck9wdGlvbnMudHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlTXVsID0gMSAvIChyZW5kZXJPcHRpb25zLnNjYWxlIHx8IDEpOyAvLyBUYWtlIGludmVyc2Ugb2Ygc2NhbGUgc28gdGhhdCBiaWdnZXIgc2NhbGUgPSBiaWdnZXIgbW9kZWxcclxuICAgICAgICBkcmF3Q2FsbHMucHVzaCgoKSA9PiBkcmF3KGdsLCBwcm9ncmFtSW5mbywgcmVuZGVyT3B0aW9ucy5pbkludmVudG9yeSwgbW9kZWwsIHRleHR1cmUsIGdsaW50VGV4dHVyZSwgdHJhbnNsYXRpb24sIHNjYWxlTXVsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhcnQgcmVuZGVyIGxvb3BcclxuICAgIGxldCBhY3RpdmVIYW5kbGU7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIGRyYXdDYWxscy5mb3JFYWNoKGNhbGwgPT4gY2FsbCgpKTtcclxuICAgICAgICBpZiAoYWN0aXZlSGFuZGxlKVxyXG4gICAgICAgICAgICBhY3RpdmVIYW5kbGUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcclxuICAgIH1cclxuICAgIGFjdGl2ZUhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUmVuZGVyZXIoKCkgPT4ge1xyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFjdGl2ZUhhbmRsZSk7XHJcbiAgICAgICAgYWN0aXZlSGFuZGxlID0gbnVsbDtcclxuICAgICAgICBnbC5nZXRFeHRlbnNpb24oXCJXRUJHTF9sb3NlX2NvbnRleHRcIik/Lmxvc2VDb250ZXh0KCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBBbiBhY3RpdmUgcmVuZGVyLiBTZWUge0BsaW5rIGNyZWF0ZVJlbmRlcmVyfS5cclxuICogQHB1YmxpY1xyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoZGVzdHJveUZ1bmMpIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lGdW5jID0gZGVzdHJveUZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgLyohKlxyXG4gICAgICogRGVzdHJveXMgdGhlIHJlbmRlcmVyLlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUZ1bmMoKTtcclxuICAgIH1cclxufVxyXG4iCiAgXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CTyxNQUFNLFVBQVU7QUFBQSxFQUNuQixXQUFXLENBQUMsV0FBVztBQUFBLElBQ25CLEtBQUssWUFBWTtBQUFBO0FBQUEsRUFPckIsTUFBTSxDQUFDLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQ1AsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUFBO0FBRWhDO0FBSUEsSUFBTSxvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTTtB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RyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsSUFDN0MsQ0FBQztBQUFBLElBQ0QsVUFBVSxNQUFNLElBQUk7QUFBQSxNQUNoQixDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUM3QyxDQUFDO0FBQUEsRUFDTCxDQUFDO0FBQUEsRUFFRCxNQUFNLFVBQVUsV0FBVyxJQUFJLENBQUM7QUFBQSxFQUVoQyxNQUFNLFVBQVUsV0FBVyxJQUFJLEdBQUc7QUFBQSxJQUM5QixDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxDQUFDO0FBQUEsRUFFRCxNQUFNLFdBQVcsWUFBWSxJQUFJO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0osQ0FBQztBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQWEsSUFBSTtBQUFBLElBQ2pCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLE1BQU07QUFBQSxFQUNWO0FBQUEsQ0FDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9NLElBQU0sc0JBQXNCLElBQUksVUFBVSxRQUFNO0FBQUEsRUFFbkQsTUFBTSxXQUFXLGFBQWEsSUFBSTtBQUFBLElBQzlCLFVBQVUsSUFBSSxJQUFJO0FBQUEsTUFDZCxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUM3QyxDQUFDO0FBQUEsSUFDRCxVQUFVLE1BQU0sSUFBSTtBQUFBLE1BQ2hCLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FB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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXekUsZUFBc0IsbUJBQW1CLENBQUMsUUFBUSxvQkFBb0IsbUJBQW1CO0FBQUEsRUFDckYsS0FBSyxPQUFPLFVBQVUsTUFBTTtBQUFBLElBQ3hCLE1BQU0sSUFBSSxNQUFNLHVFQUF1RTtBQUFBLEVBQzNGO0FBQUEsRUFHQSxzQkFBc0IsQ0FBQztBQUFBLEVBQ3ZCLElBQUksa0JBQWtCLGNBQWMsV0FBVztBQUFBLElBQzNDLGtCQUFrQixZQUFZO0FBQUEsRUFDbEM7QUFBQSxFQUVBLE1BQU0sS0FBSyxPQUFPLFdBQVcsU0FBUyxpQkFBaUI7QUFBQSxFQUN2RCxJQUFJLE9BQU8sTUFBTTtBQUFBLElBQ2IsTUFBTSxJQUFJLE1BQU0sOERBQThEO0FBQUEsRUFDbEY7QUFBQSxFQUVBLE1BQU0sY0FBYyxZQUFZLEVBQUU7QUFBQSxFQUVsQyxJQUFJLFlBQVksQ0FBQyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUM7QUFBQSxFQUMxQyxTQUFTLGlCQUFpQixvQkFBb0I7QUFBQSxJQUUxQyxNQUFNLFVBQVUsTUFBTSxnQkFBZ0IsSUFBSSxjQUFjLE9BQU87QUFBQSxJQUMvRCxNQUFNLGVBQWUsY0FBYyxZQUFZLFlBQVksSUFBSSxlQUFlLElBQUksRUFBRSxJQUFJO0FBQUEsSUFHeEYsTUFBTSxRQUFRLGNBQWMsVUFBVSxPQUFPLEVBQUU7QUFBQSxJQUMvQyxNQUFNLGNBQWMsY0FBYyxlQUFlLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUN6RCxNQUFNLFdBQVcsS0FBSyxjQUFjLFNBQVM7QUFBQSxJQUM3QyxVQUFVLEtBQUssTUFBTSxLQUFLLElBQUksYUFBYSxjQUFjLGFBQWEsT0FBTyxTQUFTLGNBQWMsYUFBYSxRQUFRLENBQUM7QUFBQSxFQUM5SDtBQUFBLEVBR0EsSUFBSTtBQUFBLEVBRUosU0FBUyxNQUFNLEdBQUc7QUFBQSxJQUNkLFVBQVUsUUFBUSxVQUFRLEtBQUssQ0FBQztBQUFBLElBQ2hDLElBQUk7QUFBQSxNQUNBLGVBQWUsc0JBQXNCLE1BQU07QUFBQTtBQUFBLEVBRW5ELGVBQWUsc0JBQXNCLE1BQU07QUFBQSxFQUUzQyxPQUFPLElBQUksU0FBUyxNQUFNO0FBQUEsSUFDdEIscUJBQXFCLFlBQVk7QUFBQSxJQUNqQyxlQUFlO0FBQUEsSUFDZixHQUFHLGFBQWEsb0JBQW9CLEdBQUcsWUFBWTtBQUFBLEdBQ3REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFFLE1BQU0sU0FBUztBQUFBLEVBQ2xCLFdBQVcsQ0FBQyxhQUFhO0FBQUEsSUFDckIsS0FBSyxjQUFjO0FBQUE7QUFBQSxFQU92QixPQUFPLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQ04sS0FBSyxZQUFZO0FBQUE7QUFFekI7IiwKICAiZGVidWdJZCI6ICI4NzFGMjYzRkQxQ0FDMDMxNjQ3NTZFMjE2NDc1NkUyMSIsCiAgIm5hbWVzIjogW10KfQ==
