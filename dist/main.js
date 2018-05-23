/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data-structures/color.js":
/*!**************************************!*\
  !*** ./src/data-structures/color.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector3 */ \"./src/data-structures/vector3.js\");\n\n\n\n/**\n * Class representing a color.\n * For calculations this should use 0-1 for color.\n * normalize() returns a copy with 0-255 instead.\n */\nclass Color {\n  \n  constructor(r, g, b) {\n    this.r = r;\n    this.g = g;\n    this.b = b;\n  }\n  \n  asVector3() {\n    return new _vector3__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.r, this.g, this.b);\n  }\n  \n  rescale(rmin=0, rmax=255, gmin=0, gmax=255, bmin=0, bmax=255) {\n    \n    let rRange = rmax - rmin;\n    let gRange = gmax - gmin;\n    let bRange = bmax - bmin;\n    \n    let r = parseInt(((this.r - rmin) / rRange) * 255);\n    let g = parseInt(((this.g - gmin) / gRange) * 255);\n    let b = parseInt(((this.b - bmin) / bRange) * 255);\n    \n    return new Color(r, g, b);\n  }\n\n  clamped() {\n    \n    let r = this.r;\n    let g = this.g;\n    let b = this.b;\n    \n    if (r < 0) r = 0;\n    else if (r > 1) r = 1;\n    if (g < 0) g = 0;\n    else if (g > 1) g = 1;\n    if (b < 0) b = 0;\n    else if (b > 1) b = 1;\n    \n    return new Color(r, g, b);\n  }  \n  \n  normalized() {\n    return this.rescale(0, 1, 0, 1, 0, 1);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Color);\n\n//# sourceURL=webpack:///./src/data-structures/color.js?");

/***/ }),

/***/ "./src/data-structures/material.js":
/*!*****************************************!*\
  !*** ./src/data-structures/material.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ \"./src/data-structures/color.js\");\n\n\n\nclass Material {\n  \n  /**\n   * Creates a Material object.\n   * @param {Color}  ambientConstant  Percentage of ambient light reflected by object. (black)\n   * @param {Color}  diffuseConstant  Percentage of diffuse light reflected by object. (black)\n   * @param {Color}  specularConstant Percentage of specular light reflected by object. (black)\n   * @param {Float}  reflectivity     Percentage of diffuse light that should be reflected instead. (0.5)\n   * @param {Number} shininess        Shininess of the object. (20)\n   */\n  constructor(ambientConstant=null, diffuseConstant=null, specularConstant=null, shininess=20, reflectivity=0.5) {\n    \n    let black = new _color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](.5, .5, .5);\n    if (ambientConstant === null) this.ambientConstant = black;\n    else this.ambientConstant = ambientConstant;\n    if (diffuseConstant === null) this.diffuseConstant = black;\n    else this.diffuseConstant = diffuseConstant;\n    if (specularConstant === null) this.specularConstant = black;\n    else this.specularConstant = specularConstant;\n    \n    this.reflectiveConstant = this.diffuseConstant.asVector3()\n      ._scale(reflectivity).asColor();\n    this.diffuseConstant = this.diffuseConstant.asVector3()\n      ._minus(this.reflectiveConstant.asVector3()).asColor();\n    this.shininess = shininess;\n    \n    // console.log(this);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Material);\n\n//# sourceURL=webpack:///./src/data-structures/material.js?");

/***/ }),

/***/ "./src/data-structures/ray.js":
/*!************************************!*\
  !*** ./src/data-structures/ray.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Ray {\n  \n  constructor(origin, direction) {\n    this.origin = origin;\n    this.direction = direction;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ray);\n\n//# sourceURL=webpack:///./src/data-structures/ray.js?");

/***/ }),

