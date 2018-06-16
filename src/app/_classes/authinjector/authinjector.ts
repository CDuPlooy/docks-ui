import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { StorageService } from '../../_services/storage/storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInjector implements HttpInterceptor {
    constructor(private tokens: StorageService) {
    }

    // TODO(egeldenhuys): Only inject token if the target is Docks API
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.tokens.getToken('auth'))});
        return next.handle(req).do(
            (err: any) => {
                // Logging errors here seems like a bad idea.
                // TODO(CDuPlooy): Token expiry?
            }
        );
    }
}
