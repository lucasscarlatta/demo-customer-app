import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router
    ,private notificationService: NotificationService
    ,private loadingService:LoadingService
    ){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      let secureReq = req;
        secureReq = req.clone({
          url:environment.apiUrl+ req.url
        });
      return next.handle(secureReq).pipe(

        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          this.loadingService.hide();
          if(error.status === 400){
            this.notificationService.error(error.error.message);
          }
          if(error.status === 500){
            this.notificationService.error("Unexpected error. Please try again");
          }
          return throwError(errorMsg);
        })
      )
  }
}

function tap(arg0: (event: any) => "" | "succeeded", arg1: (error: any) => string): import("rxjs").OperatorFunction<HttpEvent<any>, unknown> {
  throw new Error('Function not implemented.');
}

function finalize(arg0: () => void): import("rxjs").OperatorFunction<unknown, HttpEvent<any>> {
  throw new Error('Function not implemented.');
}

