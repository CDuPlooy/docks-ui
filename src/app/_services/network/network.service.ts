import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {catchError, map} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Network} from '../../_models';
import {ConfigurationService} from '../configuration/configuration.service';

enum NetworkError {
    ERR_OK = 200,
    ERR_SERVER = 500,
    ERR_NO_NETWORK= 404,
    ERR_NO_OP= 403,
    ERR_STREAM = 101,
}

@Injectable()
export class NetworkService {
  constructor(private http: HttpClient, private config: ConfigurationService) {
  }

  public getNetworks(): Observable<Network[]> {
        return this.http.get(this.config.getAPIHostname() + '/docker/networks', {responseType: 'json'})
            .pipe(map(x => {
                    return <Network>x;
                }), catchError((err: HttpErrorResponse) => {
                    return ErrorObservable.create(<NetworkError>err.status);
                })
            );
  }
}
