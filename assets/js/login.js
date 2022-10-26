// alert(1)
// 一。点击a进行 页面中登陆和注册模块的切换
$('#link_reg').on('click', function () {
    $('.reg_box').show()
    $('.login_box').hide()
})
$('#link_login').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
})

//二。登陆注册表单的验证规则
//1.非空 2.密码长度6~12位
//layui中的表单验证:
//  1.先获取layui的表单元素
var form = layui.form
var layer = layui.layer
//  2.自定义规则
form.verify({
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 确认密码
    repwd: function (value) {
        //value就是输入框的值
        // 如果不一致 提示两次密码不同
        if ($('#password').val() != value) {
            return '俩次密码不一致'
        }
    }
})
//  3.自定义规则的名称写入html的layui-verify属性值中 |
// 注册表单的预验证:在上面的verify中添加确认密码的验证规则
//三。ajax发起注册请求
$('#form_reg').on('submit', function (e) {
    var data = {
        username: $('#form_reg  [name=username]').val(),
        password: $('#form_reg  [name=password]').val()
    }
    e.preventDefault();
    $.post('/api/reguser', data,
        function (res) {
            if (res.status != 0) {
                return layer.msg(res.message, {
                    icon: 5
                })
            }
            layer.msg('注册成功', {
                icon: 6
            })
            //注册成功后 直接跳转到登陆页面
            $('#link_login').click()
        })
})
//四。登陆请求
$('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        type: "post",
        url: "/api/login",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            //******得到后台返回的token值 用来做用户权限管理***
            //token值的作用：在用户登陆的时候 从后台随机生成的字段 登陆成功后 把字段存在本地的localStorage中 当用户需要使用权限的时候 到本地中获取  使用的时候 通过请求头携带token进行接口访问
            //把token值存入本地存储中
            localStorage.setItem('token', res.token)
            // 页面跳转
            location.href = '/index.html'
        }
    });
})