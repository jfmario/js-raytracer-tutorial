
import Color from '../data-structures/color';
import Material from '../data-structures/material';
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
    if (t1 < 0 && t2 < 0) return null;
    
    // get smaller t for closest intersection
    let t = t1;
    if (t2 < t1) t = t2;
    return t;
  }
  
  colorAtIntersection(t, ray, scene = null) {
    
    if (scene === null) return this.color;
    
    let pointOfIntersection = ray.origin._plus(ray.direction._scale(t));
    let n = pointOfIntersection._minus(this.center);
    
    let surfaceNormal = n.normalized();
    
    // reflection of ambient light
    let ambientLight = scene.ambientLightIntensity.asVector3()._times(
      this.material.ambientConstant.asVector3());
      
    let color = new Vector3(0, 0, 0);
    
    // check all lights hitting this point
    for (var i = 0; i < scene.lights.length; ++i) {
      
      let light = scene.lights[i];
      let lightVector = light.location._minus(pointOfIntersection).normalized();
      
      let normalizedLight = surfaceNormal._dot(lightVector);
      
      // ignore this light if light is hitting inside of sphere
      if (normalizedLight < 0) continue;
      
      // calculate diffuse component
      let diffuseComponent = light.diffuseIntensity.asVector3()._times(
        this.material.diffuseConstant.asVector3())._scale(normalizedLight);
        
      // calculate specular component
      let reflectiveness = surfaceNormal._scale(2 * normalizedLight)._minus(
        lightVector);
      let viewVector = pointOfIntersection._minus(scene._view.camera)
        .normalized();
      
      // should i do math.abs here to avoid NaN scales??
      let specularComponent = light.specularIntensity.asVector3()._times(
        this.material.specularConstant.asVector3())._scale(
        Math.pow(Math.abs(viewVector._dot(reflectiveness)), this.material.shininess));
      
      // calculate color to return
      color = color._plus(ambientLight)._plus(
        diffuseComponent)._plus(specularComponent);
      if (isNaN(color.x)) {
        console.log(specularComponent,
          viewVector,
          reflectiveness,
          viewVector._dot(reflectiveness),
          this.material.shininess,
          Math.pow(viewVector._dot(reflectiveness), this.material.shininess));
      }
    }
    
    return color.asColor().clamped().normalized();
  }
}

export default Sphere;