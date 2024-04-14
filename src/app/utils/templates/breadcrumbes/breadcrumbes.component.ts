import { Component } from '@angular/core';
import { IBreadCrumb } from '../../types/types';
import {
  Router,
  ActivatedRoute,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './breadcrumbes.component.html',
  styleUrl: './breadcrumbes.component.scss',
})
export class BreadcrumbesComponent {
  public breadcrumbs!: IBreadCrumb[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        console.log(this.breadcrumbs);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumb[] = [],
  ): IBreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data['breadcrumb']
        : '';
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    const lastRoutePart = path!.split('/').pop();
    const isDynamicRoute = lastRoutePart!.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart!.split(':')[1];
      path = path!.replace(lastRoutePart!, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
