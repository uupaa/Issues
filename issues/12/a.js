// see
//      https://github.com/PexJS/PexJS/network
//      https://github.com/abicky/PexJS/commit/258d709a75624900675e46f20a4e5f17455f0e55
//      globalCompositeOperation -> http://www.html5.jp/canvas/ref/property/globalCompositeOperation.html
//
//      http://d.hatena.ne.jp/a_bicky/20131018/1382038816
//
//      https://github.com/Phrogz/context-blender/blob/master/context_blender.js

window.onload = function() {

    function multipleColor(ctx, r, g, b) {
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgb(' + [((r / 1) * 255) | 0, ((g / 1) * 255) | 0, ((b / 1) * 255) | 0].join() + ')';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function addColor(ctx, r, g, b) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgb(' + [r, g, b].join() + ')';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function invertColor(ctx, r, g, b) {
      ctx.globalCompositeOperation = 'difference';
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    var img   = document.querySelector("#img"); // original image

    var ctx10 = document.querySelector('#canvas10').getContext('2d'); ctx10.drawImage(img, 0, 0);
    var ctx11 = document.querySelector('#canvas11').getContext('2d'); ctx11.drawImage(img, 0, 0);
    var ctx12 = document.querySelector('#canvas12').getContext('2d'); ctx12.drawImage(img, 0, 0);
    var ctx13 = document.querySelector('#canvas13').getContext('2d'); ctx13.drawImage(img, 0, 0);
    var ctx14 = document.querySelector('#canvas14').getContext('2d'); ctx14.drawImage(img, 0, 0);
    var ctx15 = document.querySelector('#canvas15').getContext('2d'); ctx15.drawImage(img, 0, 0);
    //var ctx16 = document.querySelector('#canvas16').getContext('2d'); ctx16.drawImage(img, 0, 0);
    var ctx17 = document.querySelector('#canvas17').getContext('2d'); ctx17.drawImage(img, 0, 0);

    var ctx20 = document.querySelector('#canvas20').getContext('2d'); ctx20.drawImage(img, 0, 0);
    var ctx21 = document.querySelector('#canvas21').getContext('2d'); ctx21.drawImage(img, 0, 0);
    var ctx22 = document.querySelector('#canvas22').getContext('2d'); ctx22.drawImage(img, 0, 0);

    var ctx30 = document.querySelector('#canvas30').getContext('2d'); ctx30.drawImage(img, 0, 0);
    var ctx31 = document.querySelector('#canvas31').getContext('2d'); ctx31.drawImage(img, 0, 0);
    var ctx32 = document.querySelector('#canvas32').getContext('2d'); ctx32.drawImage(img, 0, 0);
    var ctx33 = document.querySelector('#canvas33').getContext('2d'); ctx33.drawImage(img, 0, 0);
    var ctx34 = document.querySelector('#canvas34').getContext('2d'); ctx34.drawImage(img, 0, 0);
    var ctx35 = document.querySelector('#canvas35').getContext('2d'); ctx35.drawImage(img, 0, 0);
    var ctx36 = document.querySelector('#canvas36').getContext('2d'); ctx36.drawImage(img, 0, 0);
    var ctx37 = document.querySelector('#canvas37').getContext('2d'); ctx37.drawImage(img, 0, 0);
    var ctx38 = document.querySelector('#canvas38').getContext('2d'); ctx38.drawImage(img, 0, 0);
    var ctx39 = document.querySelector('#canvas39').getContext('2d'); ctx39.drawImage(img, 0, 0);

    // multiple
    {
        multipleColor(ctx10, 1, 0, 0);
        multipleColor(ctx11, 0, 1, 0);
        multipleColor(ctx12, 0, 0, 1);
        // fadeout
        multipleColor(ctx13, 0.8, 0.8, 0.8);
        multipleColor(ctx14, 0.5, 0.5, 0.5);
        multipleColor(ctx15, 0.2, 0.2, 0.2);
    //    multipleColor(ctx16, 0.1, 0.1, 0.1);
        // damage
        multipleColor(ctx17, 1, 0.4, 0.4);
    }

    // add
    {
        addColor(ctx20, 255, 0, 0);
        addColor(ctx21, 0, 255, 0);
        addColor(ctx22, 0, 0, 255);
    }

    // subtract
    {
        invertColor(ctx30); addColor(ctx30, 128,   0,   0); invertColor(ctx30);
        invertColor(ctx31); addColor(ctx31, 255,   0,   0); invertColor(ctx31);
        invertColor(ctx32); addColor(ctx32,   0, 128,   0); invertColor(ctx32);
        invertColor(ctx33); addColor(ctx33,   0, 255,   0); invertColor(ctx33);
        invertColor(ctx34); addColor(ctx34,   0,   0, 128); invertColor(ctx34);
        invertColor(ctx35); addColor(ctx35,   0,   0, 255); invertColor(ctx35);

        invertColor(ctx36); addColor(ctx36, 128, 128,   0); invertColor(ctx36);
        invertColor(ctx37); addColor(ctx37,   0, 128, 128); invertColor(ctx37);
        invertColor(ctx38); addColor(ctx38, 128,   0, 128); invertColor(ctx38);
        invertColor(ctx39); addColor(ctx39, 255, 255, 255); invertColor(ctx39);
    }


    // --- dynamic color filter ---
    var mr = document.querySelector("#mr");
    var mg = document.querySelector("#mg");
    var mb = document.querySelector("#mb");
    var ar = document.querySelector("#ar");
    var ag = document.querySelector("#ag");
    var ab = document.querySelector("#ab");

    var img  = document.querySelector("#img"); // original image
    var ctx0 = document.querySelector("#canvas0").getContext("2d"); ctx0.drawImage(img, 0, 0);

    // スライダーを動かすとこのイベントハンドラが呼ばれる
    document.addEventListener("input", function(event) {
        // 最初に元画像を描画する
        ctx0.globalCompositeOperation = "source-over";
        ctx0.drawImage(img, 0, 0);

        // 色の足し算や引き算の前に、掛け算を行う
        multipleColor(ctx0, mr.value, mg.value, mb.value);

        // JavaScript の Canvas filter で利用可能なメソッドでは、
        // addColor と subtract を一度に行えないため、
        // 加算する色と引き算する色を一旦分離し、2回に分けて処理する
        var plusColor  = [0, 0, 0]; // [R, G, B]
        var minusColor = [0, 0, 0];

        if (ar.value > 0) { plusColor[0] = ar.value; } else { minusColor[0] = -ar.value; }
        if (ag.value > 0) { plusColor[1] = ag.value; } else { minusColor[1] = -ag.value; }
        if (ab.value > 0) { plusColor[2] = ab.value; } else { minusColor[2] = -ab.value; }

        // 色の追加がある場合は、addColor を行う
        if (plusColor[0] > 0 || plusColor[1] > 0 || plusColor[2] > 0) {
            addColor(ctx0, plusColor[0], plusColor[1], plusColor[2]);
        }

        // 色の引き算がある場合は、先に色を反転させてから addColor を行い、再度反転させることで、
        // 結果的に色の引き算を行う
        if (minusColor[0] > 0 || minusColor[1] > 0 || minusColor[2] > 0) {
            invertColor(ctx0);
            addColor(ctx0, minusColor[0], minusColor[1], minusColor[2]);
            invertColor(ctx0);
        }
    });

    // --- darker ---
    var ctx40 = document.querySelector('#canvas40').getContext('2d'); ctx40.drawImage(img, 0, 0);
    var ctx41 = document.querySelector('#canvas41').getContext('2d'); ctx41.drawImage(img, 0, 0);
    var ctx42 = document.querySelector('#canvas42').getContext('2d'); ctx42.drawImage(img, 0, 0);

    // sub with darker
    {
        subColor(ctx40, 255, 0, 0);
        subColor(ctx41, 0, 255, 0);
        subColor(ctx42, 0, 0, 255);
    }

    function subColor(ctx, r, g, b) {
      ctx.globalCompositeOperation = 'darker';
      ctx.fillStyle = 'rgb(' + [r, g, b].join() + ')';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

};

