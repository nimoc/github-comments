# Github 留言系统

[在线预览](http://nimojs.github.io/github-comments/)

让评论质量更高，让网站与 Github 关联
适合程序员的评论系统，基于 Github issues 留言

[![preview](https://cloud.githubusercontent.com/assets/3949015/11060115/1892a24c-87d9-11e5-80a0-651c60f90875.png)](http://nimojs.github.io/github-comments/)

## 使用
### data-api
```html
<style>
.gc-comments {font-size: 12px;}
</style>
<script src="http://nimojs.github.io/github-comments/gc.js"></script>
<div class="gc-comments" data-repos="nimojs/github-comments" data-issues="1" >
    <div class="gc-comments-title">
        评论
    </div>
    <div class="gc-comments-info">
        想在此留下评论，请访问 <a href="{{issues_link}}">{{issues_link}}</a> 提交评论
    </div>
</div>
```

### gc.load()


```js
gc.load(repos, issues, element)
// 或者
githubComments.load(repos, issues, element)
// 当 全局变量 gc 被占用时使用 githubComments
```

| 参数 | 说明 | 示例 |
| --- | --- | ---- |
| repos | 项目地址 |[nimojs/blog](http://github.com/nimojs/blog) |
| issues| issues id | [2](https://github.com/nimojs/blog/issues/2)
| element | 渲染容器 | `"#demo"` `document.getElementById('demo')` `$('#demo')` |

```
<div id="demo"></div>
<script src="http://nimojs.github.io/github-comments/gc.js" ></script>
<script>
gc.load('nimojs/blog', 2, '#demo')
</script>
```


灵感来自：http://fex.baidu.com/webuploader/demo.html
