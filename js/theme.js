/* jQuery CounTo */
(function(a){a.fn.countTo=function(g){g=g||{};return a(this).each(function(){function e(a){a=b.formatter.call(h,a,b);f.html(a)}var b=a.extend({},a.fn.countTo.defaults,{from:a(this).data("from"),to:a(this).data("to"),speed:a(this).data("speed"),refreshInterval:a(this).data("refresh-interval"),decimals:a(this).data("decimals")},g),j=Math.ceil(b.speed/b.refreshInterval),l=(b.to-b.from)/j,h=this,f=a(this),k=0,c=b.from,d=f.data("countTo")||{};f.data("countTo",d);d.interval&&clearInterval(d.interval);d.interval=
setInterval(function(){c+=l;k++;e(c);"function"==typeof b.onUpdate&&b.onUpdate.call(h,c);k>=j&&(f.removeData("countTo"),clearInterval(d.interval),c=b.to,"function"==typeof b.onComplete&&b.onComplete.call(h,c))},b.refreshInterval);e(c)})};a.fn.countTo.defaults={from:0,to:0,speed:1E3,refreshInterval:100,decimals:0,formatter:function(a,e){return a.toFixed(e.decimals)},onUpdate:null,onComplete:null}})(jQuery);

jQuery(document).ready(function($) {
	
	"use strict"; 
	
	$(".menu_area>div>ul").tinyNav();
	if(jQuery().fitVids) { 
		$(".digita-video").fitVids();
		$(".shortwell-video").fitVids();
	}
	 
	$("a[rel^='prettyPhoto']").prettyPhoto({
		custom_markup: '',
		social_tools: false /* html or false to disable */
	});
	
	$("a[class^='prettyPhoto']").prettyPhoto({
		custom_markup: '',
		social_tools: false /* html or false to disable */
	});
	
	$(".shortwell-accordion").accordion({heightStyle: "content"});
	$(".shortwell-alert-close").click(function() { $( this ).parent( ".shortwell-alert-block" ).hide( "slow"); });
	$(".shortwell-tabs").tabs();
	$("h3.shortwell-toggle-trigger").click(function(){$(this).toggleClass("active").next().slideToggle("fast");return false;});
	$('.shortwell-tooltip').tooltip({track: true});
	
	if(jQuery().waypoint) {
		jQuery('.shortwell-counterBox-wrapper').waypoint(function() {
			jQuery(this).find('.display-percentage').each(function() {
				var percentage = jQuery(this).data('percentage');
				jQuery(this).countTo({from: 0, to: percentage, speed: 900});
			});
		}, {
			triggerOnce: true,
			offset: '100%'
		});
	}
	
	if(jQuery().waypoint) {
		jQuery('.shortwell-progressBar').waypoint(function() {
			var percentage = jQuery(this).find('.shortwell-progressBar-content').data('percentage');
			jQuery(this).find('.shortwell-progressBar-content').css('width', '0%');
			jQuery(this).find('.shortwell-progressBar-content').animate({
				width: percentage+'%'
			}, 'slow');
		}, {
			triggerOnce: true,
			offset: '100%'
		});
	}
	
	
	if( $(".faqwell-faq .faqwell-faq-title").hasClass('active') ){
		$(".faqwell-faq .faqwell-faq-title.active").closest('.faqwell-faq').find('.faqwell-faq-details').show();
	}
	$(".faqwell-faq .faqwell-faq-title").click(function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass("active").closest('.faqwell-faq').find('.faqwell-faq-details').slideUp(200);
		}
		else{
			$(this).addClass("active").closest('.faqwell-faq').find('.faqwell-faq-details').slideDown(200);
		}
	});
	
	/* ----------------------------------------------------- */
  	/* contact form ajax validate */	
	$("#contactForm").validate({
		submitHandler:function(form){
			$.ajax({
				type: 'POST',
				url: 'php/sendmail.php',
				data: $("#contactForm").serialize(),
				beforeSend: function(){
					$("#contactForm").hide();
					$(".sending").show();
				},
				success: function(){
					$(".sending").hide();
					$(".formOK").show();
				},
				error: function(html){
					$(".sending").hide();
					$(".formNOK").show();
					$(".formNOK").append(html);
				}
			});
			return false;
		}
	});
	
	
	$("#rsvpForm").validate({
		submitHandler:function(form){
			$.ajax({
				type: 'POST',
				url: 'php/sendrsvp.php',
				data: $("#rsvpForm").serialize(),
				beforeSend: function(){
					$("#rsvpForm").hide();
					$(".sending").show();
				},
				success: function(){
					$(".sending").hide();
					$(".formOK").show();
				},
				error: function(html){
					$(".sending").hide();
					$(".formNOK").show();
					$(".formNOK").append(html);
				}
			});
			return false;
		}
	});
	
	
	
	
	
});


(function( $ ){
    $.fn.digita_stickyMenu = function( options ) {
		
        var $this = this,
        defaults = {
            'left' : 0,
            'top' : 0,
            'menu_offset_top' : $this.offset().top
        },
        settings = $.extend({}, defaults, options);
        $(window).on('scroll.stickyMenu', function(){
            if ($(window).scrollTop() > settings.menu_offset_top)
            { 
                /*$this.css({ 
                    'position': 'fixed',
                    'top':settings.left,
                    'left':settings.top,
                    'zIndex':9999,
					'width':'100%'
                });*/
				$this.addClass('stickyMenu');
            }
            else
            {
                /*$this.css({ 
                    'position': 'relative',
                }); */
				$this.removeClass('stickyMenu');
            }
        });
        return $this;
    };
})(jQuery);

jQuery(document).ready(function($) {
	$('#header').digita_stickyMenu();
});
