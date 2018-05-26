
import Color from '../data-structures/color';
import Material from '../data-structures/material';
import Vector3 from '../data-structures/vector3';
import LightSphere from '../geometry/light-sphere';
import Sphere from '../geometry/sphere';
import Light from '../lights/light';

class Scene {
  
  constructor(xmin=-2, xmax=2, ymin=-1, ymax=1, zmin=0, zmax=5) {
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
    this.backgroundColor = new Vector3(0, 0, 0);
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
  
  generateBrightLights(amount=2) {
    
    for (let i = 0; i < amount; ++i) {
      let location = new Vector3(
        Math.random() * (this.xmax - this.xmin) + this.xmin,
        Math.random() * (this.ymax - this.ymin) + this.ymin,
        Math.random() * (this.zmax - this.zmin) + this.zmin
      );
      let iD = new Color(
        0.9, 0.9, 0.9
      );
      let iS = new Color(
        0.9, 0.9, 0.9
      );
      let light = new Light(location, iD, iS);
      
      this.lights.push(light);
      this.objects.push(new LightSphere(light));
    }
  }
  
  generateColoredLights(amount=2, r=0.9, g=0.9, b=0.9) {
    
    for (let i = 0; i < amount; ++i) {
      let location = new Vector3(
        this.xmin,
        Math.random() * (this.ymax - this.ymin) + this.ymin,
        Math.random() * (this.zmax - this.zmin) + this.zmin
      );
      let iD = new Color(
        r, g, b
      );
      let iS = new Color(
        0.8, 0.8, 0.8
      );
      let light = new Light(location, iD, iS);
      
      this.lights.push(light);
    }
  }
  
  generateSideLights() {
    
    let location = new Vector3(
      this.xmin,
      Math.random() * (this.ymax - this.ymin) + this.ymin,
      Math.random() * (this.zmax - this.zmin) + this.zmin
    );
    let iD = new Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
    let iS = new Color(
      0.8, 0.8, 0.8
    );
    let light = new Light(location, iD, iS);
    
    this.lights.push(light);
    
    let location2 = new Vector3(
      this.xmax,
      Math.random() * (this.ymax - this.ymin) + this.ymin,
      Math.random() * (this.zmax - this.zmin) + this.zmin
    );
    let iD2 = new Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
    let iS2 = new Color(
      0.8, 0.8, 0.8
    );
    let light2 = new Light(location2, iD2, iS2);
    
    this.lights.push(light2);
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
      let reflectiveness = Math.random();
      let material = new Material(ambientConstant, diffuseConstant,
        specularConstant, shininess, reflectiveness);
      let sphere = new Sphere(center, radius, material);
      
      this.objects.push(sphere);
    }
  }
}

export default Scene;