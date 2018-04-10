function test1(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
}

function test2(name,age,sex){
    // this 指test2产生的实例对象
    test1.call(this,name,age,sex)//call 继承原型对象的属性

    test1.apply(this,arguments)//apply 继承原型对象的属性
    this.height=function(){

    }
}

var t1 = new test1();
var t2 = new test2();
console.log(t1)
console.log(t2)


var t3=new test1();
var t4=new test2();

for(var i in t3){
    // console.log(t3[i]);
    t4[i] = t3[i];
}
console.log(t3)
console.log(t4)

