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

// lib/index.js
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
  let image;
  if (typeof renderOptions.texture === "string") {
    image = await loadTextureFromURL(renderOptions.texture);
  } else {
    image = renderOptions.texture;
  }
  const texture = loadTexture(gl, image, image.width, image.height);
  const glintTexture = renderOptions.enchanted ? loadTexture(gl, GLINT_TEXTURE, 64, 64) : null;
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const model = renderOptions.modelType.create(gl);
  let activeHandle;
  draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture);
  function render() {
    draw(gl, programInfo, renderOptions.inInventory, model, texture, glintTexture);
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
  createAtlas,
  TextureAltlas,
  Renderer,
  ModelType,
  MODEL_SKULL_SKIN,
  MODEL_SKULL_COMPACT,
  MODEL_ITEM,
  MODEL_CUBE
};

//# debugId=34F58AF976D36E7C64756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGliXFxtb2RlbHMuanMiLCAibGliXFxzZXR1cC5qcyIsICJsaWJcXGF0bGFzLmpzIiwgImxpYlxcZHJhdy5qcyIsICJsaWJcXGluZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWwogICAgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb2RlbFxyXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBwb3NpdGlvblxyXG4gKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBpbmRpY2VzXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xCdWZmZXJ9IHRleHR1cmVcclxuICogQHByb3BlcnR5IHtXZWJHTEJ1ZmZlcn0gbGlnaHRpbmcgLSBQcmViYWtlZCBsaWdodGluZ1xyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdmVydGV4Q291bnRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjYWxlUGFkZGVkIC0gT3J0aG8gbWF0cml4IHNjYWxpbmcgd2hlbiBhZGRQYWRkaW5nPXRydWVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjYWxlVW5wYWRkZWQgLSBPcnRobyBtYXRyaXggc2NhbGluZyB3aGVuIGFkZFBhZGRpbmc9ZmFsc2VcclxuICogQHByb3BlcnR5IHtib29sZWFufSBpczNEIC0gV2hldGhlciB0byBhcHBseSAzMMKwIHJvdGF0aW9uIGZvciBpc29tZXRyaWMgdmlld1xyXG4gKi9cclxuXHJcbi8qISpcclxuICogT25lIG9mIHtAbGluayBNT0RFTF9DVUJFfSwge0BsaW5rIE1PREVMX0lURU19LCB7QGxpbmsgTU9ERUxfU0tVTExfQ09NUEFDVH0sIHtAbGluayBNT0RFTF9TS1VMTF9TS0lOfS5cclxuICogQHB1YmxpY1xyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kZWxUeXBlIHtcclxuICAgIGNvbnN0cnVjdG9yKGdlbmVyYXRvcikge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qISpcclxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gICAgICogQHJldHVybnMge01vZGVsfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoZ2wpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0b3IoZ2wpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBFeHRyYWN0ZWQgZnJvbSBodHRwczovL21jYXNzZXQuY2xvdWQvMS44LjkvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9taXNjL2VuY2hhbnRlZF9pdGVtX2dsaW50LnBuZ1xyXG4vLyBGaXJzdCByb3csIG9ubHkgUiBjb21wb25lbnRcclxuY29uc3QgR0xJTlRfVEVYVFVSRV9SQVcgPSBbXHJcbiAgICAweDY4LCAweDMxLCAweDVCLCAweDM4LCAweDRGLCAweDYyLCAweDZELCAweDU5LCAweDU2LCAweDcxLCAweDZCLCAweDg0LCAweDgyLCAweEEwLCAweDZDLCAweDZBLFxyXG4gICAgMHg3NCwgMHg2RCwgMHhBMywgMHhERCwgMHhCOCwgMHhBMCwgMHg5NSwgMHg4MywgMHg4NiwgMHg4NiwgMHgzRiwgMHgxOCwgMHg0MSwgMHg0RSwgMHg1RSwgMHg3RCxcclxuICAgIDB4NzksIDB4NzksIDB4ODMsIDB4NUQsIDB4N0UsIDB4OEYsIDB4OTAsIDB4QTYsIDB4OUIsIDB4QkQsIDB4Q0MsIDB4RkYsIDB4RTUsIDB4REEsIDB4RDEsIDB4QzUsXHJcbiAgICAweDlBLCAweDY5LCAweDY4LCAweDlDLCAweDhCLCAweDg5LCAweDU3LCAweDUwLCAweDZGLCAweDU3LCAweDVGLCAweDY3LCAweDZDLCAweDk0LCAweDk4LCAweDRCXHJcbl07XHJcblxyXG4vLyBVbmNvbXByZXNzZWQgdGV4dHVyZVxyXG5leHBvcnQgY29uc3QgR0xJTlRfVEVYVFVSRSA9IG5ldyBJbWFnZURhdGEobmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG5ldyBBcnJheSg2NCkuZmlsbChHTElOVF9URVhUVVJFX1JBVy5tYXAoYyA9PiBbXHJcbiAgICAvLyBNaW5lY3JhZnQgdXNlcyBhIGNvbG9yIG11bHRpcGxpZXIgb2YgMHg4MDQwQ0Mgd2hlbiByZW5kZXJpbmcgdGhlIGVuY2hhbnRtZW50IHRleHR1cmUuXHJcbiAgICAvLyBXZSBiYWtlIGl0IGRpcmVjdGx5IGludG8gdGhlIHRleHR1cmUgZm9yIHNpbXBsaWNpdHkuXHJcbiAgICBjICogMHg4MCAvIDB4RkYsXHJcbiAgICBjICogMHg0MCAvIDB4RkYsXHJcbiAgICBjICogMHhDQyAvIDB4RkYsXHJcbiAgICAweEZGLFxyXG5dKSkuZmxhdCgyKSksIDY0LCA2NCk7XHJcblxyXG4vKiEqXHJcbiAqIFNpbXBsZSAyRCBwbGFuZSAvIE1pbmVjcmFmdCBpdGVtLlxyXG4gKiBAdHlwZSB7TW9kZWxUeXBlfVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTU9ERUxfSVRFTSA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIHBvc2l0aW9ucygxLCBbXHJcbiAgICAgICAgWzEsIDEsIDFdLCBbMCwgMSwgMV0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLFxyXG4gICAgXSkpO1xyXG5cclxuICAgIGNvbnN0IGluZGljZXMgPSBpbmRpY2VzQnVmKGdsLCAxKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUJ1ZihnbCwgMSwgW1xyXG4gICAgICAgIFswLCAwXVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgbGlnaHRpbmcgPSBsaWdodGluZ0J1ZihnbCwgW1xyXG4gICAgICAgIDI1NVxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICBpbmRpY2VzLFxyXG4gICAgICAgIHRleHR1cmUsXHJcbiAgICAgICAgbGlnaHRpbmcsXHJcbiAgICAgICAgdmVydGV4Q291bnQ6IDYgKiAxLFxyXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjAsXHJcbiAgICAgICAgc2NhbGVVbnBhZGRlZDogMS4wLFxyXG4gICAgICAgIGlzM0Q6IGZhbHNlXHJcbiAgICB9O1xyXG59KTtcclxuXHJcbi8qISpcclxuICogU2ltcGxlIGN1YmUgLyBNaW5lY3JhZnQgYmxvY2suXHJcbiAqIEB0eXBlIHtNb2RlbFR5cGV9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBjb25zdCBNT0RFTF9DVUJFID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XHJcbiAgICAvLyBSZW1vdmVkIGN1bGxlZCBmYWNlc1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIHBvc2l0aW9ucygxLCBbXHJcbiAgICAgICAgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCAvLyBUb3BcclxuICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIExlZnRcclxuICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFJpZ2h0XHJcbiAgICBdKSk7XHJcblxyXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDMpO1xyXG5cclxuICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlQnVmKGdsLCAyLCBbXHJcbiAgICAgICAgWzAsIDBdLCAvLyBUb3BcclxuICAgICAgICBbMCwgMV0sIC8vIExlZnRcclxuICAgICAgICBbMSwgMF0sIC8vIFJpZ2h0XHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXHJcbiAgICAgICAgMjU1LCAvLyBUb3BcclxuICAgICAgICAxNjIsIC8vIExlZnRcclxuICAgICAgICAxMTEsIC8vIFJpZ2h0XHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBvc2l0aW9uLFxyXG4gICAgICAgIGluZGljZXMsXHJcbiAgICAgICAgdGV4dHVyZSxcclxuICAgICAgICBsaWdodGluZyxcclxuICAgICAgICB2ZXJ0ZXhDb3VudDogNiAqIDMsXHJcbiAgICAgICAgc2NhbGVQYWRkZWQ6IDEuNixcclxuICAgICAgICBzY2FsZVVucGFkZGVkOiAxLjU3MzIsXHJcbiAgICAgICAgaXMzRDogdHJ1ZVxyXG4gICAgfTtcclxufSk7XHJcblxyXG4vKiEqXHJcbiAqIFNrZWxldG9uIC8gUGxheWVyIHNrdWxsLCB1c2luZyB0aGUgTWluZWNyYWZ0IHNraW4gdGV4dHVyZSBsYXlvdXQuXHJcbiAqIEB0eXBlIHtNb2RlbFR5cGV9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBjb25zdCBNT0RFTF9TS1VMTF9TS0lOID0gbmV3IE1vZGVsVHlwZShnbCA9PiB7XHJcbiAgICAvLyBSZW1vdmVkIGN1bGxlZCBmYWNlc1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNCdWYoZ2wsIFtcclxuICAgICAgICBwb3NpdGlvbnMoOCAvIDE2LCBbXHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gTG93ZXIsIFRvcFxyXG4gICAgICAgICAgICBbMCwgMSwgMV0sIFswLCAxLCAwXSwgWzAsIDAsIDBdLCBbMCwgMCwgMV0sIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgcG9zaXRpb25zKDguNSAvIDE2LCBbXHJcbiAgICAgICAgICAgIFsxLCAxLCAwXSwgWzAsIDEsIDBdLCBbMCwgMSwgMV0sIFsxLCAxLCAxXSwgLy8gVXBwZXIsIFRvcFxyXG4gICAgICAgICAgICBbMSwgMCwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICAgICAgWzAsIDEsIDFdLCBbMCwgMSwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFsxLCAxLCAxXSwgWzEsIDAsIDFdLCBbMSwgMCwgMF0sIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XHJcbiAgICAgICAgICAgIFsxLCAxLCAxXSwgWzAsIDEsIDFdLCBbMCwgMCwgMV0sIFsxLCAwLCAxXSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgICAgIFswLCAxLCAwXSwgWzEsIDEsIDBdLCBbMSwgMCwgMF0sIFswLCAwLCAwXSwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgICAgIF0pXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBpbmRpY2VzID0gaW5kaWNlc0J1ZihnbCwgOSk7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVCdWYoZ2wsIDgsIFtcclxuICAgICAgICBbMSwgMF0sIC8vIExvd2VyLCBUb3BcclxuICAgICAgICBbMCwgMV0sIC8vIExvd2VyLCBMZWZ0XHJcbiAgICAgICAgWzEsIDFdLCAvLyBMb3dlciwgUmlnaHRcclxuICAgICAgICBbNSwgMF0sIC8vIFVwcGVyLCBUb3BcclxuICAgICAgICBbNiwgMF0sIC8vIFVwcGVyLCBCb3R0b21cclxuICAgICAgICBbNCwgMV0sIC8vIFVwcGVyLCBMZWZ0XHJcbiAgICAgICAgWzYsIDFdLCAvLyBVcHBlciwgQmFjayBSaWdodFxyXG4gICAgICAgIFs1LCAxXSwgLy8gVXBwZXIsIFJpZ2h0XHJcbiAgICAgICAgWzcsIDFdLCAvLyBVcHBlciwgQmFjayBMZWZ0XHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBsaWdodGluZyA9IGxpZ2h0aW5nQnVmKGdsLCBbXHJcbiAgICAgICAgMjU1LCAvLyBMb3dlciwgVG9wXHJcbiAgICAgICAgMTYyLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgIDExMSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgMjU1LCAvLyBVcHBlciwgVG9wXHJcbiAgICAgICAgMTAyLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgMTYyLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgIDE5MCwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcclxuICAgICAgICAxMTEsIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgIDE4NCwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbixcclxuICAgICAgICBpbmRpY2VzLFxyXG4gICAgICAgIHRleHR1cmUsXHJcbiAgICAgICAgbGlnaHRpbmcsXHJcbiAgICAgICAgdmVydGV4Q291bnQ6IDYgKiA5LFxyXG4gICAgICAgIHNjYWxlUGFkZGVkOiAxLjEyLFxyXG4gICAgICAgIHNjYWxlVW5wYWRkZWQ6IDAuODM2LFxyXG4gICAgICAgIGlzM0Q6IHRydWVcclxuICAgIH07XHJcbn0pO1xyXG5cclxuLyohKlxyXG4gKiBTa2VsZXRvbiAvIFBsYXllciBza3VsbCwgdXNpbmcgYSBjb21wYWN0IHRleHR1cmUgbGF5b3V0LlxyXG4gKiBAdHlwZSB7TW9kZWxUeXBlfVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTU9ERUxfU0tVTExfQ09NUEFDVCA9IG5ldyBNb2RlbFR5cGUoZ2wgPT4ge1xyXG4gICAgLy8gUmVtb3ZlZCBjdWxsZWQgZmFjZXNcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gcG9zaXRpb25zQnVmKGdsLCBbXHJcbiAgICAgICAgcG9zaXRpb25zKDggLyAxNiwgW1xyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIC8vIExvd2VyLCBUb3BcclxuICAgICAgICAgICAgWzAsIDEsIDFdLCBbMCwgMSwgMF0sIFswLCAwLCAwXSwgWzAsIDAsIDFdLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIExvd2VyLCBSaWdodFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIHBvc2l0aW9ucyg4LjUgLyAxNiwgW1xyXG4gICAgICAgICAgICBbMSwgMSwgMF0sIFswLCAxLCAwXSwgWzAsIDEsIDFdLCBbMSwgMSwgMV0sIC8vIFVwcGVyLCBUb3BcclxuICAgICAgICAgICAgWzEsIDAsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgWzEsIDAsIDFdLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgICAgIFswLCAxLCAxXSwgWzAsIDEsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAxXSwgLy8gVXBwZXIsIExlZnRcclxuICAgICAgICAgICAgWzEsIDEsIDBdLCBbMSwgMSwgMV0sIFsxLCAwLCAxXSwgWzEsIDAsIDBdLCAvLyBVcHBlciwgQmFjayBSaWdodFxyXG4gICAgICAgICAgICBbMSwgMSwgMV0sIFswLCAxLCAxXSwgWzAsIDAsIDFdLCBbMSwgMCwgMV0sIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgICAgICBbMCwgMSwgMF0sIFsxLCAxLCAwXSwgWzEsIDAsIDBdLCBbMCwgMCwgMF0sIC8vIFVwcGVyLCBCYWNrIExlZnRcclxuICAgICAgICBdKVxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgaW5kaWNlcyA9IGluZGljZXNCdWYoZ2wsIDkpO1xyXG5cclxuICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlQnVmKGdsLCAzLCBbXHJcbiAgICAgICAgWzAsIDBdLCAvLyBMb3dlciwgVG9wXHJcbiAgICAgICAgWzAsIDFdLCAvLyBMb3dlciwgTGVmdFxyXG4gICAgICAgIFsxLCAwXSwgLy8gTG93ZXIsIFJpZ2h0XHJcbiAgICAgICAgWzIsIDBdLCAvLyBVcHBlciwgVG9wXHJcbiAgICAgICAgWzAsIDJdLCAvLyBVcHBlciwgQm90dG9tXHJcbiAgICAgICAgWzEsIDFdLCAvLyBVcHBlciwgTGVmdFxyXG4gICAgICAgIFsxLCAyXSwgLy8gVXBwZXIsIEJhY2sgUmlnaHRcclxuICAgICAgICBbMiwgMV0sIC8vIFVwcGVyLCBSaWdodFxyXG4gICAgICAgIFsyLCAyXSwgLy8gVXBwZXIsIEJhY2sgTGVmdFxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc3QgbGlnaHRpbmcgPSBsaWdodGluZ0J1ZihnbCwgW1xyXG4gICAgICAgIDI1NSwgLy8gTG93ZXIsIFRvcFxyXG4gICAgICAgIDE2MiwgLy8gTG93ZXIsIExlZnRcclxuICAgICAgICAxMTEsIC8vIExvd2VyLCBSaWdodFxyXG4gICAgICAgIDI1NSwgLy8gVXBwZXIsIFRvcFxyXG4gICAgICAgIDEwMiwgLy8gVXBwZXIsIEJvdHRvbVxyXG4gICAgICAgIDE2MiwgLy8gVXBwZXIsIExlZnRcclxuICAgICAgICAxOTAsIC8vIFVwcGVyLCBCYWNrIFJpZ2h0XHJcbiAgICAgICAgMTExLCAvLyBVcHBlciwgUmlnaHRcclxuICAgICAgICAxODQsIC8vIFVwcGVyLCBCYWNrIExlZnRcclxuICAgIF0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcG9zaXRpb24sXHJcbiAgICAgICAgaW5kaWNlcyxcclxuICAgICAgICB0ZXh0dXJlLFxyXG4gICAgICAgIGxpZ2h0aW5nLFxyXG4gICAgICAgIHZlcnRleENvdW50OiA2ICogOSxcclxuICAgICAgICBzY2FsZVBhZGRlZDogMS4xMixcclxuICAgICAgICBzY2FsZVVucGFkZGVkOiAwLjgzNixcclxuICAgICAgICBpczNEOiB0cnVlXHJcbiAgICB9O1xyXG59KTtcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbnNcclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlXHJcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gcG9zaXRpb25zIC0gRm9yIGVhY2ggcmVjdGFuZ2xlIDQgYXJyYXlzIHdpdGggMyBlbnRyaWVzIG9mIDAgb3IgMSAtIGp1c3QgbG9vayBhdCB0aGUgdXNhZ2VzIGlkayB3aGF0IHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJbXX1cclxuICovXHJcbmZ1bmN0aW9uIHBvc2l0aW9ucyhzY2FsZSwgcG9zaXRpb25zKSB7XHJcbiAgICByZXR1cm4gcG9zaXRpb25zXHJcbiAgICAgICAgLmZsYXQoKVxyXG4gICAgICAgIC5tYXAodiA9PiAoKHYgKiAyKSAtIDEpICogc2NhbGUpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge0dMZW51bX0gdGFyZ2V0XHJcbiAqIEBwYXJhbSB7QWxsb3dTaGFyZWRCdWZmZXJTb3VyY2V9IGRhdGFcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gYnVmKGdsLCB0YXJnZXQsIGRhdGEpIHtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKHRhcmdldCwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgcmV0dXJuIGJ1ZmZlcjtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YSAtIHNlZSBwb3NpdGlvbnNcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gcG9zaXRpb25zQnVmKGdsLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YS5mbGF0KCkpKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtudW1iZXJ9IHJlY3RhbmdsZUNvdW50XHJcbiAqIEByZXR1cm5zIHtXZWJHTEJ1ZmZlcn1cclxuICovXHJcbmZ1bmN0aW9uIGluZGljZXNCdWYoZ2wsIHJlY3RhbmdsZUNvdW50KSB7XHJcbiAgICBsZXQgdmVydGV4RGF0YSA9IFsuLi5BcnJheShyZWN0YW5nbGVDb3VudCkua2V5cygpXVxyXG4gICAgICAgIC5tYXAoaSA9PiAoW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMiwgaSAqIDQsIGkgKiA0ICsgMiwgaSAqIDQgKyAzXSkpXHJcbiAgICAgICAgLmZsYXQoKTtcclxuXHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHZlcnRleERhdGEpKTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtudW1iZXJ9IHVuaXRzIC0gSG93IG1hbnkgdW5pdHMgdGhlIHRleHR1cmUgaXMgc3BsaXQgaW50bywgcGVyIGF4aXNcclxuICogQHBhcmFtIHtudW1iZXJbXVtdfSBkYXRhIC0gRm9yIGVhY2ggcmVjdCBbdSwgdl0gaW4gdW5pdHNcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdGV4dHVyZUJ1ZihnbCwgdW5pdHMsIGRhdGEpIHtcclxuICAgIGxldCB2ZXJ0ZXhEYXRhID0gZGF0YS5tYXAoZCA9PiAoW1xyXG4gICAgICAgIC8vIFRleHR1cmVzIGdvIENDV1xyXG4gICAgICAgIGRbMF0gKyAxLjAsIGRbMV0gKyAwLjAsXHJcbiAgICAgICAgZFswXSArIDAuMCwgZFsxXSArIDAuMCxcclxuICAgICAgICBkWzBdICsgMC4wLCBkWzFdICsgMS4wLFxyXG4gICAgICAgIGRbMF0gKyAxLjAsIGRbMV0gKyAxLjBcclxuICAgIF0pKVxyXG4gICAgICAgIC5mbGF0KClcclxuICAgICAgICAubWFwKHYgPT4gdiAvIHVuaXRzKTtcclxuXHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSkpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge251bWJlcltdfSBkYXRhIC0gUHJlYmFrZWQgbGlnaHRpbmcsIG9uZSB2YWx1ZSAwIC0gMjU1IGZvciBlYWNoIHJlY3RcclxuICogQHJldHVybnMge1dlYkdMQnVmZmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gbGlnaHRpbmdCdWYoZ2wsIGRhdGEpIHtcclxuICAgIGxldCB2ZXJ0ZXhEYXRhID0gZGF0YVxyXG4gICAgICAgIC5tYXAodiA9PiB2IC8gMjU1KSAvLyBNdWx0aXBsaWVyLCAwIC0gMVxyXG4gICAgICAgIC5tYXAodiA9PiBbdiwgdiwgdl0pIC8vIEZvciBlYWNoIGNvbG9yIGNoYW5uZWxcclxuICAgICAgICAubWFwKHYgPT4gW3YsIHYsIHYsIHZdKSAvLyBGb3IgZWFjaCB2ZXJ0ZXggcGVyIHJlY3RcclxuICAgICAgICAuZmxhdCgyKTtcclxuXHJcbiAgICByZXR1cm4gYnVmKGdsLCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSkpO1xyXG59XHJcbiIsCiAgICAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiEqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFByb2dyYW1JbmZvXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xQcm9ncmFtfSBwcm9ncmFtXHJcbiAqIEBwcm9wZXJ0eSB7UHJvZ3JhbUxvY2F0aW9uc30gbG9jYXRpb25zXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtTG9jYXRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFWZXJ0ZXhQb3NpdGlvblxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1UHJvamVjdGlvbk1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TW9kZWxWaWV3TWF0cml4XHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFUZXh0dXJlQ29vcmRcclxuICogQHByb3BlcnR5IHtHTGludH0gYUxpZ2h0aW5nXHJcbiAqIEBwcm9wZXJ0eSB7V2ViR0xVbmlmb3JtTG9jYXRpb259IHVMaWdodGluZ0FjdGl2ZVxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZU1hdHJpeFxyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1VGV4dHVyZVxyXG4gKi9cclxuXHJcbmNvbnN0IFZFUlRFWF9TSEFERVIgPSBbXHJcbiAgICBcImF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbjtcIixcclxuICAgIFwidW5pZm9ybSBtYXQ0IHVNb2RlbFZpZXdNYXRyaXg7XCIsXHJcbiAgICBcInVuaWZvcm0gbWF0NCB1UHJvamVjdGlvbk1hdHJpeDtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcImF0dHJpYnV0ZSAgICAgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFxyXG4gICAgXCJ2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcIixcclxuICAgIFwiYXR0cmlidXRlICAgICB2ZWMzIGFMaWdodGluZztcIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMzIHZMaWdodGluZztcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInZvaWQgbWFpbih2b2lkKSB7XCIsXHJcbiAgICBcIiAgICBnbF9Qb3NpdGlvbiA9IHVQcm9qZWN0aW9uTWF0cml4ICogdU1vZGVsVmlld01hdHJpeCAqIGFWZXJ0ZXhQb3NpdGlvbjtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcIiAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcclxuICAgIFwiICAgIHZMaWdodGluZyA9IGFMaWdodGluZztcIixcclxuICAgIFwifVwiLFxyXG5dLmpvaW4oXCJcIik7XHJcblxyXG5jb25zdCBGUkFHTUVOVF9TSEFERVIgPSBbXHJcbiAgICBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcIixcclxuICAgIFwiXCIsXHJcbiAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlO1wiLFxyXG4gICAgXCJ1bmlmb3JtIG1hdDMgdVRleHR1cmVNYXRyaXg7IC8qIE9mZnNldCBhcHBsaWVkIHRvIHRleHR1cmUgKi9cIixcclxuICAgIFwidmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCJ2YXJ5aW5nIGhpZ2hwIHZlYzMgdkxpZ2h0aW5nOyAvKiBQcmViYWtlZCBsaWdodGluZyAqL1wiLFxyXG4gICAgXCJ1bmlmb3JtIGJvb2wgdUxpZ2h0aW5nQWN0aXZlO1wiLFxyXG4gICAgXCJcIixcclxuICAgIFwidm9pZCBtYWluKCkge1wiLFxyXG4gICAgXCIgICAgaGlnaHAgdmVjNCB0ZXhlbENvbG9yID0gdGV4dHVyZTJEKHVUZXh0dXJlLCAodVRleHR1cmVNYXRyaXggKiB2ZWMzKHZUZXh0dXJlQ29vcmQsIDEuMCkpLnh5KTtcIixcclxuICAgIFwiICAgIGdsX0ZyYWdDb2xvciA9IHRleGVsQ29sb3I7XCIsXHJcbiAgICBcIlwiLFxyXG4gICAgXCIgICAgaWYgKHRleGVsQ29sb3IuYSA9PSAwLjApIHtcIixcclxuICAgIFwiICAgICAgICBkaXNjYXJkO1wiLFxyXG4gICAgXCIgICAgfVwiLFxyXG4gICAgXCJcIixcclxuICAgIFwiICAgIGlmICh1TGlnaHRpbmdBY3RpdmUpIHtcIixcclxuICAgIFwiICAgICAgICBnbF9GcmFnQ29sb3IgKj0gdmVjNCh2TGlnaHRpbmcsIDEpO1wiLFxyXG4gICAgXCIgICAgfVwiLFxyXG4gICAgXCJ9XCIsXHJcbl0uam9pbihcIlwiKTtcclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEByZXR1cm5zIHtQcm9ncmFtSW5mb31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFNoYWRlcihnbCkge1xyXG4gICAgY29uc3QgdmVydGV4U2hhZGVyID0gbG9hZFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgVkVSVEVYX1NIQURFUik7XHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGxvYWRTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgRlJBR01FTlRfU0hBREVSKTtcclxuXHJcbiAgICBjb25zdCBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHNoYWRlclByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgIGFsZXJ0KGBVbmFibGUgdG8gaW5pdGlhbGl6ZSB0aGUgc2hhZGVyIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2coc2hhZGVyUHJvZ3JhbSl9YCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxyXG4gICAgICAgIGxvY2F0aW9uczoge1xyXG4gICAgICAgICAgICBhVmVydGV4UG9zaXRpb246IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpLFxyXG4gICAgICAgICAgICB1UHJvamVjdGlvbk1hdHJpeDogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidVByb2plY3Rpb25NYXRyaXhcIiksXHJcbiAgICAgICAgICAgIHVNb2RlbFZpZXdNYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVNb2RlbFZpZXdNYXRyaXhcIiksXHJcblxyXG4gICAgICAgICAgICBhVGV4dHVyZUNvb3JkOiBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIiksXHJcbiAgICAgICAgICAgIGFMaWdodGluZzogZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgXCJhTGlnaHRpbmdcIiksXHJcbiAgICAgICAgICAgIHVMaWdodGluZ0FjdGl2ZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidUxpZ2h0aW5nQWN0aXZlXCIpLFxyXG5cclxuICAgICAgICAgICAgdVRleHR1cmVNYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCBcInVUZXh0dXJlTWF0cml4XCIpLFxyXG4gICAgICAgICAgICB1VGV4dHVyZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sIFwidVRleHR1cmVcIiksXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtHTGVudW19IHR5cGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxyXG4gKiBAcmV0dXJucyB7P1dlYkdMU2hhZGVyfVxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XHJcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XHJcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgYWxlcnQoYEFuIGVycm9yIG9jY3VycmVkIGNvbXBpbGluZyB0aGUgc2hhZGVyczogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCk7XHJcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNoYWRlcjtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZUZyb21VUkwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGltYWdlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSBjYXVzZSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYENvdWxkIG5vdCBsb2FkIHRleHR1cmUgXCIke3VybH1cIi5gLCB7XHJcbiAgICAgICAgICAgICAgICBjYXVzZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyohKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtIHtUZXhJbWFnZVNvdXJjZX0gZGF0YVxyXG4gKiBAcmV0dXJucyB7V2ViR0xUZXh0dXJlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlKGdsLCBkYXRhLCB3LCBoKSB7XHJcbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG5cclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcclxuXHJcbiAgICBpZiAoaXNQb3dlck9mMih3KSAmJiBpc1Bvd2VyT2YyKGgpKSB7XHJcbiAgICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgIHJldHVybiB0ZXh0dXJlO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgJiAodmFsdWUgLSAxKSkgPT09IDA7XHJcbn1cclxuIiwKICAgICJpbXBvcnQgeyBsb2FkVGV4dHVyZUZyb21VUkwgfSBmcm9tIFwiLi9zZXR1cC5qc1wiO1xyXG5cclxuLyohKlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGV4dHVyZVVSTCAtIFRoZSBVUkwgdG8gdGhlIG1vZGVsIHRleHR1cmUuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPFRleHR1cmVBbHRsYXM+fVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUF0bGFzKHRleHR1cmVVUkwpIHtcclxuICAgIHJldHVybiBuZXcgVGV4dHVyZUFsdGxhcyhhd2FpdCBsb2FkVGV4dHVyZUZyb21VUkwodGV4dHVyZVVSTCkpO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEEgdGV4dHVyZSBhdGxhcy4gU2VlIHtAbGluayBjcmVhdGVBdGxhc30uXHJcbiAqIEBwdWJsaWNcclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHR1cmVBbHRsYXMge1xyXG4gICAgLyohKlxyXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRleHR1cmUpIHtcclxuICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB0ZXh0dXJlLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0ZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0ZXh0dXJlLCAwLCAwLCB0ZXh0dXJlLndpZHRoLCB0ZXh0dXJlLmhlaWdodCwgMCwgMCwgdGV4dHVyZS53aWR0aCwgdGV4dHVyZS5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qISpcclxuICAgICAqIENyZWF0ZXMgYSBpbWFnZSBjdXRvdXQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQHJldHVybnMge0ltYWdlRGF0YX1cclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqL1xyXG4gICAgZ2V0VGV4dHVyZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4LmdldEltYWdlRGF0YSh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG4iLAogICAgIlwidXNlIHN0cmljdFwiO1xyXG5cclxuY29uc3QgeyBtYXQzLCBtYXQ0IH0gPSB3aW5kb3cuZ2xNYXRyaXggfHwge307XHJcblxyXG4vKiEqXHJcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vbW9kZWxzLmpzJykuTW9kZWx9IE1vZGVsXHJcbiAqL1xyXG5cclxuLyohKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9ncmFtSW5mb1xyXG4gKiBAcHJvcGVydHkge1dlYkdMUHJvZ3JhbX0gcHJvZ3JhbVxyXG4gKiBAcHJvcGVydHkge1Byb2dyYW1Mb2NhdGlvbnN9IGxvY2F0aW9uc1xyXG4gKi9cclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gUHJvZ3JhbUxvY2F0aW9uc1xyXG4gKiBAcHJvcGVydHkge0dMaW50fSBhVmVydGV4UG9zaXRpb25cclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVByb2plY3Rpb25NYXRyaXhcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdU1vZGVsVmlld01hdHJpeFxyXG4gKiBAcHJvcGVydHkge0dMaW50fSBhVGV4dHVyZUNvb3JkXHJcbiAqIEBwcm9wZXJ0eSB7R0xpbnR9IGFMaWdodGluZ1xyXG4gKiBAcHJvcGVydHkge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSB1TGlnaHRpbmdBY3RpdmVcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVRleHR1cmVNYXRyaXhcclxuICogQHByb3BlcnR5IHtXZWJHTFVuaWZvcm1Mb2NhdGlvbn0gdVRleHR1cmVcclxuICovXHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxyXG4gKiBAcGFyYW0ge1Byb2dyYW1JbmZvfSBwcm9ncmFtSW5mb1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFkZFBhZGRpbmdcclxuICogQHBhcmFtIHtNb2RlbH0gbW9kZWxcclxuICogQHBhcmFtIHtXZWJHTFRleHR1cmV9IG1vZGVsVGV4dHVyZVxyXG4gKiBAcGFyYW0ge1dlYkdMVGV4dHVyZX0gZ2xpbnRUZXh0dXJlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhdyhnbCwgcHJvZ3JhbUluZm8sIGFkZFBhZGRpbmcsIG1vZGVsLCBtb2RlbFRleHR1cmUsIGdsaW50VGV4dHVyZSkge1xyXG4gICAgLy8gUmVzZXQgY2FudmFzXHJcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDAuMCk7XHJcbiAgICBnbC5jbGVhckRlcHRoKDEuMCk7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG4gICAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XHJcbiAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XHJcblxyXG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcclxuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBwcm9qZWN0aW9uIGFuZCBtb2RlbCB2aWV3IG1hdHJpeFxyXG4gICAgY29uc3QgYXNwZWN0ID0gZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gZ2wuY2FudmFzLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBjb25zdCBzY2FsZSA9IGFkZFBhZGRpbmcgPyBtb2RlbC5zY2FsZVBhZGRlZCA6IG1vZGVsLnNjYWxlVW5wYWRkZWQ7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcclxuICAgIG1hdDQub3J0aG8ocHJvamVjdGlvbk1hdHJpeCwgLWFzcGVjdCAqIHNjYWxlLCBhc3BlY3QgKiBzY2FsZSwgLXNjYWxlLCBzY2FsZSwgLTEwLCAxMCk7XHJcblxyXG4gICAgY29uc3QgbW9kZWxWaWV3TWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcclxuICAgIGlmIChtb2RlbC5pczNEKSB7XHJcbiAgICAgICAgbWF0NC5yb3RhdGUobW9kZWxWaWV3TWF0cml4LCBtb2RlbFZpZXdNYXRyaXgsIDMwICogTWF0aC5QSSAvIDE4MCwgWzEsIDAsIDBdKTtcclxuICAgICAgICBtYXQ0LnJvdGF0ZShtb2RlbFZpZXdNYXRyaXgsIG1vZGVsVmlld01hdHJpeCwgNDUgKiBNYXRoLlBJIC8gMTgwLCBbMCwgMSwgMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpemUgc2hhZGVyc1xyXG4gICAgc2V0QXR0cmlidXRlKGdsLCBwcm9ncmFtSW5mby5sb2NhdGlvbnMuYVZlcnRleFBvc2l0aW9ucywgbW9kZWwucG9zaXRpb24sIDMpO1xyXG4gICAgc2V0QXR0cmlidXRlKGdsLCBwcm9ncmFtSW5mby5sb2NhdGlvbnMuYVRleHR1cmVDb29yZCwgbW9kZWwudGV4dHVyZSwgMik7XHJcbiAgICBzZXRBdHRyaWJ1dGUoZ2wsIHByb2dyYW1JbmZvLmxvY2F0aW9ucy5hTGlnaHRpbmcsIG1vZGVsLmxpZ2h0aW5nLCAzKTtcclxuXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBtb2RlbC5pbmRpY2VzKTtcclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUluZm8ucHJvZ3JhbSk7XHJcblxyXG4gICAgZ2wudW5pZm9ybTFpKHByb2dyYW1JbmZvLmxvY2F0aW9ucy51TGlnaHRpbmdBY3RpdmUsIDEpO1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihwcm9ncmFtSW5mby5sb2NhdGlvbnMudVByb2plY3Rpb25NYXRyaXgsIGZhbHNlLCBwcm9qZWN0aW9uTWF0cml4KTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVNb2RlbFZpZXdNYXRyaXgsIGZhbHNlLCBtb2RlbFZpZXdNYXRyaXgpO1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDNmdihwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmVNYXRyaXgsIGZhbHNlLCBtYXQzLmNyZWF0ZSgpKTtcclxuXHJcbiAgICAvLyBEcmF3IGN1YmVcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbW9kZWxUZXh0dXJlKTtcclxuICAgIGdsLnVuaWZvcm0xaShwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmUsIDApO1xyXG5cclxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIG1vZGVsLnZlcnRleENvdW50LCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XHJcblxyXG4gICAgLy8gRHJhdyBlbmNoYW50bWVudCBnbGludCAoU2VlIE1pbmVjcmFmdCB2MS44LjkgUmVuZGVySXRlbSNyZW5kZXJFZmZlY3QoSUJha2VkTW9kZWwpKVxyXG4gICAgaWYgKCFnbGludFRleHR1cmUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZ2wuZGVwdGhNYXNrKGZhbHNlKTtcclxuICAgIGdsLmRlcHRoRnVuYyhnbC5FUVVBTCk7XHJcbiAgICBnbC51bmlmb3JtMWkocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVMaWdodGluZ0FjdGl2ZSwgMCk7IC8vIGRpc2FibGVMaWdodGluZygpXHJcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0NPTE9SLCBnbC5PTkUpO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZ2xpbnRUZXh0dXJlKTtcclxuICAgIGxldCB0ZXh0dXJlTWF0cml4ID0gbWF0My5jcmVhdGUoKTsgLy8gbWF0cml4TW9kZShHTF9URVhUVVJFKVxyXG4gICAgY29uc3QgU0NBTEUgPSAwLjU7IC8vIDE2IC8gOCAoMTYgaW4gTWF0cml4LCA4IGluIHNjYWxlKC4uKSlcclxuICAgIG1hdDMuc2NhbGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgW1NDQUxFLCBTQ0FMRSwgU0NBTEVdKTtcclxuICAgIGxldCBvZmZzZXRBID0gKGdldFN5c3RlbVRpbWUoKSAlIDMwMDApIC8gMzAwMCAvIFNDQUxFO1xyXG4gICAgbWF0My50cmFuc2xhdGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgW29mZnNldEEsIDBdKTtcclxuICAgIG1hdDMucm90YXRlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIGRlZzJyYWQoLTUwKSwgWzAsIDAsIDFdKTtcclxuXHJcbiAgICAvLyByZW5kZXJNb2RlbFxyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDNmdihwcm9ncmFtSW5mby5sb2NhdGlvbnMudVRleHR1cmVNYXRyaXgsIGZhbHNlLCB0ZXh0dXJlTWF0cml4KTtcclxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIG1vZGVsLnZlcnRleENvdW50LCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XHJcblxyXG4gICAgdGV4dHVyZU1hdHJpeCA9IG1hdDMuY3JlYXRlKCk7IC8vIHBvcE1hdHJpeCgpOyBwdXNoTWF0cml4KCk7XHJcbiAgICBtYXQzLnNjYWxlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIFtTQ0FMRSwgU0NBTEUsIFNDQUxFXSk7XHJcbiAgICBsZXQgb2Zmc2V0QiA9IChnZXRTeXN0ZW1UaW1lKCkgJSA0ODczKSAvIDQ4NzMgLyBTQ0FMRTtcclxuICAgIG1hdDMudHJhbnNsYXRlKHRleHR1cmVNYXRyaXgsIHRleHR1cmVNYXRyaXgsIFstb2Zmc2V0QiwgMF0pO1xyXG4gICAgbWF0My5yb3RhdGUodGV4dHVyZU1hdHJpeCwgdGV4dHVyZU1hdHJpeCwgZGVnMnJhZCgxMCksIFswLCAwLCAxXSk7XHJcblxyXG4gICAgLy8gcmVuZGVyTW9kZWxcclxuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYocHJvZ3JhbUluZm8ubG9jYXRpb25zLnVUZXh0dXJlTWF0cml4LCBmYWxzZSwgdGV4dHVyZU1hdHJpeCk7XHJcbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCBtb2RlbC52ZXJ0ZXhDb3VudCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xyXG59XHJcblxyXG4vKiEqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBkZWcycmFkKGkpIHtcclxuICAgIHJldHVybiBpICogTWF0aC5QSSAvIDE4MFxyXG59XHJcblxyXG4vKiEqXHJcbiAqIFNlZSBNaW5lY3JhZnQuZ2V0U3lzdGVtVGltZSgpXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTeXN0ZW1UaW1lKCkge1xyXG4gICAgcmV0dXJuIERhdGUubm93KCk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSB7R0x1aW50fSBsb2NhdGlvblxyXG4gKiBAcGFyYW0ge1dlYkdMQnVmZmVyfSBidWZmZXJcclxuICogQHBhcmFtIHtHTGludH0gYnVmZmVyRW50cnlTaXplXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUoZ2wsIGxvY2F0aW9uLCBidWZmZXIsIGJ1ZmZlckVudHJ5U2l6ZSkge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBidWZmZXJFbnRyeVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCwpO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pO1xyXG59XHJcbiIsCiAgICAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgeyBNT0RFTF9DVUJFLCBNT0RFTF9JVEVNLCBNT0RFTF9TS1VMTF9DT01QQUNULCBNT0RFTF9TS1VMTF9TS0lOLCBNb2RlbFR5cGUgfSBmcm9tIFwiLi9tb2RlbHMuanNcIjtcclxuZXhwb3J0IHsgVGV4dHVyZUFsdGxhcywgY3JlYXRlQXRsYXMgfSBmcm9tIFwiLi9hdGxhcy5qc1wiO1xyXG5cclxuaW1wb3J0IHsgR0xJTlRfVEVYVFVSRSwgTW9kZWxUeXBlIH0gZnJvbSBcIi4vbW9kZWxzLmpzXCI7XHJcbmltcG9ydCB7IGRyYXcgfSBmcm9tIFwiLi9kcmF3LmpzXCI7XHJcbmltcG9ydCB7IHNldHVwU2hhZGVyLCBsb2FkVGV4dHVyZSwgbG9hZFRleHR1cmVGcm9tVVJMIH0gZnJvbSBcIi4vc2V0dXAuanNcIjtcclxuXHJcbi8qISpcclxuICogQHR5cGVkZWYge09iamVjdH0gUmVuZGVyT3B0aW9uc1xyXG4gKiBAcHJvcGVydHkge01vZGVsVHlwZX0gbW9kZWxUeXBlIC0gT25lIG9mIHtAbGluayBNT0RFTF9DVUJFfSwge0BsaW5rIE1PREVMX0lURU19LCB7QGxpbmsgTU9ERUxfU0tVTExfQ09NUEFDVH0sIHtAbGluayBNT0RFTF9TS1VMTF9TS0lOfS5cclxuICogQHByb3BlcnR5IHtzdHJpbmd8SW1hZ2VEYXRhfSB0ZXh0dXJlIC0gQSBVUkwgdG8gdGhlIG1vZGVsIHRleHR1cmUgb3IgYSB7QGxpbmsgVGV4dHVyZUFsdGxhc30gY3V0b3V0LlxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtlbmNoYW50ZWQ9ZmFsc2VdIC0gQXBwbGllcyBNaW5lY3JhZnQncyBlbmNoYW50bWVudCBnbGludC5cclxuICogQHByb3BlcnR5IHtib29sZWFufSBbaW5JbnZlbnRvcnk9ZmFsc2VdIC0gQXBwbGllcyBwYWRkaW5nIHRvIG1hdGNoIHJlbmRlcmluZyBvZiBNaW5lY3JhZnQgaXRlbXMgaW4gaW52ZW50b3J5LlxyXG4gKiBAcHJvcGVydHkge1dlYkdMQ29udGV4dEF0dHJpYnV0ZXN9IFtnbENvbnRleHQ9e2FudGlhbGlhczogZmFsc2V9XSAtIEFyYml0cmFyeSBXZWJHTCBjb250ZXh0IGF0dHJpYnV0ZXMuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcblxyXG4vKiEqXHJcbiAqIENyZWF0ZXMgYSBuZXcgcmVuZGVyZXIgYW5kIGRyYXdzIHRoZSBmaXJzdCBmcmFtZS5cclxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzIC0gVGhlIGNhbnZhcyB0byByZW5kZXIgb24uXHJcbiAqIEBwYXJhbSB7UmVuZGVyT3B0aW9uc30gcmVuZGVyT3B0aW9ucyAtIFdoYXQgdG8gcmVuZGVyLlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxSZW5kZXJlcj59XHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVSZW5kZXJlcihjYW52YXMsIHJlbmRlck9wdGlvbnMpIHtcclxuICAgIGlmICghd2luZG93LmdsTWF0cml4Py5tYXQ0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgbWF0cml4IGxpYnJhcnkuIFBsZWFzZSBlbnN1cmUgeW91IGluY2x1ZGUgZ2xNYXRyaXggdjMuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc2FibGUgYW50aWFsaWFzIGJ5IGRlZmF1bHRcclxuICAgIGxldCBjb250ZXh0QXR0cmlidXRlcyA9IHJlbmRlck9wdGlvbnMuZ2xDb250ZXh0IHx8IHt9O1xyXG4gICAgaWYgKGNvbnRleHRBdHRyaWJ1dGVzLmFudGlhbGlhcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29udGV4dEF0dHJpYnV0ZXMuYW50aWFsaWFzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIsIGNvbnRleHRBdHRyaWJ1dGVzKTtcclxuICAgIGlmIChnbCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBpbml0aWFsaXplIFdlYkdMLiBZb3VyIGJyb3dzZXIgbWF5IG5vdCBzdXBwb3J0IGl0LlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm9ncmFtSW5mbyA9IHNldHVwU2hhZGVyKGdsKTtcclxuXHJcbiAgICAvLyBMb2FkIHRleHR1cmVcclxuICAgIGxldCBpbWFnZTtcclxuICAgIGlmICh0eXBlb2YgcmVuZGVyT3B0aW9ucy50ZXh0dXJlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgaW1hZ2UgPSBhd2FpdCBsb2FkVGV4dHVyZUZyb21VUkwocmVuZGVyT3B0aW9ucy50ZXh0dXJlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW1hZ2UgPSByZW5kZXJPcHRpb25zLnRleHR1cmU7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXh0dXJlID0gbG9hZFRleHR1cmUoZ2wsIGltYWdlLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcclxuXHJcbiAgICBjb25zdCBnbGludFRleHR1cmUgPSByZW5kZXJPcHRpb25zLmVuY2hhbnRlZCA/IGxvYWRUZXh0dXJlKGdsLCBHTElOVF9URVhUVVJFLCA2NCwgNjQpIDogbnVsbDtcclxuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgcmVuZGVyZXJcclxuICAgIGNvbnN0IG1vZGVsID0gcmVuZGVyT3B0aW9ucy5tb2RlbFR5cGUuY3JlYXRlKGdsKTtcclxuXHJcbiAgICBsZXQgYWN0aXZlSGFuZGxlO1xyXG4gICAgZHJhdyhnbCwgcHJvZ3JhbUluZm8sIHJlbmRlck9wdGlvbnMuaW5JbnZlbnRvcnksIG1vZGVsLCB0ZXh0dXJlLCBnbGludFRleHR1cmUpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgICAgICBkcmF3KGdsLCBwcm9ncmFtSW5mbywgcmVuZGVyT3B0aW9ucy5pbkludmVudG9yeSwgbW9kZWwsIHRleHR1cmUsIGdsaW50VGV4dHVyZSk7XHJcbiAgICAgICAgaWYgKGFjdGl2ZUhhbmRsZSlcclxuICAgICAgICAgICAgYWN0aXZlSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbiAgICB9XHJcbiAgICBhY3RpdmVIYW5kbGUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFJlbmRlcmVyKCgpID0+IHtcclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhY3RpdmVIYW5kbGUpO1xyXG4gICAgICAgIGFjdGl2ZUhhbmRsZSA9IG51bGw7XHJcbiAgICAgICAgZ2wuZ2V0RXh0ZW5zaW9uKFwiV0VCR0xfbG9zZV9jb250ZXh0XCIpPy5sb3NlQ29udGV4dCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qISpcclxuICogQW4gYWN0aXZlIHJlbmRlci4gU2VlIHtAbGluayBjcmVhdGVSZW5kZXJlcn0uXHJcbiAqIEBwdWJsaWNcclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGRlc3Ryb3lGdW5jKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95RnVuYyA9IGRlc3Ryb3lGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIC8qISpcclxuICAgICAqIERlc3Ryb3lzIHRoZSByZW5kZXJlci5cclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lGdW5jKCk7XHJcbiAgICB9XHJcbn1cclxuIgogIF0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQk8sTUFBTSxVQUFVO0FBQUEsRUFDbkIsV0FBVyxDQUFDLFdBQVc7QUFBQSxJQUNuQixLQUFLLFlBQVk7QUFBQTtBQUFBLEVBT3JCLE1BQU0sQ0FBQyxJQUFJO0FBQUE7QUFB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QUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQzdDLENBQUM7QUFBQSxJQUNELFVBQVUsTUFBTSxJQUFJO0FBQUEsTUFDaEIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0wsQ0FBQztBQUFBLEVBRUQsTUFBTSxVQUFVLFdBQVcsSUFBSSxDQUFDO0FBQUEsRUFFaEMsTUFBTSxVQUFVLFdBQVcsSUFBSSxHQUFHO0FBQUEsSUFDOUIsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ0wsQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNMLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDTCxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1QsQ0FBQztBQUFBLEVBRUQsTUFBTSxXQUFXLFlBQVksSUFBSTtBQUFBLElBQzdCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKLENBQUM7QUFBQSxFQUVELE9BQU87QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxhQUFhLElBQUk7QUFBQSxJQUNqQixhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsSUFDZixNQUFNO0FBQUEsRUFDVjtBQUFBLENBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPTSxJQUFNLHNCQUFzQixJQUFJLFVBQVUsUUFBTTtBQUFBLEVBRW5ELE1BQU0sV0FBVyxhQUFhLElBQUk7QUFBQSxJQUM5QixVQUFVLElBQUksSUFBSTtBQUFBLE1BQ2QsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsSUFDN0MsQ0FBQztBQUFBLElBQ0QsVUFBVSxNQUFNLElBQUk7QUFBQSxNQUNoQixDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3pDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUN6QyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsTUFDekMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQUcsQ0FBQyxHQUFHLEdB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TSxPQUFPLE1BQU0sTUFBTTtBQUFBLEVBRWhFLE1BQU0sZUFBZSxjQUFjLFlBQVksWUFBWSxJQUFJLGVBQWUsSUFBSSxFQUFFLElBQUk7QUFBQSxFQUN4RixHQUFHLFlBQVksR0FBRyxxQkFBcUIsSUFBSTtBQUFBLEVBRzNDLE1BQU0sUUFBUSxjQUFjLFVBQVUsT0FBTyxFQUFFO0FBQUEsRUFFL0MsSUFBSTtBQUFBLEVBQ0osS0FBSyxJQUFJLGFBQWEsY0FBYyxhQUFhLE9BQU8sU0FBUyxZQUFZO0FBQUEsRUFFN0UsU0FBUyxNQUFNLEdBQUc7QUFBQSxJQUNkLEtBQUssSUFBSSxhQUFhLGNBQWMsYUFBYSxPQUFPLFNBQVMsWUFBWTtBQUFBLElBQzdFLElBQUk7QUFBQSxNQUNBLGVBQWUsc0JBQXNCLE1BQU07QUFBQTtBQUFBLEVBRW5ELGVBQWUsc0JBQXNCLE1BQU07QUFBQSxFQUUzQyxPQUFPLElBQUksU0FBUyxNQUFNO0FBQUEsSUFDdEIscUJBQXFCLFlBQVk7QUFBQSxJQUNqQyxlQUFlO0FBQUEsSUFDZixHQUFHLGFBQWEsb0JBQW9CLEdBQUcsWUFBWTtBQUFBLEdBQ3REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFFLE1BQU0sU0FBUztBQUFBLEVBQ2xCLFdBQVcsQ0FBQyxhQUFhO0FBQUEsSUFDckIsS0FBSyxjQUFjO0FBQUE7QUFBQSxFQU92QixPQUFPLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQ04sS0FBSyxZQUFZO0FBQUE7QUFFekI7IiwKICAiZGVidWdJZCI6ICIzNEY1OEFGOTc2RDM2RTdDNjQ3NTZFMjE2NDc1NkUyMSIsCiAgIm5hbWVzIjogW10KfQ==
