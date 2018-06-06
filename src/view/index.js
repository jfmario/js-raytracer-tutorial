
const Image = require('./image')
const ImagePlane = require('./image-plane')
const Ray = require('../data-structures/ray');
const Vector3 = require('../data-structures/vector3')

class View {
  
  constructor(camera, imagePlane, width, height) {
    this.camera = camera;
    this.imagePlane = imagePlane;
    this.H = height;
    this.W = width;
  }
  
  static createDefaultView() {
    
    const imagePlane = new ImagePlane(
      new Vector3(-1, 0.75, 0),
      new Vector3(1, 0.75, 0),
      new Vector3(-1, -0.75, 0),
      new Vector3(1, -0.75, 0)
    );
    const camera = new Vector3(0, 0, -1);
    
    return new View(camera, imagePlane, 512, 384);
  }
  
  /**
   * From an x, y return the Vector3 point (bilinearly interpreted) 
   * on
   * the image plane and a ray on the camera.
   * Object { point: <Vector3>, ray: <Ray> }
   */
  _bilinearInterpolation(x, y) {
    
    let a = x / this.W;
    let b = (this.H - y - 1) / this.H;
    let a2 = (x + 0.5) / this.W;
    let b2 = (this.H - (y + 0.5) - 1) / this.H;
    let top = this.imagePlane.x1._linearInterpolation(this.imagePlane.x2,
      a);
    let bottom = this.imagePlane.x3._linearInterpolation(this.imagePlane.x4,
      a);
    let point = bottom._linearInterpolation(top, b);
    
    let top2 = this.imagePlane.x1._linearInterpolation(this.imagePlane.x2,
      a2);
    let bottom2 = this.imagePlane.x3._linearInterpolation(this.imagePlane.x4,
      a2);
    let point2 = bottom2._linearInterpolation(top2, b);
    
    let point3 = bottom._linearInterpolation(top, b2);
    let point4 = bottom2._linearInterpolation(top2, b2);
    
    return [
      {
        point: point,
        ray: new Ray(point, point._minus(this.camera))
      },
      {
        point: point2,
        ray: new Ray(point2, point2._minus(this.camera))
      },
      {
        point: point3,
        ray: new Ray(point3, point3._minus(this.camera))
      },
      {
        point: point4,
        ray: new Ray(point4, point4._minus(this.camera))
      }
    ];
  }
  
  // assignment1
  colorSnapshot() {
    
    const image = new Image(this.W, this.H);
    
    let minX = 0.5;
    let maxX = 0.5;
    let minY = 0.5;
    let maxY = 0.5;
    
    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        let pointray = this._bilinearInterpolation(x, y)[0];
        image.putPixel(x, y, pointray.ray.direction.asColor().rescale(
          -1, 1, -0.75, 0.75));
      }
    }
    
    console.log(minX, maxX, minY, maxY);
    
    return image;
  }
  
  getColor(ray, scene, depth=0, currentObj=null) {
    
    if (depth > 3) return null;
    
    let cam = false;
    if (depth == 0) cam = true;
    
    let objects = scene.getObjects();
    let color = null;
    let bestT = null;
    let bestO = null;
    
    for (let i = 0; i < objects.length; ++i) {
      
      let o = objects[i];
      if (currentObj == o) continue;
      let t = o.intersection(ray, cam);
      
      if (t !== null) {
        
        // console.log(t);
        
        if (bestT === null) {
          bestT = t;
          bestO = o;
        }
        else {
          if (t < bestT) {
            bestT = t;
            bestO = o;
          }
        }
      }
    }
    
    if (bestO !== null) {
      // console.log(bestO.color);
      
      let c = bestO.colorAtIntersection(bestT, ray, scene, depth, cam);
      color = c.color;
      // return color.asColor().clamped().normalized();
      
      if (!bestO.light) {
        let reverseDirection = ray.direction._scale(-1);
        let reflectionVector = c.surfaceNormal
          ._scale(2)
          ._scale(c.surfaceNormal._dot(reverseDirection))
          ._minus(reverseDirection);
          
        let reflectionRay = new Ray(c.pointOfIntersection, reflectionVector);
        let reflectionColor = this.getColor(reflectionRay, scene, depth + 1, bestO);
        
        if (reflectionColor !== null) {
          color = reflectionColor
            ._times(bestO.material.reflectiveConstant.asVector3())
            ._plus(color);
        }
      }
    }
    
    
    if (color === null) return null;
    return color;
  }
  
  async viewScene(scene) {
    
    const image = new Image(this.W, this.H);
    
    await image.init();
    
    scene._view = this;
    
    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        
        let pointrays = this._bilinearInterpolation(x, y);
        let color1 = this.getColor(pointrays[0].ray, scene, 0) || scene.backgroundColor;
        let color2 = this.getColor(pointrays[1].ray, scene, 0) || scene.backgroundColor;
        let color3 = this.getColor(pointrays[2].ray, scene, 0) || scene.backgroundColor;
        let color4 = this.getColor(pointrays[3].ray, scene, 0) || scene.backgroundColor;
        
        let combo = color1._plus(color2)._plus(color3)._plus(color4);
        let color = combo._scale(0.25);
        
        color = color.asColor().clamped().normalized();
        image.putPixel(x, y, color);
      }
    }
    
    return image;
  }
};

module.exports = View;