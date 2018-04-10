/**
 * common
 */
$(function() {
    /* 下拉菜单 */
    var flag = true;
    var num = 0;
    $(".menu-control").click(function() {
        var oLi = $(this);
        if (num == 0 && oLi.parent().hasClass("active")) {
            oLi.parent().removeClass("active");
            flag = !flag;
            num++;
        }
        oLi.parent().addClass("active");
        if (oLi.parent().hasClass("active") && flag) {
            flag = !flag;
            oLi.next().css("display", "block");
            oLi.next().animate({
                    height: (function() {
                        var str = oLi.next().children().length * 29 + 12 + "px";
                        return str;
                    })()
                },
                300
            );
        } else {
            flag = !flag;
            oLi.next().animate({
                height: "0px"
            }, 300, function() {
                oLi.next().css("display", "none");
                oLi.parent().removeClass("active");
            });
        }
    });
    $(".active > .submenu").animate({
            height: (function() {
                var str = $(".active > .submenu").children().length * 29 + 12 + "px";
                return str;
            })()
        },
        300
    );
    $(".submenu>li").mouseover(function() {
        $(this).addClass("hover");
    });
    $(".submenu>li").mouseout(function() {
        $(this).removeClass("hover");
    });
    $(".submenu>li").click(function() {
        $(this)
            .siblings()
            .removeClass("active");
        $(this).addClass("active");
    });
});
/* 导航隐藏 */
$(function() {
    var falg = true;
    $("#sideNav").click(function() {
        setTimeout(() => {
            try {
                myChart_stu.resize();
                myChart_tea.resize();
            } catch (error) {

            }
        }, 1000);

        if (falg) {
            $("#func").animate({
                "margin-left": "0"
            }, 300);
            $(".navbar-side").animate({
                "margin-left": "-=200px"
            }, 300);
        } else {
            $("#func").animate({
                "margin-left": "200px"
            }, 300);
            $(".navbar-side").animate({
                "margin-left": "0px"
            }, 300);
        }
        falg = !falg;
    });
});

/* 首页时间 */
$(function() {
    setInterval(function() {
        clock();
    }, 1000);

    function clock() {
        var time = new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        if ($(".h").text() != (hours < 10 ? "0" : "") + hours) {
            $(".h").text((hours < 10 ? "0" : "") + hours);
            shake($(".h"));
        }

        if ($(".m").text() != (minutes < 10 ? "0" : "") + minutes) {
            $(".m").text((minutes < 10 ? "0" : "") + minutes);
            shake($(".m"));
        }

        if ($(".s").text() != (seconds < 10 ? "0" : "") + seconds) {
            $(".s").text((seconds < 10 ? "0" : "") + seconds);
            shake($(".s"));
        }
    }

    $(document).load(function() {
        clock();
    });

    function shake(t) {
        t.addClass("shake-constant");
        setTimeout(function() {
            t.removeClass("shake-constant");
        }, 470);
    }
});
/* 首页天气 */
$(function() {
    $('.weather>a').click(function() {
        $(this).parent().slideUp();
    });
});
/* 登出 */
$(function() {
    $('.exit').click(function() {
        layer.confirm('你是要退出系统吗？', {
            icon: 2,
            title: '退出系统',
            area: ['260px', '170px'],
            btn: ['确认', '取消']
        }, function(index) {
            // 关闭弹窗
            layer.close(index);
            location.replace('../index.html');
        });
    });
});
/**
 * index.html
 */
$(function() {
    function codes() {
        var num1 = Math.floor(Math.random() * 100);
        var num2 = Math.floor(Math.random() * 100);
        gray = num1 + num2;
        $("#gray").html(num1 + "+" + num2);
        if ($("#gray").hasClass("nogray")) {
            $("#gray").removeClass("nogray");
            $("#gray").addClass("gray");
        }
    }
    codes();

    $("#gray").on("click", codes);
    $(".bt").click(function() {
        if ($(".yz").val() != gray) {
            $("#error")
                .fadeIn()
                .html(
                    "验证码错误" + "<img src='./images/login/错误.png' class='cuowu'>"
                );
        } else {
            var user = $(".username").val();
            var possword = $(".password").val();
            if (
                user.length > 6 ||
                (user.length < 6 && possword.length > 6) ||
                possword.length < 6
            ) {

                $(".sanjiao").fadeIn();
                $("#error").fadeIn();
            } else {
                location.replace("./pages/main.html");
            }
        }
        $(".cuowu").click(function() {
            $("#error").fadeOut();
        });
    });
});

/**
 * main.html
 */
