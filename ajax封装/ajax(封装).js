/**
 * ajax参数：
 * ajax({
 * method:post,get,
 * url,
 * param:参数，
 * callback:回调函数
 * })
 * 
 */
var test = (function () {       //函数自执行    test存放返回的值，作为全局变量
    // ajax封装    
    function Fnajax(obj) {
        var xmlHttp;
        if (window.XMLHttpRequest) { //兼容DOM
            xmlHttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { //兼容IE
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log(xmlHttp.responseText);
                obj.callback(xmlHttp);
            }
        }
    }

    // ajax创建兼容封装
    function getXlmHttp(obj) {
        var xmlHttp;
        if (window.XMLHttpRequest) { //兼容DOM
            xmlHttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { //兼容IE
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlHttp;

    }

    // ajax get封装
    function getAjax(obj) {
        var xmlHttp = getXlmHttp();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log(xmlHttp.responseText);
                obj.callback(xmlHttp);
            }
        }
        // var obj = { "username": '张三', "password": "123" }
        // 取对象的值有两种方式，1、"."" 2、"[]"
        // 运算符要求是标识符，不能使变量，
        var str;
        for (key in obj.param) {
            str = "key" + "=" + obj.param[key] + "&";
        }
        if (str.length > 0) {
            str.url = obj.url + "?" + str;
        }
        xmlHttp.open(obj.method, obj.url)
        xmlHttp.send(null)
    }

    // ajax post封装
    // var obj = { "username": '张三', "password": "123" }
    function postAjax(obj) {
        var xmlHttp = getXlmHttp();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log(xmlHttp.responseText);
                obj.callback(xmlHttp);
            }
        }
        var str;
        for (key in obj.param) {
            str = "key" + "=" + obj.param[key] + "&";
        }
        if (str.length > 0) {
            str.url = obj.url + "?" + str;
        }
        xmlHttp.open(obj.method, obj.url);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(str);
    }

    // 调用请求方式封装
    function ajax(obj) {
        if (obj.method = "post") {
            postAjax(obj);
        }
        else if (obj.method = "get") {
            getAjax(obj)
        }
    }

    // ajax Json封装
    function getJson(obj) {
        obj.callback = function (xmlHttp) {
            var obj = JSON.parse(xmlHttp.responseText);
            obj.callback(obj);
        }
        getAjax(obj);
    }
    return { "getAjax": getAjax, "postAjax": postAjax, "getJson": getJson, "ajax": ajax }    //返回值
})();

test.getAjax() //调用封装的函数




