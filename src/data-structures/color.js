
import Vector3 from './vector3';

/**
 * Class representing a color.
 * For calculations this should use 0-1 for color.
 * normalize() returns a copy with 0-255 instead.
 */
class Color {
  
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  
  asVector3() {
    return new Vector3(this.r, this.g, this.b);
  }
  
  rescale(rmin=0, rmax=255, gmin=0, gmax=255, bmin=0, bmax=255) {
    
    let rRange = rmax - rmin;
    let gRange = gmax - gmin;
    let bRange = bmax - bmin;
    
    let r = parseInt(((this.r - rmin) / rRange) * 255);
    let g = parseInt(((this.g - gmin) / gRange) * 255);
    let b = parseInt(((this.b - bmin) / bRange) * 255);
    
    return new Color(r, g, b);
  }

  clamped() {
    
    let r = this.r;
    let g = this.g;
    let b = this.b;
    
    if (r < 0) r = 0;
    else if (r > 1) r = 1;
    if (g < 0) g = 0;
    else if (g > 1) g = 1;
    if (b < 0) b = 0;
    else if (b > 1) b = 1;
    
    return new Color(r, g, b);
  }  
  
  normalized() {
    return this.rescale(0, 1, 0, 1, 0, 1);
  }
}

export default Color;