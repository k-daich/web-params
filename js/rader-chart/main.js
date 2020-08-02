window.onload = function () {
    chartbuild();
};

/**
 * チャートを生成する
 */
function chartbuild() {

    //チャートの基本変数定義
    var center_x = 200;          //中心x座標
    var center_y = 200;          //中心y座標
    var vertex_num = 5;              //頂点の数
    var chart_radius = 200;              //大きさ（外接円の半径）
    var tilt = 180;               //傾き（０だと１つ目の頂点が真下にくる）
    var scale_num = 5;               //目盛の数
    var line_color = "#a9a9a9";  //チャートのライン色
    var line_width = 3;          //チャートのラインの太さ
    var line_width_out = 8;      //チャートのラインの太さ（一番外側）
    var line_width_center = 2;   //チャートの中心線の太さ

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
            makecenterline();
        }

        /**
         * 
         */
        function makechartframe() {
            var x;
            var y;
            var one_scale_length;
            var angle;
            var rad;

            context.strokeStyle = line_color;
            // 目盛の数分だけ繰り返す
            for (var k = scale_num; k >= 0; k--) {
                // 1目盛の幅を求める（チャートの半径/目盛の数）
                one_scale_length = chart_radius / scale_num * k;
                // 描画する位置をリセットする
                context.beginPath();
                // 一番外枠の目盛の場合
                if (k == scale_num) {
                    context.lineWidth = 5;  //ラインの太さ
                }
                // それ以外の目盛の場合
                else {
                    context.lineWidth = 2;  //ラインの太さ
                }

                // チャートの頂点の数だけ繰り返す
                for (var l = 1; l <= vertex_num; l++) {

                    // 描画開始角度を求める
                    angle = tilt + 360 / vertex_num * l;
                    // ラジアン(弧度)を求める ※Math.PI = π
                    rad = angle * Math.PI / 180;

                    // 1目盛目のX座標を求める
                    x = center_x + Math.sin(rad) * one_scale_length;
                    // 1目盛目のY座標を求める
                    y = center_y + Math.cos(rad) * one_scale_length;

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

        //チャートの中心線を描画
        function makecenterline() {

            var x;
            var y;
            var angle;
            var rad;
            context.strokeStyle = line_color;
            context.lineWidth = line_width_center;
            for (var m = 0; m < vertex_num; m++) {
                angle = tilt + 360 / vertex_num * m;
                rad = angle * Math.PI / 180;

                x = center_x + Math.sin(rad) * chart_radius;
                y = center_y + Math.cos(rad) * chart_radius;

                context.beginPath();
                context.moveTo(center_x, center_y);
                context.lineTo(x, y);
                context.stroke();
            }
        }
    }
}
