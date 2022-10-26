//请求根路径的优化
//JQ中ajax提供的函数 用来拼接URL
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})