/**
 * Created by Jackie.Wu on 2016/12/22.
 */
window.Toast = function(text) {
    var toast = $('<div class="toast">' + text + '</div>');
    toast.appendTo($('body')).css('left', ($(window).width() - toast.width()) / 2);
    setTimeout(function() {
        toast.animate({opacity: 0}, 2000, 'ease-in-out', function() {
            $(this).remove();
        });
    }, 1000);
};
var num = 1,
    animateTo = 0;
    window.turnTo = function(deviation) {
        animateTo = 1080*num + deviation;
        $('#turnable').css({
            'transform': 'rotate('+ animateTo +'deg)',
            '-moz-transform': 'rotate('+ animateTo +'deg)',
            '-webkit-transform': 'rotate('+ animateTo +'deg)',
            '-o-transform': 'rotate('+ animateTo +'deg)',
            'transition': 'all 3s ease-out',
            '-moz-transition': 'all 3s ease-out',
            '-webkit-transition': 'all 3s ease-out',
            '-o-transition': 'all 3s ease-out'
        });
        num ++;
    };