$(function() {
    /* 头部轮播公告 */
    var flag = true;
    var num = 0;
    var that = null;
    setInterval(tabIcon, 500);
    var newsTimer = setInterval(newTab, 3000);

    function tabIcon() {
        if (flag) {
            $("#mn-icon")
                .removeClass("glyphicon-volume-down")
                .addClass("glyphicon-volume-up");
        } else {
            $("#mn-icon")
                .removeClass("glyphicon-volume-up")
                .addClass("glyphicon-volume-down");
        }
        flag = !flag;
    }
    $("#mn-news>li").mouseenter(function() {
        clearInterval(newsTimer);
    });
    $("#mn-news>li").mouseleave(function() {
        newsTimer = setInterval(newTab, 3000);
    });

    function newTab() {
        $("#mn-news").animate({
            "margin-top": "-30px"
        }, 1000, function() {
            $("#mn-news").css({
                "margin-top": "0px"
            });
            var dom = $("#mn-news>li")
                .first()
                .clone(true);
            $("#mn-news>li")
                .first()
                .remove();
            $("#mn-news").append(dom);
        });
    }
    /* 图表插件 */
    try {
        window.myChart_stu = echarts.init($("#myChart-stu").get(0));
        window.myChart_tea = echarts.init($("#myChart-tea").get(0));
        var stuOption = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                orient: 'horizontal',
                top: '25px',
                left: 'center',
                data: ['大班', '中班', '小班']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五']
            },
            yAxis: {
                type: 'value'
            },
            color: ['#fd6d64', '#41cac0', '#3e8cde'],
            series: [{
                    name: '大班',
                    type: 'line',
                    stack: '总量',
                    data: [32, 22, 20, 15, 19, 33, 41]
                },
                {
                    name: '中班',
                    type: 'line',
                    stack: '总量',
                    data: [30, 32, 22, 34, 30, 30, 32]
                },
                {
                    name: '小班',
                    type: 'line',
                    stack: '总量',
                    data: [20, 92, 91, 94, 10, 30, 10]
                }
            ]
        };
        var teaOption = {
            tooltip: {},
            legend: {
                orient: 'horizontal',
                top: '25px',
                left: 'center',
                data: ['男', '女']
            },
            xAxis: {
                data: ["初级教师", "中级教师", "高级教师", "特级教师", "外教", "特邀教师"]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            color: ['#34ae99', '#fd6d64'],
            yAxis: {},
            series: [{
                name: '男',
                type: 'bar',
                data: [5, 13, 26, 5, 1, 17]
            }, {
                name: '女',
                type: 'bar',
                data: [2, 20, 18, 10, 2, 16]
            }]
        };
        myChart_stu.setOption(stuOption);
        myChart_tea.setOption(teaOption);
        $(window).resize(function() {
            myChart_stu.resize();
            myChart_tea.resize();
        });
    } catch (error) {}
    /* 任务处理 */
    bindEv();
    delData();
    $('.save-task').click(function() {
        var str = '';
        if (that.get(0)) {
            str = '保存成功';
            $('#mn-editor').find('input').each(function(index, ele) {
                that.find('td').eq(index).text($(ele).val());
            });
            $('#mn-editor').modal('toggle');
            layer.msg(str, { time: 1000, icon: 1 }, function() {
                $('#mn-editor').find('input').each(function(index, ele) {
                    $(ele).val('');
                });
            });
        } else {
            if ($('#mn-editor').find('input').eq(0).val() != '' && $('#mn-editor').find('input').eq(1).val() != '') {
                str = '添加成功';
                $('.mn-waiting tbody').append(`<tr class="info">
								<td>${$('#mn-editor').find('input').eq(0).val()}</td>
								<td>${$('#mn-editor').find('input').eq(1).val()}</td>
								<td>${$('#mn-editor').find('input').eq(2).val()}</td>
								<td>待完成</td>
								<td>
									<a class="btn btn-info btn-xs" data-toggle="modal" href="#mn-editor">
										<i class="fa fa-pencil"></i> 编辑</a>
								</td>
              </tr>`);
                bindEv();
                $('#mn-editor').modal('toggle');
                layer.msg(str, {}, function() {
                    $('#mn-editor').find('input').each(function(index, ele) {
                        $(ele).val('');
                    });
                });
            } else {
                layer.msg('请填写内容', { time: 1000, icon: 7 });
            }

        }

    });
    $('.cancel-editor').click(function() {
        var str = '';
        $('#mn-editor').modal('toggle');
        if (that.get(0)) {
            str = '取消编辑';
        } else {
            str = '取消添加';
        }
        layer.msg(str, { time: 1000, icon: 0 }, function() {
            $('#mn-editor').find('input').each(function(index, ele) {
                $(ele).val('');
            });
        });
    });
    $('.mn-add').click(function() {
        that = $(this).parents('tr');

    });

    function delData() {
        $('.mn-timeout').find('tr>td>a').click(function() {
            var del = $(this).parents('tr');
            layer.alert('确认删除选中的记录吗？', {
                icon: 2,
                title: '删除确认',
                area: ['260px', '170px'],
                closeBtn: 1,
                shadeClose: true
            }, function(index) {
                // 关闭弹窗
                del.remove();
                layer.close(index);
                layer.msg('删除成功', { time: 1000, icon: 1 })
            });
        });
    }

    function bindEv() {
        $('.mn-waiting tr.info').each(function() {
            $(this).find('td').eq(3).click(function() {
                if ($(this).html() == '待完成') {
                    $(this).html('已完成');
                    $(this).next().children().addClass('disabled');
                    $(this).parent().addClass('mn-del');
                    setTimeout(() => {
                        if ($(this).parent().hasClass('mn-del')) {
                            var dom = $(this).parent().clone(false);
                            $(this).parent().remove();
                            dom.removeClass('mn-del');
                            dom.find('td').eq(4).html(`<a href="javascript:void(0);" class="btn btn-danger btn-xs">
                <i class= "fa fa-remove" ></i> 删除</a>`);
                            $('.mn-timeout tbody').append(dom);
                            delData();
                        }
                    }, 3000);
                } else {
                    $(this).html('待完成')
                    $(this).next().children().removeClass('disabled');
                    $(this).parent().removeClass('mn-del');
                }
            });
            $(this).find('td').eq(4).click(function() {
                if (!$(this).children().hasClass("disabled")) {
                    that = $(this).parents('tr');
                    $('#mn-editor').find('input').each(function(index, ele) {
                        $(ele).val(that.find('td').eq(index).text());
                    });



                }
            });
        });
    }
});
/**
 * class_partment
 */
