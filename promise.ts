// https://segmentfault.com/a/1190000010345031
// 1、立即执行性
var p = new Promise(function (resolve, reject) {
	console.log("生成一个promise");
	resolve("成功");
});
console.log("已生成了一个promise");
p.then(function (value) {
	console.log(value);
})
console.log("Promise对象表示未来某个将要发生的事件,new Promise()中的参数，如果是函数的话，会立即执行")

// 2、三种状态
var p1 = new Promise(function (resolve, reject) {
	resolve(1);
});
var p2 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve(2);
	}, 500);
})
var p3 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		reject(3);
	}, 500);
})
console.log("Promise中有三种状态：pending,resolved,rejected。当Promise刚创建时，是pending状态，当函数参数执行了resolve/reject后，由pending转变为resolve/reject");
console.log("p1中参数执行，所以为resolve")
console.log(p1);
console.log("p2,p3因为延时0.5s了所以都是pending");
console.log(p2);
console.log(p3);

console.log("p2,p3延时1s，所以都是resolve&reject")
setTimeout(function () {
	console.log(p2);
}, 1000);
setTimeout(function () {
	console.log(p3);
}, 1000);

console.log("p1,p2,p3的值");
p1.then(function (value) {
	console.log(value);
})

p2.then(function (value) {
	console.log(value);
})
p3.then(function (err) {
	console.log(err);
})

// 3、不可逆性
var p4 = new Promise(function (resolve, reject) {
	resolve("success1");
	resolve("success2");//无效
});

var p5 = new Promise(function (resolve, reject) {
	resolve("success");
	reject("reject");//无效
});

p4.then(function (value) {
	console.log(value);
});

p5.then(function (value) {
	console.log(value);
});
console.log("Promise的状态一旦改变成resolve或者rejected，其状态和值就固定下来了，后续无论怎样都不能改变。")

// 4、链式调用
// 如果用Promise对象的then方法返回一个新的Promise对象，就可以通过链式调用.then方法
// then()接收两个函数作为参数，第一个参数是Promise执行成功的回调，第二个参数是Promise执行失败的回调
// 两个函数只会有一个被调用，函数返回值将被用作创建then返回的Promise对象
// 返回值可以为
// 1.return 返回的Promise对象的值——该Promise对象为resolved状态，值为一个同步的值或者undefined(没有返回值)
// 2.return 另一个Promise，根据这个Promise的状态和值，创建一个新的Promise对象返回
// 3.throw 一个同步异常,返回的Promise对象状态为rejected，值为该异常。
var p6 = new Promise(function (resolve, reject) {
	resolve(1);
});
p6.then(function (value: any) {          //第一个then
		console.log(value);					//shuchu
		return value * 2;
	})
	.then(function (value) {              //第二个then
		console.log(value);
	})
	.then(function (value) {              //第三个then
		console.log(value);
		return Promise.resolve('resolve');
	})
	.then(function (value) {              //第四个then
		console.log(value);
		return Promise.reject('reject');
	})
	.then(function (value) {              //第五个then
		console.log('resolve: ' + value);
	}, function (err) {
		console.log('reject: ' + err);
	})

// 5、回调异步性
// Promise接收的函数参数是同步执行的，但then方法中的回调函数执行则是异步的，
// 因此，"success"会在后面输出。
var p7 = new Promise(function (resolve, reject) {
	resolve("success");
});

p7.then(function (value) {
	console.log(value);
});

console.log("first");

// 6、异常
// Promise中的异常由then参数中第二个回调函数（Promise执行失败的回调）处理，
// 异常信息将作为Promise的值。异常一旦得到处理，
// then返回的后续Promise对象将恢复正常，并会被Promise执行成功的回调函数处理。

// 7、Promise.resolve()
// Promise.resolve(...)可以接收一个值或者是一个Promise对象作为参数。
// 当参数是普通值时，它返回一个resolved状态的Promise对象，对象的值就是这个参数
// 当参数是一个Promise对象时，它直接返回这个Promise参数。

// 8、resolve vs reject
// 即当resolve的参数是一个Promise对象时，resolve会"拆箱"获取这个Promise对象的状态和值，但这个过程是异步的。
// 但Promise回调函数中的第二个参数reject不具备”拆箱“的能力，reject的参数会直接传递给then方法中的rejected回调。