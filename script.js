'use strict'

//ページトップボタンの表示、非表示
window.onload=function(){
    let Animation = function() {
    //アイコン位置取得
    let pageTop =  document.getElementById('gotop');
    console.log(pageTop);
    //console.log(pageTop.style);
    console.log(pageTop.classList);
    //要素の位置座標を取得
    let rect = pageTop.getBoundingClientRect();
    //topからの距離
    let scrollTop = rect.top + window.pageYOffset;
    console.log("位置座標" + scrollTop)
    if(scrollTop > 530){
      pageTop.classList.add('show');
     }  else {
      pageTop.classList.remove('show');
     }
   }
      window.addEventListener('scroll', Animation);
 }

 window.onscroll = function(){
    // スクロールイベントの処理を記述
    window.onload;
  };

/*アニメーションのコード*/
const start = document.getElementById('start'); // 開始ボタン
const reset = document.getElementById('reset'); // リセットボタン
const showLater = document.getElementById("show-later");//結果表示

//順位を表示する
let rank = "";

//〇〇〇秒後に順位を表示
function Display() {
    document.getElementById("show-later").innerText = rank;
    showLater.classList.remove("d-none");
}

//スタートを押したら順位をリセット
function hidden() {
    document.getElementById("show-later").innerText = rank;
    showLater.classList.add("d-none");
}

//順位を出し、文字列に変換
function rankDisplay(arrayNum) {
    const imageList = ["青色の車", "黒色の車", "赤色の車"];
    const result1 = {};
    const result2 = "";
    let count = 0;
    const sort = [];
    for(const value of arrayNum) {
      result1[imageList[count]] = value;
      count += 1;
    }
    let pairs = Object.entries(result1);
    pairs.sort(function(p1, p2){
      let p1Val = p1[1], p2Val = p2[1];
      return p1Val - p2Val;
      }
    );
    pairs = Object.fromEntries(pairs);
    for(const key in pairs) {
      sort.push(key);
    }
    return `１位は ${sort[0]} ２位は ${sort[1]} ３位は ${sort[2]} でした！`;
}

//アニメーション（左から右へ動きを与える）//
const move = function() {
    // 全てのイメージをリスト化
    const imageList = [image1, image2, image3];
    // ランダムな整数を格納
    const randamTime = [];
    // 最大値を抽出
    let maxNum = 0;

    for(const value of imageList){
        // 再生時間をランダムにする //
        // 再生時間を乱数で取得
        let Time = Math.floor(Math.random()*(1700 - 1100) + 1100);
        randamTime.push(Time);
        // 画像を左端から右に動かす//
        value.animate(
        // 途中の状態を表す配列
        [
            { transform: 'translateX(0)'},    // 開始時の状態（左端）
            { transform: 'translateX(600%)' } // 終了時の状態（右端）
        ], 
        // タイミングに関する設定
        {
            fill : "forwards", // 再生前後の状態
            duration: Time,    // 再生時間
        },
        );
    }
    console.log(randamTime);
    console.log(Math.max(...randamTime));
    //順位を表示するタイミングを格納(300msずらし)
    maxNum = Math.max(...randamTime) + 300;
    //順位を格納
    rank = rankDisplay(randamTime);

    setTimeout(Display, maxNum);
};

//アニメーションのリセット//
const resetAnime = function() {
    // 全てのイメージをリスト化
    const imageList = [image1, image2, image3];
    // 画像を初期化//
    for(const value of imageList){
        value.animate(
        // 途中の状態を表す配列
        [
            { transform: 'translateX(0)'}, // 開始時の状態（左端）
            { transform: 'translateX(0)' } // 終了時の状態（左端）
        ], 
        // タイミングに関する設定
        {
            fill : "forwards", // 再生前後の状態
            duration: 0,    // 再生時間
        },
    );
    };
};

// スタートボタンをクリックしたら
start.addEventListener('click',hidden);
start.addEventListener('click',move);
start.addEventListener('click',function(){start.disabled = true;});

//リセットボタンをクリックしたら
reset.addEventListener('click',hidden);
reset.addEventListener('click',resetAnime);
reset.addEventListener('click',function(){start.disabled = false;});
