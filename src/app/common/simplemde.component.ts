import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import * as SimpleMDE from "simplemde";
import * as Showdown from "showdown";
import * as hljs from "highlight.js";
import * as $ from "jquery";

@Component({
  selector: 'simplemde',
  template: `<textarea #mde ngModel="markdown"></textarea>`
})
export class SimplemdeComponent implements OnInit
{
  private static converter: Showdown.Converter;
  @ViewChild("mde") mde: ElementRef;

  simpleMDE: SimpleMDE;

  private loaded;
  private markdownValue: string;
  @Output() markdownChange = new EventEmitter();


  @Input()
  get markdown()
  {
    return this.markdownValue;
  }

  set markdown(value)
  {
    if (value == this.markdownValue) return;

    this.markdownValue = value;
    this.markdownChange.emit(this.markdownValue);
  }

  constructor()
  {
    if (SimplemdeComponent.converter == null) {
      SimplemdeComponent.converter = new Showdown.Converter();
      SimplemdeComponent.converter.setOption("tables", 'true');
      SimplemdeComponent.converter.setOption("simplifiedAutoLink", 'true');
      SimplemdeComponent.converter.setOption("excludeTrailingPunctuationFromURLs", 'true');
      SimplemdeComponent.converter.setOption("tasklists", 'true');
      SimplemdeComponent.converter.setOption("ghMentions", 'true');
    }
  }

  ngOnInit()
  {
    this.simpleMDE = new SimpleMDE({
      element: this.mde.nativeElement,
      previewRender: plaintext =>
      {
        let html = SimplemdeComponent.converter.makeHtml(this.markdown || "");
        // 在空白页面打开
        html = html.replace(/<a href="([^"]+)"/ig, '$& target="_blank"');
        let div = document.createElement("div");
        div.innerHTML = html;
        $("pre code", div).each((i, block) => hljs.highlightBlock(block));
        return div.innerHTML;
      },
      spellChecker: false// 不检查拼写(中文全报黄)
    });
  }

  ngAfterViewChecked()
  {
    if (this.loaded != this.markdown) {
      this.loaded = this.markdown;
      this.simpleMDE.value(this.markdown || "");
    } else if (this.simpleMDE.value() != this.markdown) {
      setTimeout(() => this.loaded = this.markdown = this.simpleMDE.value(), 1);
    }
  }
}
