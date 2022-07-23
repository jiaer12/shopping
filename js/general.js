(function(){
    'use strict';
    var docEl = document.documentElement;
    var viewPortEl = document.querySelector('meta[name="viewport"]');
    var dpr = window.devicePixelRatio || 1;         // 获取设备像素比，如果没有则默认为1
    // 设置屏幕的最大值和最小值，为了防止用户无限放大和无限缩小。如果不设置的话也可以。
    var maxWidth = 540,minWidth = 320;



    dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);        // dpr可能不是整数，所以可以用三元表达式来把dpr的值变为整数
    docEl.setAttribute('data-dpr',dpr);
    docEl.setAttribute('max-width',maxWidth)
    docEl.setAttribute('min-width',minWidth)

    var scale = 1/dpr;
    var content = `width=device-width,initial-scale=${scale},user-scalable=no,maximum-scale=${scale},minimum-scale=${scale}`

    if (viewPortEl) {
        viewPortEl.setAttribute('content',content);
    }else {
        viewPortEl= document.createElement('meta');
        viewPortEl.setAttribute('name','viewport');
        viewPortEl.setAttribute('content',content);
        document.head.appendChild(viewPortEl);
    }


    setRemUnit();
    window.addEventListener('resize', setRemUnit);

    function setRemUnit() {
        var ratio = 18.75;
        var viewWidth = window.innerWidth || docEl.clientWidth || docEl.getBoundingClientRect().width

        // 这里viewWidth/dpr是因为可以进行了相应的缩放，因此需要找到他原先的宽度。
        if (maxWidth && (viewWidth / dpr > maxWidth)){
            viewWidth = maxWidth * dpr;
        }else if (minWidth && (viewWidth / dpr <minWidth)){
            viewWidth = minWidth * dpr;
        }

        docEl.style.fontSize = viewWidth / ratio + 'px';
    }
})()