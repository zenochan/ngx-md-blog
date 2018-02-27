import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import '../extends.date';
import {Blog} from '../models';
import {EventsService} from '../services/events.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-blog',
    templateUrl: 'blogs.component.html',
    styleUrls: ['blogs.component.less'],
})
export class BlogsComponent implements OnInit, OnDestroy {
    blogs: Array<Blog> = [];

    selectedIndex = 0;
    blogEdit;
    blogContent;

    loadAll: boolean = false;
    loading: boolean = false;

    keyword: String = null;
    onSearch: (keyword: string) => void;


    paramSub: Subscription;
    tagName;

    spider;

    constructor(private api: ApiService, private events: EventsService,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar) {
        this.route.queryParams.subscribe((params: any) => {
            this.spider = params.spider;
        });
    }

    ngOnInit() {
        this.paramSub = this.route.params.subscribe(param => {
            this.tagName = param.tag || null;
            this.loadAll = false;
            this.selectedIndex = 0;
            this.blogEdit = null;
            this.getBlogs(null);
        });

        this.onSearch = (keyword) => {
            this.keyword = keyword;
            this.loadAll = false;
            this.getBlogs(null);
            this.selectedIndex = 0;
        };
        this.events.subscribe('search', this.onSearch);
    }

    ngOnDestroy(): void {
        this.events.unsubscribe('search', this.onSearch);
        this.paramSub.unsubscribe();
    }


    onTagInputKeyDown($event, blog) {
        if ($event.keyCode == 13 && (<string>blog.tagEdit).trim().length > 0) {
            this.loading = true;
            this.api.post('api/blogs/' + blog.id + '/tags/' + blog.tagEdit.trim(), null).subscribe(
                data => {
                    blog.tags.push(data[0]);
                    blog.tagEdit = null;
                },
                e => alert(e),
                () => this.loading = false
            );
        }
    }

    removeTag(blog, tagIndex) {
        this.loading = true;
        this.api.delete('api/blogs/' + blog.id + '/tags/' + blog.tags[tagIndex].id).subscribe(
            data => blog.tags.splice(tagIndex, 1),
            e => alert(e),
            () => this.loading = false
        );
    }

    onSelect($event) {
        this.selectedIndex = $event.index;
    }

    loadMore() {
        this.getBlogs(this.blogs[this.blogs.length - 1].created_at);
    }

    getBlogs(before) {
        if (this.loading || this.loadAll) {
            console.log(this.loading, this.loadAll);
            return;
        }

        this.loadAll = false;
        this.loading = true;

        if (before == null) {
            this.blogs = [];
        }
        this.api.get('api/blogs?before=' + before + '&keyword=' + this.keyword + '&tag=' + this.tagName).subscribe(
            blogs => {
                this.blogs = this.blogs.concat(<Array<Blog>>blogs);
                this.loadAll = blogs.length < 10;
                this.loading = false;
            },
            error => {
                this.loadAll = false;
                this.loading = false;
            }
        )
    }

    // 新增
    create() {
        this.api.post('api/blogs', {'blog': this.blogContent, 'password': prompt('输入口令')}).subscribe(blogs => {
            blogs[0].tags = [];
            this.blogs = [blogs[0]].concat(this.blogs);
            this.selectedIndex = 0;
            this.openSnackBar('保存成功');
        }, error => alert(error));
    }

    // 删除日志
    deleteBlog(blog) {
        this.api.delete('api/blogs/' + blog.id + '/' + prompt('输入口令')).subscribe(success => {
                this.blogs = this.blogs.filter(function (item: Blog) {
                    return blog.id != item.id;
                });
            },
            error => {
                alert(error);
            }
        );
    }


    view(blog) {
        window.open(location.protocol + '//' + location.host + '/blogs/' + blog.id);
    }

// 编辑日志， 一次只编辑一个
    editBlog(blog) {
        this.selectedIndex = 1;
        if (blog != this.blogEdit) {
            this.blogEdit = blog;
            this.blogContent = blog.blog;
        }
    }

// 提交修改
    editSubmit(blog) {
        this.api.patch('api/blogs/' + blog.id, {'blog': this.blogContent, 'password': prompt('输入口令')}).subscribe(res => {
            blog.blog = this.blogContent;
            this.blogContent = '';
            this.blogEdit = null;
            this.selectedIndex = 0;
            this.openSnackBar('保存成功');
        }, error => {
            alert(error);
        });
    }

// 取消编辑
    editCancel() {
        this.selectedIndex = 0;
        this.blogEdit = null;
        this.blogContent = null;
    }

// 格式化标签
    timelineLabel(date: string) {
        let week = new Date(date.replace(/-/g, '/')).weekOfYear();
        return week[0] + '年  第' + week[1] + '周';
    }

// 是否显示时间标签
    showTimelineLabel(index) {
        if (index == 0) {
            return true;
        } else {
            let preBlog = new Date(this.blogs[index - 1].created_at.replace(/-/g, '/')).weekOfYear();
            let blog = new Date(this.blogs[index].created_at.replace(/-/g, '/')).weekOfYear();

            return preBlog[0] != blog[0] || preBlog[1] != blog[1];
        }
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, null, {
            duration: 2000,
        });
    }

}
