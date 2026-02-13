import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IpService } from '@app/core/services/ip-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { Paths } from '@app/data/menu-data';
import { debounceTime, filter, firstValueFrom, switchMap } from 'rxjs';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ip-info',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './ip-info.html',
  styleUrl: './ip-info.scss',
})
export class IpInfo implements AfterViewInit, OnDestroy {

  title = Paths.IpInfo.title;

  private http = inject(HttpClient);
  private ipService = inject(IpService);

  searchIp = signal<string>('164.124.101.2');

  public data = toSignal(
    toObservable(this.searchIp).pipe(
      debounceTime(500),
      filter(ip => this.isValidIp(ip)),
      switchMap(ip => this.ipService.getIpInfomation(ip))
    ), { initialValue: null });

  private map?: L.Map;
  private marker?: L.Marker;

  // 커스텀 아이콘 상수
  private readonly customIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor() {
    effect(() => {
      const ipData = this.data();
      if (ipData?.location && this.map) {
        const [lat, lng] = ipData.location.split(',').map(Number);
        this.updateMarker(lat, lng, ipData);
      }
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  refreshMap() {
    this.searchIp.set('');
    setTimeout(() => {
      this.searchIp.set('164.124.101.2');
    }, 500);
  }

  public initMap() {

    // 지도 생성
    this.map = L.map('map').setView([37.5660, 126.9784], 15);

    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  private async updateMarker(lat: number, lng: number, data: any) {
    if (!this.map) return;

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    const koreanName = await this.fetchKoreanLocationName(lat, lng);
    this.marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
    this.marker.bindPopup(`
    <div class="font-roboto-con p-3">
     <h3 class="font-bold text-xl text-sky-600">
        📍 ${koreanName ?? data.city}
      </h3>
      <div class="space-y-1 border-t pt-2">

        <p class="text-sm"><strong>🌏 국가:</strong> ${this.getCountryNameInKorean(data.country)}</p>
        <p class="text-sm"><strong>🌐 IP:</strong> ${data.ip}</p>
        <p class="text-sm"><strong>📡 ISP:</strong> ${data.isp}</p>
        <p class="text-sm"><strong>📍 좌표:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
        <p class="text-xs text-gray-500 mt-2">⏰ ${data.timezone}</p>
      </div>
    </div>
  `, {
      maxWidth: 350
    }).openPopup();

    this.map.flyTo([lat, lng], 13, { duration: 1.5 });
  }

  private async fetchKoreanLocationName(lat: number, lng: number): Promise<string | null> {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ko`;

      const response = await firstValueFrom(
        this.http.get<any>(url, {
          headers: { 'User-Agent': 'IP-Tracker-App/1.0' }
        })
      );

      const addr = response?.address;

      // 한국 주소 형식
      if (addr?.country_code === 'kr') {
        const name = `${addr.city || addr.province || ''} ${addr.borough || addr.suburb || ''}`.trim();
        return name || null; // 빈 문자열이면 null 반환
      }

      // 기타 국가
      const name = addr?.city || addr?.town || addr?.county ||
        addr?.state || response?.display_name?.split(',')[0] || '';

      return name.trim() || null; // 빈 문자열이면 null 반환

    } catch (error) {
      console.error('한글 지역명 조회 실패:', error);
      return null; // 빈 문자열 대신 null
    }
  }

  private isValidIp(ip: string): boolean {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipPattern.test(ip);
  }

  getCountryNameInKorean(countryCode: string): string {
    const countryMap: { [key: string]: string } = {
      'KR': '대한민국 🇰🇷',
      'US': '미국 🇺🇸',
      'JP': '일본 🇯🇵',
      'CN': '중국 🇨🇳',
      'GB': '영국 🇬🇧',
      'DE': '독일 🇩🇪',
      'FR': '프랑스 🇫🇷',
      'CA': '캐나다 🇨🇦',
      'AU': '호주 🇦🇺',
      'SG': '싱가포르 🇸🇬',
      'TW': '대만 🇹🇼',
      'HK': '홍콩 🇭🇰',
      'IN': '인도 🇮🇳',
      'TH': '태국 🇹🇭',
      'VN': '베트남 🇻🇳',
      'ID': '인도네시아 🇮🇩',
      'PH': '필리핀 🇵🇭',
      'MY': '말레이시아 🇲🇾',
      'NZ': '뉴질랜드 🇳🇿',
      'BR': '브라질 🇧🇷',
      'MX': '멕시코 🇲🇽',
      'ES': '스페인 🇪🇸',
      'IT': '이탈리아 🇮🇹',
      'RU': '러시아 🇷🇺',
      'NL': '네덜란드 🇳🇱',
      'SE': '스웨덴 🇸🇪',
      'NO': '노르웨이 🇳🇴',
      'DK': '덴마크 🇩🇰',
      'FI': '핀란드 🇫🇮',
      'PL': '폴란드 🇵🇱',
      'TR': '튀르키예 🇹🇷',
      'SA': '사우디아라비아 🇸🇦',
      'AE': '아랍에미리트 🇦🇪',
      'IL': '이스라엘 🇮🇱',
      'ZA': '남아프리카공화국 🇿🇦',
      'EG': '이집트 🇪🇬',
      'AR': '아르헨티나 🇦🇷',
      'CL': '칠레 🇨🇱',
      'CO': '콜롬비아 🇨🇴',
    };
    return countryMap[countryCode] || countryCode;
  }

  ngOnDestroy() {
    // 메모리 누수 방지
    if (this.map) {
      this.map.remove();
    }
  }

}
