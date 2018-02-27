import {Component, OnDestroy, OnInit} from "@angular/core";
import {EventsService} from "./services/events.service";
import {ApiService} from "./services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'blog',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy
{
  keywordInput: String = null;
  tags: Array<any>;
  spider;

  constructor(private events: EventsService, private api: ApiService, private route: ActivatedRoute)
  {
    this.api.get("api/tags").subscribe(tags => this.tags = tags);
    this.route.queryParams.subscribe((querys: any) =>
    {
      this.spider = querys.spider;
    });
  }

  ngOnInit(): void
  {
    console.log("app start");
  }

  ngOnDestroy(): void
  {
  }

  search()
  {
    this.events.publish("search", this.keywordInput);
  }

  keywordKeydown(event)
  {
    event.keyCode == 13 && this.search();
  }

}
