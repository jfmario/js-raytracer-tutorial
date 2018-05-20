
import Color from '../data-structures/color';
import Material from '../data-structures/material';
import Vector3 from '../data-structures/vector3';
import Sphere from '../geometry/sphere';
import Light from '../lights/light';

class Scene {
  
  constructor(xmin=-2, xmax=2, ymin=-1, ymax=-1, zmin=0, zmax=5) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.zmin = zmin;
    this.zmax = zmax;
    this.lights = [];
    this.objects = [];
    // temporary view placeholder
    this._view = null;
    this.backgroundColor = new Color(0, 0, 0);
    this.ambientLightIntensity = new Color(0.2, 0.2, 0.2);
  }
  
  getObjects() {
    return this.objects;
  }
  
  randomizeAmbientLight() {
    this.ambientLightIntensity = new Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
  }
  
  generateRandomLights(amount=2) {
    
    for (let i = 0; i < amount; ++i) {
      let location = new Vector3(
        Math.random() * (this.xmax - this.xmin) + this.xmin,
        Math.random() * (this.ymax - this.ymin) + this.ymin,
        Math.random() * (this.zmax - this.zmin) + this.zmin
      );
      let iD = new Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      let iS = new Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      let light = new Light(location, iD, iS);
      
      this.lights.push(light);
    }
  }
  
  generateRandomSpheres(amount=5) {
    for (var i = 0; i < amount; ++i) {
      
      let center = new Vector3(
        Math.random() * (this.xmax - this.xmin) + this.xmin,
        Math.random() * (this.ymax - this.ymin) + this.ymin,
        Math.random() * (this.zmax - this.zmin) + this.zmin
      );
      let radius = Math.random() * (1 - 0.1) + 0.1;
      let r = Math.random();
      let g = Math.random();
      let b = Math.random();
      let ambientConstant = new Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      let diffuseConstant = new Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      let specularConstant = new Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      let shininess = Math.random() * 30;
      let material = new Material(ambientConstant, diffuseConstant,
        specularConstant, shininess);
      let sphere = new Sphere(center, radius, r, g, b, material);
      
      this.objects.push(sphere);
    }
  }
}

export default Scene;