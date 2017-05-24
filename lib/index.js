var $ = require('jquery')
require('./markdown.css')
require('./gc-comments.css')
var gc = {}
gc.package = require('../package.json')
gc.$ = $
var formatDate = require('./formatDate')
var defaultTemplate = `
<div class="gc-comments-item">
    <div class="gc-comments-item-hd">
        <img class="gc-comments-item-hd-avatar" src="{{user.avatar_url}}" />
        <a href="https://github.com/{{user.login}}" class="gc-comments-item-hd-user">{{user.login}}</a>
        <a href="{{html_url}}" class="gc-comments-item-hd-date">{{created_at}}</a>
    </div>
    <div class="gc-comments-item-bd">
        <p>{{body_html}}</p>
    </div>
</div>
`
gc.load = function (repos, issues, elem, noCommentsTip) {
    var $elem = $(elem)
    noCommentsTip = noCommentsTip || '(⊙o⊙) No comments'
    $elem.addClass('gc-comments')
    var issueslink = 'https://github.com/' + repos +'/issues/' + issues
    var info = repos.split('/')
    var user = info[0]
    var repo = info[1]
    $elem.find('a[href="{{issues_link}}"],a[href="issues_link"]').each(function () {
        var $link = $(this)
        $link.attr('href', issueslink)
        $link.html($link.html().replace(/(\{\{issues_link\}\}|issues_link)/g, issueslink))
    })
    var $githubiframe = $('<div style="display:inline-block;position:relative;top:0.15em;height:20px;">'+
        '<iframe style="display:inline;" src="https://ghbtns.com/github-btn.html?user=' + user + '&repo=' + repo + '&type=star&count=true" frameborder="0" scrolling="0" width="120px" height="20px"></iframe>'+
    '</div>')
    $githubiframe.appendTo($elem.find('.gc-comments-title'))
    var $loading = $('<div class="gc-comments-loading">Loading</div>')
    $elem.append($loading)
    $.ajax({
        type: 'get',
        url: 'https://api.github.com/repos/' + repos + '/issues/' + issues + '/comments?per_page=100',
        headers: {
            Accept: 'application/vnd.github.full+json'
        },
        dataType: 'json'
    }).done(function (res) {
        $loading.hide()
        if (res.length === 0) {
            var $noComments = $('<div class="gc-comments-nocomments">' + noCommentsTip + '</div>')
            $elem.append($noComments)
            return
        }
        var html = []
        $.each(res, function (key, value) {
            value['created_at'] = formatDate(value['created_at'])
            value['updated_at'] = formatDate(value['updated_at'])
            var item = defaultTemplate.replace(/\{\{([^{}]+)\}\}/g, function () {
                var word =arguments[1]
                word = word.split('.')

                // word:
                // ["body_html"]
                // or
                // ["user", "avatar_url"]

                var content = value
                $.each(word, function (level, name) {
                    content = content[name]
                })
                return content
            })
            html.push(item)
        })
        $elem.append(html.join(''))
    }).fail(function (res){
        $loading.hide()
        res = res.responseJSON
        if (res.message) {
            $elem.append('<div>' + res.message + '</div>')
            return
        }
    })
}
$(function () {
    // 防止重复渲染
    if (typeof window.__NIMO__gc_load !== 'undefined') {
        return false
    }
    window.__NIMO__gc_load = true

    $('.gc-comments').each(function() {
        var $this = $(this)
        var settings = $this.data()
        if (settings.repos) {
            gc.load(settings.repos, settings.issues, $this, settings.nocommentstip)
        }
    })
})

module.exports = gc
