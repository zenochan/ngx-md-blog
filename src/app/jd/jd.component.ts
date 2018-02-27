import {Component, OnInit, OnDestroy, Sanitizer, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ApiService} from "../services/api.service";
import {EventsService} from "../services/events.service";

/**
 * 抓取京东商品基本价格
 */
@Component({
  selector: 'app-jd',
  templateUrl: './jd.component.html',
  styleUrls: ['./jd.component.less']
})
export class JdComponent implements OnInit, OnDestroy
{
  sub: Subscription;

  src: SafeResourceUrl;
  price: any = {};
  id: any;

  onSearch;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private api: ApiService, private events: EventsService)
  {
  }

  ngOnInit()
  {
    this.onSearch = keyword =>
    {

      keyword = keyword.replace(/https:\/\/item.jd.com\/(\d+).html/ig, (rex, p1) => p1);
      if (/\d/.test(keyword)) {
        this.loadJdProduct(keyword);
      } else {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl("https://search.jd.com/Search?enc=utf-8&keyword=" + keyword);
      }
    };
    this.events.subscribe("search", this.onSearch);
    this.sub = this.route.params.subscribe(params => this.loadJdProduct(params['id']));
  }

  private loadJdProduct(id)
  {
    this.id = id;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl("https://item.jd.com/" + this.id + ".html");

    this.api.jsonpGet("http://p.3.cn/prices/get?skuid=J_" + this.id)
        .map(res => res[0])
        .toPromise()
        .then(res =>
        {
          this.price = res;
          console.log('price', this.price)
        })
        .catch(err => console.error(err))
  }

  ngOnDestroy(): void
  {
    this.sub.unsubscribe();
    this.events.unsubscribe('search', this.onSearch)
  }

  onLoadJd()
  {
    console.log('onLoadJd');
  }

}
