import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./error-interceptor";
import { HeadersInterceptor } from "./headers-interceptor";

export const HTTP_INTERCEPTOR_PROVIDERS = [{
  provide: HTTP_INTERCEPTORS,
  useClass: HeadersInterceptor,
  multi: true // we will use many inceptors
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true // we will use many inceptors
}
];