/***/ "./src/data-structures/vector3.js":
/*!****************************************!*\
  !*** ./src/data-structures/vector3.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ \"./src/data-structures/color.js\");\n\n\n\nclass Vector3 {\n  \n  constructor(x, y, z) {\n    this.x = x;\n    this.y= y;\n    this.z = z;\n  }\n  \n  _plus(other) {\n    return new Vector3(\n      this.x + other.x,\n      this.y + other.y,\n      this.z + other.z\n    );\n  }\n  \n  _minus(other) {\n    return new Vector3(\n      this.x - other.x,\n      this.y - other.y,\n      this.z - other.z\n    );\n  }\n  \n  _times(other) {\n    return new Vector3(\n      this.x * other.x,\n      this.y * other.y,\n      this.z * other.z\n    );\n  }\n  \n  _dot(other) {\n    return this.x * other.x + this.y * other.y + this.z * other.z;\n  }\n  \n  _scale(i) {\n    return new Vector3(\n      i * this.x,\n      i * this.y,\n      i * this.z\n    );\n  }\n  \n  _linearInterpolation(other, scale) {\n    return this._scale(1 - scale)._plus(other._scale(scale));\n  }\n  \n  asColor() {\n    return new _color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.x, this.y, this.z);\n  }\n  \n  length() {\n    return Math.sqrt(Math.abs(this.x * this.x + this.y * this.y + this.z * this.z));\n  }\n  \n  normalized() {\n    let mag = this.length();\n    return new Vector3(\n      this.x / mag,\n      this.y / mag,\n      this.z / mag\n    );\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Vector3);\n\n//# sourceURL=webpack:///./src/data-structures/vector3.js?");

/***/ }),

/***/ "./src/geometry/geometry.js":
/*!**********************************!*\
  !*** ./src/geometry/geometry.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_structures_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-structures/color */ \"./src/data-structures/color.js\");\n\n\n\nclass Geometry {\n  \n  constructor() {\n    \n  }\n  \n  /**\n   * Determines whether or not the given ray intersects with this object.\n   * If so, it returns a color object.\n   * Otherwise, it returns null.\n   */\n  colorAtIntersection(ray) {\n    return new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 0);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Geometry);\n\n//# sourceURL=webpack:///./src/geometry/geometry.js?");

/***/ }),

