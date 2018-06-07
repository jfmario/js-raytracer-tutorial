
const Sphere = require('./sphere');
const Vector3 = require('../data-structures/vector3');

class LightSphere extends Sphere {
  
  constructor(light, radius=0.4, color=null) {
    super(light.location, radius);
    this.light = light;
    if (color == null) this.color = light.diffuseIntensity.asVector3();
    else this.color = color;
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
      color: this.color
    };
  }
}

module.exports = LightSphere;