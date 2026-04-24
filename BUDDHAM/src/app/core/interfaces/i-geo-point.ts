/**
 * [Geo-Intelligence] GeoJSON 포인트 규격
 */
export interface IGeoPoint {
    type: 'Point';
    // [경도(Longitude), 위도(Latitude)] 순서입니다! (GeoJSON 표준)
    coordinates: [number, number];
}
