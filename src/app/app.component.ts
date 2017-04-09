import {Component, OnDestroy, OnInit} from "@angular/core";
import {EventsService} from "./services/events.service";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'blog',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy
{
  keywordInput: String = null;
  tags: Array<any>;

  constructor(private events: EventsService, private api: ApiService)
  {
    this.api.get("api/tags").subscribe(tags => this.tags = tags);
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
