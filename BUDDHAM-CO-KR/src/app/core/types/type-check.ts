import { IGeoPoint } from "../interfaces/i-geo-point";

/**
 * [Security Protocol] unknown 타입을 안전하게 검문하는 유틸리티
 */
export class TypeCheck {

    /** 문자열인가? */
    static isString(val: unknown): val is string {
        return typeof val === 'string';
    }

    /** 숫자인가? */
    static isNumber(val: unknown): val is number {
        return typeof val === 'number' && !isNaN(val);
    }

    /** 불리언인가? */
    static isBoolean(val: unknown): val is boolean {
        return typeof val === 'boolean';
    }

    /** 객체(배열 제외)인가? */
    static isObject(val: unknown): val is Record<string, unknown> {
        return typeof val === 'object' && val !== null && !Array.isArray(val);
    }

    /** 배열인가? */
    static isArray<T>(val: unknown): val is T[] {
        return Array.isArray(val);
    }

    static isGeoPoint(val: unknown): val is IGeoPoint {
        if (!this.isObject(val)) return false;
        const p = val as any;

        return (
            p.type === 'Point' &&
            Array.isArray(p.coordinates) &&
            p.coordinates.length === 2 &&
            typeof p.coordinates[0] === 'number' &&
            typeof p.coordinates[1] === 'number'
        );
    }
}

/*

사용법

const attrs = item.attributes; // Record<string, unknown>

if (attrs) {
  // 1. 문자열 검문
  if (TypeCheck.isString(attrs['label'])) {
    // 여기서 attrs['label']은 자동으로 string 타입으로 취급됩니다!
    console.log("라벨 나툼:", attrs['label'].toUpperCase());
  }

  // 2. 숫자 검문
  if (TypeCheck.isNumber(attrs['width'])) {
    console.log("너비 계산:", attrs['width'] * 2);
  }
}

--> C# / 일반 지도: 보통 (위도, 경도) 순으로 말하죠.
--> GeoJSON 표준: 무조건 (경도, 위도) 순서입니다! [x, y] 개념

const location = item.location; // unknown 또는 any 상태

if (TypeCheck.isGeoPoint(location)) {
  const [lng, lat] = location.coordinates;
  console.log(`📍 작전 구역 좌표 - 경도: ${lng}, 위도: ${lat}`);

  // 예: 구글 맵이나 카카오 맵 API에 바로 던질 수 있습니다!
} else {
  console.log("⚠️ 좌표 정보가 없거나 유효하지 않은 구역입니다.");
}


*/
