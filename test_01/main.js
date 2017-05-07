/**
 *	skill check test main.js
 *  問題編
 */

/**
 * 第1問 スコープ問題
 * console.logの出力結果を、選択してください
 * 答えがわからないようにコメント化しています。
 */

// (1)
{
	var scope1 = "scope1";
}
//console.log(scope1);
// 選択
// 1. ReferenceError
// 2. scope1

// (2)
{
	let scope2 = "scope2";
}
// console.log(scope2);
// 選択
// 1. ReferenceError
// 2. scope2

// (3)
{
	const scope3 = "scope3";
}
//console.log(scope3)
// 選択
// 1. ReferenceErrorとなる
// 2. scope3

// (4)
function fun4(){
	var scope4 = "scope4";
	return scope4;
}
//console.log(scope4);
// 選択
// 1. ReferenceError
// 2. scope4

// (5)
console.log('1-5');
//console.log(var1);
var var1 = 'hoge';
// 選択
// 1. ReferenceError
// 2. undefined
// 3. hoge
// 正解：2 ・・・varで変数宣言すると「巻き上げ」が作用される

/**
 * 第2問 関数定義
 * console.logの出力結果を、選択してください
 * 答えがわからないようにコメント化しています。
 */

// (1)
//console.log(fun5());
let fun5 = function(){
	return 'fun5';
};
// 選択
// 1. ReferenceError
// 2. fun5

// (2)
//console.log(fun6());
function fun6(){
	return 'fun6';
}
// 選択
// 1. ReferenceError
// 2. fun6

/**
 * 第3問 ajax(非同期通信)
 * この処理はバグがあります。どこが原因なのか指摘してください。
 */

$(function(){
	const $tbody = $('#tbody');
	let html = '';
	let data = null;

	// 非同期通信
	$('#ajaxBtn').on('click', function(){
		$.ajax({
			method : 'GET',
			url : 'data.json',
			dataType : 'json',
			timeout : 5000,
		}).done(function(arr_data){
			data = arr_data;
		}).fail(function(){
			alert('ajax error!');
		});
	});

	// テーブルに反映
	arr_data.forEach(function(value, index, array){
		html += createTRow(value);
	});
	$tbody.append(html);
});

function createTRow(rowData){
	return `<tr>` +
						`<td>${rowData.title}</td>` +
						`<td>${rowData.author}</td>` +
						`<td>${rowData.price}</td>` +
						`<td>${rowData.isbn}</td>` +
						`<td>${rowData.publish}</td>` +
						`<td>${rowData.published}</td>` +
					`</tr>`;
}

/**
 * 第4問 レビュー
 * 改善点など、突っ込みどころをあげてください。
 */

// 定数
const PermissionKeyCodes = [8, 9, 13, // 8 = BackSpace, 9 = Tab, 13 = enter
                            37, 39, 46, // 37 = 左キー, 39 = 右キー, 46 = delete
                            48, 49, 50, 51, 52, // 数字キー = 1 〜 9
                            53, 54, 55, 56, 57,
                            96, 97, 98, 99, 100,  // 数字キー(テンキー) = 1 〜 9
                            101, 102, 103, 104, 105,
                            110, 190];  // 110 = ピリオド(テンキー), 190 = ピリオド
// 変数
let selectedMode = 0;   // 計算モード
let calcResult;     // 計算結果
let inputLeft;      // 左辺に入力した値
let inputRight;     // 右辺に入力した値
let result;         // 計算結果

/**
* 計算方法を変更する関数
*/
function clickSelectedCalcMode(obj){
  // 選択しているボタンの選択表示classを削除
  document.getElementsByClassName('calcModeButton')[selectedMode].classList.remove('selectedMode');
  // 計算方法を変更
  selectedMode = obj.value;
  // 選択したボタンに選択表示classを追加
  document.getElementsByClassName('calcModeButton')[selectedMode].classList.add('selectedMode');
  // id="calcMode"のtextを変更
  if(selectedMode == 0){
    document.getElementById('calcMode').innerHTML = '+';
  }else if(selectedMode == 1){
    document.getElementById('calcMode').innerHTML = '-';
  }else if(selectedMode == 2){
    document.getElementById('calcMode').innerHTML = '×';
  }else if(selectedMode == 3){
    document.getElementById('calcMode').innerHTML = '÷';
  }
}

/**
* 数値が入力された時の関数
*/
function keyDown(event){
  let flag = false;

  for(let i = 0, length = PermissionKeyCodes.length; i<length; i++){
    if(event.keyCode == PermissionKeyCodes[i]){
      flag = true;
      break;
    }
  }

  if(!flag){
    // 入力イベントをキャンセルする
    event.preventDefault();
  }

}

/**
* 計算ボタンが押されたときの関数
*/
function executeCalc(){
  // 入力された値を取得する
  inputLeft = parseFloat(document.getElementById('calcLeft').value);
  inputRight = parseFloat(document.getElementById('calcRight').value);

  // 入力チェック
  if(!inputLeft || !inputRight){
    alert('入力値が不正です。');
    return false;
  }
  // 計算
  calc();

  // 計算結果を表示
  document.getElementById('calcResult').innerHTML = result;
}

/**
* 計算ボタンが押されたときの関数
* 少数は第2位まで表示。端数は切り上げる
*/
function calc(){
  if(selectedMode == 0){
    result = Math.ceil((inputLeft + inputRight)*100)/100;
  }else if(selectedMode == 1){
    result = Math.ceil((inputLeft - inputRight)*100)/100;
  }else if(selectedMode == 2){
    result = Math.ceil((inputLeft * inputRight)*100)/100;
  }else if(selectedMode == 3){
    result = Math.ceil((inputLeft / inputRight)*100)/100;
  }
}