$(function() {
    $(".xwr_table .fa-remove").attr("onclick", "deleteClass(this)");
    $(".class_table button.fa-pencil-square").attr("onclick", "class_amend(this)");

    /*删除班级*/
    $('.class_remove').on('click', function() {
        var _checked = $(".class_remove").parents(".row").next().find("tr").find("td input[type='checkbox']:checked");
        var str = null;
        var num = null;
        var _flag = false;
        var _flag1 = false;
        if (_checked.length === 0) {
            str = "请选择您需要删除的内容!";
            num = 7;
        } else {
            str = '确认删除所选内容?';
            num = 2;
            _flag = true;
        }
        layer.open({
            type: 0,
            icon: num,
            title: "删除确认",
            btn: ['确定'],
            area: ['270px', '160px'],
            shadeClose: true, //点击遮罩关闭
            content: str,
            yes: function(index, layero) {
                $("._mychecked").each(function() {
                    $(this).attr("checked", false);
                });
                $(".class_remove").parents(".row").next().find("tr").find("td input[type='checkbox']:checked").parents("tr").remove();
                _flag1 = true;
                layer.close(index);
            }
        });
        setInterval(function() {
            if (_flag && _flag1) {
                setTimeout(function() {
                    _flag = false;
                    layer.msg('删除成功', {
                        icon: 1,
                        time: 1000
                    });
                }, 80)
            }
        }, 100);
    });
    /*添加班级*/
    $(".class_AddClass").click(function() {
        var str_class;
        var str_Adviser;
        var str_monitor;
        var str_studentNum;
        var flagSpan = true;
        $(".class_add input").each(function(index, ele) {
            if (index === 0) {
                str_class = $(this).val();
                $(this).val("");
            }
            if (index === 1) {
                str_Adviser = $(this).val();
                $(this).val("");
            }
            if (index === 2) {
                str_monitor = $(this).val();
                $(this).val("");
            }
            if (index === 3) {
                str_studentNum = $(this).val();
                $(this).val("");
            }
        });
        $("#class_Modal .modal-body span").each(function() {
            if ($(this).text() == "格式错误!") {
                $(this).replaceWith("<span class=''></span>");
                flagSpan = false;
            }
        });
        if (flagSpan && str_class && str_Adviser && str_monitor && str_studentNum) {
            $(".class_table").append("<tr>" +
                "<td>" + "<input type='checkbox'>" + "</td>" +
                "<td>" + str_class + "</td>" +
                "<td>" + str_Adviser + "</td>" +
                "<td>" + str_monitor + "</td>" +
                "<td>" + str_studentNum + "</td>" +
                "<td>" +
                "<button class = 'btn btn-success fa fa-pencil-square' onclick='class_amend(this)'> 编辑</button>" + " " +
                '<button class="btn btn-danger fa fa-remove" onclick="deleteClass(this)"> 删除</button>' +
                "</td>" +
                "</tr>");
            $('#class_Modal').modal('hide');
        } else {
            layer.msg('内容为空或填写有误', { time: 1000, icon: 0 });
        }
    });
    /*添加学生*/
    $("#student_Modal .students_AddStudents").click(function() {
        var add_students_name;
        var add_students_sex;
        var add_students_data;
        var add_students_grade;
        var add_students_class;
        var add_students_parents;
        var add_students_parNum;
        var flagSpan = true;
        $(".student_add input").each(function(index, ele) {
            if (index === 0) {
                add_students_name = $(ele).val();
                $(ele).val("");
            } else if (index === 1) {
                add_students_sex = $(ele).val();
                $(ele).val("");
            } else if (index === 2) {
                add_students_data = $(ele).val();
                $(ele).val("");
            } else if (index === 3) {
                add_students_grade = $(ele).val();
                $(ele).val("");
            } else if (index === 4) {
                add_students_class = $(ele).val();
                $(ele).val("");
            } else if (index === 5) {
                add_students_parents = $(ele).val();
                $(ele).val("");
            } else if (index === 6) {
                add_students_parNum = $(ele).val();
                $(ele).val("");
            }
        });
        $("#student_Modal .modal-body span").each(function() {
            if ($(this).text() == "格式错误!") {
                $(this).replaceWith("<span class=''></span>");
                flagSpan = false;
            }
        });
        var add_students_stadus = $(".add_class_info select").val();
        if (flagSpan && add_students_name && add_students_sex && add_students_data && add_students_grade && add_students_class && add_students_parents && add_students_parNum) {
            $(".students_table").append("<tr>" +
                "<td>" + "<input type='checkbox'>" + "</td>" +
                "<td>" + add_students_name + "</td>" +
                "<td>" + add_students_sex + "</td>" +
                "<td>" + add_students_data + "</td>" +
                "<td>" + add_students_grade + "</td>" +
                "<td>" + add_students_class + "</td>" +
                "<td>" + add_students_parents + "</td>" +
                "<td>" + add_students_parNum + "</td>" +
                "<td>" + add_students_stadus + "</td>" +
                "<td>" +
                "<button class = 'btn btn-success fa fa-pencil-square ' onclick='amend_student_info(this)'> 编辑</button>" + " " +
                '<button class="btn btn-danger fa fa-remove" onclick="deleteClass(this)"> 删除</button>' +
                "</td>" +
                "</tr>");
            $('#student_Modal').modal('hide');
        } else {
            layer.msg('内容为空或填写有误', { time: 1000, icon: 0 });
        }
    });
    /*下拉框筛选*/
    $(".students_forme_select").change(function() {
        var index = $(".students_table tr").find('th').index($(this).parents('th'));
        var allTr = $(this).parents("tr").siblings();
        allTr.each(function(i, ele) {
            $(ele).css("display", "table-row");
        });
        var that = this;
        allTr.each(function(i, ele) {
            if ($(this).children().eq(index).text() != $(that).val()) {
                $(ele).css("display", "none");
            }
        });
        if ($(this).val() == "性别" || $(this).val() == "年级" || $(this).val() == "班级" || $(this).val() == "状态") {
            allTr.each(function(i, ele) {
                $(ele).css("display", "table-row");
            });
        }
    });
    /*修改学生信息*/
    $(".students_table .fa-pencil-square").attr("onclick", "amend_student_info(this)");
    /*复选框批量选中*/
    // $("._mychecked").change(chooseChecked);
    /*搜索*/
    $(".info_search").click(function() {
        var seachCon = $(this).prev().val();
        var allTr = $(this).parents(".row").next().find("tr");
        allTr.each(function(index, ele) {
            $(ele).css("display", "table-row")
        });
        if (seachCon) {
            for (var i = 1; i < allTr.length; i++) {
                var thisTD = $(allTr[i]).find("td");
                for (var j = 1; j < thisTD.length; j++) {
                    if (seachCon.match($(thisTD[j]).text())) {
                        break;
                    }
                    if (!seachCon.match($(thisTD[j]).text()) && j === thisTD.length - 1) {
                        $(thisTD[j]).parents("tr").css("display", "none");
                    }
                }
            }
        }
    });
    /*验证班级正则*/
    /* 班级验证*/
    window.add_class_func = function(obj) {
            var str = $(obj).val();
            var reg = /^[a-zA-Z\u4e00-\u9fa5]{2,}$/;
            if (reg.test(str) === false) {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
            } else {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
            }
        }
        /* 姓名验证*/
    window.add_name_func = function(obj) {
            var str = $(obj).val();
            var reg = /^[\u4e00-\u9fa5]{2,}$/;
            if (reg.test(str) === false) {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
            } else {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
            }
        }
        /*人数验证*/
    window.add_person_func = function add_person_func(obj) {
            var str = $(obj).val();
            var reg = /^[-]{0,1}[0-9]{1,}$/;
            if (reg.test(str) === false) {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
            } else {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
            }
        }
        /*电话号码验证*/
    window.add_phone_func = function(obj) {
            var str = $(obj).val();
            var reg = /^[1][3|4|5|6|7|8][0-9]{9}$/;
            if (reg.test(str) === false) {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
            } else {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
            }
        }
        /*年级验证*/
    window.add_grade_func = function(obj) {
            var str = $(obj).val();
            var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
            if (reg.test(str) === false) {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
            } else {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
            }
        }
        /*性别验证*/
    window.add_sec_func = function(obj) {
            var str = $(obj).val();
            var reg = /^['男'|'女']$/;
            if (reg.test(str) === false) {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
            } else {
                $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
            }
        }
        /*出生日期验证*/
    window.add_data_func = function(obj) {
        var str = $(obj).val();
        var reg = /^[\d]{4}[-\ ][\d]{1,2}[-\ ][\d]{1,2}$/;
        if (reg.test(str) === false) {
            $(obj).parent().parent().parent().children("span").replaceWith("<span class='_Waring fa fa-times-circle-o'>" + "格式错误!" + "</span>");
        } else {
            $(obj).parent().parent().parent().children("span").replaceWith("<span class=''></span>");
        }
    }

    window.chooseChecked = function() {
        var _checkbox = $(this).parents("tr").siblings().find("td:nth-of-type(1)").children();
        _checkbox.each(function(index, ele) {
            $(ele).prop("checked", !$(ele).prop("checked"));
        });
        // _checkbox.each(function (index,ele) {
        //     if ($(this).is(':checked')) {
        //         $(this).prop("checked", false);
        //     }
        //     else {
        //         $(this).prop("checked", true);
        //     }
        // });
    }
    $("._mychecked").change(chooseChecked);
    /*修改学生信息*/
    window.amend_student_info = function(obj) {
            $("#amend_student_Modal").modal("show");
            var add_students_name;
            var add_students_sex;
            var add_students_data;
            var add_students_grade;
            var add_students_class;
            var add_students_parents;
            var add_students_parNum;
            $(".student_amend input").each(function(index, ele) {
                if (index === 0) {
                    add_students_name = $(obj).parents("tr").find("td:nth-of-type(2)").text();
                    $(this).val(add_students_name);
                }
                if (index === 1) {
                    add_students_sex = $(obj).parents("tr").find("td:nth-of-type(3)").text();
                    $(this).val(add_students_sex);
                }
                if (index === 2) {
                    add_students_data = $(obj).parents("tr").find("td:nth-of-type(4)").text();
                    $(this).val(add_students_data);
                }
                if (index === 3) {
                    add_students_grade = $(obj).parents("tr").find("td:nth-of-type(5)").text();
                    $(this).val(add_students_grade);
                }
                if (index === 4) {
                    add_students_class = $(obj).parents("tr").find("td:nth-of-type(6)").text();
                    $(this).val(add_students_class);
                }
                if (index === 5) {
                    add_students_parents = $(obj).parents("tr").find("td:nth-of-type(7)").text();
                    $(this).val(add_students_parents);
                }
                if (index === 6) {
                    add_students_parNum = $(obj).parents("tr").find("td:nth-of-type(8)").text();
                    $(this).val(add_students_parNum);
                }
            });
            $(".students_AddStudents").click(function() {
                $(".student_amend input").each(function(index, ele) {
                    if (index === 0) {
                        add_students_name = $(this).val();
                    }
                    if (index === 1) {
                        add_students_sex = $(this).val();
                    }
                    if (index === 2) {
                        add_students_data = $(this).val();
                    }
                    if (index === 3) {
                        add_students_grade = $(this).val();
                    }
                    if (index === 4) {
                        add_students_class = $(this).val();
                    }
                    if (index === 5) {
                        add_students_parents = $(this).val();
                    }
                    if (index === 6) {
                        add_students_parNum = $(this).val();
                    }
                });
                var add_students_stadus = $(".student_amend select").val();
                $(obj).parents("tr").replaceWith("<tr>" +
                    "<td>" + "<input type='checkbox'> " + "</td>" +
                    "<td>" + add_students_name + "</td>" +
                    "<td>" + add_students_sex + "</td>" +
                    "<td>" + add_students_data + "</td>" +
                    "<td>" + add_students_grade + "</td>" +
                    "<td>" + add_students_class + "</td>" +
                    "<td>" + add_students_parents + "</td>" +
                    "<td>" + add_students_parNum + "</td>" +
                    "<td>" + add_students_stadus + "</td>" +
                    "<td>" +
                    "<button class = 'btn btn-success fa fa-pencil-square ' onclick='amend_student_info(this)'> 编辑</button>" + " " +
                    '<button class="btn btn-danger fa fa-remove" onclick="deleteClass(this)"> 删除</button>' +
                    "</td>" +
                    "</tr>");
                $('#amend_student_Modal').modal('hide');
            });
        }
        /*修改班级信息*/
    window.class_amend = function(obj) {
            var _self = obj;
            $("#amend_class_Modal").modal('show');
            var str_class;
            var str_Adviser;
            var str_monitor;
            var str_studentNum;
            $(".class_add_amend input").each(function(index, ele) {
                if (index === 0) {
                    str_class = $(_self).parents("tr").find("td:nth-of-type(2)").text();
                    $(this).val(str_class);
                }
                if (index === 1) {
                    str_Adviser = $(_self).parents("tr").find("td:nth-of-type(3)").text();
                    $(this).val(str_Adviser);
                }
                if (index === 2) {
                    str_monitor = $(_self).parents("tr").find("td:nth-of-type(4)").text();
                    $(this).val(str_monitor);
                }
                if (index === 3) {
                    str_studentNum = $(_self).parents("tr").find("td:nth-of-type(5)").text();
                    $(this).val(str_studentNum);
                }
            });
            $(".class_AddClass_amend").click(function() {
                $(".class_add_amend input").each(function(index, ele) {
                    if (index === 0) {
                        str_class = $(this).val();
                    }
                    if (index === 1) {
                        str_Adviser = $(this).val();
                    }
                    if (index === 2) {
                        str_monitor = $(this).val();
                    }
                    if (index === 3) {
                        str_studentNum = $(this).val();
                    }
                });
                $(obj).parents("tr").replaceWith("<tr>" +
                    "<td>" + "<input type='checkbox'>" + "</td>" +
                    "<td>" + str_class + "</td>" +
                    "<td>" + str_Adviser + "</td>" +
                    "<td>" + str_monitor + "</td>" +
                    "<td>" + str_studentNum + "</td>" +
                    "<td>" +
                    "<button class = 'btn btn-success fa fa-pencil-square' onclick='class_amend(this)'> 编辑</button>" + " " +
                    '<button class="btn btn-danger fa fa-remove" onclick="deleteClass(this)"> 删除</button>' +
                    "</td>" +
                    "</tr>");
                $('#amend_class_Modal').modal('hide');
            });
        }
        /*删除班级*/
    window.deleteClass = function(obj) {
        var _flag = false;
        layer.open({
            type: 0,
            icon: 2,
            title: "删除确认",
            btn: ['确定'],
            area: ['270px', '160px'],
            shadeClose: true, //点击遮罩关闭
            content: '确认删除所选内容?',
            yes: function(index, layero) {
                $(obj).parents("tr").remove();
                _flag = true;
                layer.close(index);
            }
        });
        setInterval(function() {
            if (_flag) {
                setTimeout(function() {
                    _flag = false;
                    layer.msg('删除成功', {
                        icon: 1,
                        time: 1000
                    });
                }, 80)
            }
        }, 100);

    }
});


