# Github 留言系统

[在线预览](http://nimojs.github.io/github-comments/)

让评论质量更高，让网站与 Github 关联
适合程序员的评论系统，基于 Github issues 留言

## 使用
```html
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

灵感来自：http://fex.baidu.com/webuploader/demo.html