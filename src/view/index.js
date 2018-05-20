
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
  
  viewScene(scene) {
    
    const image = new Image(this.W, this.H);
    
    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        
        let pointray = this._bilinearInterpolation(x, y);
        let color = scene.backgroundColor;
        let objects = scene.getObjects();
        let bestT = null;
        let bestO = null;
        
        for (let i = 0; i < objects.length; ++i) {
          
          let o = objects[i];
          let t = o.intersection(pointray.ray);
          
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
          color = bestO.color.normalized();
        }
        image.putPixel(x, y, color);
      }
    }
    
    return image;
  }
};

export default View;