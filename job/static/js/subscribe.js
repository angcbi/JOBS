$(function(){
user_redis('lock_applyjob',1);
user_redis('lock_like',2);
//
var t_time = $("#one_t").attr('rel');
if(t_time)
{
   $('input[type="radio"]').attr('checked',false);
   $('label').removeClass('checked');
   $("#t_"+t_time).prev().attr('checked','checked');
   $("#t_"+t_time).attr('class','checked');
}

// 更新周期选择
$('#range label').click(function(){
    $(this).siblings('label').removeClass('checked');
    $(this).addClass('checked');
    $('input[type="radio"]').removeAttr('checked') && $(this).prev().attr('checked', 'checked');
  });

//点击职位筛选展开职位为
$(".condition>div>p#trade_id").click(function(e)
{
    var t_index = $(this).parent().parent().index();
    //alert(t_index);
    if(t_index == 3) return false;
    if(t_index ==2) //行业领域
    {
        get_html_str2(trade_arr);
        //return false;
    }
    $(this).parent("div").next("div").show();

    var window_height = $(window).height() + $(document).scrollTop();
    $('.black_overlay').css(
    {
          'background-color': 'rgba(0,0,0,0.8)', 
          'z-index' : 100, 
          'height': window_height+'px', 
          'display':'block'
    });
});

$(".cb_more").click(function(e){
e.stopPropagation();
});

$(".black_overlay").click(function(){
  // alert($(".cb_more").css('display'));

        if($(".black_overlay").css('display')=='block'){
          // alert("p");
            $(".black_overlay").hide();
             $(".cb_more").hide();
        }               
    });




//薪资范围 点击展开显示
$(".condition1>div>p").click(function()
{
    $(this).parent("div").next("div").toggle();
})

//选择薪资范围 选择了之后隐藏 
$(".cb_list>span").click(function()
{
    $(".condition1 p").html($(this).html());
    $(".condition1 p").attr('rel',$(this).attr('rel'));
    $(".cb_list").hide();
})

//时间选择
$(".all_ul>p>span").click(function(){
   var t_index = $(this).index();
   if(t_index ==0) //修改
   {
      $(".high_search").show();
      $(".all_ul").hide();
      $(".advanced_search .detail").css("height","450px");
      $(".advanced_search").css("height","495px");
      $(".sear_c").hide();
      $(".found_jobs").hide();
   }else //删除
   {
      $.post('/api_del_subscribe', {'subscribe':1}, function(str){
          var errcode = str.errcode;

            if(errcode == 0)
            {
		window.location.reload();
		$('#zhiwei_id input').val('');
            }
            else if (errcode == 1) {
              layer.alert('登录超时请重新登录！', {
               title: '提示',
              })
                  window.location="/login";
            }
          else if (errcode == 2) {
            layer.alert('清空失败！', {
               title: '提示',
              })
               
          }
      }, "json");
   }

})

//职位名称取消
$(".btn2").click(function(){
    $('.black_overlay').css("display","none");
    $(".cb_more").hide();
})

// tr_trade 职位点击选中国
$("#tr_trade").on('click',".list",function()
{
    var is_c = $(this).find('span').hasClass('click_color');
    if(is_c == true)
    {
      $(this).find("span").removeClass("click_color");
      return false;
    }
    var num = $("#tr_trade .click_color").size();
    if(num >4)
    {
      layer.alert('最多可以选择5个', {
               title: '提示',
      })
      return false;
    }
    $(this).find("span").addClass("click_color");
})


//职位确定
$(".condition .btn1").click(function(){
    var t_index = $(this).parent().parent().parent().index();
    //行业领域
    t_index = 2
    if(t_index== 1)//职位
    {
      var num = $("#zhiwei_str .click_color").size();
      var s_msg = '请至少输入一个职位！';
      var s_str = "";
      var s_str_id = "";
      $("#zhiwei_str .click_color").each(function() { 
          s_str_id += $(this).attr('rel')+',';
          s_str += $(this).html()+',';
      });
      if(num !=0)
      {
          $("#zhiwei_id").attr('rel',s_str_id.substring(0,s_str_id.length-1));
          $("#zhiwei_id").html(s_str.substring(0,s_str.length-1));
      }

    }else if(t_index==2) //行业领域
    {
      var num = $("#tr_trade .click_color").size();
      // var s_msg = '请至少选择一个行业！';
      var s_str = "";
      var s_sid = "";
      $("#tr_trade .click_color").each(function() { 
          s_str += $(this).html()+',';
          s_sid += $(this).attr('rel')+',';
      });
      if(num !=0)
      {
          $("#trade_id").html(s_str.substring(0,s_str.length-1));
          $("#trade_id").attr('rel',s_sid.substring(0,s_sid.length-1));
      }
    }

    if(num == 0)
    {
      // layer.alert(s_msg, {
      //          title: '提示',
      // })
      // return false;
      $("#trade_id").html('请选择行业领域');
    }
    
    $('.black_overlay').hide();
    $(".cb_more").hide();

})

//
//职位选中
$("#zhiwei_str .list").click(function()
{
    var is_c = $(this).find('span').hasClass('click_color');
    if(is_c == true)
    {
      $(this).find("span").removeClass("click_color");
      return false;
    }
    var num = $("#zhiwei_str .click_color").size();
    if(num >4)
    {
      layer.alert('最多可以选择5个', {
               title: '提示',
      })
      return false;
    }
    $(this).find("span").addClass("click_color");
})

//保存
$("#form_button").click(function(){
  // var zhiwei_id = $.trim($("#zhiwei_id").attr('rel'));
   var zhiwei_str = $("#zhiwei_id").find("input").val();
   var trade = $.trim($("#trade_id").html());
   var trade_id = $.trim($("#trade_id").attr('rel'));
   var salary = $.trim($(".condition1").find('p').attr('rel'));
   var salary_str = $(".condition1").find('p').html();
   var c_time = $(".checked").prev().val();
   if(zhiwei_str == undefined || zhiwei_str == '')
   {
      layer.alert('请输入订阅职位名称！', {
               title: '提示',
      })
      return false;
   }

   if(trade =='请选择行业领域')
   {
      layer.alert('请选择订阅行业领域！', {
               title: '提示',
      })
      return false;
      trade ='';
      trade_id ="";
   } 

   if(salary == undefined || salary =='' || salary=='请选择薪资范围' || salary=='不限')
   {
      layer.alert('请选择订阅薪资范围！', {
               title: '提示',
      })
      return false;
      salary = '';
      salary_str ='';
   }

   post_data = {
       'search': zhiwei_str,
       'trade': trade,
       'salary': salary_str,
   }

    $.ajax({
        type:'post',
        url: "/api_subscribe",
        data: JSON.stringify(post_data),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: function(msg)
        { 
            var errcode = msg['errcode'];

            if (errcode == 0) {
                window.location.reload();
            }

            if (errcode == 1) {
                layer.alert('登录超时请重新登录!', {
                    title: '提示', 
                });
                location.href = '/logout';
            }

            if (errcode == 2) {
                layer.alert('保存失败!', {
                    title: '提示', 
                });
            }

        },
        error:function(){   
            alert('error');   
        }

    });

})
// 保存后宽度
var te = $('#hyly').text();  
 if(te.length>10){
   $("#hyly").addClass("size");
  
 }
 else{
   $("#hyly").removeClass("size");
 }
var tr = $('#zwmc').text();  
 if(tr.length>15){
   $("#zwmc").addClass("size");
  
 }
 else{
   $("#zwmc").removeClass("size");
 }




  

  hideborder("c_salary");
  hideborder("c_city");
  hideborder("c_year");
  hideborder("c_edu");

  hideborder("c_trade");
  hideborder("gs_nature");
  hideborder("gs_size");
})

