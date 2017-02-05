import {Injectable} from "@angular/core";
import {RequestOptions, Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiService
{
  apiUrl = environment.production
      ? "http://blogapi.mjtown.cn/"
      : "http://localhost/service/laravel5.3/";
  options: RequestOptions;

  constructor(private http: Http)
  {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    this.options = new RequestOptions({
      headers: headers
    });
  }

  get(path: string): Observable<Array<Object>>
  {
    let href = path.startsWith("http") ? path : this.apiUrl + path;
    return this.http.get(href).map(res =>
    {
      let result = res.json();
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  post(url, body: Object): Observable<Object>
  {
    return this.http.post(this.apiUrl + url, ApiService.serializeData(body), this.options) .map(res =>
    {
      let result = res.json();
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  patch(url, body: Object): Observable<Object>
  {
    return this.http.patch(this.apiUrl + url, ApiService.serializeData(body), this.options) .map(res =>
    {
      let result = res.json();
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  delete(url): Observable<Object>
  {
    return this.http.delete(this.apiUrl + url).map(res =>
    {
      let result = res.json();
      if (result.err_code != 0) {
        throw result.err_msg;
      }
      return result.data;
    });
  }

  static serializeData(data)
  {
    // If this is not an object, defer to native stringification.
    if (typeof data != "object") {
      return ((data == null) ? "" : data.toString());
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
          "=" +
          encodeURIComponent((value == null) ? "" : value)
      );
    }
    // Serialize the buffer and clean it up for transportation.
    let source = buffer
        .join("&")
        .replace(/%20/g, "+");
    return (source);
  }
}

