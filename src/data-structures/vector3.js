
const Color = require('./color');

class Vector3 {
  
  constructor(x, y, z) {
    this.x = x;
    this.y= y;
    this.z = z;
  }
  
  _plus(other) {
    return new Vector3(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  }
  plus(other) {
    return this._plus(other);
  }
  
  _minus(other) {
    return new Vector3(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z
    );
  }
  
  _times(other) {
    return new Vector3(
      this.x * other.x,
      this.y * other.y,
      this.z * other.z
    );
  }
  
  _dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
  
  _scale(i) {
    return new Vector3(
      i * this.x,
      i * this.y,
      i * this.z
    );
  }
  
  _linearInterpolation(other, scale) {
    return this._scale(1 - scale)._plus(other._scale(scale));
  }
  
  asColor() {
    return new Color(this.x, this.y, this.z);
  }
  
  length() {
    return Math.sqrt(Math.abs(this.x * this.x + this.y * this.y + this.z * this.z));
  }
  
  normalized() {
    let mag = this.length();
    return new Vector3(
      this.x / mag,
      this.y / mag,
      this.z / mag
    );
  }
}

module.exports = Vector3;