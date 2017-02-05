import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {error} from "util";

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
    this.route.params.subscribe(param =>
    {
      this.getBlog(param["id"]);
    })

  }

  getBlog(id: number)
  {
    this.api.get("api/blogs/"+id).subscribe(res=>{
      this.blog = res[0].blog;

    },error=>alert(error));
  }

}
