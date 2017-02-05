/**
 * Created by zenochan on 2016/12/1.
 */

//用户信息
export class User
{
  name: String;
  avatar: String;
}

//侧边栏导航
export class Navigation
{
  name: String;
  menus: Menu[]
}

//菜单
export class Menu
{
  name: String;
  fa?: String;
  faColor?: String;
  active?: boolean;
  children?: Menu[];
  labels?: MenuLabel[];
  entry?: any;
}

//菜单 label
export class MenuLabel
{
  label: String| Number;//内容
  color?: String;//背景色
}

export class BarOption
{
  user?: User;
  navs: Navigation[];
  minibar: Boolean;
}
