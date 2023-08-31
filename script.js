'use strict'

/* ページトップボタンの表示、非表示 */
window.onload = function() {
    let Animation = function() {
        let pageTop = document.getElementById('gotop'); //アイコン位置取得
        //要素の位置座標を取得//
        let rect = pageTop.getBoundingClientRect();
        let scrollTop = rect.top + window.pageYOffset; //topからの距離
        //console.log("位置座標" + scrollTop)
        if (scrollTop > 530) {
            pageTop.classList.add('show');
        } else {
            pageTop.classList.remove('show');
        }
    }
    window.addEventListener('scroll', Animation);
}

window.onscroll = function() {
    // スクロールイベントの処理を記述
    window.onload;
};


/* アニメーションのコード */
const start = document.getElementById('start'); // 開始ボタン
const reset = document.getElementById('reset'); // リセットボタン
const showLater = document.getElementById("show-later"); //結果表示
let widthGame = document.getElementById("game-title"); //車の移動距離を求める
let w = Math.floor(widthGame.getBoundingClientRect().width) - 100; //車の移動可能距離

//順位を表示する
let rank = "";

// アニメーション終了後に順位を表示 //
function Display() {
    document.getElementById("show-later").innerHTML = rank;
    showLater.classList.remove("d-none");
}


// スタートorリセットボタンを押したら順位をリセット //
function hidden() {
    document.getElementById("show-later").innerHTML = rank;
    showLater.classList.add("d-none");
}


// 順位を出し、文字列に変換 //
/**
 * 動作：アニメーション終了後、イメージ事のランダム数（移動速度）の配列を受け取り、昇順し順位を返す。
 * @param {String} imageList 車の色を順番に格納
 * @param {Object} result1 車の色とランダム数（移動速度）のペア
 * @param {Array} count 配列の0から順にresult1へ格納する為の初期値
 * @param {Array} sort result1に格納されている値：（ランダム数）の低い値のキー：（車の色）を格納
 */
function rankDisplay(arrayNum) {
    const imageList = ["青色の車", "黒色の車", "赤色の車"];
    const result1 = {};
    let count = 0;
    const sort = [];
    for (const value of arrayNum) {
        result1[imageList[count]] = value;
        count += 1;
    }
    let pairs = Object.entries(result1);
    pairs.sort(function(p1, p2) {
        let p1Val = p1[1],
            p2Val = p2[1];
        return p1Val - p2Val;
    });
    pairs = Object.fromEntries(pairs);
    for (const key in pairs) {
        sort.push(key);
    }
    return `１位は <b>${sort[0]}</b> ２位は <b>${sort[1]}</b> ３位は <b>${sort[2]}</b> でした！`;
}


// アニメーション（左から右へ動きを与える） //
/**
 * 動作：スタートボタンが押されたら画像（3枚）を、それぞれランダムなスピードで右から左へ移動する。
 * @param {Array} imageList image番号を格納
 */

const move = function() {
    // 全てのイメージをリスト化
    const imageList = [image1, image2, image3];
    // ランダムな整数を格納
    const randamTime = [];
    // ランダムな整数の最大値を格納
    let maxNum = 0;

    for (const value of imageList) {
        // 再生時間をランダムにする //
        // 再生時間を乱数で取得
        let Time = Math.floor(Math.random() * (1700 - 1100) + 1100);
        randamTime.push(Time);
        // 画像を左端から右に動かす//
        value.animate(
            // 途中の状態を表す配列
            [{
                    transform: 'translateX(0)' // 開始時の状態（左端）
                },
                {
                    transform: `translateX(${w}px)` // 終了時の状態（右端）   w:車の移動可能距離
                }
            ],
            // タイミングに関する設定
            {
                fill: "forwards", // 再生前後の状態
                duration: Time, // 再生時間
            },
        );
    }
    //console.log(randamTime);
    //console.log(Math.max(...randamTime));
    //順位を表示するタイミングを格納(300msずらし)
    maxNum = Math.max(...randamTime) + 300;
    //順位を格納
    rank = rankDisplay(randamTime);

    setTimeout(Display, maxNum);
};


// アニメーションのリセット //
/**
 * 動作：アニメーション実行後、リセットボタンが押されたら画像（3枚）を初期位置に戻す。
 * @param {Array} imageList image番号を格納
 */

const resetAnime = function() {
    // 全てのイメージをリスト化
    const imageList = [image1, image2, image3];
    // 画像の位置を初期化//
    for (const value of imageList) {
        value.animate(
            // 途中の状態を表す配列
            [{
                    transform: 'translateX(0)' // 開始時の状態（左端）
                },
                {
                    transform: 'translateX(0)' // 終了時の状態（左端）
                }
            ],
            // タイミングに関する設定
            {
                fill: "forwards", // 再生前後の状態
                duration: 0, // 再生時間
            },
        );
    };
};


// スタートボタンをクリックしたら
start.addEventListener('click', hidden);
start.addEventListener('click', move);
start.addEventListener('click', function() {
    start.disabled = true;
});


//リセットボタンをクリックしたら
reset.addEventListener('click', hidden);
reset.addEventListener('click', resetAnime);
reset.addEventListener('click', function() {
    start.disabled = false;
});