/***/ "./src/geometry/sphere.js":
/*!********************************!*\
  !*** ./src/geometry/sphere.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_structures_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-structures/color */ \"./src/data-structures/color.js\");\n/* harmony import */ var _data_structures_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-structures/material */ \"./src/data-structures/material.js\");\n/* harmony import */ var _data_structures_ray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-structures/ray */ \"./src/data-structures/ray.js\");\n/* harmony import */ var _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-structures/vector3 */ \"./src/data-structures/vector3.js\");\n/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./geometry */ \"./src/geometry/geometry.js\");\n\n\n\n\n\n\n\nclass Sphere {\n  \n  constructor(center, radius, material=null) {\n    this.center = center; // Vector3\n    this.radius = radius; // Number\n    if (material === null) this.material = new _data_structures_material__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    else this.material = material;\n  }\n  \n  intersection(ray) {\n    \n    let cPrime = ray.origin._minus(this.center);\n    \n    // quadratic variables\n    let a = ray.direction.length() * ray.direction.length();\n    let b = 2 * cPrime._dot(ray.direction);\n    let c = cPrime.length() * cPrime.length() - this.radius * this.radius;\n    let discriminant = b * b - 4 * a * c;\n    \n    if (discriminant < 0) {\n      // no intersection\n      return null;\n    }\n    \n    // quadratic formula\n    let t1 = ((0 - b) + Math.sqrt(discriminant)) / (2 * a);\n    let t2 = ((0 - b) - Math.sqrt(discriminant)) / (2 * a);\n    \n    // intersection is behind image screen\n    if (t1 <= 0 && t2 <= 0) return null;\n    \n    // get smaller t for closest intersection\n    let t = t1;\n    if (t2 < t1) t = t2;\n    return t;\n  }\n  \n  colorAndIntersection(ray, scene, depth=0) {\n    \n    if (depth > 3) return null;\n    \n    var t = this.intersection(ray);\n    if (t === null) return null;\n    let c = this.colorAtIntersection(t, ray, scene);\n    \n    let newRay = null;\n    \n    let bestT = null;\n    let bestO = null;\n    \n    // reflection recursion\n    for (let i = 0; i < scene.objects.length; ++i) {\n      if (scene.objects[i] == this) continue;\n      t = null;\n    }\n  }\n  \n  colorAtIntersection(t, ray, scene = null, depth=0) {\n    \n    if (scene === null) return this.color;\n    \n    let pointOfIntersection = ray.origin._plus(ray.direction._scale(t));\n    let n = pointOfIntersection._minus(this.center);\n    \n    let surfaceNormal = n.normalized();\n    \n    // reflection of ambient light\n    let ambientLight = scene.ambientLightIntensity.asVector3()._times(\n      this.material.ambientConstant.asVector3());\n      \n    let color = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](0, 0, 0)._plus(ambientLight);\n    \n    // check all lights hitting this point\n    for (var i = 0; i < scene.lights.length; ++i) {\n      \n      let light = scene.lights[i];\n      let lightVector = light.location._minus(pointOfIntersection).normalized();\n      \n      let normalizedLight = surfaceNormal._dot(lightVector);\n      \n      // ignore this light if light is hitting inside of sphere\n      if (normalizedLight < 0) continue;\n      \n      let shaded = false;\n      \n      // test shadow rays\n      for (let j = 0; j < scene.objects.length; ++j) {\n        \n        let otherSphere = scene.objects[j];\n        if (otherSphere == this) continue;\n        \n        let shadowRay = new _data_structures_ray__WEBPACK_IMPORTED_MODULE_2__[\"default\"](pointOfIntersection, \n          light.location._minus(pointOfIntersection));\n        if (otherSphere.intersection(shadowRay)) {\n          \n          shaded = true;\n          \n          break;\n        }\n      }\n      \n      // dont do diffuse or specular light from shaded lights\n      if (shaded) continue;\n      \n      // calculate diffuse component\n      let diffuseComponent = light.diffuseIntensity.asVector3()._times(\n        this.material.diffuseConstant.asVector3())._scale(normalizedLight);\n        \n      // calculate specular component\n      let reflectiveness = surfaceNormal._scale(2 * normalizedLight)._minus(\n        lightVector);\n      let viewVector = pointOfIntersection._minus(ray.origin)\n        .normalized();\n      \n      // should i do math.abs here to avoid NaN scales??\n      let specularComponent = light.specularIntensity.asVector3()._times(\n        this.material.specularConstant.asVector3())._scale(\n        Math.pow(Math.abs(viewVector._dot(reflectiveness)), this.material.shininess));\n      \n      // calculate color to return\n      color = color._plus(\n        diffuseComponent)._plus(specularComponent);\n      if (isNaN(color.x)) {\n        console.log(color, viewVector, pointOfIntersection._minus(ray.origin));\n      }\n    }\n    \n    return {\n      color: color,\n      pointOfIntersection: pointOfIntersection,\n      surfaceNormal: surfaceNormal\n    };\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sphere);\n\n//# sourceURL=webpack:///./src/geometry/sphere.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lessons_lesson04__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lessons/lesson04 */ \"./src/lessons/lesson04.js\");\n\n\n\nObject(_lessons_lesson04__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lessons/lesson04.js":
/*!*********************************!*\
  !*** ./src/lessons/lesson04.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scenes_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scenes/scene */ \"./src/scenes/scene.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view */ \"./src/view/index.js\");\n\n\n\n\nfunction main() {\n  \n  const view = _view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createDefaultView();\n  \n  let scene = new _scenes_scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-2, 2, -2, 2, 1, 6);\n  // scene.randomizeAmbientLight();\n  scene.generateBrightLights(1);\n  scene.generateRandomSpheres(5);\n  let image = view.viewScene(scene);\n  \n  image.renderInto(document.querySelector('body'));\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (main);\n\n\n//# sourceURL=webpack:///./src/lessons/lesson04.js?");

/***/ }),

/***/ "./src/lights/light.js":
/*!*****************************!*\
  !*** ./src/lights/light.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_structures_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-structures/color */ \"./src/data-structures/color.js\");\n\n\n\nclass Light {\n  \n  /**\n   * Construct a Light object.\n   * @param {Vector3} location          Location of the light.\n   * @param {Color}   diffuseIntensity  Diffuse intensity of the light. (white)\n   * @param {Color}   specularIntensity Specular intensity of the light. (white)\n   */\n  constructor(location, diffuseIntensity=null, specularIntesity=null) {\n    this.location = location;\n    if (diffuseIntensity === null) this.diffuseIntensity = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 0);\n    else this.diffuseIntensity = diffuseIntensity;\n    if (specularIntesity === null) this.specularIntensity = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 0);\n    else this.specularIntensity = specularIntesity;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Light);\n\n//# sourceURL=webpack:///./src/lights/light.js?");

