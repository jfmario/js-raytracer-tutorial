
import Color from '../data-structures/color';

class Geometry {
  
  constructor() {
    
  }
  
  /**
   * Determines whether or not the given ray intersects with this object.
   * If so, it returns a color object.
   * Otherwise, it returns null.
   */
  colorAtIntersection(ray) {
    return new Color(0, 0, 0);
  }
}

export default Geometry;