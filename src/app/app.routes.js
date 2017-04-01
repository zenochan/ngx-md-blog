"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blogs_component_1 = require("./blogs/blogs.component");
var jd_component_1 = require("./jd/jd.component");
var blog_component_1 = require("./blog/blog.component");
var test_component_1 = require("./test/test.component");
var iframe_component_1 = require("./iframe/iframe.component");
exports.routes = [
    { path: "blogs/:id", component: blog_component_1.BlogComponent },
    { path: "blogs", component: blogs_component_1.BlogsComponent },
    { path: "jd/:id", component: jd_component_1.JdComponent },
    { path: "iframe/:url", component: iframe_component_1.IframeComponent },
    { path: 'test', component: test_component_1.TestComponent },
    { path: "**", redirectTo: "blogs" }
];
