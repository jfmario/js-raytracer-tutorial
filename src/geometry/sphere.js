
import Color from '../data-structures/color';
import Geometry from './geometry';

class Sphere {
  
  constructor(center, radius, r=1, g=1, b=1) {
    this.center = center; // Vector3
    this.radius = radius; // Number
    this.color = new Color(r, g, b);
  }
  
  intersection(ray) {
    
    let cPrime = ray.direction.origin._minus(this.center);
    
    // quadratic variables
    let a = ray.direction.length() * ray.direction.length();
    let b = 2 * cPrime._dot(ray.direction);
    let c = cPrime.length() * cPrime.length() - this.radius * this.radius;
    let discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
      // no intersection
      return null;
    }
    
    // quadratic formula
    let t1 = ((0 - b) + Math.sqrt(discriminant)) / (2 * a);
    let t2 = ((0 - b) - Math.sqrt(discriminant)) / (2 * a);
    
    // intersection is behind image screen
    if (t1 < 0 && t2 < 0) return null;
    
    // get smaller t for closest intersection
    let t = t1;
    if (t2 < t1) t = t2;
    return t;
  }
}

export default Geometry;