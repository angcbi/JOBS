$(function(){
	$(".list1 div").hover(function(){
		$(this).find(".hiden").stop(true,false).slideDown(500);
       
	},function(){
		$(this).find(".hiden").stop(true,false).slideUp(500);

	}
	)
	$(".list2 div").hover(function(){
		$(this).find(".hiden").stop(true,false).slideDown(500);
		$(".list1 div").find(".hiden").stop(true,false).slideUp(500);
	},function(){
		$(this).find(".hiden").stop(true,false).slideUp(500);
	}
	)
   



})

var dangq =1;
var zong =1;
var baseurl = "";
$(function(){
//encodeURIComponent
// input获得焦点
// $("#search_resume").click(function(){
//   // $("#search_resume").css("border","1px solid #029774");
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
          $(".advanced_search .detail").css("height","auto")
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


//职位搜索
$(".bg_wr").click(function(){
   var ss = $.trim($("#search_resume").val());
   if(ss == "")
   {
      layer.alert("请填写职位名称");
      return false;
   }
   window.location.href="/search/"+ss;
})

//搜索简历

$("#select_button").click(function(){
   var searc = $.trim($("#search_resume").val());
   if(searc == '')
   {
      layer.alert('搜索内容不能为空！', {
        title: '提示',
      })
      return false;
   }
   //window.location.href = "joblist.htm?search="+encodeURIComponent(searc);
})

//点击搜索
$("#zhiwei_str .list").click(function(){
    var s_name = $(this).find('span').html();
    var rel = $(this).find('span').attr('rel');
    window.location.href="salary.htm?search="+encodeURIComponent(s_name)+'&rel='+rel;
})

  

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




