window.onload = function () {
    chartbuild();
};

/**
 * チャートを生成する
 */
function chartbuild() {

    //チャートの基本変数定義
    var center_x = 100;          //中心x座標
    var center_y = 100;          //中心y座標
    var paramValuesEle = document.getElementById("param-values");
    var param_values = new Array(
        paramValuesEle.dataset["chrPwrReal"],
        paramValuesEle.dataset["chrPwrIdeal"],
        paramValuesEle.dataset["cntrlDifficult"],
        paramValuesEle.dataset["advntageHighRankChr"],
        paramValuesEle.dataset["hame"],
        paramValuesEle.dataset["stability"]
    );
    var vertex_num = param_values.length;              //頂点の数
    var chart_radius = 100;              //大きさ（外接円の半径）
    var tilt = 180;               //傾き（０だと１つ目の頂点が真下にくる）
    var scale_num = 5;               //目盛の数
    var line_color = "#a9a9a9";  //チャートのライン色
    var params_line_color = "#ffc9da";  //パラメータのチャートのライン色
    var line_width = 2;          //チャートのラインの太さ
    var line_width_out = 4;      //チャートのラインの太さ（一番外側）
    var line_width_center = 1.5;   //チャートの中心線の太さ

    var canvas = document.getElementById('rader-chart');
    if (canvas.getContext) {

        var context = canvas.getContext('2d');

        // チャートを生成する
        reset();


        /**
         * チャートの初期化
         */
        function reset() {
            makechartframe();
            makecChartFromParams();
            makecenterline();
        }

        /**
         * チャートの枠線を作成する
         */
        function makechartframe() {
            var x;
            var y;
            var angle;
            var rad;

            context.strokeStyle = line_color;
            // 目盛の数分だけ繰り返す
            for (var k = scale_num; k >= 0; k--) {
                // 中央からの目盛の長さを求める（チャートの半径/目盛の数）
                nth_scale_length = chart_radius / scale_num * k;
                // 描画する位置をリセットする
                context.beginPath();
                // 一番外枠の目盛の場合
                if (k == scale_num) {
                    context.lineWidth = line_width_out;  //ラインの太さ
                }
                // それ以外の目盛の場合
                else {
                    context.lineWidth = line_width;  //ラインの太さ
                }

                // チャートの頂点の数だけ繰り返す
                for (var l = 1; l <= vertex_num; l++) {

                    // 描画開始角度を求める
                    angle = tilt + 360 / vertex_num * l;
                    // ラジアン(弧度)を求める ※Math.PI = π
                    rad = angle * Math.PI / 180;

                    // 1目盛目のX座標を求める
                    x = getXposiOnCircle(center_x, rad, nth_scale_length);
                    // 1目盛目のY座標を求める
                    y = getYposiOnCircle(center_y, rad, nth_scale_length);

                    // 初回の繰り返しのみ描画開始位置を初期化する
                    if (l == 1) {
                        // 描画開始位置へ移動する
                        context.moveTo(x, y);
                        // 描画開始位置を保持する
                        start_x = x;
                        start_y = y;
                    } else {
                        // 指定位置まで線を引く
                        context.lineTo(x, y);
                    }

                }
                // 描画開始位置まで線を引く
                context.lineTo(start_x, start_y);
                // 今まで指定した線を描画する
                // ※stroke = 指定した輪郭を描画, fill = 指定した内部エリアを塗りつぶす
                context.stroke();
            }
        }

        //パラメータ値に沿ったチャートを描画する
        function makecChartFromParams() {
            var x;
            var y;
            var angle;
            var rad;
            // 初回パラメータの描画X座標
            var start_x;
            // 初回パラメータの描画Y座標
            var start_y;

            // パラメータの数だけ繰り返す
            for (var i = 0; i < param_values.length; i++) {
                // 線の色を設定する
                context.strokeStyle = params_line_color;

                // 描画する位置をリセットする
                context.beginPath();

                // パラメータ値の分だけ目盛の位置を伸ばす
                nth_scale_length = chart_radius / scale_num * param_values[i];

                // 描画開始角度を求める
                angle = tilt + 360 / vertex_num * i;
                // ラジアン(弧度)を求める ※Math.PI = π
                rad = angle * Math.PI / 180;

                // 1目盛目のX座標を求める
                x = getXposiOnCircle(center_x, rad, nth_scale_length);
                // 1目盛目のY座標を求める
                y = getYposiOnCircle(center_y, rad, nth_scale_length);

                // 初回の繰り返しのみ描画開始位置を初期化する
                if (i == 0) {
                    // 描画開始位置へ移動する
                    context.moveTo(x, y);
                    // 描画開始位置を保持する
                    start_x = x;
                    start_y = y;
                } else {
                    // 指定位置まで線を引く
                    context.lineTo(x, y);
                }
                console.log("i : " + i + " x : " + x + " y : " + y + " rad : " + rad);
            }
            // 描画開始位置まで線を引く
            context.lineTo(start_x, start_y);
            // 今まで指定した線を描画する
            // ※stroke = 指定した輪郭を描画, fill = 指定した内部エリアを塗りつぶす
            context.stroke();
        }
    }

    //チャートの中心線を描画する
    function makecenterline() {

        var x;
        var y;
        var angle;
        var rad;
        // 線の色を設定する
        context.strokeStyle = line_color;
        // 線の幅を設定する
        context.lineWidth = line_width_center;

        // 多角形の頂点の数だけ繰り返す
        for (var m = 1; m <= vertex_num; m++) {
            // 引く中心線の角度を求める
            angle = tilt + 360 / vertex_num * m;
            // ラジアン（弧度）を求める
            rad = angle * Math.PI / 180;

            // 求めた弧度の円周上のX座標を求める
            x = getXposiOnCircle(center_x, rad, chart_radius);
            // 求めた弧度の円周上のY座標を求める
            y = getYposiOnCircle(center_y, rad, chart_radius);

            context.beginPath();
            // 円の中心へ移動する
            context.moveTo(center_x, center_y);
            // 求めた円周上の座標まで線を引く
            context.lineTo(x, y);
            context.stroke();
        }
    }


    /**
    * 指定したX座標を中心として、指定した半径の円を引き、指定した角度の円上のX座標を返す
    * @param {*} centerX 円の中央X座標
    * @param {*} radius 円からの角度
    * @param {*} nthScaleLength 円の半径 
    */
    function getXposiOnCircle(centerX, radius, nthScaleLength) {
        return centerX + Math.sin(radius) * nthScaleLength;
    }

    /**
     * 指定したY座標を中心として、指定した半径の円を引き、指定した角度の円上のY座標を返す
     * @param {*} centerY 円の中央Y座標
     * @param {*} radius 円からの角度
     * @param {*} nthScaleLength 円の半径 
     */
    function getYposiOnCircle(centerY, radius, nthScaleLength) {
        return centerY + Math.cos(radius) * nthScaleLength;
    }

}
