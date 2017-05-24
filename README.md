# Github 留言系统

[在线预览](http://nimojs.github.io/github-comments/)

让评论质量更高，让网站与 Github 关联
适合程序员的评论系统，基于 Github issues 留言

[![preview](https://cloud.githubusercontent.com/assets/3949015/11060115/1892a24c-87d9-11e5-80a0-651c60f90875.png)](http://nimojs.github.io/github-comments/)

## 使用
### data-api
```html
<style>.gc-comments {font:12px/1.5 Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif}</style>
<script src="https://unpkg.com/github-comments/gc.js"></script>
<div class="gc-comments" data-repos="nimojs/github-comments" data-issues="1" >
    <div class="gc-comments-title">
        评论
    </div>
    <div class="gc-comments-info">
        想在此留下评论，请访问 <a target="_blank" href="issues_link">issues_link</a> 提交评论
    </div>
</div>
```

`issues_link` 会自动替换成 `https://github.com/nimojs/github-comments/issues/1`

### gc.load()


```js
gc.load(repos, issues, element, noCommentsTip)
// 或者
githubComments.load(repos, issues, element, noCommentsTip)
// 当 全局变量 gc 被占用时使用 githubComments
```

| 参数 | 说明 | 示例 |
| --- | --- | ---- |
| repos | 项目地址 |[nimojs/blog](http://github.com/nimojs/blog) |
| issues| issues id | [2](https://github.com/nimojs/blog/issues/2)
| element | 渲染容器 | `"#demo"` `document.getElementById('demo')` `$('#demo')` |

```
<div id="demo"></div>
<script src="https://unpkg.com/github-comments@0.4.0/gc.js"></script>
<script>
gc.load('nimojs/blog', 2, '#demo')
</script>
```


灵感来自：      http://fex.baidu.com/webuploader/demo.html  
全站使用示例：  http://fmsjs.org/


### 参与开发

```shell
git clone https://github.com/nimojs/github-comments.git
cd github-comments
npm i --registry=https://registry.npm.taobao.org
# server
npm run s
npm run dev
```
