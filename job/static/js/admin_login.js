$(function(){
	//登陆
    $(".go_job").click(function(){
        var phone = $.trim($("#email_add").val());
        if(phone==""){
            alert("账号不能为空！");
            return false;
        }

        var pwd = $.trim($("#psd").val());
        if(pwd==""){
            alert("密码不能为空！");
            return false;
        }

        if(pwd.length <6)
        {
            alert("密码不能小于六位数！");
            return false;
        }
        var num_input = $.trim($("#num_input").val());
        if(num_input==""){
            alert("验证码不能为空！"+num_input);
            return false;
        }
        $.ajax({
            type:'post',
            url: "/admin/api_login",
            data: JSON.stringify({email:phone,password:pwd,captcha:num_input}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
              var errcode = data['errcode'];
              if (errcode == 0) {
                window.location.href='/admin/'
              }
              if (errcode == 1){
                layer.alert('密码错误！');
              }
              if (errcode == 2){
                layer.alert('用户名不存在！');
              }
              if (errcode == 4 || errcode == 5){
                layer.alert('验证码错误！');
                $('#bt-img img').attr('src', '/admin/checkcode?r='+Math.random());
              }
            },
            error:function(){   
                alert('error');   
            }
            
        });
    })  

})

