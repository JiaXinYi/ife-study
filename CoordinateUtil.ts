import { LatLng } from './MapUtils';

export class CoordinateUtil {
  private static pi: number = 3.1415926535897932384626;
  private static x_pi: number = 3.14159265358979324 * 3000.0 / 180.0;
  private static a: number = 6378245.0;
  private static ee: number = 0.00669342162296594323;
  /** 
* 手机GPS坐标转火星坐标 
* 
* @param wgLoc 
* @return 
*/
  public static transformFromWGSToGCJ(wgLoc: LatLng): LatLng {

    //如果在国外，则默认不进行转换 
    if (this.outOfChina(wgLoc.latitude, wgLoc.longitude)) {
      return new LatLng(wgLoc.latitude, wgLoc.longitude);
    }
    let dLat: number = this.transformLat(wgLoc.longitude - 105.0,
      wgLoc.latitude - 35.0);
    let dLon: number = this.transformLon(wgLoc.longitude - 105.0,
      wgLoc.latitude - 35.0);
    let radLat: number = wgLoc.latitude / 180.0 * Math.PI;
    let magic: number = Math.sin(radLat);
    magic = 1 - this.ee * magic * magic;
    let sqrtMagic: number = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * Math.PI);
    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * Math.PI);

    return new LatLng(wgLoc.latitude + dLat, wgLoc.longitude + dLon);
  }
  /**
   * 火星坐标系转WGS84坐标
   * 
   * @static
   * @param {LatLng} wgLoc 
   * @returns {LatLng} 
   * @memberof CoordinateUtil
   */
  public static transformFromGCJToWGS(wgLoc: LatLng): LatLng {
        let gps = this.transform(wgLoc);
        let lontitude = wgLoc.longitude * 2 - gps[1];  
        let latitude = wgLoc.latitude * 2 - gps[0];  
        return new LatLng(latitude, lontitude);  
    }  
  /**
   * 将 BD-09 坐标转换成GCJ-02 坐标
   * 
   * @static
   * @param {LatLng} wgLoc 
   * @returns {LatLng} 
   * @memberof CoordinateUtil
   */
  public static transformFromBDToGCJ(wgLoc: LatLng): LatLng {
    let x: number = wgLoc.longitude - 0.0065, y = wgLoc.latitude - 0.006;
    let z: number = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    let theta: number = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    let tempLon: number = z * Math.cos(theta);
    let tempLat: number = z * Math.sin(theta);
    let gps: LatLng = new LatLng(tempLat, tempLon);
    return gps;
  }
  /**
   * GCJ-02 坐标转换到 BD-09 坐标
   * 
   * @static
   * @param {LatLng} wgLoc 
   * @returns {LatLng} 
   * @memberof CoordinateUtil
   */
  public static transformFromGCJToBD(wgLoc: LatLng): LatLng {
    let x: number = wgLoc.longitude, y = wgLoc.latitude;
    let z: number = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    let theta: number = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    let tempLon: number = z * Math.cos(theta) + 0.0065;
    let tempLat: number = z * Math.sin(theta) + 0.006;
    let gps: LatLng = new LatLng(tempLat, tempLon);
    return gps;
  }
  public static transform(wgLoc: LatLng): LatLng {
      if (this.outOfChina(wgLoc.latitude, wgLoc.longitude)) {  
          return new LatLng(wgLoc.latitude, wgLoc.longitude);  
      }  
      let dLat = this.transformLat(wgLoc.longitude - 105.0, wgLoc.latitude - 35.0);  
      let dLon = this.transformLon(wgLoc.longitude - 105.0, wgLoc.latitude - 35.0);  
      let radLat = wgLoc.latitude / 180.0 * this.pi;  
      let magic = Math.sin(radLat);  
      magic = 1 - this.ee * magic * magic;  
      let sqrtMagic = Math.sqrt(magic);  
      dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
      dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
      let mgLat = wgLoc.latitude + dLat;  
      let mgLon = wgLoc.longitude + dLon;  
      return new LatLng(mgLat,mgLon);  
  }  

  public static transformLat(x: number, y: number): number {
    let ret: number = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
      + 0.2 * Math.sqrt(x > 0 ? x : -x);
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x
      * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0
      * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y
      * Math.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  }

  public static transformLon(x: number, y: number): number {
    let ret: number = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
      * Math.sqrt(x > 0 ? x : -x);
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x
      * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0
      * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x
      / 30.0 * Math.PI)) * 2.0 / 3.0;
    return ret;
  }

  public static outOfChina(lat: number, lon: number): boolean {
    if (lon < 72.004 || lon > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  }
}