/***/ }),

/***/ "./src/scenes/scene.js":
/*!*****************************!*\
  !*** ./src/scenes/scene.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_structures_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-structures/color */ \"./src/data-structures/color.js\");\n/* harmony import */ var _data_structures_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-structures/material */ \"./src/data-structures/material.js\");\n/* harmony import */ var _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-structures/vector3 */ \"./src/data-structures/vector3.js\");\n/* harmony import */ var _geometry_sphere__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../geometry/sphere */ \"./src/geometry/sphere.js\");\n/* harmony import */ var _lights_light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lights/light */ \"./src/lights/light.js\");\n\n\n\n\n\n\n\nclass Scene {\n  \n  constructor(xmin=-2, xmax=2, ymin=-1, ymax=1, zmin=0, zmax=5) {\n    this.xmin = xmin;\n    this.xmax = xmax;\n    this.ymin = ymin;\n    this.ymax = ymax;\n    this.zmin = zmin;\n    this.zmax = zmax;\n    this.lights = [];\n    this.objects = [];\n    // temporary view placeholder\n    this._view = null;\n    this.backgroundColor = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 0);\n    this.ambientLightIntensity = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0.2, 0.2, 0.2);\n  }\n  \n  getObjects() {\n    return this.objects;\n  }\n  \n  randomizeAmbientLight() {\n    this.ambientLightIntensity = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n      Math.random(),\n      Math.random(),\n      Math.random()\n    );\n  }\n  \n  generateRandomLights(amount=2) {\n    \n    for (let i = 0; i < amount; ++i) {\n      let location = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n        Math.random() * (this.xmax - this.xmin) + this.xmin,\n        Math.random() * (this.ymax - this.ymin) + this.ymin,\n        Math.random() * (this.zmax - this.zmin) + this.zmin\n      );\n      let iD = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        Math.random(),\n        Math.random(),\n        Math.random()\n      );\n      let iS = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        Math.random(),\n        Math.random(),\n        Math.random()\n      );\n      let light = new _lights_light__WEBPACK_IMPORTED_MODULE_4__[\"default\"](location, iD, iS);\n      \n      this.lights.push(light);\n    }\n  }\n  \n  generateBrightLights(amount=2) {\n    \n    for (let i = 0; i < amount; ++i) {\n      let location = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n        Math.random() * (this.xmax - this.xmin) + this.xmin,\n        Math.random() * (this.ymax - this.ymin) + this.ymin,\n        Math.random() * (this.zmax - this.zmin) + this.zmin\n      );\n      let iD = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        0.9, 0.9, 0.9\n      );\n      let iS = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        0.9, 0.9, 0.9\n      );\n      let light = new _lights_light__WEBPACK_IMPORTED_MODULE_4__[\"default\"](location, iD, iS);\n      \n      this.lights.push(light);\n    }\n  }\n  \n  generateColoredLights(amount=2, r=0.9, g=0.9, b=0.9) {\n    \n    for (let i = 0; i < amount; ++i) {\n      let location = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n        this.xmin,\n        Math.random() * (this.ymax - this.ymin) + this.ymin,\n        Math.random() * (this.zmax - this.zmin) + this.zmin\n      );\n      let iD = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        r, g, b\n      );\n      let iS = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        0.8, 0.8, 0.8\n      );\n      let light = new _lights_light__WEBPACK_IMPORTED_MODULE_4__[\"default\"](location, iD, iS);\n      \n      this.lights.push(light);\n    }\n  }\n  \n  generateSideLights() {\n    \n    let location = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n      this.xmin,\n      Math.random() * (this.ymax - this.ymin) + this.ymin,\n      Math.random() * (this.zmax - this.zmin) + this.zmin\n    );\n    let iD = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n      Math.random(),\n      Math.random(),\n      Math.random()\n    );\n    let iS = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n      0.8, 0.8, 0.8\n    );\n    let light = new _lights_light__WEBPACK_IMPORTED_MODULE_4__[\"default\"](location, iD, iS);\n    \n    this.lights.push(light);\n    \n    let location2 = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n      this.xmax,\n      Math.random() * (this.ymax - this.ymin) + this.ymin,\n      Math.random() * (this.zmax - this.zmin) + this.zmin\n    );\n    let iD2 = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n      Math.random(),\n      Math.random(),\n      Math.random()\n    );\n    let iS2 = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n      0.8, 0.8, 0.8\n    );\n    let light2 = new _lights_light__WEBPACK_IMPORTED_MODULE_4__[\"default\"](location2, iD2, iS2);\n    \n    this.lights.push(light2);\n  }\n  \n  generateRandomSpheres(amount=5) {\n    for (var i = 0; i < amount; ++i) {\n      \n      let center = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\n        Math.random() * (this.xmax - this.xmin) + this.xmin,\n        Math.random() * (this.ymax - this.ymin) + this.ymin,\n        Math.random() * (this.zmax - this.zmin) + this.zmin\n      );\n      let radius = Math.random() * (1 - 0.1) + 0.1;\n      let r = Math.random();\n      let g = Math.random();\n      let b = Math.random();\n      let ambientConstant = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        Math.random(),\n        Math.random(),\n        Math.random()\n      );\n      let diffuseConstant = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        Math.random(),\n        Math.random(),\n        Math.random()\n      );\n      let specularConstant = new _data_structures_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        Math.random(),\n        Math.random(),\n        Math.random()\n      );\n      let shininess = Math.random() * 30;\n      let reflectiveness = Math.random();\n      let material = new _data_structures_material__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ambientConstant, diffuseConstant,\n        specularConstant, shininess, reflectiveness);\n      let sphere = new _geometry_sphere__WEBPACK_IMPORTED_MODULE_3__[\"default\"](center, radius, material);\n      \n      this.objects.push(sphere);\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scene);\n\n//# sourceURL=webpack:///./src/scenes/scene.js?");

