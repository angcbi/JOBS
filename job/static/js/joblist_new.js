$(function(){
	//申请
	$(".job_op .lock_applyjob").click(function(){
		 var job_id = $(this).parent().attr('rel'); //id
		 var obj = $(this);
		 var app_text=$(this).text();
		 if(app_text=='立即申请'){
		 	
		 
          $.ajax({
		        type:'post',
		        url: "/api_post_job",
		        contentType:"application/json; charset=utf-8",
		        dataType: 'json',
		        data: JSON.stringify({'job_id' : job_id}),
		        success: function(msg)
		        {
		        	if(msg.errcode == 0)
		        	{
		        		obj.addClass('apchange').html("已申请");
		        		return false;
		        	}else if(msg.errcode == 2)
		        	{
		        		alert_r("请先登录","/login");

		        	}else if(msg.errcode == 3)
		        	{
		        		alert_r("不能重复申请","");
		        	}
                     else if(msg.errcode == 4)
		        	{
		        		alert_r("请先填写简历","/user_cv");
		        	}
		        	else
		        	{
		        		alert_r("申请失败","");
		        	}
		        }
		   })
      }
      else{
      	return true;
      }


	})

	//感兴趣
	$(".job_op .lock_like").click(function(){
		 var job_id = $(this).parent().attr('rel'); //id
		 var obj = $(this);
          $.ajax({
		        type:'post',
		        url: "/api_collection_job",
		        contentType:"application/json; charset=utf-8",
		        dataType: 'json',
		        data: JSON.stringify({'job_id' : job_id}),
		        success: function(msg)
		        {
		        	if(msg.errcode == 0)
		        	{
		        		console.log(msg.errcode);
		        		obj.addClass('apchange').html("已收藏");
		        		return false;
		        	}else if(msg.errcode == 2)
		        	{
		        		alert_r("请先登录","/login");

		        	}else if(msg.errcode == 3)
		        	{
		        		alert_r("不能重复收藏","");
		        	}
					else if(msg.errcode == 4)
		        	{
		        		alert_r("请先填写简历","/user_cv");
		        	}
		        	else
		        	{
		        		alert_r("收藏失败","");
		        	}
		        }
		   })

	})

})
