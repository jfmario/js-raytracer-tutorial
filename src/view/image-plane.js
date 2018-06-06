
const Vector3 = require('../data-structures/vector3');

class ImagePlane {
  
  // construct with vectors for corners
  constructor(x1, x2, x3, x4) {
    this.x1 = x1; // top left
    this.x2 = x2; // top right
    this.x3 = x3; // bottom left
    this.x4 = x4;
  }
  
  static lookDownX(c) {
    return new ImagePlane(
      c.plus(new Vector3(0, 0.75, -1)),
      c.plus(new Vector3(0, 0.75, 1)),
      c.plus(new Vector3(0, -0.75, -1)),
      c.plus(new Vector3(0, -0.75, 1))
    );
  }
  static lookUpX(c) {
    return new ImagePlane(
      c.plus(new Vector3(0, 0.75, 1)),
      c.plus(new Vector3(0, 0.75, -1)),
      c.plus(new Vector3(0, -0.75, 1)),
      c.plus(new Vector3(0, -0.75, -1))
    );
  }
  static lookDownY(c) {
    return new ImagePlane(
      c.plus(new Vector3(-1, 0, 0.75)),
      c.plus(new Vector3(1, 0, 0.75)),
      c.plus(new Vector3(-1, 0, -0.75)),
      c.plus(new Vector3(1, -0, -0.75))
    );
  }
  static lookUpY(c) {
    return new ImagePlane(
      c.plus(new Vector3(-1, 0, -0.75)),
      c.plus(new Vector3(1, 0, -0.75)),
      c.plus(new Vector3(-1, 0, 0.75)),
      c.plus(new Vector3(1, -0, 0.75))
    );
  }
  static lookUpZ(c) {
    return new ImagePlane(
      c.plus(new Vector3(-1, 0.75, 0)),
      c.plus(new Vector3(1, 0.75, 0)),
      c.plus(new Vector3(-1, -0.75, 0)),
      c.plus(new Vector3(1, -0.75, 0))
    );
  }
  static lookDownZ(c) {
    return new ImagePlane(
      c.plus(new Vector3(1, 0.75, 0)),
      c.plus(new Vector3(-1, 0.75, 0)),
      c.plus(new Vector3(1, -0.75, 0)),
      c.plus(new Vector3(-1, -0.75, 0))
    );
  }
}

module.exports = ImagePlane;