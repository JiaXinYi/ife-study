import {CoordinateUtil} from './CoordinateUtil';
import { LatLng } from './MapUtils';
export class GeoJsonUtil {
    /**
   * geojson根据类型做坐标偏移到火星坐标系
   * 
   * @private
   * @param {any[]} features 
   * @memberof WebgisPage
   */
  public static tramsformCoordinate(features: any[]) {
    features.forEach(features => {
      this.shiftCoordinate(features);
    });
    return features;
  }
  public static shiftCoordinate(feature){
    let Coordinates: any[] = feature.geometry.coordinates;
    if (feature.geometry.type == "LineString") {
      Coordinates.forEach(coordinate => {
        let tmp = new LatLng(coordinate[1], coordinate[0]);
        tmp = CoordinateUtil.transformFromWGSToGCJ(tmp);
        coordinate[0] = tmp.longitude;
        coordinate[1] = tmp.latitude;
      });
    } else if (feature.geometry.type == "Polygon") {
      Coordinates.forEach(coordinate => {
        coordinate.forEach(element => {
          let tmp = new LatLng(element[1], element[0]);
          tmp = CoordinateUtil.transformFromWGSToGCJ(tmp);
          element[0] = tmp.longitude;
          element[1] = tmp.latitude;
        });
      });
    } else if (feature.geometry.type == "Point") {
      let tmp = new LatLng(Coordinates[1], Coordinates[0]);
      tmp = CoordinateUtil.transformFromWGSToGCJ(tmp);
      Coordinates[0] = tmp.longitude;
      Coordinates[1] = tmp.latitude;
    }
    return feature;
  }
}