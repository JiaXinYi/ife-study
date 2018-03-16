function doFn1() {
    var n = document.getElementById('number1').value;
    var result = 1;
    for (var i = 0; i < n; i++) {
        result *= 2;
    }
    document.getElementById('result1').innerHTML = result;
}

function doFn2() {
    var n = document.getElementById('number2').value;
    var result = 1;
    for (var i = n; i > 0; i--) {
        result *= i;
    }
    document.getElementById('result2').innerHTML = result;
}
// 1 1 2 3 5 8
//     3
function doFn3() {
    var n = document.getElementById('number3').value;

    function sum(n) {
        var result;
        if (n < 3) {
            result = 1;
        } else {
            result = sum(n - 1) + sum(n - 2);
        }
        return result;
    }
    var result = sum(n);
    document.getElementById('result3').innerHTML = result;

}

function doFn4() {
    var n = document.getElementById('number4').value;
    var result = n % 100 % 10 * 100 + parseInt(n % 100 / 10) * 10 + parseInt(n / 100);

    document.getElementById('result4').innerHTML = result;
}

function doFn5() {
    var n1 = document.getElementById('number5').value;
    var n2 = document.getElementById('number6').value;
    var n3 = document.getElementById('number7').value;

    var result = [n1, n2, n3].sort(function (a, b) {
        return b - a;
    })
    document.getElementById('result5').innerHTML = result[0];
}

//质数，仅能被1或自身整除的书
function doFn6() {
    var result = [];
    for (var n = 1; n < 100; n++) {
        result.push(n);
        for (var i = 2; i < n - 1; i++) {
            if (n % i == 0) {
                result.pop(n);
                break;
            } else {}
        }

    }
    document.getElementById('result6').innerHTML = result;

}

// 壹贰叁肆伍陆柒捌玖拾佰仟万
function doFn4() {
    var n = document.getElementById('number8').value;


}
