"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var $ = require("jquery");
// npm install --save showdown @types/showdown
var Showdown = require("showdown");
var hljs = require("highlight.js");
var MarkdownComponent = MarkdownComponent_1 = (function () {
    function MarkdownComponent() {
        if (MarkdownComponent_1.converter == null) {
            MarkdownComponent_1.converter = new Showdown.Converter();
            MarkdownComponent_1.converter.setOption("tables", 'true');
            MarkdownComponent_1.converter.setOption("simplifiedAutoLink", 'true');
            MarkdownComponent_1.converter.setOption("excludeTrailingPunctuationFromURLs", 'true');
            MarkdownComponent_1.converter.setOption("tasklists", 'true');
            //MarkdownComponent.converter.setOption("simpleLineBreaks", 'true');
            MarkdownComponent_1.converter.setOption("ghMentions", 'true');
        }
    }
    MarkdownComponent.prototype.ngOnInit = function () {
    };
    //View 内容改变hook
    MarkdownComponent.prototype.ngAfterViewChecked = function () {
        if (this.currValue != this.markdown) {
            this.currValue = this.markdown;
            //noinspection UnnecessaryLocalVariableJS
            var html = MarkdownComponent_1.converter.makeHtml(this.markdown || "# Hello, Zeno!\n<513500085@qq.com>");
            html = html.replace(/<a href="([^"]+)"/ig, '$& target="_blank"');
            this.htmlEl.nativeElement.innerHTML = html;
            $("pre code", this.htmlEl.nativeElement).each(function (i, block) { return hljs.highlightBlock(block); });
        }
    };
    return MarkdownComponent;
}());
__decorate([
    core_1.ViewChild('html')
], MarkdownComponent.prototype, "htmlEl", void 0);
__decorate([
    core_1.Input()
], MarkdownComponent.prototype, "markdown", void 0);
MarkdownComponent = MarkdownComponent_1 = __decorate([
    core_1.Component({
        selector: 'markdown',
        template: "<div #html></div>",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: [" th,td{ display :inline-block;min-width: 100px; border:solid 1px #d1d1d1; } "]
    })
], MarkdownComponent);
exports.MarkdownComponent = MarkdownComponent;
var MarkdownComponent_1;
