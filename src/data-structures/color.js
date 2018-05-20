
import Vector3 from './vector3';

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
  
  normalized() {
    return this.rescale(0, 1, 0, 1, 0, 1);
  }
}

export default Color;