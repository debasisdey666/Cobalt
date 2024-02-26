// custom-reuse-strategy.ts

import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  private routeCache = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && route.routeConfig.path !== '';
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const routePath = route.routeConfig?.path;
    if (routePath) {
      this.routeCache.set(routePath, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routePath = route.routeConfig?.path;
    return !!routePath && this.routeCache.has(routePath);
  }
  

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const routePath = route.routeConfig?.path;
    return routePath ? this.routeCache.get(routePath) || null : null;
  }
  

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
