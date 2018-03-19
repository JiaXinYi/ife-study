function test() {
	var arr = [];
	for (var i = 0; i < 10; i++) {
		arr[i] = function () {
			document.write(i + " ");
		}
	}
	return arr;
}
var myArr = test();
// test()执行完之后，testAO里面的i是10;
for (var j = 0; j < 10; j++) {
	myArr[j]();
}

// 解决
// function test() {
// 	var arr = [];
// 	for (var i = 0; i < 10; i++) {
// 		(function (j) {
// 			arr[j] = function () {
// 				document.write(j + " ");
// 			}
// 		})(i);
// 	}
// 	return arr;
// }
// var myArr = test();
// for (var j = 0; j < 10; j++) {
// 	myArr[j]();
// }
