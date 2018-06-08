
const Color = require('../data-structures/color')
const Material = require('../data-structures/material')
const Vector3 = require('../data-structures/vector3')
const LightSphere = require('../geometry/light-sphere')
const Sphere = require('../geometry/sphere')
const Light = require('../lights/light')

const ImagePlane = require('../view/image-plane');
const View = require('../view');

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
  
  fromConfig(components, objects, scene) {
    
    let sceneObjects = {};
    
    for (var i = 0; i < scene.place.length; ++i) {
      
      let objectComponents = {};
      
      let placementObject = scene.place[i];
      let objectReference = placementObject.obj.split('.');
      
      let objectDefinition = objects[objectReference[0]][objectReference[1]];
      
      let placementLocation = new Vector3(placementObject.loc[0],
        placementObject.loc[1], placementObject.loc[2]);
        
      for (let j = 0; j < objectDefinition.place.length; ++j) {
        
        let placementComponent = objectDefinition.place[j];
        let componentRef = placementComponent.obj.split('.');

        let componentDefinition = components[componentRef[0]][componentRef[1]];
        
        let componentLoc = null;
        
        if (placementComponent.loc.hasOwnProperty('from')) {
          if (placementComponent.loc.hasOwnProperty('random')) {
            
            let randomDir = new Vector3(
              Math.random() * (placementComponent.loc.random[0][1] - placementComponent.loc.random[0][0]) + placementComponent.loc.random[0][0],
              Math.random() * (placementComponent.loc.random[1][1] - placementComponent.loc.random[1][0]) + placementComponent.loc.random[1][0],
              Math.random() * (placementComponent.loc.random[2][1] - placementComponent.loc.random[2][0]) + placementComponent.loc.random[2][0]
            ).normalized();
            
            if (placementComponent.loc.hasOwnProperty('scale')) {
              randomDir = randomDir._times(new Vector3(
                placementComponent.loc.scale[0],
                placementComponent.loc.scale[1],
                placementComponent.loc.scale[2]
              ));
            }
            
            componentLoc = objectComponents[placementComponent.loc.from].center
              ._plus(randomDir);
          }
          else {
            componentLoc = objectComponents[placementComponent.loc.from].center
              ._plus(new Vector3(
                placementComponent.loc.dir[0],
                placementComponent.loc.dir[1],
                placementComponent.loc.dir[2]
              ));
          }
        }
        else {
          componentLoc = placementLocation._plus(new Vector3(placementComponent.loc[0],
              placementComponent.loc[1], placementComponent.loc[2]));
        }
        
        if (componentDefinition.isLight) {
          
          let thisLight = new Light(
            componentLoc,
            new Color(componentDefinition.light.diffuse[0],
              componentDefinition.light.diffuse[1],
              componentDefinition.light.diffuse[2]),
            new Color(componentDefinition.light.spec[0],
              componentDefinition.light.spec[1],
              componentDefinition.light.spec[2])
          );
          this.lights.push(thisLight);
          let thisSphere = new LightSphere(thisLight, componentDefinition.size);
          
          objectComponents[placementComponent.name] = thisSphere;
          this.objects.push(thisSphere);
        }
        else {
          
          let thisSphere = new Sphere(
            componentLoc,
            componentDefinition.size,
            new Material(
              new Color(componentDefinition.ambient[0], componentDefinition.ambient[1], componentDefinition.ambient[2]),
              new Color(componentDefinition.diffuse[0], componentDefinition.diffuse[1], componentDefinition.diffuse[2]),
              new Color(componentDefinition.spec[0], componentDefinition.spec[1], componentDefinition.spec[2]),
              componentDefinition.shine || 0,
              componentDefinition.reflect || 0.0
            )
          );
          
          objectComponents[placementComponent.name] = thisSphere;
          this.objects.push(thisSphere);
        }
      }
    }
    
    var views = [];
    
    for (var i = 0; i < scene.pictures; ++i) {
      
      let objIndex = parseInt(Math.random() * this.objects.length);
      let center = this.objects[objIndex].center;
      
      
      let dir = new Vector3(Math.random(), Math.random(), Math.random()).normalized();
      
      let dist = dir._scale(Math.random() * 10 + 3);
      let cam = center.plus(dist);
      let ipCenter = cam._minus(dir);
      dir = cam._minus(center);
      
      let abX = Math.abs(dir.x);
      let abY = Math.abs(dir.y);
      let abZ = Math.abs(dir.z);
      
      var ip  = null;
      
      if (abX > abY && abX > abY) {
        // x is most significant change
        if (dir.x > 0) ip = ImagePlane.lookDownX(ipCenter);
        else ip = ImagePlane.lookUpX(ipCenter);
      }
      else if (abY > abX && abY > abZ) {
        if (dir.y > 0) ip = ImagePlane.lookDownY(ipCenter);
        else ip = ImagePlane.lookUpY(ipCenter);
      }
      else if (abZ > abX && abZ > abY) {
        if (dir.z > 0) ip = ImagePlane.lookDownZ(ipCenter);
        else ip = ImagePlane.lookUpZ(ipCenter);
      }
      else {
        ip = ImagePlane.lookUpZ(ipCenter);
      }
      
      let randomView = new View(
        cam,
        ip,
        512, 384// 512, 384
      );
      
      views.push(randomView);
    }
    
    return views;
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