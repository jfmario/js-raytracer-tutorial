
import Sphere from './sphere';
import Vector3 from '../data-structures/vector3';

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

export default LightSphere;