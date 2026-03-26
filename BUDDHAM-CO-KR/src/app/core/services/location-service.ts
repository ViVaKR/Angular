import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocationService {

  // 사용자의 현재 위치를 가져오는 '나침반' 함수
  async getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('이 브라우저는 위치 정보를 지원하지 않습니다, 제독님!');
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true, // 정밀도 우선!
          timeout: 5_000
        });
      }
    });
  }
}
