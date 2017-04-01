import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.less']
})
export class IframeComponent implements OnInit
{
  url;

  constructor(private route: ActivatedRoute, private sanitizor: DomSanitizer)
  {

  }

  ngOnInit()
  {
    this.route.params.subscribe(param =>
    {
      this.url = this.sanitizor.bypassSecurityTrustResourceUrl(param['url']);
      console.log(this.url);
    })
  }

}
