import {Component, OnInit, OnDestroy, Sanitizer, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

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

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit()
  {
    this.sub = this.route.params.subscribe(params =>
    {
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl("https://item.jd.com/" + params['id'] + ".html");
    });
  }

  onLoadJd()
  {
    console.log(this.jdFrameEl.nativeElement.contentDocument);
  }

  ngOnDestroy(): void
  {
    this.sub.unsubscribe();
  }

}
