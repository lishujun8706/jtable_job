$(function(){
    var added_flag = false;
    // $.ajax({
        // url:"/api/ajax_all_filters",
        // type:"POST",
        // dataType:"json",
        // success:function(data){
            // var sp_data = data['SP_List']
            // for(var i=0;i<sp_data.length;i++){
                // var opt = $("<option value=" + sp_data[i] + ">" + sp_data[i] + "</option>")
                // $("#sp").append(opt);
            // }
        // },
        // error:function(XMLHttpRequest, textStatus, errorThrown){
            // alert("error");
        // }
    // });

    // $('.dropdown-menu').on("click","li a",function(){
        // var content = $(this).text()
        // var this_button = $(this).parents("ul").siblings("button")
        // console.log(content);
        // console.log(this_button);
        // this_button.html( content + "<span class='caret'></span>");
    // });
          
    ///////////////////////////////////////////////////////////////
    var server_data = (function() {
        var result;
        $.ajax({
            url:"/api/ajax_all_filters",
            type:"POST",
            dataType:"json",
            async : false,
            success:function(data){
                result = data;
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("error");
            }
        });
        return result;
    })();
    
    var each_head = function(datas,ele,col_id){
        add_div = $("<div class=\"divcontain\" id=" + col_id + " style=\"overflow-y:scroll;padding:1px;background-color:cadetblue;font-size:8;position:relative;border: 2px solid #0b67cd;display:none;height:220px;width:auto\"></div>");
        ok_bt = $("<button class=\"ok\" style=\"display:none;color:black;background-color:green;width:50%;height:auto;font-size:5px\"></button>");
        ok_span = $("<span class=\"glyphicon glyphicon-ok\"></span>");
        ok_bt.html(ok_span);
        cancel_bt = $("<button class=\"cancel\" style=\"display:none;color:black;background-color:red;width:50%;height:auto;font-size:5px\"></button>");
        cancel_span = $("<span class=\"glyphicon glyphicon-remove\"></span>");
        cancel_bt.html(cancel_span);
        
        var a_z = $("<input type=\"checkbox\" class=\"sort_col\" name=\"sort\" value=\"ASC\">ASC</input><br/>")
        var z_a = $("<input type=\"checkbox\" class=\"sort_col\" name=\"sort\" value=\"DESC\">DESC</input><br/>")
        var hr_ = $("<hr style=\"margin:3px;border-color:darkslategray\"/>");
        
        add_div.append(a_z);
        add_div.append(z_a);
        add_div.append(hr_);
        
        for(var i=0;i<datas.length;i++){
            var input_ele = $("<input type=\"checkbox\" name="+ col_id + " value=" + datas[i] + ">" + datas[i] + "</input><br/>");
            add_div.append(input_ele);
        };

        
        add_div.click(function(e){
            e.stopPropagation();
        });
        
        ele.append(add_div);
        button_div = $("<div style=\"background-color:cadetblue\"></div>");
        button_div.append(ok_bt);
        button_div.append(cancel_bt);
        ele.append(button_div);
        
        ele.find(".cancel").click(function(){add_div.css("display","none")});
        ele.find(".ok").click(function(){
            // console.log("divdivdiv#####");
            $("#LoadRecordsButton").click();
        });
        
        /////////////////////////////////////////////////////
        // var create_sele = $("<select multiple=\"multiple\" id=" + col_id + " style=\"min-height:190px\"></select>");
        // var emp_pt = $("<option value=\"\" selected>Empty</option>");
        // var a_z = $("<option value=\"ASC\">Sort A to Z</option>");
        // var z_a = $("<option value=\"DESC\">Sort Z to A</option>");
        // create_sele.append(a_z);
        // create_sele.append(z_a);
        // create_sele.append("<hr style=\"margin:3px;border-color:darkslategray\"/>");
        // create_sele.append(emp_pt);
        // for(var i=0;i<datas.length;i++){
            // var opt = $("<option value=" + datas[i] + ">" + datas[i] + "</option>");
            // create_sele.append(opt);
        // };
        // add_div = $("<div class=\"divcontain\" style=\"padding:1px;background-color:cadetblue;font-size:8;position:relative;border: 2px solid #0b67cd;display:none;height:220px;width:auto\"></div>");
        // ok_bt = $("<button class=\"ok\">OK</button>");
        // cancel_bt = $("<button class=\"cancel\" style=\"position:absolute\">Cancel</button>");
        // add_div.append(create_sele);
        // add_div.append(ok_bt);
        // add_div.append(cancel_bt);
        // add_div.find(".cancel").click(function(){add_div.css("display","none")});
        // add_div.find(".ok").click(function(){
            // console.log("&&&&&&&&&&&&&&");
            // $("#LoadRecordsButton").click()
        // });
        // ele.append(add_div);
    };
    
    function add_ele(){
        added_flag = true;
        console.log(server_data);
        var SP_Data = server_data['SP_List'];
        var JRS_Data = server_data['JR_Status'];
        var PrL_Data = server_data['Pred_Low'];
        var PrCH_Data = server_data['CR_Hit'];
        var PrAH_Data = server_data['AR_Hit'];
        var UpT_Data = server_data['Update_Time'];
        
        var tb_heades = $("thead tr th div")
        //JRStatus  PredLow   UpdateTime   PredCrHit  PredAreaHit   SP
        $.each(tb_heades,function(){
            var head_name = $(this).find("span").text();
            
            switch(head_name){
                case "SP":
                    //$(this).css("backgroundColor","darkseagreen");
                    each_head(SP_Data,$(this),"SP");
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sortable");
                    break;
                case "JRStatus":
                    //$(this).css("backgroundColor","darkseagreen");
                    each_head(JRS_Data,$(this),"JRStatus");
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sortable");
                    break;
                case "PredLow":
                    //$(this).css("backgroundColor","darkseagreen");
                    each_head(PrL_Data,$(this),"PredLow");
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sortable");
                    break;
                case "UpdateTime":
                    //$(this).css("backgroundColor","darkseagreen");
                    each_head(UpT_Data,$(this),"UpdateTime");
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sortable");
                    break;
                case "PredCrHit":
                    //$(this).css("backgroundColor","darkseagreen");
                    each_head(PrCH_Data,$(this),"PredCrHit");
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sortable");
                    break;
                case "PredAreaHit":
                    //$(this).css("backgroundColor","darkseagreen");
                    each_head(PrAH_Data,$(this),"PredAreaHit");
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sortable");
                    break;
                default:
                    console.log("not exists");
            };
            //jtable-column-header-sortable jtable-column-header-sorted-asc/desc
            //$(this).mousedown(function(e){
            $(this).click(function(e){
                // e.stopPropagation();
                // e.preventDefault();
                //if(e.which == 2){
                e.preventDefault();
                
                if($(this).find(".divcontain").css("display") == "none"){
                    $(this).find(".divcontain").css("display","block");
                    $(this).find(".ok").css("display","inline");
                    $(this).find(".cancel").css("display","inline");
                }else{
                    $(this).find(".divcontain").css("display","none");
                    $(this).find(".ok").css("display","none");
                    $(this).find(".cancel").css("display","none");
                };
                //};
            });
            
            $(this).find("select").click(function(e){
                e.stopPropagation();
                e.preventDefault();
            });
            // $(this).find("select").change(function(e){
                // e.stopPropagation();
                // e.preventDefault();
                // $(this).css("display","none");
                // $("#LoadRecordsButton").click();
            // });
            // $(this).find("select").mouseleave(function(e){
                // $(this).css("display","none");
                // $("#LoadRecordsButton").click();
            // });
        });
        //jtable-column-header-sortable jtable-column-header-sorted-asc
        $(".sort_col").on("click",function(){
            $(this).siblings(".sort_col").prop("checked",false);
            if($(this).prop("checked")){
                console.log("111111111111111111");
                if($(this).val() == "ASC"){
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sorted-asc");
                    $(this).parents(".jtable-column-header").removeClass("jtable-column-header-sorted-desc");
                }else{
                    $(this).parents(".jtable-column-header").addClass("jtable-column-header-sorted-desc");
                    $(this).parents(".jtable-column-header").removeClass("jtable-column-header-sorted-asc");
                };
            }else{
                console.log("22222222222222");
                if($(this).val() == "ASC"){
                    $(this).parents(".jtable-column-header").removeClass("jtable-column-header-sorted-asc");
                }else{
                    $(this).parents(".jtable-column-header").removeClass("jtable-column-header-sorted-desc");
                };
            };
        });
    };
    ///////////////////////////////////////////////////////////////uuuu
          
    
    $('#table_div').jtable({
        title: 'Data Center',
        paging: true,
        //sorting: true,
        pageSize: 20,
        defaultSorting: 'jira_id ASC',
        //columnSelectable:false,
        actions: {
            listAction: '/api/ajax_triage_list',
            //deleteAction: '/api/ajax_triage_dalete',
            //updateAction: '/api/ajax_triage_update',
            createAction: '/api/ajax_triage_create'
        },
        fields: {
            jira_id: {
                title:'JRID',
                key: true,
                create: false,
                edit: false,
                list: true
            },
            jira_status: {
                title: 'JRStatus',
                width: '9%'
            },
            sp_name: {
                title: 'SP',
                width: '9%',
                //options: { 'M': 'Male', 'F': 'Female' }
            },
            predict_prob: {
                title: 'PredProb',
                width: '9%',
                //options: '/Demo/GetCityOptions'
            },
            predict_cr: {
                title: 'PredCR',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            predict_area: {
                title: 'PredArea',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            predict_status: {
                title: 'PredStatus',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            predict_low: {
                title: 'PredLow',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            predict_cr_hit: {
                title: 'PredCrHit',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            predict_area_hit: {
                title: 'PredAreaHit',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            actual_cr: {
                title: 'ActualCR',
                width: '9%',
                //type: 'checkbox',
                //values: { 'false': 'Passive', 'true': 'Active' },
                //defaultValue: 'true'
            },
            actual_area: {
                title: 'ActualArea',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            actual_status: {
                title: 'ActualStatus',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            update_time: {
                title: 'UpdateTime',
                width: '9%',
                //type: 'date',
                //displayFormat: 'yy-mm-dd'
            },
            Demo_RecordDate: {
                title: 'Record date',
                width: '9%',
                type: 'date',
                displayFormat: 'dd.mm.yy',
                create: false,
                edit: false,
                list:false,
                sorting: false //This column is not sortable!
            },
            Demo: {
                title: 'demo',
                list: false,
                //type: 'radiobutton',
                //options: { '1': 'Primary school', '2': 'High school', '3': 'University' }
            },
            Demo_Password: {
                title: 'User Password',
                type: 'password',
                list: false
            },
            Demo_EmailAddress: {
                title: 'Email address',
                list: false
            }
        },

        rowInserted:function(event, data){
            console.log("insert....");
        },

        loadingRecords:function(event, data){
            //console.log(event.target);
            console.log("loading....");
        },

        recordsLoaded:function(event, data){
            //console.log("This is event capture");
            $.each($("#table_div").find("td"),function(){
                $(this).attr("title",$(this).text())
            });

            var tb_width = $("table").css("width");
            $(".jtable-title").css("width",tb_width);
            $(".jtable-bottom-panel").css("width",tb_width);
        }
    });

    //Re-load records when user click 'load records' button.
    $('#LoadRecordsButton').click(function (e) {
        e.preventDefault();
        function check_val(ele){
            var sp_filters = [];
            $.each(ele.children("input:checked"),function(){
                sp_filters.push($(this).val());
            });
            return sp_filters
        };
        
        $('#table_div').jtable('load', {
            SP:check_val($('#SP')),
            PL:check_val($('#PredLow')),
            UT:check_val($('#UpdateTime')),
            PCH:check_val($('#PredCrHit')),
            PAH:check_val($('#PredAreaHit')),
            JRSTS:check_val($('#JRStatus')),
        },function(){
            $.each($("#table_div").find("td"),function(){
                $(this).attr("title",$(this).text())
            });
        });
    });

    //Load all records when page is first shown
    $('#table_div').jtable('load',{},function(){
        $.each($("#table_div").find("td"),function(){
            $(this).attr("title",$(this).text())
        });

        var tb_width = $("table").css("width");
        $(".jtable-title").css("width",tb_width);
        $(".jtable-bottom-panel").css("width",tb_width);
        // $.each($(".jtable-column-header"),function(){
            // $(this).addClass("jtable-column-header-sortable");
        // });
        if(!added_flag){
            add_ele();
        }else{
            console.log("QQQQQQQQQQQQQQQQQ");
        };
    });
    
    //$(".sort_col").on("click",function(){$(this).siblings().eq(0).prop("checked",false)});
});
