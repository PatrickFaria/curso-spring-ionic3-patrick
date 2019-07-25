import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("Passou no Interceptors")
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error
            if(errorObj.error){
                errorObj = errorObj.error
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj)
            }
            console.log("Error detectado pelo Interceptor")
            console.log(errorObj)

            return Observable.throw(errorObj)
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};