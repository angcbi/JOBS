var countdown=60; 
var obj_code,obj_type;
var savestate = 1;
$(function(){


$("#personal").click(function(){
    $("#enterprise").addClass("click_dz");
    $(this).removeClass("click_dz");
    $("#email_add").attr('placeholder','请输入手机号码');
    $("#email_add").val("");
  
})
$("#enterprise").click(function(){
    $("#personal").addClass("click_dz");
    $(this).removeClass("click_dz");
    $("#email_add").attr('placeholder','请输入邮箱');
    $("#email_add").val("");
  
})
	//登陆

 
 
  
                $("#savestate").attr('checked','checked');

        $("#savestate").click(function(){
            if(savestate == 1){
                
                  $("#savestate").removeAttr('checked');
                 savestate = 0;
          
               
            }
            else if(savestate == 0){
                $("#savestate").attr('checked','checked');
                 savestate = 1;
                 
            
            }

        })

    
        
   
    $(".go_job").click(function(event){
        var phone = $.trim($("#email_add").val());
        if(phone==""){
            //alert("账号不能为空！");
             layer.alert('账号不能为空！', {
              // closeBtn:0,
             title: '提示',
            })

            return false;
        }
       var dl = 1;
       if(dl == 1)
       {
            var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
            if (!pattern.test(phone)) {
                alert("手机格式不正确！");
                return false;
            }        
       }else
       {
         var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
         if (!pattern.test(phone)) {
            alert("邮箱格式不正确！");
            return false;
         }
       }

        var pwd = $.trim($("#psd").val());
        if(pwd==""){
            //alert("密码不能为空！");
           layer.alert('密码不能为空！', {
             title: '提示',
            })
            return false;
        }

        if(pwd.length <6)
        {
           // alert("密码不能小于六位数！");
            layer.alert('密码不能小于六位数！', {
             title: '提示',
            })
            return false;
        }
        var num_input = $.trim($("#num_input").val());
        if(num_input==""){
            //alert("验证码不能为空！"+num_input);
            layer.alert("验证码不能为空！"+num_input, {
             title: '提示',
            })
            return false;
        }


        
         
       
        
        var d_type = $("#ind_login p.click_dz").attr('rel');
        //alert(d_type); return false;  

        $.ajax({
            type:'post',
            url: "/api_login",
            data: JSON.stringify({phonenum:phone,password:pwd,captcha:num_input,savestate:savestate}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
              var errcode = data['errcode'];
              if (errcode == 0) {
                // alert("success");
                 window.location.href='/';
              }
              if (errcode == 1){
                layer.alert('密码错误！');
              }
              if (errcode == 2){
                layer.alert('用户名不存在！');
              }
              if (errcode == 4 || errcode == 5){
                layer.alert('验证码错误！');
                $('#bt-img img').attr('src', '/checkcode?r='+Math.random());
              }
            },
            error:function(){   
                alert('error');   
            }
            
        });
    })

    //注册
    $(".go_register").click(function(){

/*        var num_input = $.trim($("#num_input2").val());
        if(num_input==""){
            //alert("邀请码不能为空！"+num_input);
            layer.alert('邀请码不能为空！', {
             title: '提示',
            })
            return false;
        }*/
        var phone = $.trim($("#email_add").val());
        if(phone==""){
            //alert("账号不能为空！");
            layer.alert('账号不能为空！', {
             title: '提示',
            })
            return false;
        }
        /*var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
        if (!pattern.test(phone)) {
            alert("邮箱格式不正确！");
            return false;
        }*/
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
        if (!pattern.test(phone)) {
            //alert("手机格式不正确！");
            layer.alert('手机格式不正确！', {
             title: '提示',
            })
            return false;
        }

        var pwd = $.trim($("#psd").val());
        if(pwd==""){
            //alert("密码不能为空！");
            layer.alert('密码不能为空！', {
             title: '提示',
            })
            return false;
        }
        if(pwd.length <6)
        {
            //alert("密码不能小于六位数！");
            layer.alert('密码不能小于六位数！', {
             title: '提示',
            })
            return false;
        }
        var pattern2 = /^([a-zA-Z0-9]){6,}/;
        if (!pattern2.test(pwd)) {
            //alert("密码不能少于6位数！");
            layer.alert('密码不能少于6位数！', {
             title: '提示',
            })
            return false;
        }     
        var psd_conf = $.trim($("#psd_conf").val());
        if(psd_conf != pwd){
            //alert("密码不一致！");
            layer.alert('密码不一致！', {
             title: '提示',
            })
            return false;
        }
        var verify_code = $.trim($("#verify_code").val());
        if(verify_code =='')
        {
            //alert('验证码不能为空！');
            layer.alert('验证码不能为空！', {
             title: '提示',
            })
            return false;
        }

        var xieyi = $("#xieyi").is(":checked");
        if(xieyi==false){
             //alert("请确认选择同意招聘服务条款！");
             layer.alert('请确认选择同意招聘服务条款！', {
             title: '提示',
            })
            return false;
        }

        $.ajax({
            type:'post',
            url: "/api_register",
            data: JSON.stringify({phonenum:phone,password:pwd,verify_code:verify_code}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
                var errcode = data['errcode'];
                if (errcode == 0) {                    
                    window.location.href='/login';
                  }
                  if (errcode == 1){
                    layer.alert('手机号不存在！');
                  }

                  if (errcode == 2 || errcode == 3){
                    layer.alert('验证码错误！');
                  }
               
            },
            error:function(){   
                //alert('error');   
                layer.alert('error', {
             title: '提示',
            })
            }
            
        });

    })

    //获取验证码
    $("#get_code").click(function(){
        obj_type=1;
        obj_code = $(this);
        var phone = $.trim($("#email_add").val());
        if(phone==""){
            //alert("账号不能为空！");
            layer.alert('账号不能为空！', {
             title: '提示',
            })
            return false;
        }     
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
        if (!pattern.test(phone)) {
            //alert("手机格式不正确！");
            layer.alert('手机格式不正确！', {
             title: '提示',
            })
            return false;
        }

        // 获取验证码倒计时
        setcodetime(obj_code);

        var d_type = $("#ind_login p.click_dz").attr('rel'); 
        $.ajax({
            type:'post',
            url: "/api_msgcode",
            data: JSON.stringify({phonenum:phone,rtype:1}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
                console.log(data);
                var errcode = data['errcode'];
                if (errcode == 3){
                    layer.alert('手机号已经存在！');
                }               

                if (errcode == 0) {
                    
                }
            },
            error:function(){   
                //alert('error');   
                layer.alert('error', {
             title: '提示',
            })
            }
            
        });
        //
    })
    //

//获取忘记密码的 短信 get_password_code
    $("#get_password_code").click(function(){
        obj_type=2;
        obj_code = $(this);
        var phone = $.trim($("#email").val());
        if(phone==""){
            //alert("手机号不能为空！");
            layer.alert('手机号不能为空！', {
             title: '提示',
            })
            return false;
        }     
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
        if (!pattern.test(phone)) {
           // alert("手机格式不正确！");
           layer.alert('手机格式不正确！', {
             title: '提示',
            })
            return false;
        }
	setcodetime(obj_code);
        $.ajax({
            type:'post',
            url: "/api_msgcode",
            data: JSON.stringify({phonenum:phone,rtype:2}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
                var errcode = data['errcode'];
                if (errcode == 3){
                    layer.alert('手机号尚未注册！');
                    location.href='/register';
                }               
                if (errcode == 0) {
                    
                }
            },
            error:function(){   
                //alert('error');  
                  layer.alert('error', {
             title: '提示',
            })
            }
            
        });
        //
    })


    //忘记密码——修改密码
       $("#Submit").click(function(){
        var pwd =  $.trim($("#pwd").val());
    var repwd = $.trim($("#repwd").val());
    if(pwd == "")
    {
        //alert("密码不能为空！");
         layer.alert('密码不能为空！', {
                     title: '提示',
                })
        return false;
    }
    if(pwd.length <6)
    {
       // alert("密码不能小于六位数！");
        layer.alert('密码不能小于六位数！', {
                     title: '提示',
                })
        return false;
    }

    if(pwd != repwd)
    {
        //alert("新密码和确认密码不一致！");
        layer.alert('新密码和确认密码不一致！', {
                     title: '提示',
                })
        return false;
    }

        $.ajax({
            type:'post',
            url: "/api_reset_password",
            data: JSON.stringify({password:pwd,confirm_pwd:repwd}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
                var errcode = data['errcode'];
                if (errcode == 0){
                    layer.alert('密码修改成功！');
                    location.href='/login';
                }   
                if (errcode == 1){
                    layer.alert('密码不一致！');
                }  
                if (errcode == 2){
                    layer.alert('手机验证码已超时！');
                    location.href='/forget_password';
                }   
               
            },
            error:function(){   
                layer.alert('error', {
             title: '提示',
            }) 
            }
            
        });

    }) 

})


function setcodetime(obj)
{
   // alert(countdown);
    if (countdown == 0) 
    { 
        
        obj.attr("disabled",false);   
        if(obj_type ==1){  
            obj.removeClass('again'); 
        } else{obj.removeClass('modify'); }
        
        obj.text("获取验证码"); 
        countdown = 60; 
        return;
    } 
    else 
    { 
        if(obj_type ==1){  
            obj.addClass('again'); 
        } else{obj.addClass('modify'); }
        obj.attr("disabled", true); 
        obj.text("重发验证码(" + countdown + "s)"); 
        countdown--; 
    } 
    setTimeout(function() { setcodetime(obj) },1000);
}


