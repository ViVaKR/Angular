import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    // 캐시를 저장할 객체
    private handlers: { [key: string]: DetachedRouteHandle } = {};

    // 캐시를 활성화할지 여부를 결정합니다.
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // 특정 경로에 대해 캐시를 활성화합니다. (싱글)
        // return route.routeConfig?.path === 'DataList';

        // 캐시를 활성화할 경로 목록
        const cacheableRoutes = ['DataList', 'MyCode', 'KatexLatexCamp', 'CodeBackup'];

        // 경로가 캐시 목록에 포함되어 있는지 확인
        return cacheableRoutes.includes(route.routeConfig?.path || '');
    }

    // 캐시를 저장합니다.
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        if (route.routeConfig) {
            this.handlers[route.routeConfig.path!] = handle!;
        }
    }

    // 캐시를 제거합니다.
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path!];
    }

    // 캐시를 가져옵니다.
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.routeConfig) {
            return null;
        }
        return this.handlers[route.routeConfig.path!] || null;
    }

    // 캐시를 재사용할지 여부를 결정합니다.
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
