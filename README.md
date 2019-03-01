# dodo-blog

一个 React + next.js 开发的网站，偏小清新风格，简单有趣，欢迎大家体验。  
整个网站都是自己造的轮子，里边不乏一些封装的比较好的组件。

### 地址

前端 https://www.dodoblog.cn
后端 https://github.com/soWhiteSoColl/dodo-server
管理端 https://github.com/soWhiteSoColl/dodo-admin
组件库 https://github.com/soWhiteSoColl/dodo-ui

### 目录结构

```bash
│  .babelrc             #babel的规则以及插件
│  .prettierrc          #代码美化工具
│  .gitignore	          #Git忽视的目录
│  package-lock.json    #npm的版本控制
│  yarn.lock            #yarn的版本控制
│  package.json         #项目相关的包
│  README.md
│	 deploy.sh            #服务器部署
|  ecosystem.config.js  #服务器部署
├─components            #复用组件
│    ui                 #ui组件，已被抽离到组件库
│    widgets            #业务相关的一些组件
|─config                #相关的信息配置
|-pages                 #页面
|-server                #自定义next后端渲染
|-static                #静态资源
|-stores                #mobx数据
|-styles                #样式
|-tools                 #工具函数
```

### 安装依赖

```bash
yarn install/npm install
```

### 启动项目

```
yarn build/npm run build
yarn dev/npm run dev
```

### 第三方接口

- 1.网易云: [https://www.bzqll.com/2018/10/39.html](https://www.bzqll.com/2018/10/39.html)
- 2.QQ: [https://www.bzqll.com/2019/01/262.html](https://www.bzqll.com/2019/01/262.html)
- 3.酷狗: [https://www.bzqll.com/2019/01/259.html](https://www.bzqll.com/2019/01/259.html)
  非常感谢该博主，打 Call！！！
