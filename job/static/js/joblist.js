var dangq =1;
var zong =1;
var baseurl = "";
$(function(){
user_redis('lock_applyjob',1);
user_redis('lock_like',2);
//encodeURIComponent
// input获得焦点


// $("#search_resume").focus(function(){
//   $("#search_resume").css("border","1px solid #029774");
//   $(".cb_more").show();
//      var window_height = $(window).height() + $(document).scrollTop();
//         $('.black_overlay').css(
//                 {
//                   'background-color': 'rgba(0,0,0,0.8)', 
//                   'z-index' : 100, 
//                   'height': window_height+'px', 
//                   'display':'block'
//                 }
//         ); 
// })
// $("#search_resume").blur(function(){
//   $("#search_resume").css({'border':'1px solid gray','height':'34px'});

// })


$("#search_resume").focus(function(){
  $("#search_resume").css({'border':'1px solid #029774','height':'34px'});


})

$("#search_resume").blur(function(){
  $("#search_resume").css({'border':'1px solid gray','height':'34px'});

})

$("#has_more").hover(function(){
  $(this).parent("ul").siblings("ul").css("display","block");
  $(this).find("#caret").css("transform","rotate(180deg)");
}, function(){

});

// $(".advanced_search .detail ul li").hover(function(){
//   $(this).css("background-color","#029774");
//   $(this).find("a").css("color","#fff");
// }, function(){
// $(this).css("background-color","#fff");
//   $(this).find("a").css("color","#000");
// });

$(".whole_area").hover(function(){
  // $(".hide_area").css("display","block");
}, function(){
  $(this).find(".hide_area").css("display","none");
  $(this).find("#caret").css("transform","rotate(360deg)");
});

$("#has_more2").hover(function(){
  $(this).parent("ul").siblings("ul").css("display","block");
  $(this).find("#caret2").css("transform","rotate(180deg)");
}, function(){

});

$(".whole_area").hover(function(){
  // $(".hide_area").css("display","block");
}, function(){
  $(this).find(".hide_area2").css("display","none");
  $(this).find("#caret2").css("transform","rotate(360deg)");
});

var count=1;
$("#choose_lt").click(function(){
  $(".high_search").toggle();
   $(".all_ul").toggle();
   
  // count++;
   if(count==1){
      $(this).find("p").css("transform","rotate(0deg)");
      $(this).attr("title","点击展开筛选项");
      $(".advanced_search .detail").css("height","50px")
  
 count--;
   }
   else{
  $(this).find("p").css("transform","rotate(180deg)");
        $(this).attr("title","点击收起筛选项");
          //$(".advanced_search .detail").css("height","314px")
          $(".advanced_search .detail").css("height","190px")
    count++;
   }

 
});

$(".li_industry").hover(function(){
    $(".industry").css("display","none")
  $(this).next("div").css("display","block");

}, function(){
 // $(this).next("div").css("display","none")
});

$(".industry").hover(function(){
    // $(".industry").css("display","none")
  // $(this).next("div").css("display","block");

}, function(){
 $(this).css("display","none");
});


$(".btn2").click(function(){
   $('.black_overlay').css("display","none");
 $(".cb_more").hide();
})

$(".advanced_search .detail ul li").hover(
function(){
$(this).find("a").css("color","#fff")
},function(){
$(this).find("a").css("color","#000")
$(".show").find("a").css("color","#fff")
}

  )


//搜索简历

$("#button_search").click(function(){
   var searc = $.trim($("#search_resume").val());
   if(searc == '')
   {
      layer.alert('搜索内容不能为空！', {
        title: '提示',
      })
      return false;
   }
   window.location.href = "/joblist?search="+encodeURIComponent(searc);
})

//点击搜索
$("#zhiwei_str .list").click(function(){
    var s_name = $(this).find('span').html();
    var rel = $(this).find('span').attr('rel');
    window.location.href="/joblist?search="+encodeURIComponent(s_name)+'&rel='+rel;
})

// se
$("#sear_j").click(function(){
   var sear_j = $.trim($(this).prev().val());
   if(sear_j == '')
   {
    layer.alert('搜索内容不能为空！', {
        title: '提示',
      })
    return false;
   }
   window.location.href="/joblist?search="+encodeURIComponent(se)+'&rel='+se_rel+'&js='+sear_j;
})
  
  //删除
  $(".job_op a:not(:last-child)").click(function()
  {
    var c =  $(this).hasClass('lock_applyjob2');
    var c2 = $(this).hasClass('lock_applyjob');
    var ty = $(this).attr('rel');
    
    if(ty ==0){
      return false;
    }
    var ws = $(this).parent().attr('ws');
    var cp = $(this).parent().attr('cp');
    var jn =  $(this).parent().attr('jn');//jobname
    if(ws == 1 && ty==1){layer.alert('请先完善简历！'); return false;}
    var jid = $(this).parent().attr('rel');
    var this_index = $(this);
    //确定要投递改职位吗？ 
    //操作成功，可前往感兴趣的职位列表查看
    if(ty == 1)
    {
        if(ty ==1){var t_msg = '确定要投递该职位吗？';}else{var t_msg = '确定要删除吗？';}
        layer.confirm(t_msg, function(index){
        $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {joblist_ty:ty,jid:jid,cpid:cp,jn:jn},
        dataType: 'json',
        success: function(msg)
        { 
           if(msg.status == 999)
            {
              layer.alert('登录超时请重新登录！', {
               title: '提示',
              })
                  window.location="login.htm";
                  return false;
            }
            if(ty == 3)
            {
              this_index.parent().parent().parent().remove();
              return false;
            }
            if(ty == 4)
            {
              this_index.parent().parent().parent().remove();
              return false;
            }   
            if(ty==1)
            {
              if(msg ==5){layer.alert('请先完善简历！'); return false;}
              if(c ==  true || c2 == true)
              {
                this_index.html('已申请');
                this_index.attr('rel','0');
                if(this_index.attr('zw') == 1)
                {
                  this_index.addClass('apchange');
                }else
                {
                  //职位详情里面的已申请
                  this_index.parent().addClass('change');
                }
                
                
                
              } 
            }  
     
            /*layer.alert('操作成功！可以到相关列表查看', {
               title: '提示',
            })*/
        },
        error:function(){   
            alert('error');   
        }
        
    });
    layer.close(index);
  });
    }else
    {
          $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {joblist_ty:ty,jid:jid,cpid:cp,jn:jn},
        dataType: 'json',
        success: function(msg)
        { 
           if(msg.status == 999)
            {
              layer.alert('登录超时请重新登录！', {
               title: '提示',
              })
                  window.location="login.htm";
                  return false;
            }
            if(ty==3 || ty==4)
            {
              this_index.parent().parent().parent().remove();
              return false;
            }
            if(ty == 2)
            {
              this_index.addClass('apchange');
              this_index.html("已收藏");
              this_index.attr('rel',0);
              return false;
            }
            if(msg == 2)
            {
              /*layer.alert('操作成功!可以到相关列表查看', {
               title: '提示',
              })*/

              return false;
            }else if(msg ==3)
            {
              window.location.reload();
              return false;
            }
            layer.alert('操作成功!可以到相关列表查看', {
               title: '提示',
            })
        },
        error:function(){   
            alert('error');   
        }
        
    });
    }




  });

  hideborder("c_salary");
  hideborder("c_city");
  hideborder("c_year");
  hideborder("c_edu");

  hideborder("c_trade");
  hideborder("gs_nature");
  hideborder("gs_size");
});


