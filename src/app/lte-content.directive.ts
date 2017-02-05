import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[lte-content]'
})
export class LteContentDirective
{
  constructor(private el: ElementRef)
  {
    //添加样式 content-wrapper
    el.nativeElement.className += " content-wrapper";
  }

}
