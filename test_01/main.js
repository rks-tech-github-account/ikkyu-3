/**
 * JavaScript ES6テスト
 *	skill check test main.js
 *  回答編
 */

/**
 * 第1問 スコープ問題
 * console.logで出力される結果を、選択してください
 */

// (1)
{
	var scope1 = "scope1";
}
console.log('1-1')
//console.log(scope1);
// 選択
// 1. ReferenceError
// 2. scope1
// 正解：2

// (2)
{
	let scope2 = "scope2";
}
console.log('1-2');
// console.log(scope2);
// 選択
// 1. ReferenceError
// 2. scope2
// 正解：1

// (3)
{
	const scope3 = "scope3";
}
console.log('1-3');
//console.log(scope3)
// 選択
// 1. ReferenceErrorとなる
// 2. scope3
// 正解：1

// (4)
function fun4(){
	var scope4 = "scope4";
	return scope4;
}
console.log('1-4');
//console.log(scope4);
// 選択
// 1. ReferenceError
// 2. scope4
// 正解：1

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
 * console.logで出力される結果を、選択してください
 */

// (1)
console.log('2-1');
//console.log(fun5());
let fun5 = function(){
	return 'fun5';
};
// 選択
// 1. ReferenceError
// 2. fun5
// 正解：1

// (2)
console.log('2-2');
//console.log(fun6());
function fun6(){
	return 'fun6';
}
// 選択
// 1. ReferenceError
// 2. fun6
// 正解：2

/**
 * 第3問 バグ探し
 * バグを指摘してください。
 * 一つの問題に複数のバグがあるかもしれません。
 */

// (1)
/**
 * ・forの初期値設定でiを初期化しているため、ループが動かない。
 * ・文字列と数字を連結した結果に対して引き算をしているので、エラーになる（下記の場合、掛け算は先に行われるので、問題ない）。
 */

i = 0;

for(let i ; i < 5; i++){
    console.log("count: " + i * 10 - 5);
}

// (2)
/**
 * ・変数valueに文字を入れているので、値が連結されるだけで2倍にはならない。
 * ・分岐条件の値チェックにおいて、イコール演算子が2つだけなので型の照合が行われていない。従って、正しい出力にならない。
 */

function 引数を二倍にする(number){ return number + number; }

let value = "10";

if(value==10){
    console.log(引数を二倍にする(value));
}else{
    console.log("入力値が不正です。");
}

// (3)
// この問題を解くためには、非同期処理の知識が必要です。
// 非同期通信で本の情報一覧を取得し、テーブルを更新しますがうまく表示できません。
// 表示できるように、改修方法を答えてください。
/**
 * 解答例
 * データ取得処理が非同期なため、テーブルに反映する処理が、データ取得処理の完了前に行われてしまう可能性がある。
 * doneの中でtbodyの更新処理を行えばよい。
 */
$(function(){
	const $tbody = $('#tbody');
	let html = '';

	// 正解例
	$('#ajaxBtn').on('click', function(){
		$.ajax({
			method : 'GET',
			url : 'data.json',
			dataType : 'json',
			timeout : 5000,
		}).done(function(arr_data){
			arr_data.forEach(function(value, index, array){
				html += createTRow(value);
			});
			$tbody.append(html);
		}).fail(function(){
			alert('ajax error!');
		});
	});

});

// 問題
// $(function(){
// 	const $tbody = $('#tbody');
// 	let html = '';
// 	let data = null;
//
// 	// 非同期通信
// 	$('#ajaxBtn').on('click', function(){
// 		$.ajax({
// 			method : 'GET',
// 			url : 'data.json',
// 			dataType : 'json',
// 			timeout : 5000,
// 		}).done(function(arr_data){
// 			data = arr_data;
// 		}).fail(function(){
// 			alert('ajax error!');
// 		});
// 	});
//
// 	// テーブルに反映
// 	data.forEach(function(value, index, array){
// 		html += createTRow(value);
// 	});
// 	$tbody.append(html);
// });

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

// *この問題を解くためには、jQueryの知識が必要です。

/**
 * 解答例
 * ・グローバルで定数や変数を宣言している必要性は？ローカル変数にできないか考慮する必要がある
 * 　-> 即時関数でラップして、名前空間汚染の防止
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
* 解答例(定数、変数、htmlの記述)
* ・引数objが何かわかりにくい
* 　-> わかりやすい引数名に変更。又は、コメントで補足する
* ・document.getElementById(id名)の記述回数が多い
* 　-> 処理前に、変数化して記述回数を減らす。できれば、関数の外で変数宣言(即時関数のローカル変数)できればよい
* ・if文が不適切
* 　-> == は値のみでデータ型では判断されない。===を使用するほうが望ましい
*/
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
* 解答例
* ・htmlでonclick属性を使用はやめる
* 　-> addEventListenerを使用して、jsファイルのみでJavaScriptのコードを管理する
* ・if文が不適切
* 　-> == は値のみでデータ型では判断されない。===を使用するほうが望ましい
*/
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
* 解答例
* ・htmlでonclick属性を使用はやめる
* 　-> addEventListenerを使用して、jsファイルのみでJavaScriptのコードを管理する
* ・0を入力した場合、不正判定される
* 　-> parseFloat()する前に、入力チェックする
* ・document.getElementById('calcLeft')、document.getElementById('calcRight')を変数に
* 　-> 上の処理でも呼ばれているので、変数化して呼ぶ回数を減らす
*/
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
* 解答例
* ・if文が不適切
* 　-> == は値のみでデータ型では判断されない。===を使用するほうが望ましい
* ・引数とreturnを使用する
* 　-> グローバル変数を定義しなくてもいい
* ・切り上げ処理が不適切(※結構見落とす所)
* 　-> 1 + 0.1 の結果が1.11となる。0.1を表現する場合の誤差が考慮されていない。
*/
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
