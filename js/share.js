var DpShare = function() {
    return DpShare['init'].apply(DpShare, arguments);
};

(function(exp) {

    var shareWX = {
        appid: 'wx89c5b3c92a320ea8',
        title: document.title,
        desc: '分享来自JYSK北欧睡眠',
        content: '',
        feed: [],
        link: location.origin + location.pathname,
        img_url: 'http://evt.dianping.com/midas/dper.jpg'
    };

    exp.init = function(opt) {

        exp.ua = navigator.userAgent.toLowerCase();
        exp.initShareCallback = opt.initShareCallback;
        exp.initShareFail = opt.initShareFail;
        exp.getCXCallback = opt.getCXCallback;
        if (opt.shadowId) {
            exp.shadowId = opt.shadowId;
        }
        exp.wechat = 0;
        exp.changeShare(opt);

    };

    exp.changeShare = function(opts) {

        for(var i in opts) {
            if(opts[i]){
                if (i == 'feed') {
                    var feedArray = opts[i].split(','),
                        feedF = [];
                    feedArray.forEach(function(e){
                        feedF.push(DPApp.Share[e]);
                    });
                    shareWX[i] = feedF;
                } else {
                    shareWX[i] = opts[i];
                }
            }
        }

        shareWX.link = exp.hrefDelete(shareWX.link);
        shareWXTL = {
            appid: shareWX.appid,
            title: '【' + shareWX.title + '】 ' + shareWX.desc,
            desc: shareWX.desc,
            content: shareWX.content,
            link: shareWX.link,
            img_url: shareWX.img_url
        };
        exp.autoListenWx();

        if (exp.ua.match('dianping')) {
            exp.DPAppReady(function(){
                exp.dpShareInit();
                exp.getCx();
            });
        }

    };




    exp.btnShare = function (option) {

        exp.changeShare(option);
        exp.initShareCallback = option.initShareCallback;


        //微信
        exp.wechat = (exp.ua.match('micromessenger')) ? 1 : 0;
        if (exp.wechat || typeof WeixinJSBridge != 'undefined') {
            if (option.shadowId) {
                var shadowId = document.getElementById(option.shadowId);
                shadowId.style.display = 'block';
                setTimeout(function(){
                    shadowId.addEventListener('click', function () {
                        shadowId.style.display = 'none';
                    }, false);
                },1500);
            } else {
                div = document.createElement('div');
                div.style.width = innerWidth;
                div.style.height = innerHeight;
                div.style.position = 'fixed';
                div.style.top = 0;
                div.style.left = 0;
                div.style.right = 0;
                div.style.bottom = 0;
                div.style.zIndex = 99999;
                div.style.backgroundColor = 'rgba(0,0,0,.8)';
                div.style.backgroundImage = 'url(http://si1.s1.dpfile.com/t/cssnew/events/labevent/seefilm/mmimages/share-cover-tips.e3893cb7ee521914fd768d05fab419b3.png)';
                div.style.backgroundRepeat = 'no-repeat';
                div.style.backgroundSize = 100 + '%';
                div.addEventListener('click', function () {
                    this.parentNode.removeChild(this);
                }, false);
                document.body.insertBefore(div, document.body.firstChild);
            }
        }

    };


    exp.autoListenWx = function() {

        var wxFunction = function() {
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                WeixinJSBridge.invoke('sendAppMessage', shareWX, function (res) {
                    exp.initShareCallback && exp.initShareCallback();
                    Stts.special('分享成功');
                });
            });
            WeixinJSBridge.on('menu:share:timeline', function (argv) {
                WeixinJSBridge.invoke('shareTimeline', shareWXTL, function (res) {
                    exp.initShareCallback && exp.initShareCallback();
                    Stts.special('分享成功');
                });
            });
        };

        if (window.WeixinJSBridge) {
            wxFunction();
        } else {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                wxFunction();
            }, false);
        }

    };

})(DpShare);