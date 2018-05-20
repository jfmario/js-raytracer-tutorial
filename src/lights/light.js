
import Color from '../data-structures/color';

class Light {
  
  /**
   * Construct a Light object.
   * @param {Vector3} location          Location of the light.
   * @param {Color}   diffuseIntensity  Diffuse intensity of the light. (white)
   * @param {Color}   specularIntensity Specular intensity of the light. (white)
   */
  constructor(location, diffuseIntensity=null, specularIntesity=null) {
    this.location = location;
    if (diffuseIntensity === null) this.diffuseIntensity = new Color(0, 0, 0);
    else this.diffuseIntensity = diffuseIntensity;
    if (specularIntesity === null) this.specularIntensity = new Color(0, 0, 0);
    else this.specularIntensity = specularIntesity;
  }
}