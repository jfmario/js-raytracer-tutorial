
import Sphere from '../geometry/sphere';
import Vector3 from '../data-structures/vector3';

class Scene {
  
  constructor(xmin=-2, xmax=2, ymin=-1, ymax=-1, zmin=0, zmax=5) {
    
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.zmin = zmin;
    this.zmax = zmax;
    this.objects = [];
  }
  
  generateRandomSpheres(amount=5) {
    for (var i = 0; i < amount; ++i) {
      
      let center = new Vector3(
        Math.random() * (this.xmax - this.xmin) + this.xmin,
        Math.random() * (this.ymax - this.ymin) + this.ymin,
        Math.random() * (this.zmax - this.zmin) + this.zmin
      );
      let radius = Math.random() * (1 - 0.1) + 0.1;
      
      let sphere = new Sphere(center, radius);
      this.objects.push(sphere);
    }
  }
}

export default Scene;
export default Scene;