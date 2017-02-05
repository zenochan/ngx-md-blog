import {Injectable} from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class UtilsService
{

  constructor() { }

  /**
   * 加载 js
   * @param src
   * @param callback
   */
  static loadJS(src: string, callback?)
  {
    if ($("script[src='" + src + "']").length == 0) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = callback;
      //script.setAttribute('src', src);
      // script.onload = resolve;
      script.async = true;
      document.head.appendChild(script);
    }
  }

  /**
   * 加载 css
   * @param url
   */
  static loadCSS(url: string)
  {
    if ($("link[href='" + url + "']").length == 0) {
      let cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.rev = "stylesheet";
      cssLink.type = "text/css";
      cssLink.media = "screen";
      cssLink.href = url;
      document.head.appendChild(cssLink);
    }
  }

}
