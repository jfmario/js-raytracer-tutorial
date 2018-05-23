
import Color from '../data-structures/color';
import Material from '../data-structures/material';
import Ray from '../data-structures/ray';
import Vector3 from '../data-structures/vector3';
import Geometry from './geometry';

class Sphere {
  
  constructor(center, radius, material=null) {
    this.center = center; // Vector3
    this.radius = radius; // Number
    if (material === null) this.material = new Material();
    else this.material = material;
  }
  
  intersection(ray) {
    
    let cPrime = ray.origin._minus(this.center);
    
    // quadratic variables
    let a = ray.direction.length() * ray.direction.length();
    let b = 2 * cPrime._dot(ray.direction);
    let c = cPrime.length() * cPrime.length() - this.radius * this.radius;
    let discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
      // no intersection
      return null;
    }
    
    // quadratic formula
    let t1 = ((0 - b) + Math.sqrt(discriminant)) / (2 * a);
    let t2 = ((0 - b) - Math.sqrt(discriminant)) / (2 * a);
    
    // intersection is behind image screen
    if (t1 <= 0 && t2 <= 0) return null;
    
    // get smaller t for closest intersection
    let t = t1;
    if (t2 < t1) t = t2;
    return t;
  }
  
  colorAndIntersection(ray, scene, depth=0) {
    
    if (depth > 3) return null;
    
    var t = this.intersection(ray);
    if (t === null) return null;
    let c = this.colorAtIntersection(t, ray, scene);
    
    let newRay = null;
    
    let bestT = null;
    let bestO = null;
    
    // reflection recursion
    for (let i = 0; i < scene.objects.length; ++i) {
      if (scene.objects[i] == this) continue;
      t = null;
    }
  }
  
  colorAtIntersection(t, ray, scene = null, depth=0) {
    
    if (scene === null) return this.color;
    
    let pointOfIntersection = ray.origin._plus(ray.direction._scale(t));
    let n = pointOfIntersection._minus(this.center);
    
    let surfaceNormal = n.normalized();
    
    // reflection of ambient light
    let ambientLight = scene.ambientLightIntensity.asVector3()._times(
      this.material.ambientConstant.asVector3());
      
    let color = new Vector3(0, 0, 0)._plus(ambientLight);
    
    // check all lights hitting this point
    for (var i = 0; i < scene.lights.length; ++i) {
      
      let light = scene.lights[i];
      let lightVector = light.location._minus(pointOfIntersection).normalized();
      
      let normalizedLight = surfaceNormal._dot(lightVector);
      
      // ignore this light if light is hitting inside of sphere
      if (normalizedLight < 0) continue;
      
      let shaded = false;
      
      // test shadow rays
      for (let j = 0; j < scene.objects.length; ++j) {
        
        let otherSphere = scene.objects[j];
        if (otherSphere == this) continue;
        
        let shadowRay = new Ray(pointOfIntersection, 
          light.location._minus(pointOfIntersection));
        if (otherSphere.intersection(shadowRay)) {
          
          shaded = true;
          
          break;
        }
      }
      
      // dont do diffuse or specular light from shaded lights
      if (shaded) continue;
      
      // calculate diffuse component
      let diffuseComponent = light.diffuseIntensity.asVector3()._times(
        this.material.diffuseConstant.asVector3())._scale(normalizedLight);
        
      // calculate specular component
      let reflectiveness = surfaceNormal._scale(2 * normalizedLight)._minus(
        lightVector);
      let viewVector = pointOfIntersection._minus(ray.origin)
        .normalized();
      
      // should i do math.abs here to avoid NaN scales??
      let specularComponent = light.specularIntensity.asVector3()._times(
        this.material.specularConstant.asVector3())._scale(
        Math.pow(Math.abs(viewVector._dot(reflectiveness)), this.material.shininess));
      
      // calculate color to return
      color = color._plus(
        diffuseComponent)._plus(specularComponent);
      if (isNaN(color.x)) {
        console.log(color, viewVector, pointOfIntersection._minus(ray.origin));
      }
    }
    
    return {
      color: color,
      pointOfIntersection: pointOfIntersection,
      surfaceNormal: surfaceNormal
    };
  }
}

export default Sphere;