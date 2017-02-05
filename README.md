# Ng2AdminLTE - [preview](https://zenochan.github.io/ng2-admin-lte/)


#### feature

- <strike>坚持不使用 `jQuery`， `ng2` 对 `html` 入侵比较强，和 `jQuery` 混写风格很不搭, jQuery 样式库也不能动态加载（至少我没有找到方法）</strike>
- 使用 `less` 写 `css` 样式 

- [ng2-bootstrap](https://github.com/valor-software/ng2-bootstrap) - [Native Angular2 directives for Bootstrap](http://valor-software.com/ng2-bootstrap/)
- [**fa** - font awesome](https://github.com/FortAwesome/Font-Awesome)

- [ionicons](https://github.com/driftyco/ionicons) 

    - The premium icon font for Ionic
    
- [showdown](https://github.com/showdownjs/showdown) 

    - markdown to html js 库
    - `npm install --save showdown @types/showdown`
    
- [highlight.js](https://highlightjs.org/) 

    - `<pre><code></code></pre>` 高亮方案
    
- [highcharts](http://www.hcharts.cn/)
    
    - [demo](http://www.hcharts.cn/demo/highcharts)
    
    ```bash
    $ npm install --save highcharts
    $ npm install --save-dev @types/highcharts
    ```


#### todo-list




#### 舍弃的 jQuery 样式库

- [iCheck](https://github.com/fronteed/iCheck)： 2014年后没维护了，而且不是 less 库
- bootstrap-slider ，依赖 jquery
- [bootstrap-wysihtml5](http://www.oschina.net/p/bootstrap-wysihtml5)，一个基于 Bootstrap 框架实现的所见即所得的 HTML 编辑器，依赖 jQuery

## build info

> This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.20-4.

#### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

#### Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

#### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