function pop_jobs(id, datas)
{
    var info = datas[0];
    var str_zhiwei = "";
    $.each(info,function(i,row){  
        //console.log(i);
        str_zhiwei += '<tr class="whole">';
        str_zhiwei += '<th style="width:222px;border: 1px solid #ccc;font-size: 14px;">'+i+'</th>';
        str_zhiwei += '<td style="border: 1px solid #ccc">';
        str_zhiwei += '<table style="width:100%;margin-bottom:5px">';
        $.each(row,function(j,row2){ 
          //console.log(j%3);
          if(j%3 ==0)
          {
            str_zhiwei +='<tr>';
          }
          
          //console.log(row2);
          ch = row2.split("|"); 
          str_zhiwei +='<td class="list"><span rel="'+ch[0]+'">'+ch[1]+'</span></td>';
          
          if(j%3==2)
          {
            str_zhiwei +='</tr>';
          }     
        })
        
        str_zhiwei +='</table></td></tr>';
    });
    
    $("#zhiwei_str").html(str_zhiwei);
}

function get_html_str(d)
{
  return false;
}
function get_default(v,t)
{
  if(t==1)
  {
    if(v == '')
    {
      document.write('全国');
    }else
    {
      document.write(v);
    }
  }else
  {
      if(v == '')
      {
        document.write('不限');
      }else
      {
        document.write(v);
      }
  }
}

//window.setTimeout(user_apply,3000); 

function user_redis(s,i){
  if(i == 1){var st_d = "&nbsp;已申请&nbsp;&nbsp;";}else{var st_d = "已收藏";}
  var inum = parseInt(i)-1;
  var job_i = $(".job_op a:eq("+inum+")").hasClass(""+s+"");
  if(job_i == false)
  {
    return false;
  }
  $.post("ajax_redis.htm",{indent:i},function(data){
     if(data.length>0)
     {
        data = eval(data);
        $.each(data,function(i,row){
          if($("#"+row).length > 0)
          {
            if(!$("#"+row).find("."+s).hasClass("apchange"))
            {
              $("#"+row).find("."+s).attr('rel',0);
              $("#"+row).find("."+s).addClass("apchange");
              $("#"+row).find("."+s).html(st_d);
            } 
          }
          
        })
      
     }
  })
}


