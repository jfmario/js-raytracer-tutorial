
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
    
    this.r = parseInt(((this.r - rmin) / rRange) * 255);
    this.g = parseInt(((this.g - gmin) / gRange) * 255);
    this.b = parseInt(((this.b - bmin) / bRange) * 255);
    return this;
  }
}

export default Color;