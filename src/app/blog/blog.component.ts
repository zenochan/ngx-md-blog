import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit
{
  blog;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit()
  {
    this.route.params.subscribe(param => this.getBlog(param["id"]));
  }

  getBlog(id: number)
  {
    this.api.get("api/blogs/" + id).subscribe(res =>
    {
      this.blog = (<any>res[0]).blog;
      let title: string = this.blog.split(/\r|\n/)[0];
      title = title.replace(/#+ /, "");
      title = title.replace(/!?\[([^\]]+)](\[[^\]]+\]|\([^\)]+\))/g, (searchValue, $1) => $1);
      title += " | Zeno' Blog";
      window.document.title = title;
    }, error => alert(error));
  }

}
