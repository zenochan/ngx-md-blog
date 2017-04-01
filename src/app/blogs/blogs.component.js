"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("../extends.date");
var BlogsComponent = (function () {
    function BlogsComponent(api, events, snackBar) {
        this.api = api;
        this.events = events;
        this.snackBar = snackBar;
        this.blogs = [];
        this.selectedIndex = 0;
        this.loadAll = false;
        this.loading = false;
        this.keyword = null;
    }
    BlogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBlogs(null);
        this.onSearch = function (keyword) {
            _this.keyword = keyword;
            _this.loadAll = false;
            _this.getBlogs(null);
            _this.selectedIndex = 0;
        };
        this.events.subscribe("search", this.onSearch);
    };
    BlogsComponent.prototype.ngOnDestroy = function () {
        this.events.unsubscribe("search", this.onSearch);
    };
    BlogsComponent.prototype.onSelect = function ($event) {
        this.selectedIndex = $event.index;
    };
    BlogsComponent.prototype.loadMore = function () {
        this.getBlogs(this.blogs[this.blogs.length - 1].created_at);
    };
    BlogsComponent.prototype.getBlogs = function (before) {
        var _this = this;
        if (this.loading || this.loadAll) {
            console.log(this.loading, this.loadAll);
            return;
        }
        this.loadAll = false;
        this.loading = true;
        if (before == null) {
            this.blogs = [];
        }
        this.api.get("api/blogs?before=" + before + "&keyword=" + this.keyword).subscribe(function (blogs) {
            _this.blogs = _this.blogs.concat(blogs);
            _this.loadAll = blogs.length < 10;
            _this.loading = false;
        }, function (error) {
            _this.loadAll = false;
            _this.loading = false;
        });
    };
    // 新增
    BlogsComponent.prototype.create = function () {
        var _this = this;
        this.api.post("api/blogs", { "blog": this.blogContent, "password": prompt("输入口令") }).subscribe(function (blogs) {
            _this.blogs = [blogs[0]].concat(_this.blogs);
            _this.selectedIndex = 0;
            _this.openSnackBar("保存成功");
        }, function (error) { return alert(error); });
    };
    // 删除日志
    BlogsComponent.prototype.deleteBlog = function (blog) {
        var _this = this;
        this.api.delete("api/blogs/" + blog.id + "/" + prompt("输入口令")).subscribe(function (success) {
            _this.blogs = _this.blogs.filter(function (item) {
                return blog.id != item.id;
            });
        }, function (error) {
            alert(error);
        });
    };
    BlogsComponent.prototype.view = function (blog) {
        window.open(location.protocol + "//" + location.host + '/blogs/' + blog.id);
    };
    // 编辑日志， 一次只编辑一个
    BlogsComponent.prototype.editBlog = function (blog) {
        console.log(1);
        this.selectedIndex = 1;
        if (blog != this.blogEdit) {
            this.blogEdit = blog;
            this.blogContent = blog.blog;
        }
    };
    // 提交修改
    BlogsComponent.prototype.editSubmit = function (blog) {
        var _this = this;
        this.api.patch("api/blogs/" + blog.id, { "blog": this.blogContent, "password": prompt("输入口令") }).subscribe(function (res) {
            blog.blog = _this.blogContent;
            _this.blogContent = '';
            _this.blogEdit = null;
            _this.selectedIndex = 0;
            _this.openSnackBar("保存成功");
        }, function (error) { alert(error); });
    };
    // 取消编辑
    BlogsComponent.prototype.editCancel = function () {
        this.selectedIndex = 0;
        this.blogEdit = null;
        this.blogContent = null;
    };
    // 格式化标签
    BlogsComponent.prototype.timelineLabel = function (date) {
        var week = new Date(date.replace(/-/g, '/')).weekOfYear();
        return week[0] + "年  第" + week[1] + "周";
    };
    // 是否显示时间标签
    BlogsComponent.prototype.showTimelineLabel = function (index) {
        if (index == 0) {
            return true;
        }
        else {
            var preBlog = new Date(this.blogs[index - 1].created_at.replace(/-/g, '/')).weekOfYear();
            var blog = new Date(this.blogs[index].created_at.replace(/-/g, '/')).weekOfYear();
            return preBlog[0] != blog[0] || preBlog[1] != blog[1];
        }
    };
    BlogsComponent.prototype.openSnackBar = function (message) {
        this.snackBar.open(message, null, {
            duration: 2000,
        });
    };
    return BlogsComponent;
}());
BlogsComponent = __decorate([
    core_1.Component({
        selector: 'app-blog',
        templateUrl: 'blogs.component.html',
        styleUrls: ['blogs.component.less'],
    })
], BlogsComponent);
exports.BlogsComponent = BlogsComponent;
