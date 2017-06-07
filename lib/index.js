require('./markdown.css');
require('./gc-comments.css');

const gc = {};
gc.package = require('../package.json');
const formatDate = require('./formatDate');

const defaultTemplate = `
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
`;

gc.load = function (repos, issues, $elem, noCommentsTip = '(⊙o⊙) No comments') {
  $elem.className += ' gc-comments';
  const issueslink = `https://github.com/${repos}/issues/${issues}`;
  const info = repos.split('/');
  const user = info[0];
  const repo = info[1];
  [...$elem.querySelectorAll('a[href="{{issues_link}}"],a[href="issues_link"]')].forEach(($link) => {
    $link.href = issueslink;
    $link.innerHTML = $link.innerHTML.replace(/(\{\{issues_link\}\}|issues_link)/g, issueslink);
  });
  const title = $elem.querySelector('.gc-comments-title');
  if (title) {
    title.innerHTML += `${'<div style="display:inline-block;position:relative;top:0.15em;height:20px;">' +
    '<iframe style="display:inline;" src="https://ghbtns.com/github-btn.html?user='}${user}&repo=${repo}&type=star&count=true" frameborder="0" scrolling="0" width="120px" height="20px"></iframe>` +
    '</div>';
  }

  $elem.innerHTML += '<div class="gc-comments-loading">Loading</div>';


  const request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/repos/nimojs/github-comments/issues/1/comments?per_page=100');
  // request.open('GET', `https://api.github.com/repos/${repos}/issues/${issues}/comments?per_page=100`, true);
  request.setRequestHeader('Accept', 'application/vnd.github.full+json');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      document.querySelector('.gc-comments-loading').style = 'display: none';
      const res = JSON.parse(this.responseText);
      if (this.status >= 200 && this.status < 400) {
        // Success!
        if (res.length === 0) {
          $elem.innerHTML += `<div class="gc-comments-nocomments">${noCommentsTip}</div>`;
          return;
        }
        const html = [];
        res.forEach((item) => {
          item.updated_at = formatDate(item.updated_at);
          item.created_at = formatDate(item.created_at);
          html.push(
            defaultTemplate.replace(/\{\{([^{}]+)\}\}/g, (...args) => {
              const word = args[1];

              // word:
              // ["body_html"]
              // or
              // ["user", "avatar_url"]

              let content = item;
              word.split('.').forEach((x) => {
                content = content[x];
              });
              return content;
            })
          );
        });
        $elem.innerHTML += (html.join(''));
      } else if (res.message) {
        $elem.innerHTML += `<div>${res.message}</div>`;
      }
    }
  };
  request.send();
};

document.addEventListener('DOMContentLoaded', () => {
  // 防止重复渲染
  if (typeof window.__NIMO__gc_load !== 'undefined') {
    return false;
  }
  window.__NIMO__gc_load = true;

  [...document.getElementsByClassName('gc-comments')].forEach((item) => {
    const settings = item.attributes;
    if (settings['data-repos']) {
      gc.load(settings['data-repos'].value, settings['data-issues'].value, item, settings['data-nocommentstip'] ? settings['data-nocommentstip'].value : undefined);
    }
  });
});

module.exports = gc;
