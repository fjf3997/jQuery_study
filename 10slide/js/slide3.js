$(function(){
    var $slide_list = $('.slide');
    var $lis = $('.slide_list li');
    var $count = $lis.length;
    var $points_con = $('.points');
    var $prev = $('.prev');
    var $next = $('.next');
    var timer = null;
    var ismove = false;

    for(var i = 0;i<$count;i++){
        var li = $('<li></li>')
        if(i==0){
            li.addClass('active');
        }
        $points_con.append(li);
    }
    $lis.not(':first').css({'left':760});
    var $points = $('.points li')
    var $current_p = 0;
    var $prev_p = 0;
    $prev.click(function(){
        if(ismove){
            return;
        }
        ismove = true;
        $current_p--;
        moving();
        $points.eq($current_p).addClass('active').siblings().removeClass('active');

    })
    $next.click(function(){
        if(ismove){
            return;
        }
        ismove = true;
        $current_p++;
        moving();
        $points.eq($current_p).addClass('active').siblings().removeClass('active');

    })
    $points.click(function(){
        $current_p = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        if($current_p == $prev_p){
            return;
        }
        
        moving();
    });
    var timer = setInterval(autoPlay, 2000);
    $slide_list.mouseenter(function () { 
        clearInterval(timer);
    });
    $slide_list.mouseleave(function(){
        timer = setInterval(autoPlay, 2000);
    });
    function autoPlay(){
        $current_p++;
        moving();
        $points.eq($current_p).addClass('active').siblings().removeClass('active');
    }
    function moving(){
        if($current_p<0){
            $current_p = $count-1;
            $prev_p = 0;
            $lis.eq($current_p).css({'left':-760});
            $lis.eq($prev_p).animate({'left':760});
            $prev_p = $current_p;
            $lis.eq($current_p).animate({'left':0},function(){
                ismove = false;
            });
            return;
        }
        if($current_p>$count-1){
            $current_p = 0;
            $prev_p = $count - 1;
            $lis.eq($current_p).css({'left':760});
            $lis.eq($prev_p).animate({'left':-760});
            $prev_p = $current_p;
            $lis.eq($current_p).animate({'left':0},function(){
                ismove = false;
            });
            return;
        }
        if($current_p > $prev_p){
            $lis.eq($current_p).css({'left':'760px'});
            $lis.eq($prev_p).animate({'left':'-760px'});
        }else{
            $lis.eq($current_p).css({'left':-760});
            $lis.eq($prev_p).animate({'left':760});
        }
        $prev_p = $current_p;
        $lis.eq($current_p).animate({'left':0},function(){
            ismove = false;
        });
    }

})