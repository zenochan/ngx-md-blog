import {Component, OnInit, OnDestroy, Sanitizer, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-jd',
  templateUrl: './jd.component.html',
  styleUrls: ['./jd.component.less']
})
export class JdComponent implements OnInit,OnDestroy
{
  sub: Subscription;

  @ViewChild('jdFrame')
  jdFrameEl;
  src;
  price = {};
  id;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private api: ApiService)
  {
    window.document.title = "京东查价";
  }

  ngOnInit()
  {
    this.sub = this.route.params.subscribe(params =>
    {
      this.id = params['id'];
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl("https://item.jd.com/" + this.id + ".html");

      this.api.jsonpGet("http://p.3.cn/prices/get?callback=JSONP_CALLBACK&skuid=J_" + this.id)
          .map(res => res.json()[0])
          .toPromise()
          .then(res=>{
            this.price = res;
            console.log('price', this.price)
          })
          .catch(err=> console.error(err))
    });
  }

  onLoadJd()
  {
    console.log('onLoadJd');
  }

  ngOnDestroy(): void
  {
    this.sub.unsubscribe();
  }
}
