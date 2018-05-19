
class ImagePlane {
  
  // construct with vectors for corners
  constructor(x1, x2, x3, x4) {
    this.x1 = x1; // top left
    this.x2 = x2; // top right
    this.x3 = x3; // bottom left
    this.x4 = x4;
  }
}

export default ImagePlane;