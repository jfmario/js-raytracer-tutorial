
const Color = require('../data-structures/color')
const Material = require('../data-structures/material')
const Vector3 = require('../data-structures/vector3')
const LightSphere = require('../geometry/light-sphere')
const Sphere = require('../geometry/sphere')
const Light = require('../lights/light')

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
  
  addGiantEarth() {
    this.objects.push(
      new Sphere(
        new Vector3(0, -501, 1), 500,
        new Material(
          new Color(0.2, 0.2, 0.2), new Color(0, 0.75, 0), new Color(0.4, 0.4, 0.4),
          10, 0.75)
      )
    );
  }
  addTree() {
    let wood = new Material(
      new Color(0.64, 0.16, 0.16), new Color(0.64, 0.16, 0.16), new Color(0.4, 0.4, 0.4),
      10, 0
    );
    this.objects.push(new Sphere(new Vector3(0, -0.5, 1), 0.5, wood));
    this.objects.push(new Sphere(new Vector3(0, 0.5, 1), 0.5, wood));
    this.objects.push(new Sphere(new Vector3(0, 1.5, 1), 0.5, wood));
    this.objects.push(new Sphere(new Vector3(0, 2.5, 1), 0.5, wood));
  }
}

module.exports = Scene;