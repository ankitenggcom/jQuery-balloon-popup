(function($){
    $.balloon_popup = {
        height: 0,
        width: 0,
        tmpl: function(content){
            balloon_tmpl = "<div class='new_balloon_container'>";
            balloon_tmpl += "<div class='top_left'></div>";
            balloon_tmpl += "<div class='b_width top_border'></div>";
            balloon_tmpl += "<div class='top_right'></div>";
            balloon_tmpl += "<div class='clear'></div>";
            balloon_tmpl += "<div class='b_height middle_left'></div>";
            balloon_tmpl += "<div class='b_height middle_content'>" + content + "</div>";
            balloon_tmpl += "<div class='b_height middle_right'></div>";
            balloon_tmpl += "<div class='clear'></div>";
            balloon_tmpl += "<div class='bottom_left'></div>";
            balloon_tmpl += "<div class='b_width bottom_border'></div>";
            balloon_tmpl += "<div class='bottom_right'></div>";
            balloon_tmpl += "<div class='clear'></div>";
            balloon_tmpl += "<div class='pointer'></div></div>";
            return balloon_tmpl;
        },
        setHeightWidth: function(){
            $('.new_balloon_container').css('visibility', 'hidden');
            $('.new_balloon_container').show();
            $('.new_balloon_container').css('visibility', 'visible');
            this.height = $('.middle_content').height()
            this.width = $('.middle_content').width()
            $('.b_height').height(this.height);
            $('.b_width').width(this.width);
            $('.new_balloon_container').hide();
        },
        setPosition: function(e){
            var top = e.pageY + 50;
            var left = e.pageX;
            var p_top = -29;
            var p_left = 20;
            var p_class = '';
            final_window_height = e.pageY - ($(window).scrollTop() + this.height + 32);
            final_window_width = e.pageX - ($(window).scrollLeft() + this.width);
            if (final_window_height >= $('window').height()) {
                top = top - this.height - 110;
                p_class = "up_right";
                p_top = this.height + 19;
            }
            if (final_window_width >= $('window').width()) {
                left = left - this.width - 20;
                p_class = "down_left";
                p_left = this.width - 40;
            }
            if ((final_window_height >= $('window').height()) && (final_window_width >= $('window').width())) {
                p_class = "up_left";
            }
			if (final_window_width < 0)
				p_class = "up_right";
			if (final_window_height < 0)
				p_class = "down_left";
				
			$('.new_balloon_container').css('top', top);
            $('.new_balloon_container').css('left', left);
            $('.pointer').css("top", p_top);
            $('.pointer').css("left", p_left);
            $('.pointer').addClass(p_class);
        }
    };
    $.fn.balloon_popup = function(){
        hideTimer = null;
        hideDelay = 100;
        this.each(function(){
            $(this).mousemove(function(e){
                if (hideTimer) 
                    clearTimeout(hideTimer);
                if (!$('.new_balloon_container').is(':visible')) {
                    $('body').append($.balloon_popup.tmpl($(this).attr('message')));
                    $.balloon_popup.setHeightWidth();
                    $.balloon_popup.setPosition(e);
                    $('.new_balloon_container').show();
                }
                $.balloon_popup.setPosition(e);
            }).mouseout(function(e){
                hideTimer = setTimeout("$('.new_balloon_container').hide()", hideDelay);
                $('.new_balloon_container').remove();
            });
        });
    }
})(jQuery);
