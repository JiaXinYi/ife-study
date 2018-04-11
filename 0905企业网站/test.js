//写一个类Human，包含hello方法，需要new来创建
//写一个类child，继承Human
var Human = new function(){this.name="human";this.hello=function(){alert("hello");}}
//undefined
function child(){this.name=child;}
//undefined
child.prototype
//Object {}
child.prototype=Human;
//Object {name: "human"}hello: ()name: "human"__proto__: Object
var ch =new child();
//undefined
ch.hello
//function(){alert("hello");}

//不使用new
function Human(){this.name="human";this.hello=function(){alert("hello");}}
//undefined
function child(){this.name=child;}
//undefined
child.prototype=new Human();//传参问题
child.prototype=Object.create(Person.prototype);
//Human {name: "human"}hello: ()name: "human"__proto__: Object
var ch =new child();
//undefined
ch.hello
//function(){alert("hello");}