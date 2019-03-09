import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IHttpOptions, IRequestOptions } from 'src/app/shared/interfaces/http-interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.get(url, <any>this.getRequestOptions(headers, params, options));
  }

  post(url: string, body: any, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.post(url, body, <any>this.getRequestOptions(headers, params, options));
  }

  private updateUrl(req: string) {
    if (req.indexOf('http://') == -1) {
      return `${environment.origin}/${req}`;
    }
    else
      return req;
  }


  private getRequestOptions(headers?: any, params?: any, options?: IHttpOptions): IRequestOptions {
    headers = headers || {};
    params = params || {};
    options = options || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    const customHeader = new HttpHeaders(headers);

    const customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams.append(key, params[key]);
    }
    const requestOptions = Object.assign({}, options);
    requestOptions['headers'] = customHeader;
    requestOptions['params'] = customParams;
    return requestOptions;
  }
}
