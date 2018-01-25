// 1
var p = new Promise(function(resolve,reject){
	console.log("生成一个promise");
	resolve("成功");
});
console.log("已生成了一个promise");
p.then(function(value){
	console.log(value);
})
console.log("Promise对象表示未来某个将要发生的事件,new Promise()中的参数，如果是函数的话，会立即执行")

// 2
var p1 = new Promise(function(resolve,reject){
	resolve(1);
});
var p2 = new Promise(function(resolve,reject){
	setTimeout(function(){
		resolve(2);
	},500);
})
var p3 = new Promise(function(resolve,reject){
	setTimeout(function(){
		reject(3);
	},500);
})
console.log("Promise中有三种状态：pending,resolved,rejected。当Promise刚创建时，是pending状态，当函数参数执行了resolve/reject后，由pending转变为resolve/reject");
console.log("p1中参数执行，所以为resolve")
console.log(p1);
console.log("p2,p3因为延时0.5s了所以都是pending");
console.log(p2);
console.log(p3);

console.log("p2,p3延时1s，所以都是resolve&reject")
setTimeout(function(){
	console.log(p2);
},1000);
setTimeout(function(){
	console.log(p3);
}, 1000);

console.log("p1,p2,p3的值");
p1.then(function(value){
	console.log(value);
})

p2.then(function(value){
	console.log(value);
})
p2.then(function(err){
	console.log(err);
})