/***/ }),

/***/ "./src/view/image-plane.js":
/*!*********************************!*\
  !*** ./src/view/image-plane.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass ImagePlane {\n  \n  // construct with vectors for corners\n  constructor(x1, x2, x3, x4) {\n    this.x1 = x1; // top left\n    this.x2 = x2; // top right\n    this.x3 = x3; // bottom left\n    this.x4 = x4;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ImagePlane);\n\n//# sourceURL=webpack:///./src/view/image-plane.js?");

/***/ }),

/***/ "./src/view/image.js":
/*!***************************!*\
  !*** ./src/view/image.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Image {\n  \n  constructor(w, h) {\n    this.w = w;\n    this.h = h;\n    this.canvas = this._createCanvas();\n  }\n\n  _createCanvas() {\n    \n    const canvas = document.createElement('canvas');\n    canvas.setAttribute('width', this.w);\n    canvas.setAttribute('height', this.h);\n    const context = canvas.getContext('2d');\n    \n    const imageData = context.getImageData(0, 0, this.w, this.h);\n    const pixels = imageData.data;\n    return {\n      canvas,\n      context,\n      imageData,\n      pixels\n    };\n  }\n\n  putPixel(x, y, color) {\n    const offset = (y * this.w + x) * 4;\n    this.canvas.pixels[offset    ] = color.r | 0;\n    this.canvas.pixels[offset + 1] = color.g | 0;\n    this.canvas.pixels[offset + 2] = color.b | 0;\n    this.canvas.pixels[offset + 3] = 255;\n  }\n\n  renderInto(elem) {\n    this\n      .canvas\n      .context\n      .putImageData(\n        this.canvas.imageData,\n        0,\n        0\n      );\n    elem.appendChild(this.canvas.canvas);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Image);\n\n\n//# sourceURL=webpack:///./src/view/image.js?");

/***/ }),

