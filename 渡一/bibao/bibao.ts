function test1(){
	let arr = [];
	for (let i = 0; i < 10; i++) {
		arr[i] = function () {
			document.write(i + " ");
		}
	}
	return arr;
}	
var myArr1 = test1();
for (var j = 0; j < 10; j++) {
	myArr1[j]();
}


// 对应的js
// http://www.typescriptlang.org/play/index.html
// function test1() {
//     var arr = [];
//     var _loop_1 = function (i) {
//         arr[i] = function () {
//             document.write(i + " ");
//         };
//     };
//     for (var i = 0; i < 10; i++) {
//         _loop_1(i);
//     }
//     return arr;
// }
// var myArr1 = test1();
// for (var j = 0; j < 10; j++) {
//     myArr1[j]();
// }
