
const Sphere = require('./sphere');
const Vector3 = require('../data-structures/vector3');

class LightSphere extends Sphere {
  
  constructor(light) {
    super(light.location, 0.4);
    this.light = light;
  }
  
  // only respond if the ray is from the camera
  intersection(ray, direct=false) {
    if (!direct) return null;
    else {
      return super.intersection(ray);
    }
  }
  
  colorAtIntersection(t, ray, scene, depth=0, direct=false) {
    if (!direct) return null;
    else return {
      color: new Vector3(1, 1, 0.5)
    };
  }
}

module.exports = LightSphere;