# github-comments
利用 github issues 生成网页评论框

[在线预览](http://nimojs.github.io/github-comments/)


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
data-repos="nimojs/github-comments" data-issues="1"
分别为项目地址和 [issues](https://github.com/nimojs/github-comments/issues)id
