
const Color = require('../data-structures/color')
const Material = require('../data-structures/material')
const Vector3 = require('../data-structures/vector3')

const LightSphere = require('../geometry/light-sphere');
const Sphere = require('../geometry/sphere');

const Light = require('../lights/light');

const ImagePlane = require('../view/image-plane');
const View = require('../view');


const Scene = require('./scene');

class SolarSystem extends Scene {
  
  constructor() {
    
    super();
    
    var center = new Vector3(0, 0, 0);
    
    const sunlight = new Light(
      center,
      new Color(1, 0.8, 0.4),
      new Color(1, 1, 0.8)
    );
    const sun = new LightSphere(sunlight, 2.0);
    
    var randomDir = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(3, 0, 3));
      
    var Mercury = new Sphere(
      center._plus(randomDir), 0.2,
      new Material(
        new Color(0.1, 0.1, 0.1),
        new Color(0.4, 0.4, 0.4),
        new Color(0.2, 0.2, 0.2),
        5, 0
      )
    );
    
    randomDir = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(5, 0, 5));
      
    var Venus = new Sphere(
      center._plus(randomDir), 0.3,
      new Material(
        new Color(0.3, 0.3, 0.1),
        new Color(0.6, 0.7, 0.2),
        new Color(0.4, 0.5, 0.0),
        5, 0
      )
    );
    
    randomDir = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(7, 0, 7));
      
    var Earth = new Sphere(
      center._plus(randomDir), 0.5,
      new Material(
        new Color(0.0, 0.3, 0.3),
        new Color(0.1, 0.9, 0.1),
        new Color(0.2, 0.3, 0.6),
        5, 0
      )
    );
    
    randomDir = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(1.5, 0, 1.5));
      
    var Moon = new Sphere(
      Earth.center._plus(randomDir), 0.3,
      new Material(
        new Color(0.0, 0.0, 0.0),
        new Color(0.6, 0.6, 0.6),
        new Color(0.6, 0.6, 0.6),
        10, 0
      )
    );
    
    randomDir = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(9, 0, 9));
      
    var Mars = new Sphere(
      center._plus(randomDir), 0.5,
      new Material(
        new Color(0.3, 0.0, 0.0),
        new Color(0.6, 0.2, 0.2),
        new Color(1, 0.3, 0.3),
        5, 0
      )
    );
    
    this.lights.push(sunlight);
    
    this.objects.push(sun);
    this.objects.push(Mercury);
    this.objects.push(Venus);
    this.objects.push(Earth);
    this.objects.push(Moon);
    this.objects.push(Mars);
    
    for (var i = 0; i < 10; ++i) {
      
      randomDir = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(Math.random() * 2 + 10, 1, Math.random() * 2 + 10));
      
      var Asteroid = new Sphere(
        center._plus(randomDir), Math.random() / 5.0,
        new Material(
          new Color(0.2, 0.2, 0.2),
          new Color(0.4, 0.4, 0.4),
          new Color(0.2, 0.2, 0.2),
          5, 0
        )
      );
      
      this.objects.push(Asteroid);
    }
    
    randomDir = new Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
      .normalized()._times(new Vector3(15, 0, 15));
      
    var Jupiter = new Sphere(
      center._plus(randomDir), 1.5,
      new Material(
        new Color(0.3, 0.3, 0.0),
        new Color(1, 0.6, 0.2),
        new Color(0.5, 0.3, 0.3),
        0, 0.3
      )
    );
    this.objects.push(Jupiter);
  }
  
  getViews(n=8) {
    
    var views = [];
    
    for (var i = 0; i < n; ++i) {
      
      let objIndex = parseInt(Math.random() * this.objects.length);
      let center = this.objects[objIndex].center;
      
      
      let dir = new Vector3(Math.random(), Math.random(), Math.random()).normalized();
      
      let dist = dir._scale(Math.random() * 10 + 3);
      let cam = center.plus(dist);
      let ipCenter = cam._minus(dir);
      
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
        1024, 768// 512, 384
      );
      
      views.push(randomView);
    }
    
    return views;
  }
}

module.exports = SolarSystem;