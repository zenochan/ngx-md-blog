import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import * as $ from 'jquery';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiService {
  // apiUrl = environment.production
  //     ? 'http://blogapi.mjtown.cn/'
  //     : 'http://localhost/service/laravel5.3/';
  apiUrl = 'http://blogapi.mjtown.cn/';
  options;

  constructor(private http: HttpClient) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    this.options = {headers: headers};
  }

  get(path: string): Observable<Array<Object>> {
    let href = path.startsWith('http') ? path : this.apiUrl + path;
    return this.http.get(href).map(res => {
      let result = res as any;
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  post(url, body: Object): Observable<Object> {
    return this.http.post(this.apiUrl + url, ApiService.serializeData(body), this.options).map(res => {
      let result = res as any;
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  patch(url, body: Object): Observable<Object> {
    return this.http.patch(this.apiUrl + url, ApiService.serializeData(body), this.options).map(res => {
      let result = res as any;
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  delete(url): Observable<Object> {
    return this.http.delete(this.apiUrl + url).map(res => {
      let result = res as any;
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  jsonpGet(url) {
    return new Observable<any>(subscriber => {
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
      }).done(res => {
        subscriber.next(res);
        subscriber.complete();
      }).fail(err => subscriber.error(err));
    });
  }

  static serializeData(data) {
    // If this is not an object, defer to native stringification.
    if (typeof data != 'object') {
      return ((data == null) ? '' : JSON.stringify(data));
    }
    let buffer = [];
    // Serialize each key in the object.
    for (let name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }
      let value = data[name];
      buffer.push(
        encodeURIComponent(name) +
        '=' +
        encodeURIComponent((value == null) ? '' : value)
      );
    }
    // Serialize the buffer and clean it up for transportation.
    let source = buffer
      .join('&')
      .replace(/%20/g, '+');
    return (source);
  }
}

