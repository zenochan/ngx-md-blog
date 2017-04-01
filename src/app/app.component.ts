import {Component, OnDestroy, OnInit} from "@angular/core";
import {EventsService} from "./services/events.service";

@Component({
  selector: 'blog',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit,OnDestroy
{

  keywordInput: String = null;


  constructor(private events: EventsService)
  {
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