/**
 * person => 信息
 * 
 */
$(function() {
    $(".active > #myPerson").animate({
            height: (function() {
                var str = $(".active > #myPerson").children().length * 29 + 12 + "px";
                return str;
            })()
        },
        300
    );
    $("#myPerson>li").mouseover(function() {
        $(this).addClass("hover");
    });
    $("#myPerson>li").mouseout(function() {
        $(this).removeClass("hover");
    });
    try {
        // 第一个时间插件
        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker1').datetimepicker({
            value: '2015/04/15 05:03',
            step: 10
        });
        // 第二个时间插件
        $('#datetimepicker2').datetimepicker();
        $('#datetimepicker2').datetimepicker({
            value: '2015/04/15 05:03',
            step: 10
        });
    } catch (error) {}
});

/**
 * person =>myMessage.js
 */
/**
 * Created by gys on 2018/1/27.
 */
$(function() {

    // 创建消息对象
    function msgObj(recipients, theme, conten, createDate) {
        this.recipients = recipients; // 收件人
        this.theme = theme; // 主题
        this.conten = conten; // 内容
        this.createDate = createDate; // 创建时间
        this.toString = function() {
            console.log("收件人:" + this.recipients + ",主题:" + this.theme +
                ",内容:" + conten + ",创建时间:" + createDate);
        }
    }

    // 存放我的消息对象
    var myMsgArray = new Array();
    // 存放发送消息对象
    var sendArray = new Array();
    // 存放草稿消息对象
    var cgArray = new Array();


    // 我的消息 --> 初始化数据(添加数据)
    var initDate = {
        // 动态添加数据
        myMsgDate: function() {
            //选项卡1中的tbody下的HTML片段
            var $myMsg = $("#my-msg tbody");
            // 循环插入HTML判断，并将数据插入我的消息数组，保持数据
            for (var i = 0; i < 5; i++) {

                var srecipients = "张三" + i;
                var stheme = "园区管理" + i
                var sconten = "恭喜你！你已成为园区管理" + i;
                var createDate = new Date().Format("yyyy-MM-dd");
                myMsgArray.push(new msgObj(srecipients, stheme, sconten, createDate));

                // 选项卡1中的tbody下的HTML片段
                var htmlDate = '<tr><td><input type="checkbox"></td><td>' + srecipients +
                    '</td><td>' + stheme +
                    '</td><td>' + createDate +
                    '</td><td><button type="button" class="btn btn-primary btn-sm examine msg-find"><i class="glyphicon glyphicon-search">' +
                    '</i> 查看</button>&nbsp;<button type="button" class="btn btn-danger btn-sm msg-delete-one"  >' +
                    '<i class="fa fa-remove"></i> 删除 </button></td></tr>';
                $myMsg.append(htmlDate);
            }
        }
    }
    initDate.myMsgDate();


    // 所有查看弹窗中的元素
    var $msgDetails = $("#mymsg-details");
    $msgDetails.hide();


    // 我的消息 --> 查看按钮
    $("#my-msg .msg-find").on('click', function() {
        var $msgTr = $(this).parents("tr");
        var $msgTbody = $msgTr.parent();
        var start = $msgTbody.children().index($msgTr);
        var myMsgObj = myMsgArray[start];
        //循环替换span下的HTML
        $msgDetails.find("span").each(function(index) {
            switch (index) {
                case 0: // 发件人
                    $(this).html(myMsgObj.recipients);
                    break;
                case 1: // 主题
                    $(this).html(myMsgObj.theme);
                    break;
                case 2: // 内容
                    $(this).html(myMsgObj.conten);
                    break;
                case 3: // 创建时间
                    $(this).html(myMsgObj.createDate);
                    break;
            }
        });
        layer.open({
            title: "详情",
            type: 1,
            area: ['500px', '300px'],
            content: $msgDetails
        });
    })


    // 我的消息 --> 删除单个按钮
    $('.msg-delete-one').on('click', function() {
        var $msgTr = $(this).parents("tr");
        var $msgTbody = $msgTr.parent();
        var start = $msgTbody.children().index($msgTr);
        layer.alert('确认删除该记录吗？', {
            icon: 2,
            title: '删除确认',
            closeBtn: 1
        }, function(index) {
            myMsgArray.splice(start, 1);
            $msgTr.remove();
            /*删除成功提示*/
            layer.close(index);
            layer.msg('删除成功', { time: 1000, icon: 1 });
            return false;
        });
    });


    // 我的消息 --> 所有复选框
    var $mymsgCheck = $("#my-msg input[type='checkbox']");
    // 给所有复选框添加事件
    $mymsgCheck.on('click', function() {
        var $this = $(this);
        // 如果单机的是第一个复选框，则执行全选和反选
        if ($this.attr("name") == "all-checkbox") {
            $mymsgCheck.prop('checked', this.checked);
        } else { // 非第一个复选框
            //$("#my-msg input[name='all-checkbox']")
            var $firstCheck = $mymsgCheck.filter("[name='all-checkbox']");
            var allSize = $mymsgCheck.size(); // 所有的复选框
            // $("#my-msg input[type='checkbox']:checked")
            var checkedSize = $mymsgCheck.filter(":checked").size(); // 所有选中的复选框
            if (!$firstCheck[0].checked && (allSize - 1) == checkedSize) {
                $firstCheck.prop('checked', true);
            } else {
                $firstCheck.prop('checked', false);
            }
        }
    });


    //我的消息 --> 批量删除按钮
    $('#msg-delete-many').on('click', function() {
        // 所有选中的记录
        var $allChecked = $mymsgCheck.filter(":checked");
        if ($allChecked.size() < 1) {
            layer.msg('至少选中一条记录', { time: 1000, icon: 3 });
            return;
        }
        // 弹出删除确认框
        layer.alert('确认删除选中的记录吗？', {
            icon: 2,
            title: '删除确认',
            closeBtn: 1
        }, function(index) {
            // 循环执行删除
            $allChecked.each(function() {
                var $this = $(this);
                if ($this.attr("name") == "all-checkbox") {
                    $this.prop('checked', false);
                    return true;
                }
                var $msgTr = $(this).parents("tr");
                var $msgTbody = $msgTr.parent();
                var start = $msgTbody.children().index($msgTr);
                $msgTr.remove();
                myMsgArray.splice(start, 1);
            });
            // 关闭弹窗
            layer.close(index);
            layer.msg('删除成功', { time: 1000, icon: 1 });
            return false;
        });
    })


    //隐藏新增弹出窗的内容
    $("#sent-msg-addbox").hide();
    // 已发消息 --> 写消息事件
    $('#sent-msg-add').on('click', function() {
        var $msgForm = $("#sent-msg-addbox"); //新增弹出框
        var $srecipients = $msgForm.find("input[name=s-recipients]"); //收件人
        var $stheme = $msgForm.find("input[name=s-theme]"); //主题
        var $sconten = $msgForm.find("textarea[name=s-conten]"); //内容

        // 将添加的form表单中的值置空
        $srecipients.val("");
        $stheme.val("");
        $sconten.val("");

        layer.open({
            title: "新增",
            type: 1,
            area: ['500px', '300px'],
            btn: ['发送', '存为草稿', '关闭'],
            content: $msgForm,
            btn1: function(index, layero) {
                // 获取输入框的值
                var srecipients = $srecipients.val();
                var stheme = $stheme.val();
                var sconten = $sconten.val();
                var createDate = new Date().Format("yyyy-MM-dd");

                if (srecipients == "" || stheme == "" || sconten == "") {
                    layer.msg('表单数据不能为空', { time: 1000, icon: 0 });
                    return false;
                }

                // 向存放发送数组中添加消息对象
                sendArray.push(new msgObj(srecipients, stheme, sconten, createDate));

                // 将获取的值拼接到HTML中
                var htmlDate = '<tr><td><input type="checkbox"></td><td>' + srecipients +
                    '</td><td>' + stheme +
                    '</td><td>' + createDate +
                    '</td><td><button type="button" class="btn btn-primary btn-sm send-detail"><i class="glyphicon glyphicon-search">' +
                    '</i> 查看</button>&nbsp;<button type="button" class="btn btn-danger btn-sm send-delete-one"  >' +
                    '<i class="fa fa-remove "></i> 删除 </button></td></tr>';

                var $msgTbody = $("#sent-msg tbody");

                // 移除 “删除按钮” 单机事件
                $msgTbody.off("click", ".send-delete-one");
                // 添加 “删除按钮” 单机事件
                $msgTbody.on('click', '.send-delete-one', function() {
                    sendMsgDel($(this));
                });

                // 移除 “查看按钮” 单机事件
                $msgTbody.off("click", ".send-detail");
                // 添加 “查看按钮” 单机事件
                $msgTbody.on('click', '.send-detail', function() {
                    sendMsgDetail($(this));
                });

                var $sendmsg = $("#sent-msg");
                // 移除 “复选框” 单机事件
                $sendmsg.off("click", "input[type='checkbox']");
                // 添加 “复选框” 单机事件
                $sendmsg.on("click", "input[type='checkbox']", function() {
                    sendCheckbox($("#sent-msg input[type='checkbox']"), $(this));
                });

                $msgTbody.append(htmlDate); //选项卡2中的tbody下的HTML片段
                layer.close(index);
                layer.msg('发送成功');
                return false;
            },
            btn2: function(index, layero) {

                // 获取输入框的值
                var srecipients = $srecipients.val();
                var stheme = $stheme.val();
                var sconten = $sconten.val();
                var createDate = new Date().Format("yyyy-MM-dd");

                if (srecipients == "" || stheme == "" || sconten == "") {
                    layer.msg('表单数据不能为空', { time: 1000, icon: 0 });
                    return false;
                }

                // 向存放草稿数组中添加消息对象
                cgArray.push(new msgObj(srecipients, stheme, sconten, createDate));

                // 将获取的值拼接到HTML中
                var htmlDate = '<tr><td><input type="checkbox"></td><td>' + srecipients +
                    '</td><td>' + stheme +
                    '</td><td>' + createDate +
                    '</td><td><button type="button" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-search">' +
                    '</i> 查看</button>&nbsp;<button class="btn btn-success btn-sm " data-toggle="modal" data-target="#myModal">' +
                    '<i class="fa fa-pencil-square"></i> 编辑 </button>&nbsp;<button type="button" class="btn btn-danger btn-sm drafts-delete-one"  >' +
                    '<i class="fa fa-remove "></i> 删除 </button></td></tr>';

                var $draftsTbody = $("#drafts tbody");
                $draftsTbody.off("click", ".drafts-delete-one");
                $draftsTbody.on('click', '.drafts-delete-one', function() {
                    var $node = $(this).parents("tr");
                    layer.alert('确认删除该记录吗？', {
                        icon: 2,
                        title: '删除确认',
                        closeBtn: 1
                    }, function(index) {
                        var start = $draftsTbody.children().index($node);
                        cgArray.splice(start, 1);
                        $node.remove();
                        layer.close(index);
                        layer.msg('删除成功', { time: 1000, icon: 1 });
                        return false;
                    });
                });

                $draftsTbody.append(htmlDate); //选项卡3中的tbody下的HTML片段
                layer.close(index);
                layer.msg('存为草稿成功')
                return false;
            },
            btn3: function(index) {
                layer.close(index);
            }
        });
    });


    /**
     * 已发消息 --> 删除
     * @param $this 单机的元素
     */
    function sendMsgDel($this) {
        var $msgTbody = $("#sent-msg tbody");
        var $node = $this.parents("tr");
        layer.alert('确认删除该记录吗？', {
            icon: 2,
            title: '删除确认',
            closeBtn: 1
        }, function(index) {
            var start = $msgTbody.children().index($node);
            sendArray.splice(start, 1);
            $node.remove();
            layer.close(index);
            layer.msg('删除成功', { time: 1000, icon: 1 });
            return false;
        });
    }


    /**
     * 已发消息 --> 查看
     * @param $this 单机的元素
     */
    function sendMsgDetail($this) {
        var $msgTr = $this.parents("tr");
        var $msgTbody = $msgTr.parent();
        var start = $msgTbody.children().index($msgTr);
        var sendMsgObj = sendArray[start];
        //循环替换span下的HTML
        $msgDetails.find("span").each(function(index) {
            switch (index) {
                case 0: // 发件人
                    $(this).html(sendMsgObj.recipients);
                    break;
                case 1: // 主题
                    $(this).html(sendMsgObj.theme);
                    break;
                case 2: // 内容
                    $(this).html(sendMsgObj.conten);
                    break;
                case 3: // 创建时间
                    $(this).html(sendMsgObj.createDate);
                    break;
            }
        });
        layer.open({
            title: "详情",
            type: 1,
            area: ['500px', '300px'],
            content: $msgDetails
        });
    }


    /**
     * 已发消息 --> 所有复选框
     * @param $sendCheck 所有复元素
     * @param $this 单机的元素
     */
    function sendCheckbox($sendCheck, $this) {
        // 如果单机的是第一个复选框，则执行全选和反选
        if ($this.attr("name") == "all-checkbox") {
            $sendCheck.prop('checked', $this[0].checked);
        } else { // 非第一个复选框
            var $firstCheck = $sendCheck.filter("[name='all-checkbox']");
            var allSize = $sendCheck.size(); // 所有的复选框
            var checkedSize = $sendCheck.filter(":checked").size(); // 所有选中的复选框
            if (!$firstCheck[0].checked && (allSize - 1) == checkedSize) {
                $firstCheck.prop('checked', true);
            } else {
                $firstCheck.prop('checked', false);
            }
        }
    }


    /**
     * 已发消息 --> 批量删除按钮
     */
    $('#send-delete-many').on('click', function() {
        // 所有选中的记录
        var $allChecked = $("#sent-msg input[type='checkbox']").filter(":checked");
        if ($allChecked.size() < 1) {
            layer.msg('至少选中一条记录', { time: 1000, icon: 3 });
            return;
        }
        // 弹出删除确认框
        layer.alert('确认删除选中的记录吗？', {
            icon: 2,
            title: '删除确认',
            closeBtn: 1
        }, function(index) {
            // 循环执行删除
            $allChecked.each(function() {
                var $this = $(this);
                if ($this.attr("name") == "all-checkbox") {
                    $this.prop('checked', false);
                    return true;
                }
                var $msgTr = $(this).parents("tr");
                var $msgTbody = $msgTr.parent();
                var start = $msgTbody.children().index($msgTr);
                $msgTr.remove();
                sendArray.splice(start, 1);
            });
            // 关闭弹窗
            layer.close(index);
            layer.msg('删除成功', { time: 1000, icon: 1 });
            return false;
        });
    })

});

