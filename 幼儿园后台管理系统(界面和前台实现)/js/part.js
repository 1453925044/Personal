$(document).ready(function () {
    //            部门增加事件
    var nawde = null;
    var d1str, d2str, d3str, d4str, d5str, d6str;
    $(".dapartmentSavBtn").click(function () {
        d1str = $(".d1").val();
        d2str = $(".d2").val();
        d3str = $(".d3").val();
        d4str = $(".d4").val();
        d5str = $(".d5").val();
        d6str = $(".d6").val();
        $(".Department_table").append("<tr> <td> <input name='smallCk'type='checkbox'/> </td> " +
            "<td>" + d1str + "</td> <td>" + d2str + "</td> <td>" + d3str + "</td> " +
            "<td>" + d4str + "</td> <td>" + d5str + "</td> <td>" + d6str + "</td> <td> " +
            "<button type='button' data-toggle='modal' data-target='#editDepartment' class='btn btn-success editDepar'>" +
            "<i class='fa fa-pencil-square'></i>" +
            "&nbsp; 编辑</button> <button type='button' class='btn btn-danger'>" +
            "<i class='fa fa-remove'></i> 删除</button> </td> </tr>");
        $('.main-1 .btn-danger').click(function () {
            var self = this;
            layer.open({
                title: '删除',
                content: '确定删除吗?',
                icon: 2,
                area: ['260px', '170px'],
                btn: ['确认'],
                shadeClose: true,
                yes: function (index, layero) {
                    $(self).parents("tr").remove();
                    layer.msg('删除成功', {
                        time: 1000,
                        icon: 1
                    });
                    layer.close(index);
                }
            });
        });
        $(".editDepar").click(function () {
            nawde = $(this).parents("tr");
            var d1td = $(this).parents("tr").children().first().next().text();
            $(".d1").val(d1td)
            var d2td = $(this).parents("tr").children("td:nth-of-type(3)").first().text();
            $(".d2").val(d2td);
            var d3td = $(this).parents("tr").children("td:nth-of-type(4)").text();
            $(".d3").val(d3td);
            var d4td = $(this).parents("tr").children("td:nth-of-type(5)").text();
            $(".d4").val(d4td);
            var d5td = $(this).parents("tr").children("td:nth-of-type(6)").text();
            $(".d5").val(d5td);
            var d6td = $(this).parents("tr").children("td:nth-of-type(7)").text();
            $(".d6").val(d6td);
            $(this).attr("data-dismiss", "modal");
        })
        $(".dapartmentEdit").click(function () {
            nawde.find('td').eq(1).text($("#inputEmailn").val());
            console.log($("#inputEmailn").val());
            nawde.find('td').eq(2).text($("#inputEmailv").val());
            nawde.find('td').eq(3).text($("#inputEmailp").val());
            nawde.find('td').eq(4).text($("#inputEmailu").val());
            nawde.find('td').eq(5).text($("#inputEmaily").val());
            nawde.find('td').eq(6).text($("#inputEmailt").val());
            $(this).attr("data-dismiss", "modal");
        })
        $(this).attr("data-dismiss", "modal");
        $(".editDepar").click(function () {
            nawde = $(this).parents("tr");
            var d1td = $(this).parents("tr").children().first().next().text();
            $(".d1").val(d1td)
            var d2td = $(this).parents("tr").children("td:nth-of-type(3)").first().text();
            $(".d2").val(d2td);
            var d3td = $(this).parents("tr").children("td:nth-of-type(4)").text();
            $(".d3").val(d3td);
            var d4td = $(this).parents("tr").children("td:nth-of-type(5)").text();
            $(".d4").val(d4td);
            var d5td = $(this).parents("tr").children("td:nth-of-type(6)").text();
            $(".d5").val(d5td);
            var d6td = $(this).parents("tr").children("td:nth-of-type(7)").text();
            $(".d6").val(d6td);
            $(this).attr("data-dismiss", "modal");
        })
        //            部门管理保存并更改点击事件
        $(".dapartmentEdit").click(function () {
            nawde.find('td').eq(1).text($("#inputEmailn").val());
            console.log($("#inputEmailn").val());
            nawde.find('td').eq(2).text($("#inputEmailv").val());
            nawde.find('td').eq(3).text($("#inputEmailp").val());
            nawde.find('td').eq(4).text($("#inputEmailu").val());
            nawde.find('td').eq(5).text($("#inputEmaily").val());
            nawde.find('td').eq(6).text($("#inputEmailt").val());
            $(this).attr("data-dismiss", "modal");
        })
        $("#qxBtn").click(function () {
            $("[name=smallCk]:checkbox").prop("checked", this.checked);
        })
        $("[name=smallCk]:checkbox").each(function () {
            $(this).click(function () {
                if ($("[name=smallCk]:checkbox:checked").length == $("[name=smallCk]:checkbox").length) {
                    $("#qxBtn").prop("checked", true);
                } else {
                    $("#qxBtn").prop("checked", false);
                }
            })
        })
    })
    
    //            部门更改编辑事件点击
    $(".editDepar").click(function () {
        nawde = $(this).parents("tr");
        var d1td = $(this).parents("tr").children().first().next().text();
        $(".d1").val(d1td)
        var d2td = $(this).parents("tr").children("td:nth-of-type(3)").first().text();
        $(".d2").val(d2td);
        var d3td = $(this).parents("tr").children("td:nth-of-type(4)").text();
        $(".d3").val(d3td);
        var d4td = $(this).parents("tr").children("td:nth-of-type(5)").text();
        $(".d4").val(d4td);
        var d5td = $(this).parents("tr").children("td:nth-of-type(6)").text();
        $(".d5").val(d5td);
        var d6td = $(this).parents("tr").children("td:nth-of-type(7)").text();
        $(".d6").val(d6td);
        $(this).attr("data-dismiss", "modal");
    })
    //            部门管理保存并更改点击事件
    $(".dapartmentEdit").click(function () {
        nawde.find('td').eq(1).text($("#inputEmailn").val());
        console.log($("#inputEmailn").val());
        nawde.find('td').eq(2).text($("#inputEmailv").val());
        nawde.find('td').eq(3).text($("#inputEmailp").val());
        nawde.find('td').eq(4).text($("#inputEmailu").val());
        nawde.find('td').eq(5).text($("#inputEmaily").val());
        nawde.find('td').eq(6).text($("#inputEmailt").val());
        $(this).attr("data-dismiss", "modal");
    })
    //        全选点击事件
    $("#qxBtn").click(function () {
        $("[name=smallCk]:checkbox").prop("checked", this.checked);
    });
    //            批量删除
    $(".deparDelete").click(function () {
        if ($("[name=smallCk]:checkbox:checked").length == 0) {
            layer.open({
                btn: ['确认'],
                icon:7,
                title: '删除确认',
                content:'请选择你需要删除的内容',
                shadeClose: true
            });
        } else {
            layer.confirm('确认要删除吗？', {
                btn: ['确定']
            }, function (index) {
                layer.close(index);
                $("#qxBtn").prop("checked", false);
                $("[name=smallCk]:checkbox:checked").each(function () {
                    $(this).parents('tr').remove();
                });
                layer.msg('删除成功',{time:1000,icon:1});
            });
        }

    });
    $("[name=smallCk]:checkbox").each(function () {
        $(this).click(function () {
            if ($("[name=smallCk]:checkbox:checked").length == $("[name=smallCk]:checkbox").length) {
                $("#qxBtn").prop("checked", true);
            } else {
                $("#qxBtn").prop("checked", false);
            }
        })
    })
    //            搜索，查找
    $(".searhDepart").click(function () {
        var inputStr = $(".inputDepart").val()
        $(".Department_table>tbody>tr").each(function (index, ele) {
            if (index >= 2) {
                $(this).hide().filter(":contains(" + inputStr + ")").show();
            }
        });
    })
    setInterval(function () {
        if ($(".inputDepart").val() == "") {
            $(".Department_table>tbody>tr").show();
            //                console.log(111);
        }
    }, 500);
    $('.main-1 .btn-danger').click(function () {
        var self = this;
        layer.open({
            title: '删除',
            content: '确定删除吗?',
            icon: 2,
            area: ['260px', '170px'],
            btn: ['确认'],
            shadeClose: true,
            yes: function (index, layero) {
                $(self).parents("tr").remove();
                layer.msg('删除成功', {
                    time: 1000,
                    icon: 1
                });
                layer.close(index);
            }
        });
    });
});
//职位管理js
$(document).ready(function () {
    //        职位添加
    var that = null;
    $(".save-new").click(function () {
        var postionstr = $(".position-name").val();
        var describstr = $(".postion-describ").val();
        $(".position-table").append("<tr><td></td><td>" + postionstr + "</td><td>" + describstr + "</td>" +
            "<td><button data-toggle='modal' data-target='#position-change' type='button' class='btn btn-success edit-btn'><i class='fa fa-pencil-square'>" +
            "</i>&nbsp; 编辑</button> <button type='button' class='btn btn-danger' onclick='postionDetele(this)'>" +
            "<i class='fa fa-remove'></i> 删除</button></td> </tr>");
        $(".edit-btn").click(function () {
            that = $(this).parents("tr");
            var editFirsttd = $(this).parents("tr").children().first().text();
            $(".position-name").val(editFirsttd)
            //            console.log($(".position-name").val(editFirsttd))
            var editSeconsttd = $(this).parents("tr").children().first().next().text();
            $(".postion-describ").val(editSeconsttd);
        });
        $(".save-change").click(function () {
            that.find('td').eq(1).text($("#inputEmail3-3").val());
            that.find('td').eq(2).text($("#inputEmail4-4").val());
        })
        $(this).attr("data-dismiss", "modal");
    });
    //        编辑事件点击
    $(".edit-btn").click(function () {
        that = $(this).parents("tr");
        var editFirsttd = $(this).parents("tr").children().first().next().text();
        $(".position-name").val(editFirsttd)
        var editSeconsttd = $(this).parents("tr").children(":nth-of-type(3)").text();
        $(".postion-describ").val(editSeconsttd);
    });
    //        保存并更改点击事件
    $(".save-change").click(function () {
        that.find('td').eq(1).text($("#inputEmail3-3").val());
        that.find('td').eq(2).text($("#inputEmail4-4").val());
        $(this).attr("data-dismiss", "modal");
    })
    window.postionDetele = function (obj) {
        $(obj).parents("tr").remove();
    }
});

