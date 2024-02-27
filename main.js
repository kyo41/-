let result = "";
let is_calc = false;

let mode = "integner_mode";
console.log(mode);
// 初期表示
window.onload = function () {
  result = document.getElementById('result');
};

// Cキー
function clear_btn(){
  result.value = "0";
  is_calc = false;
  mode = "integner_mode";
  console.log(mode);
}

// ピリオドキー
function period_btn(){
  if(mode == "decimal_mode"){
    document.getElementById("period_click").removeAttr("disabled");
  } else ( mode === "decimal_mode");
  if(is_ope_last()){
    result.value = result.value += "0.";
  } else {
    result.value += ".";
  }
  mode = "decimal_mode";
  console.log(mode);
}

// 数字キー
function num_btn(val){
  if(is_calc)  result.value = "0";
  is_calc = false;  
  
  if(result.value =="0" && val == "0"){
    result.value = "0";
  }else if(is_ope_last() &&val == "00"){
    result.value += "0"; 
  }else if(result.value == "0" &&val == "00"){
    result.value = "0";
  }else if(result.value == "0" && val == "."){
    result.value = "0.";
  }else if(result.value == "0"){
    result.value = val;
  }else{
    result.value += val;
  }
}

// 演算子キー
function ope_btn(val){
  let result_last = result.value.slice(-1);  //文字列の最後を取得（二重ピリオド対策）
  console.log(result_last);
  
  if(is_calc)  is_calc = false;
  
  if(is_ope_last()){ //文字列の最後が演算子の場合
    result.value = result.value.slice(0, -1) + val;
  }else if(result_last == "."){ //文字列の最後が"."の場合
    result.value = result.value.slice(0, -1) + val;
  }else { 
    result.value += val;
  }
  mode = "integner_mode";
  console.log(mode);
}

// =キー
function equal_btn(){
  if(is_ope_last())  result.value = result.value.slice(0, -1);
  
  let temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
  if(temp == Infinity || Number.isNaN(temp)){
    result.value = "Error";
  }else{
    result.value = temp;
    is_calc = true;
  }
  mode = "integner_mode";
  console.log(mode);
}

// 入力されている値が演算子かどうか
function is_ope_last(){
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}