//职位
function pop_jobs(s,datas)
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
          
          ch = row2.split("|"); 
          str_zhiwei +='<td class="list"><span class="zid_'+ch[0]+'" rel="'+ch[0]+'">'+ch[1]+'</span></td>';
          
          if(j%3==2)
          {
            str_zhiwei +='</tr>';
          }     
        })
        
        str_zhiwei +='</table></td></tr>';
    });
    $("#zhiwei_str").html(str_zhiwei);
    var cat_id = $.trim($("#zhiwei_id").attr('rel'));
    if(cat_id)
    {
        var cat_arr = cat_id.split(","); 
         $.each(cat_arr,function(k,v){ 
             // console.log(".zid_"+v);
              $(".zid_"+v).addClass('click_color');
	  
         })
    }
}
//console.log(trade_arr);
function get_html_str2(trade_arr) 
{
   //alert(1)
   var str ='';
   var cat_arr ='';
   var trade_id = $.trim($("#trade_id").html());
    if(trade_id !='请选择行业领域')
    {
        cat_arr = trade_id.split(","); 
    } 
   if(cat_arr=="")
   {
        $.each(trade_arr,function(j,row){ 
          
          if(j%3 ==0)
          {
             str +='<tr>';
          }
          
          str +='<td class="list"><span rel="'+row.letter+'">'+row.name+'</span></td>';
          
          if(j%3==2)
          {
            str +='</tr>';
          }      
        })  
      
   }else
   {
      $.each(trade_arr,function(j,row){ 
           //console.log(+'==\n');
          //console.log(row+'==='+vv+'\n');
            if(j%3 ==0)
            {
               str +='<tr>';
            }
            if($.inArray(row.name,cat_arr) !=-1)
            {
                str +='<td class="list"><span class="click_color" rel="'+row.letter+'">'+row.name+'</span></td>';
            }else{
                str +='<td class="list"><span rel="'+row.letter+'">'+row.name+'</span></td>';
            }
               
            if(j%3==2)
            {
              str +='</tr>';
            } 
        })
}
   //alert(str);
   $("#tr_trade").html(str);
}
//行业领域
function get_html_str(d)
{
   var str ='';
   var cat_arr ='';
   var trade_id = $.trim($("#trade_id").html());
    if(trade_id !='请选择行业领域')
    {
        cat_arr = trade_id.split(","); 
    } 
   if(cat_arr=="")
   {
        $.each(d,function(j,row){ 
          if(j%3 ==0)
          {
             str +='<tr>';
          }
              
          str +='<td class="list"><span>'+row+'</span></td>';
          
          if(j%3==2)
          {
            str +='</tr>';
          }      
        })  
      
   }else
   {
      $.each(d,function(j,row){ 
           //console.log(+'==\n');
          //console.log(row+'==='+vv+'\n');
            if(j%3 ==0)
            {
               str +='<tr>';
            }
            if($.inArray(row,cat_arr) !=-1)
            {
                str +='<td class="list"><span class="click_color">'+row+'</span></td>';
            }else{
                str +='<td class="list"><span>'+row+'</span></td>';
            }
               
            if(j%3==2)
            {
              str +='</tr>';
            } 
        })
}
   //alert(str);
   $("#tr_trade").html(str);

}

function yanzheng(){
    var e_email = $("#e_email").val();
    if(e_email==""){
      //alert('email不能为空'); 
       layer.alert('email不能为空', {
             title: '提示',
            })
      return false;
    }

    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (!pattern.test(e_email)) {
        //alert("邮箱格式不正确！");
        layer.alert('邮箱格式不正确！', {
             title: '提示',
            })
        return false;
    }

    var subject = $.trim($("#e_subject").val());
    if(subject==""){
       //alert('主题不能为空！');
       layer.alert('主题不能为空！', {
             title: '提示',
      })
       return false;
     }
    var e_type = $("#e_type").val();
    if(e_type ==5 || e_type==6)
    {
       var s = $(".xiala").find("option:selected").val();
       if(s == '')
       {
           //alert("请选择职位名称");
           layer.alert('请选择职位名称', {
             title: '提示',
      })
           return false;
       } 
    }
    return true;

}


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



