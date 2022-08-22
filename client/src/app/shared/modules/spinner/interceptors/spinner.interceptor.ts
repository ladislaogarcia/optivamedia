import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { delay, finalize, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  apiURL: string;
  apiRequestQty: number;

  constructor(private spinnerSvc: SpinnerService, private router: Router) {
    const api = environment.api;
    this.apiURL = `${api.hostname}:${api.port}`;
    this.apiRequestQty = 0;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.apiRequestQty++;
    this.spinnerSvc.show();
    if (this.router.url.split('/').length > 2) {
      return next.handle(request).pipe(
        finalize(() => {
          this.apiRequestQty--;
          if (this.apiRequestQty === 0) {
            this.spinnerSvc.hide();
          }
        })
      );
    } else {
      return next.handle(request).pipe(
        delay(3000),
        finalize(() => {
          this.apiRequestQty--;
          if (this.apiRequestQty === 0) {
            this.spinnerSvc.hide();
          }
        })
      );
    }
  }
}
