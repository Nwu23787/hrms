# 后端 api_server

## 下载node.js

官网地址：[Node.js (nodejs.org)](https://nodejs.org/en)

点击左边绿色按钮，下载安装，安装时一直点next即可

## 启动后端假数据服务器

若已经下载好node.js

到后端文件夹 api_server 中，按住shift键不放，单击鼠标右键，选择打开powershell窗口，输入命令：

```js
node .\app.js
```

若显示`Express server is running at http://127.0.0.1:3007`则启动成功，不要关闭本powershell窗口



# 前端 hrsm_front_end

## 下载yarn

在cmd窗口输入以下命令，下载yarn

```js
npm install -g yarn 
```

下载好之后输入

```js
yarn --version
```

若显示版本号安装成功

## 启动前端项目

到前端文件夹 hrsm_front_end 中，按住shift键不放，单击鼠标右键，选择打开powershell窗口

如果是第一次启动项目，需要下载依赖，使用命令：

```js
yarn install
```

下载好后启动项目

```js
yarn serve
```

依赖下载好之后，以后再运行，不用重新下载，只输入 yarn serve 即可

若出现：

```js
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.10.5:8080/
```

则成功，将第一个地址复制到浏览器中打开即可，不要关闭本powershell窗口













