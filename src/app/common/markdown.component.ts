import {Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, Input} from "@angular/core";
// npm install --save showdown @types/showdown
import * as Showdown from "showdown";
import * as $ from "jquery";
import * as hljs from "highlight.js";

@Component({
  selector: 'markdown',
  template: `<div #html></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent implements OnInit
{
  @ViewChild('html')
  private htmlEl: ElementRef;
  private currValue;

  converter = new Showdown.Converter();
  @Input() markdown: string;

  constructor() { }

  ngOnInit()
  {
  }

  //View 内容改变hook
  //noinspection JSUnusedGlobalSymbols
  ngAfterViewChecked()
  {
    if (this.currValue != this.markdown) {
      this.currValue = this.markdown;
      //noinspection UnnecessaryLocalVariableJS
      let html = this.converter.makeHtml(this.markdown || "# Hello, Zeno!\n<513500085@qq.com>");
      this.htmlEl.nativeElement.innerHTML = html;
      this.highlight();
    }
  }

  highlight()
  {
    $("pre code", this.htmlEl.nativeElement).each(function (i, block)
    {
      try { hljs.highlightBlock(block);} catch (e) {}
    })
  }
}

