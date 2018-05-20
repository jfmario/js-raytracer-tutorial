
import Color from '../data-structures/color';
import Geometry from './geometry';

class Sphere {
  
  constructor(center, radius, r=1, g=1, b=1) {
    this.center = center; // Vector3
    this.radius = radius; // Number
    this.color = new Color(r, g, b);
  }
}

export default Geometry;