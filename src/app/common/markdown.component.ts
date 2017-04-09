import {Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, Input} from "@angular/core";
import * as $ from "jquery";
// npm install --save showdown @types/showdown
import * as Showdown from "showdown";
import * as hljs from "highlight.js";

@Component({
  selector: 'markdown',
  template: `
    <div #html></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [` th, td {
    display: inline-block;
    min-width: 100px;
    border: solid 1px #d1d1d1;
  } `]
})
export class MarkdownComponent implements OnInit
{
  private static converter: Showdown.Converter;

  @ViewChild('html')
  private htmlEl: ElementRef;
  private currValue;

  @Input() markdown: string;

  constructor()
  {
    if (MarkdownComponent.converter == null) {
      MarkdownComponent.converter = new Showdown.Converter();
      MarkdownComponent.converter.setOption("tables", 'true');
      MarkdownComponent.converter.setOption("simplifiedAutoLink", 'true');
      MarkdownComponent.converter.setOption("excludeTrailingPunctuationFromURLs", 'true');
      MarkdownComponent.converter.setOption("tasklists", 'true');
      //MarkdownComponent.converter.setOption("simpleLineBreaks", 'true');
      MarkdownComponent.converter.setOption("ghMentions", 'true');
    }
  }

  ngOnInit()
  {
  }

  //View 内容改变hook
  ngAfterViewChecked()
  {
    if (this.currValue != this.markdown) {
      this.currValue = this.markdown;
      //noinspection UnnecessaryLocalVariableJS
      let html = MarkdownComponent.converter.makeHtml(this.markdown || "# Hello, Zeno!\n<513500085@qq.com>");
      html = html.replace(/<a href="([^"]+)"/ig, '$& target="_blank"');
      this.htmlEl.nativeElement.innerHTML = html;
      $("pre code", this.htmlEl.nativeElement).each((i, block) => hljs.highlightBlock(block));
    }
  }
}

