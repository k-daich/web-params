window.onload = function() {
    chartbuild();
};

    //チャートの基本変数定義
    var center_x = 500;          //中心x座標
    var center_y = 500;          //中心y座標
    var vertex = 5;              //頂点の数
    var size = 300;              //大きさ（外接円の半径）
    var tilt　= 180;               //傾き（０だと１つ目の頂点が真下にくる）
    var scale = 5;               //目盛の数
    var line_color = "#a9a9a9";  //チャートのライン色
    var line_width = 3;          //チャートのラインの太さ
    var line_width_out = 8;      //チャートのラインの太さ（一番外側）
    var line_width_center = 2;   //チャートの中心線の太さ

function chartbuild() {

    var canvas = document.getElementById('rader-chart');
    if (canvas.getContext) {

        var context = canvas.getContext('2d');

    }
}

function makechartframe(){

    var x;
    var y;
    var csize;
    var angle;
    var rad;
    context.strokeStyle = line_color;
    for (var k=scale;k>=0;k--) {
        csize = size / scale * k;
        context.beginPath();
        if (k == scale) {
            context.lineWidth = 8;  //一番外側のラインの太さ
        } else {
            context.lineWidth = 3;  //それ以外のラインの太さ
        }

        for (var l=0;l<vertex;l++) {

            angle = tilt + 360 / vertex * l;
            rad = angle * Math.PI / 180;

            x = center_x + Math.sin(rad) * csize;
            y = center_y + Math.cos(rad) * csize;

            if (l == 0) {
                context.moveTo(x,y);
                start_x = x;
                start_y = y;
            } else {
                context.lineTo(x,y);
            }

        }
        context.lineTo(start_x,start_y);
        context.stroke();
    }
}
