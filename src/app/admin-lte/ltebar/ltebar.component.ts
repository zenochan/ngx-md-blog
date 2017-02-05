import {
  Component,
  OnInit,
  Input,
  Output,
  animate,
  transition,
  style,
  state,
  trigger,
  EventEmitter
} from "@angular/core";
import {Menu, BarOption} from "../lte.models";

@Component({
  selector: 'ltebar',
  templateUrl: 'ltebar.component.html',
  styleUrls: ['ltebar.component.less'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        // height: 0,
        overflow: 'hidden',
      })),
      state('active', style({
        height: '*',
        overflow: 'hidden',
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])]
})
export class LteBarComponent implements OnInit
{

  @Input() option: BarOption;

  @Output() onClickMenu: EventEmitter<Menu> = new EventEmitter<Menu>();

  constructor() { }

  ngOnInit() { }

  //切换mini侧边栏菜单
  toggleMini()
  {
    this.option.minibar = !this.option.minibar;
  }

  //点击一级菜单
  clickMenu(menuClick: Menu)
  {
    let _onClickMenu = this.onClickMenu;
    this.option.navs.forEach(function (nav)
    {
      if (!nav.menus)return;
      nav.menus.forEach(function (menu)
      {
        if (menu == menuClick) {
          menu.active = !menu.active || !menu.children;
          if (!menu.children) {
            _onClickMenu.emit(menu);
          }
        } else {
          menu.active = false;
        }
      })
    });
  }


  //点击二级菜单
  clickSubMenu(subMenuClick: Menu)
  {
    let _onClickMenu = this.onClickMenu;
    this.option.navs.forEach(function (nav)
    {
      if (!nav.menus)return;
      nav.menus.forEach(function (menu)
      {
        if (!menu.children)return;

        menu.children.forEach(function (subMenu)
        {
          subMenu.active = subMenu == subMenuClick;
          if (subMenu.active) {
            _onClickMenu.emit(subMenu);
          }
        })
      })
    });
  }
}