// 为Date添加Format方法
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * check.html
 * 
 */
$(function() {

    //添加
    $("#ck_add").click(function() {
        var xm = $("#ck_inputxm").val();
        var bj = $("#ck_inputbj").val();
        var rq = $("#ck_inputrq").val();
        var ts = $("#ck_inputts").val();
        var sy = $("#ck_inputsy").val();
        var bz = $("#ck_inputbz").val();
        var mytime = new Date();
        var year = mytime.getFullYear();
        var month = mytime.getMonth() + 1;
        var date = mytime.getDate();
        var hours = mytime.getHours();
        var minutes = mytime.getMinutes();
        var suijitime = parseInt(Math.random() * 10) + hours;
        var xmy = /^[\u4e00-\u9fa5]+$/;
        var bjy = /^[大中小]+班$/;
        $(this).attr("data-dismiss", " ");
        if (xm != '' && bj != '') {
            if (xmy.test(xm)) {
                if (bjy.test(bj)) {
                    $("#ck_tbody").append("<tr>\n" +
                        "<td><input type=\"checkbox\" name=\"ck_tbody_item\"></td>\n" +
                        "                                <td>" + xm + "</td>\n" +
                        "                                <td>" + bj + "</td>\n" +
                        "                                <td>" + rq + "</td>\n" +
                        "                                <td>" + ts + "</td>\n" +
                        "                                <td>" + sy + "</td>\n" +
                        "                                <td>" + bz + "</td>\n" +
                        "                                <td>" + year + '.' + month + '.' + date + ' ' + hours + ':' + minutes + "</td>\n" +
                        "                                <td>" + year + '.' + month + '.' + date + ' ' + suijitime + ':' + minutes + "</td>\n" +
                        "                                <td>\n" +
                        "                                    <div class=\"ck_table_pencil\">\n" +
                        "                                        <button href=\"#\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#myModaledit\">\n" +
                        "                                            <i class=\"fa fa-pencil-square\"></i> 编辑\n" +
                        "                                        </button>\n" +
                        "                                        <button href=\"#\" class=\"btn btn-danger\">\n" +
                        "                                            <i class=\"fa fa-remove\"></i> 删除\n" +
                        "                                        </button>\n" +
                        "                                        <button href=\"#\" class=\"btn btn-info\">\n" +
                        "                                            <span class=\"glyphicon glyphicon-envelope\"></span>" +
                        "                                        </button>\n" +
                        "                                    </div>\n" +
                        "                                </td>\n" +
                        "                            </tr>");

                    $(".modal-body input").each(function() {
                        this.value = '';
                    });

                    $(this).attr("data-dismiss", "modal");
                } else {
                    $(".modal-body>form>div:nth-of-type(2)").append("<p class=\"ck_errorshow\"><i class=\"fa fa-times-circle-o\"></i> 格式错误</p>");
                }
            } else {
                $(".modal-body>form>div:nth-of-type(1)").append("<p class=\"ck_errorshow\"><i class=\"fa fa-times-circle-o\"></i> 格式错误</p>");
            }
        } else {
            $(".modal-body>form>div:nth-of-type(1)").append("<p class=\"ck_errorshow\"><i class=\"fa fa-times-circle-o\"></i> 格式错误</p>");
        }

        setTimeout(function() {
            $(".ck_errorshow").remove();
        }, 3000);

        $(".ck_table_pencil .btn-danger").on("click", function() {
            $(this).parent().parent().parent().remove();
        });
        ck_editgit();
    });

    //删除
    $(".ck_table_pencil .btn-danger").on("click", function() {
        var self = this;
        layer.open({
            title: '删除',
            content: '确定删除吗?',
            icon: 2,
            area: ['260px', '170px'],
            btn: ['确认'],
            shadeClose: true,
            yes: function(index, layero) {
                $(self).parent().parent().parent().remove();
                layer.close(index);
                layer.msg('删除成功', { time: 1000, icon: 1 });
            }
        });
    });
    $('#ck_checkall').click(function() {
        $('[name=ck_tbody_item]:checkbox').prop('checked', this.checked);
    });
    $('#ck_delete').click(function() {
        if ($('[name=ck_tbody_item]:checkbox:checked').length > 0) {
            layer.open({
                title: '确认删除',
                content: '确定删除吗?',
                icon: 2,
                area: ['260px', '170px'],
                btn: ['确认'],
                shadeClose: true,
                yes: function(index, layero) {
                    $('[name=ck_tbody_item]:checkbox:checked').each(function() {
                        $(this).parent().parent().remove();
                    });
                    $('#ck_checkall').attr('checked', false);
                    layer.close(index);
                    layer.msg('删除成功', {
                        time: 1000,
                        icon: 1
                    });
                }
            });
        } else {
            layer.open({
                title: '确认删除',
                content: '请选择删除内容',
                icon: 7,
                shadeClose: true
            });
        }
    });
    $('[name=ck_tbody_item]:checkbox').each(function() {
        $(this).click(function() {
            if ($('[name=ck_tbody_item]:checkbox:checked').length == $('[name=ck_tbody_item]:checkbox').length) {
                $('#ck_checkall').prop('checked', true);
            } else {
                $('#ck_checkall').prop('checked', false);
            }
        })
    });

    //编辑
    var that = null;

    function ck_editgit() {
        $(".ck_table_pencil .btn-success").click(function() {
            that = $(this).parents('tr');
            that.find('td').each(function(i, ele) {
                if (i >= 0 && i < 7) {
                    $('#myModaledit input').eq(i - 1).val($(ele).text());
                }
            })
        });
        $('#ck_edit').click(function() {
            $('#myModaledit input').each(function(i, ele) {
                that.find('td').eq(i + 1).text($(ele).val());
            });
            $(this).attr("data-dismiss", "modal");
        })
    }

    ck_editgit();

    //查询
    $('#ck_search').click(function() {
        var sstext = $('#ck_sstext').val();
        var ck_zui = $('table tbody tr').hide().filter(":contains('" + sstext + "')").show();
        if (ck_zui.length == 0) {
            layer.msg('没有匹配的搜索结果,请重新输入搜索关键字');
        }
        $('.ck_downsec').val('所有班级');
    });
    setInterval(ck_cuqk, 500);

    function ck_cuqk() {
        if ($('#ck_sstext').val() == '' && $('.ck_downsec').val() == '所有班级') {
            $('table tbody tr').show();
        }
    }

    $('.ck_downsec').change(function() {
        if ($(this).val() == '所有班级') {
            $('table tbody tr').show();
        }
        if ($(this).val() == '小班') {
            $('table tbody tr').hide().filter(":contains('小班')").show();
        }
        if ($(this).val() == '中班') {
            $('table tbody tr').hide().filter(":contains('中班')").show();
        }
        if ($(this).val() == '大班') {
            $('table tbody tr').hide().filter(":contains('大班')").show();
        }
    })

    //推送邮件
    $(".ck_table_pencil .btn-info").click(function() {
        layer.open({
            title: '推送邮件',
            content: '确定发送考勤信息给家长?',
            icon: 6,
            area: ['260px', '170px'],
            btn: ['确认'],
            shadeClose: true,
            yes: function(index, layero) {
                layer.msg('发送成功', { time: 1000, icon: 1 });
                layer.close(index);
            }
        });
    })
});


// 为Date添加Format方法
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}