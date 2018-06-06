
var jimp = require('jimp');

class Image {
  
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.pixelData = {};
    this.image = null;
  }
  
  async init() {
    return new Promise((resolve, reject) => {
      this.image = new jimp(this.w, this.h, function() {
        resolve(true);
      });
    });
  }

  putPixel(x, y, color) {
    
    this.pixelData[y * this.w + x] = color;
    
    this.image.setPixelColor(jimp.rgbaToInt(color.r, color.g, color.b, 255),
      x, y);
  }

  writeImage(loc) {
    this.image.write(loc);
  }
}

module.exports = Image;