/***/ "./src/view/index.js":
/*!***************************!*\
  !*** ./src/view/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image */ \"./src/view/image.js\");\n/* harmony import */ var _image_plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-plane */ \"./src/view/image-plane.js\");\n/* harmony import */ var _data_structures_ray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-structures/ray */ \"./src/data-structures/ray.js\");\n/* harmony import */ var _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-structures/vector3 */ \"./src/data-structures/vector3.js\");\n\n\n\n\n\n\nclass View {\n  \n  constructor(camera, imagePlane, width, height) {\n    this.camera = camera;\n    this.imagePlane = imagePlane;\n    this.H = height;\n    this.W = width;\n  }\n  \n  static createDefaultView() {\n    \n    const imagePlane = new _image_plane__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n      new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](-1, 0.75, 0),\n      new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 0.75, 0),\n      new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](-1, -0.75, 0),\n      new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, -0.75, 0)\n    );\n    const camera = new _data_structures_vector3__WEBPACK_IMPORTED_MODULE_3__[\"default\"](0, 0, -1);\n    \n    return new View(camera, imagePlane, 256, 192);\n  }\n  \n  /**\n   * From an x, y return the Vector3 point (bilinearly interpreted) \n   * on\n   * the image plane and a ray on the camera.\n   * Object { point: <Vector3>, ray: <Ray> }\n   */\n  _bilinearInterpolation(x, y) {\n    \n    let a = x / this.W;\n    let b = (this.H - y - 1) / this.H;\n    let top = this.imagePlane.x1._linearInterpolation(this.imagePlane.x2,\n      a);\n    let bottom = this.imagePlane.x3._linearInterpolation(this.imagePlane.x4,\n      a);\n    let point = bottom._linearInterpolation(top, b);\n    \n    return {\n      point: point,\n      ray: new _data_structures_ray__WEBPACK_IMPORTED_MODULE_2__[\"default\"](point, point._minus(this.camera))\n    };\n  }\n  \n  // assignment1\n  colorSnapshot() {\n    \n    const image = new _image__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.W, this.H);\n    \n    let minX = 0.5;\n    let maxX = 0.5;\n    let minY = 0.5;\n    let maxY = 0.5;\n    \n    for (let y = 0; y < this.H; y++) {\n      for (let x = 0; x < this.W; x++) {\n        let pointray = this._bilinearInterpolation(x, y);\n        image.putPixel(x, y, pointray.ray.direction.asColor().rescale(\n          -1, 1, -0.75, 0.75));\n      }\n    }\n    \n    console.log(minX, maxX, minY, maxY);\n    \n    return image;\n  }\n  \n  getColor(ray, scene, depth=0, currentObj=null) {\n    \n    if (depth > 3) return null;\n    \n    let objects = scene.getObjects();\n    let color = null;\n    let bestT = null;\n    let bestO = null;\n    \n    for (let i = 0; i < objects.length; ++i) {\n      \n      let o = objects[i];\n      if (currentObj == o) continue;\n      let t = o.intersection(ray);\n      \n      if (t !== null) {\n        \n        // console.log(t);\n        \n        if (bestT === null) {\n          bestT = t;\n          bestO = o;\n        }\n        else {\n          if (t < bestT) {\n            bestT = t;\n            bestO = o;\n          }\n        }\n      }\n    }\n    \n    if (bestO !== null) {\n      // console.log(bestO.color);\n      \n      let c = bestO.colorAtIntersection(bestT, ray, scene);\n      color = c.color;\n      // return color.asColor().clamped().normalized();\n      \n      let reverseDirection = ray.direction._scale(-1);\n      let reflectionVector = c.surfaceNormal\n        ._scale(2)\n        ._scale(c.surfaceNormal._dot(reverseDirection))\n        ._minus(reverseDirection);\n        \n      let reflectionRay = new _data_structures_ray__WEBPACK_IMPORTED_MODULE_2__[\"default\"](c.pointOfIntersection, reflectionVector);\n      let reflectionColor = this.getColor(reflectionRay, scene, depth + 1, bestO);\n      \n      if (reflectionColor !== null) {\n        color = reflectionColor\n          ._times(bestO.material.reflectiveConstant.asVector3())\n          ._plus(color);\n      }\n    }\n    \n    if (color === null) return null;\n    return color;\n  }\n  \n  viewScene(scene) {\n    \n    const image = new _image__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.W, this.H);\n    \n    scene._view = this;\n    \n    for (let y = 0; y < this.H; y++) {\n      for (let x = 0; x < this.W; x++) {\n        \n        let pointray = this._bilinearInterpolation(x, y);\n        let color = this.getColor(pointray.ray, scene, 0);\n        \n        if (color === null) color = scene.backgroundColor;\n        else color = color.asColor().clamped().normalized();\n        image.putPixel(x, y, color);\n      }\n    }\n    \n    return image;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\n\n//# sourceURL=webpack:///./src/view/index.js?");

/***/ })

/******/ });