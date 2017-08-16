$(function() {
    $('.radiobtn label:not(:first)').click(function(){
        //$('input[type="radio"]').attr('checked',false);
        $('.radiobtn label:not(:first)').removeClass('checked');
        //$(this).prev().attr('checked',true);
        $(this).attr('class','checked');
    });
});


function job_edit()
{
    //alert(111);
   // return false;
    var job_name = $.trim($("input[name=job_name]").val());
    var job_num = $.trim($("input[name=job_num]").val());
    var job_type = $("input[name=job_type]:checked").val();
    var address = $.trim($("input[name=address]").val());
    var job_years = $("input[name=job_years]").val();
    var edu = $("select[name=edu] option:selected").val();
    //var salary = $("select[name=salary] option:selected").val();
    var boon = $.trim($("input[name=boon]").val());
    var job_des = $.trim($("textarea[name=job_des]").val());
    if(job_name==""){
        //alert('职位名称不能为空！');
        layer.alert('职位名称不能为空！', {
             title: '提示',
        })
        return false;
    }
    var pattern = /^\d+$/;  
    if(job_num=="" || !pattern.test(job_num)){
        //alert('职位人数不能为空，或只能为数字！');
        layer.alert('职位人数不能为空，或只能为数字！', {
             title: '提示',
        })
        return false;
    }
    if(address==""){
        //alert('公司地点不能为空！');
        layer.alert('公司地点不能为空！', {
             title: '提示',
        })
        return false;
    }
    if(job_years==""){
        //alert('请选择工作年限！');
        layer.alert('请选择工作年限！', {
             title: '提示',
        })
        return false;
    }
    if(edu==""){
        //alert('请选择学历！');
        layer.alert('请选择学历！', {
             title: '提示',
        })
        return false;
    }
    var s_min = $("input[name=s_min]").val();
    var s_max = $("input[name=s_max]").val();
    
    if(s_min == '' || s_max == "")
    {
        //alert("最低金额和最高金额不能为空!");
        layer.alert('最低金额和最高金额不能为空', {
             title: '提示',
        })
        return false;
    }
    if(parseInt(s_max) < parseInt(s_min))
    {
        //alert("最高金额不能低于最低金额");
        layer.alert('最高金额不能低于最低金额', {
             title: '提示',
        })
        return false;
    }

    if(job_des==""){
        //alert('职位介绍描述不能空！');
        layer.alert('职位介绍描述不能空！', {
             title: '提示',
        })
        return false;
    }
/*    var sync_sites = "";

    $("input[name='sync_sites[]']").each(function(e){
        if($(this).attr('checked') == 'checked')
        {
            sync_sites += $(this).val();
        }
        
    })

    if(sync_sites == "")
    {
       // alert("请选择同步网站！");
       layer.alert('请选择同步网站！', {
             title: '提示',
        })
        return false;
    }*/

    //return false;
    return true;

}


function job_success(s)
{
   layer.alert(s,function index(){
    window.lcation.href="job_edit.htm";
   });
}




