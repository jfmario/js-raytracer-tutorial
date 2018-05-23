
import Image from './image';
import ImagePlane from './image-plane';
import Ray from '../data-structures/ray';
import Vector3 from '../data-structures/vector3';

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
    
    return new View(camera, imagePlane, 256, 192);
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
    let top = this.imagePlane.x1._linearInterpolation(this.imagePlane.x2,
      a);
    let bottom = this.imagePlane.x3._linearInterpolation(this.imagePlane.x4,
      a);
    let point = bottom._linearInterpolation(top, b);
    
    return {
      point: point,
      ray: new Ray(point, point._minus(this.camera))
    };
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
        let pointray = this._bilinearInterpolation(x, y);
        image.putPixel(x, y, pointray.ray.direction.asColor().rescale(
          -1, 1, -0.75, 0.75));
      }
    }
    
    console.log(minX, maxX, minY, maxY);
    
    return image;
  }
  
  getColor(ray, scene, depth=0, currentObj=null) {
    
    if (depth > 3) return null;
    
    let objects = scene.getObjects();
    let color = null;
    let bestT = null;
    let bestO = null;
    
    for (let i = 0; i < objects.length; ++i) {
      
      let o = objects[i];
      if (currentObj == o) continue;
      let t = o.intersection(ray);
      
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
      
      let c = bestO.colorAtIntersection(bestT, ray, scene);
      color = c.color;
      // return color.asColor().clamped().normalized();
      
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
    
    if (color === null) return null;
    return color;
  }
  
  viewScene(scene) {
    
    const image = new Image(this.W, this.H);
    
    scene._view = this;
    
    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        
        let pointray = this._bilinearInterpolation(x, y);
        let color = this.getColor(pointray.ray, scene, 0);
        
        if (color === null) color = scene.backgroundColor;
        else color = color.asColor().clamped().normalized();
        image.putPixel(x, y, color);
      }
    }
    
    return image;
  }
};

export default View;