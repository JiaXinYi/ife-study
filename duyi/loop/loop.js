function doFn1(){
    var n = document.getElementById('number1').value;
    var result = 1;    
    for(var i=0; i<n; i++){
        result *=2;
    }
    document.getElementById('result1').innerHTML = result;
} 
