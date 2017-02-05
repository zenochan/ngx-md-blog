import {Component, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";
import "../extends.date";
import {Blog} from "../models";
import highlightBlock = hljs.highlightBlock;
import timeout = Q.timeout;
import {error} from "util";

@Component({
  selector: 'app-blog',
  templateUrl: 'blogs.component.html',
  styleUrls: ['blogs.component.less']
})
export class BlogsComponent implements OnInit
{
  blogs: Array<Blog> = [];
  blogEdit;
  newBlog: string = "## 添加 `MARKDOWN` 日志";

  loadAll: boolean = false;
  loading: boolean = false;

  keywordInput: String = null;
  keyword: String = null;

  constructor(private api: ApiService) { }

  ngOnInit()
  {
    console.log(new Date("2016-12-30 17:27:15").weekOfYear());
    this.getBlogs(null);
  }

  loadMore()
  {
    this.getBlogs(this.blogs[this.blogs.length - 1].created_at);
  }

  search()
  {
    this.keyword = this.keywordInput;
    this.loadAll = false;
    this.getBlogs(null);
  }

  keywordKeydown(event)
  {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  getBlogs(before)
  {
    if (this.loading || this.loadAll) {
      return;
    }

    this.loadAll = false;
    this.loading = true;

    if (before == null) {
      this.blogs = [];
    }
    this.api.get("api/blogs?before=" + before + "&keyword=" + this.keyword).subscribe(
        blogs =>
        {
          this.blogs = this.blogs.concat(<Array<Blog>>blogs);
          this.loadAll = blogs.length < 10;
          this.loading = false;
        },
        error =>
        {
          this.loadAll = false;
          this.loading = false;
        }
    )
  }

  // 新增
  create()
  {
    this.api.post("api/blogs", {"blog": this.newBlog, "password": prompt("输入口令")}).subscribe(blogs =>
    {
      this.blogs = [blogs[0]].concat(this.blogs);
      this.newBlog = "# 添加成功";
    }, error => alert(error));
  }

  // 删除日志
  deleteBlog(blog)
  {
    this.api.delete("api/blogs/" + blog.id + "/" + prompt("输入口令")).subscribe(success =>
        {
          this.blogs = this.blogs.filter(function (item: Blog)
          {
            return blog.id != item.id;
          });
        },
        error =>
        {
          alert(error);
        }
    );
  }

// 编辑日志， 一次只编辑一个
  editBlog(blog)
  {
    if (this.blogEdit) {
      this.blogEdit.blog = this.blogEdit.blog_old;
      this.blogEdit.edit = false;
    }
    this.blogEdit = blog;

    blog.blog_old = blog.blog;
    blog.edit = true;
  }

// 提交修改
  editSubmit(blog)
  {
    this.api.patch("api/blogs/" + blog.id, {"blog": blog.blog, "password": prompt("输入口令")}).subscribe(res =>
    {
      blog.blog_old = null;
      this.blogEdit = null;
      blog.edit = false;
    }, error => {alert(error);});
  }

// 取消编辑
  editCancel()
  {
    if (this.blogEdit) {
      this.blogEdit.blog = this.blogEdit.blog_old;
      this.blogEdit.edit = false;
      this.blogEdit = null;
    }
  }

// 格式化标签
  timelineLabel(date: string)
  {
    let week = new Date(date).weekOfYear();
    return week[0] + "年  第" + week[1] + "周";
  }

// 是否显示时间标签
  showTimelineLabel(index)
  {
    if (index == 0) {
      return true;
    } else {
      let preBlog = new Date(this.blogs[index - 1].created_at).weekOfYear();
      let blog = new Date(this.blogs[index].created_at).weekOfYear();

      return preBlog[0] != blog[0] || preBlog[1] != blog[1];
    }
  }

}
