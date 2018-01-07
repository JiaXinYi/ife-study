var total = add(1,2);
function sum(a,b){
	return a+b;
}
function add(a,b){
	sum(a,b);
}
function Adaptee() {
    this.name = 'Adaptee';
}
Adaptee.prototype.getName = function() {
    return this.name;
}
function Target() {
    this.name = 'Target';
}
Target.prototype.queryName= function() {
    return this.name;
}
function Adapte() {
    this.name = '';
}
Adapte.prototype = new Adaptee();
Adapte.prototype.queryName = function() {
    this.getName();
}
var local = new Target();
local.queryName(); //调用普通实现类
var adapte = new Adapte();
adapte.queryName(); //调用旧的系统或第三方应用接口;
