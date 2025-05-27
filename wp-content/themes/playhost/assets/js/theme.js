;(function ($) {

    "use strict";
    
    var pxl_scroll_top;
    var pxl_window_height;
    var pxl_window_width;
    var pxl_scroll_status = '';
    var pxl_last_scroll_top = 0;
    $(window).on('load', function () {        
        $(".pxl-loader").addClass("is-loaded");
        if($(document).find('.pxl-loader').length > 0){
            $(".pxl-loader").fadeOut("slow");
        }
        $('.pxl-gallery-scroll').parents('body').addClass('body-overflow').addClass('body-visible-sm');
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();        
        playhost_header_sticky();
        playhost_header_mobile();        
        playhost_footer_fixed();
        playhost_shop_quantity();
    });

    $(window).on('scroll', function () {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
            // scroll indicator
        var pixels = $(document).scrollTop();
        var pageHeight = $(document).height() - $(window).height();
        var progress = (100 * pixels) / pageHeight;
        $("div.scrollbar").css("width", progress + "%");
        $("div.scrollbar-v").css("height", progress + "px");
        playhost_header_sticky();        
        playhost_footer_fixed();
        playhost_scroll_to_top();
        backToTop();
        scrolling();        
    });

    $(window).on('resize', function () {
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();        
        playhost_header_mobile();
    });

    $(document).ready(function () {                 
        $('.pxl-menu-number .pxl-menu-primary > li.menu-item').each(function(index) {        
            var menuNumber = index + 1;        
            $(this).find('> a > span').append('<span class="menu-item-number">' + menuNumber + '</span>');
        });

        $('.pxl-logo-nav').parents('#pxl-header-elementor').addClass('pxl-header-rmboxshadow');      

        /* Start Menu Mobile */
        $('.pxl-header-menu li.menu-item-has-children').append('<span class="pxl-menu-toggle"></span>');
        $('.pxl-menu-toggle').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();    
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).toggleClass('active');
                $(this).parent().find('> .sub-menu').toggleClass('active');
                $(this).parent().find('> .sub-menu').slideToggle();
            }      
        });

        $("#pxl-nav-mobile").on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('body-overflow');
            $('.pxl-header-menu').toggleClass('active');
        });

        $('#pxl-main input[type="submit"]').before(function() {
            return $('<button class="pxl-wobble" data-text="Send" data-animation="pxl-xspin" value="Submit">Send</button>');
        }); 

        $('#de-loader ').prepend($('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'));

            // rangeslider begin
        $('input[type="range"]').rangeslider({
          polyfill: false,

          rangeClass: "rangeslider",
          disabledClass: "rangeslider--disabled",
          horizontalClass: "rangeslider--horizontal",
          fillClass: "rangeslider__fill",
          handleClass: "rangeslider__handle",

          onInit: function () {
            var $rangeEl = this.$range;
            var $handle = $rangeEl.find(".rangeslider__handle");
            var handleValue =
            '<div class="rangeslider__handle__value">' + this.value + "</div>";
            $handle.append(handleValue);

            var rangeLabels = this.$element.attr("labels");
            rangeLabels = rangeLabels.split(", ");

            $rangeEl.append('<div class="rangeslider__labels"></div>');
            $(rangeLabels).each(function (index, value) {
              $rangeEl
              .find(".rangeslider__labels")
              .append(
                  '<span class="rangeslider__labels__label">' + value + "</span>"
                  );
          });
        },

        onSlide: function (position, value) {
            var $handle = this.$range.find(".rangeslider__handle__value");
            $handle.text(this.value);
        },

        onSlideEnd: function (position, value) {}
    });
    // rangeslider end

        /* Custom User */
        function appendLabelToInput(inputId, labelText) {
            var $inputElement = $('#' + inputId);

            if ($inputElement.length) {
                var $labelElement = $('<label>', {
                    'for': inputId,
                    text: labelText
                });

                $inputElement.removeAttr('placeholder');

                $inputElement.before($labelElement);
            }
        }

        appendLabelToInput('user', 'Username or Email');
        appendLabelToInput('pass', 'Password');
        appendLabelToInput('res_user', 'Username or Email:');
        appendLabelToInput('res_email', 'Email Address:');
        appendLabelToInput('res_pass1', 'Password:');
        appendLabelToInput('res_pass2', 'Confirm Password');



        setTimeout(() => {
            var wobbleElements = document.querySelectorAll('.pxl-wobble');
            wobbleElements.forEach(function(el){               
                el.addEventListener('mouseover', function(){

                    if(!el.classList.contains('animating') && !el.classList.contains('mouseover')){

                        el.classList.add('animating','mouseover');

                        var letters = el.innerText.split('');

                        setTimeout(function(){ el.classList.remove('animating'); }, (letters.length + 1) * 50);

                        var animationName = el.dataset.animation;
                        if(!animationName){ animationName = "pxl-jump"; }

                        el.innerText = '';

                        letters.forEach(function(letter){
                            if(letter == " "){
                                letter = "&nbsp;";
                            }
                            el.innerHTML += '<span class="letter">'+letter+'</span>';
                        });

                        var letterElements = el.querySelectorAll('.letter');
                        letterElements.forEach(function(letter, i){
                            setTimeout(function(){
                                letter.classList.add(animationName);
                            }, 50 * i);
                        });

                    }

                });

                el.addEventListener('mouseout', function(){
                    el.classList.remove('mouseover');
                });
            });
        }, 100);

        var post_view = $('.single .pxl---post .post-views');
        var post_meta = $('.single .pxl---post .pxl-item--meta');
        if(post_view) {
            post_meta.append(post_view);
        }

        $(".pxl-menu-close, .pxl-header-menu-backdrop, #pxl-header-mobile .pxl-menu-primary a.is-one-page").on('click', function () {
            $(this).parents('.pxl-header-main').find('.pxl-header-menu').removeClass('active');
            $('#pxl-nav-mobile').removeClass('active');
            $('body').toggleClass('body-overflow');
        });
        /* End Menu Mobile */

        $(".pxl-item--holder .pxl-item--meta .pxl--social").on('click', function () {
            // $(this).parents('.pxl-item--holder').removeClass('active');            
            $(this).parents('.pxl-item--holder').toggleClass('active');
        });

        /* Arrow Custom */
        $('.pxl-tabs').parents('.pxl-tab--title').addClass('pxl--hide-arrow');
        var section_tab = $('.pxl-navigation-tab').parents('.elementor-section').addClass('pxl--hide-arrow');
        setTimeout(function() {
            var target = section_tab.find('.pxl-tabs .pxl-tabs--title');
            var target_clone = target.clone()
            var target_tab = target.parents('.elementor-section.pxl--hide-arrow').find('.pxl-navigation-tab');
            target_tab.append(target_clone);
            target_tab.find('.pxl-tab--title').on('click', function () {    
                $(this).parents('.elementor-section.pxl--hide-arrow').find('.pxl-navigation-tab .pxl-tab--title').toggleClass('active');
                $(this).parents('.elementor-section.pxl--hide-arrow').find('.pxl-tabs .pxl-tab--title').toggleClass('active');
                $(this).parents('.elementor-section.pxl--hide-arrow').find('.pxl-tabs .pxl-tab--title.active').trigger('click');
            });
        }, 300);

        /* Elementor Header */
        $('.pxl-type-header-clip > .elementor-container').append('<div class="pxl-header-shape"><span></span></div>');

        /* Animate Time Delay */
        $('.pxl-grid-masonry').each(function () {
            var eltime = 40;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl-grid-item > .wow').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 'ms');
                if (_elt === index) {
                    eltime = 40;
                    _elt = _elt + elt_inner;
                } else {
                    eltime = eltime + 40;
                }
            });
        });

        $('.pxl-item--text').each(function () {
            var pxl_time = 0;
            var pxl_item_inner = $(this).children().length;
            var _elt = pxl_item_inner - 1;
            $(this).find('> .pxl-text--slide > .wow').each(function (index, obj) {
                $(this).css('transition-delay', pxl_time + 'ms');
                if (_elt === index) {
                    pxl_time = 0;
                    _elt = _elt + pxl_item_inner;
                } else {
                    pxl_time = pxl_time + 80;
                }
            });
        });

        /* Lightbox Popup */
        $('.btn-video, .pxl-video-popup, .pxl--link-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });

        /* Comment Reply */
        $('.comment-reply a').append( '<i class="caseicon-angle-arrow-right"></i>' );

        /* Parallax */
        if($('#pxl-page-title-default').hasClass('pxl--parallax')) {
            $(this).stellar();
        }
        if($(window).innerWidth() >= 1024){
            setTimeout(function() {
                if($('.pxl-parallax--image').hasClass('pxl--parallax')) {            
                    $(this).stellar();            
                }
            }, 300);
        }

        /* Scroll To Top */
        $('.pxl-scroll-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* Animate Time */
        $('.btn-nina').each(function () {
            var eltime = 0.045;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span').each(function (index, obj) {
                $(this).css('transition-delay', eltime + 's');
                eltime = eltime + 0.045;
            });
        });

        /* Search Popup */
        var $search_wrap_init = $("#pxl-search-popup");
        var search_field = $('#pxl-search-popup .search-field');
        var $body = $('body');

        $(".pxl-search-popup-button").on('click', function(e) {
            if (!$search_wrap_init.hasClass('active')) {
                $search_wrap_init.addClass('active');
                setTimeout(function() { search_field.get(0).focus(); }, 500);
            } else if (search_field.val() === '') {
                $search_wrap_init.removeClass('active');
                search_field.get(0).focus();
            }
            e.preventDefault();
            return false;
        });

        $("#pxl-search-popup .pxl-item--overlay, #pxl-search-popup .pxl-item--close").on('click', function (e) {
            $body.addClass('pxl-search-out-anim');
            setTimeout(function () {
                $body.removeClass('pxl-search-out-anim');
            }, 800);
            setTimeout(function () {
                $search_wrap_init.removeClass('active');
            }, 1200);
            e.preventDefault();
            return false;
        });

        /* Hidden Panel */
        $(".pxl-hidden-panel-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-hidden-panel-popup').addClass('active');
        });
        $("#pxl-hidden-panel-popup .pxl-item--overlay, #pxl-hidden-panel-popup .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-hidden-panel-popup').removeClass('active');
        });

        /* Cart Sidebar Popup */
        $(".pxl-cart-sidebar-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-cart-sidebar').addClass('active');
        });
        $("#pxl-cart-sidebar .pxl-item--overlay, #pxl-cart-sidebar .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-cart-sidebar').removeClass('active');
        });

        /* Popup */
        $(".pxl-popup-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-popup-elementor').addClass('active');
            $('#pxl-popup-elementor').removeClass('deactivation');
        });
        $("#pxl-popup-elementor .pxl-item--overlay, #pxl-popup-elementor .pxl-item--close, .pxl-menu-primary a.is-one-page").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-popup-elementor').removeClass('active');
            $('#pxl-popup-elementor').addClass('deactivation');
        });

        /* Hover Active Item */
        $('.pxl--widget-hover').each(function () {
            $(this).hover(function () {
                $(this).parents('.elementor-row').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).parents('.elementor-container').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).addClass('pxl--item-active');
            });
        });

        /* Hover Button */
        $('.btn-plus-text').hover(function () {
            $(this).find('span').toggle(300);
        });

        /* Nav Logo */
        $(".pxl-nav-button").on('click', function () {
            $('.pxl-nav-button').toggleClass('active');
            $('.pxl-nav-button').parent().find('.pxl-nav-wrap').toggle(400);
        });

        /* Button Mask */
        $('.pxl-btn-effect4').append('<span class="pxl-btn-mask"></span>');

        /* Start Icon Bounce */
        var boxEls = $('.el-bounce, .pxl-image-effect1');
        $.each(boxEls, function(boxIndex, boxEl) {
            loopToggleClass(boxEl, 'bounce-active');
        });

        function loopToggleClass(el, toggleClass) {
            el = $(el);
            let counter = 0;
            if (el.hasClass(toggleClass)) {
                waitFor(function () {
                    counter++;
                    return counter == 2;
                }, function () {
                    counter = 0;
                    el.removeClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Deactivate', 1000);
            } else {
                waitFor(function () {
                    counter++;
                    return counter == 3;
                }, function () {
                    counter = 0;
                    el.addClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Activate', 1000);
            }
        }

        function waitFor(condition, callback, message, time) {
            if (message == null || message == '' || typeof message == 'undefined') {
                message = 'Timeout';
            }
            if (time == null || time == '' || typeof time == 'undefined') {
                time = 100;
            }
            var cond = condition();
            if (cond) {
                callback();
            } else {
                setTimeout(function() {
                    waitFor(condition, callback, message, time);
                }, time);
            }
        }
        /* End Icon Bounce */

        /* Image Effect */
        if($('.pxl-image-tilt').length){
            $('.pxl-image-tilt').parents('.elementor-top-section').addClass('pxl-image-tilt-active');
            $('.pxl-image-tilt').each(function () {
                var pxl_maxtilt = $(this).data('maxtilt'),
                pxl_speedtilt = $(this).data('speedtilt'),
                pxl_perspectivetilt = $(this).data('perspectivetilt');
                VanillaTilt.init(this, {
                    max: pxl_maxtilt,
                    speed: pxl_speedtilt,
                    perspective: pxl_perspectivetilt
                });
            });
        }

        /* Select Theme Style */
        $('.wpcf7-select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('pxl-select-hidden'); 
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });

            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
            });

        });

        /* Nice Select */
        $('.woocommerce-ordering .orderby, #pxl-sidebar-area select, .pxl-bmi-bmr select').each(function () {
            $(this).niceSelect();
        });

        /* Item Hover - Description */
        $( ".pxl-content-effect .pxl-item--inner" ).hover(
          function() {
            $( this ).find('.pxl-item--effect').slideToggle(250);
        }, function() {
            $( this ).find('.pxl-item--effect').slideToggle(250);
        }
        );

        /* Typewriter */
        if($('.pxl-title--typewriter').length) {
            function typewriterOut(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 );
                    elements.eq(0).removeClass('is-active');
                    typewriterOut(elements.slice(1), callback);
                }
                else {
                    callback();
                }
            }

            function typewriterIn(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 ).slideDown(3000, function(){
                        elements.eq(0).removeClass('is-active');
                        typewriterIn(elements.slice(1), callback);
                    });
                }
                else {
                    callback();
                }
            }

            function typewriterInfinite(){
                typewriterOut($('.pxl-title--typewriter .pxl-item--text'), function(){ 
                    typewriterIn($('.pxl-title--typewriter .pxl-item--text'), function(){
                        typewriterInfinite();
                    });
                });
            }
            $(function(){
                typewriterInfinite();
            });
        }
        /* End Typewriter */

            /* Get Mouse Move Direction */
        function getDirection(ev, obj) {
            var w = $(obj).width(),
            h = $(obj).height(),
            x = (ev.pageX - $(obj).offset().left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (ev.pageY - $(obj).offset().top - (h / 2)) * (h > w ? (w / h) : 1),
            d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
            return d;
        }
        function addClass( ev, obj, state ) {
            var direction = getDirection( ev, obj ),
            class_suffix = null;
            $(obj).removeAttr('class');
            switch ( direction ) {
            case 0 : class_suffix = '--top';    break;
            case 1 : class_suffix = '--right';  break;
            case 2 : class_suffix = '--bottom'; break;
            case 3 : class_suffix = '--left';   break;
            }
            $(obj).addClass( state + class_suffix );
        }
        $.fn.ctDeriction = function () {
            this.each(function () {
                $(this).on('mouseenter',function(ev){
                    addClass( ev, this, 'pxl-in' );
                });
                $(this).on('mouseleave',function(ev){
                    addClass( ev, this, 'pxl-out' );
                });
            });
        }
        $('.pxl-effect--3d .pxl-effect--direction').ctDeriction();

        /* Section Particles */      
        setTimeout(function() {
            $(".pxl-row-particles").each(function() {
                particlesJS($(this).attr('id'), {
                  "particles": {
                    "number": {
                        "value": $(this).data('number'),
                    },
                    "color": {
                        "value": $(this).data('color')
                    },
                    "shape": {
                        "type": "circle",
                    },
                    "size": {
                        "value": $(this).data('size'),
                        "random": $(this).data('size-random'),
                    },
                    "line_linked": {
                        "enable": false,
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": $(this).data('move-direction'),
                        "random": true,
                        "out_mode": "out",
                    }
                },
                "retina_detect": true
            });
            });
        }, 400);

        /* Get checked input - Mailchimpp */
        $('.mc4wp-form input:checkbox').change(function(){
            if($(this).is(":checked")) {
                $('.mc4wp-form').addClass("pxl-input-checked");
            } else {
                $('.mc4wp-form').removeClass("pxl-input-checked");
            }
        });

        /* Alert */
        $(".pxl-alert .pxl-alert--close").on('click', function () {
            $(this).parent().fadeOut();
        });

    });

jQuery(document).ajaxComplete(function(event, xhr, settings){
    playhost_shop_quantity();
});

jQuery( document ).on( 'updated_wc_div', function() {
    playhost_shop_quantity();
} );

            /* --------------------------------------------------
              * back to top
              * --------------------------------------------------*/
var scrollTrigger = 100;
var t = 0;

$('.server_location').select2({
   minimumResultsForSearch: Infinity,
   templateResult: formatState,
   templateSelection: formatState,
   width: '100%'
});

function formatState (state) {
   if (!state.id) { return state.text; }
   var $state = $(
     '<span><img src="' + $(state.element).attr('data-src') + '" class="img-flag" /> ' + state.text + '</span>'
     );
   return $state;
};

function backToTop() {
 var scrollTop = $(window).scrollTop();
 if (scrollTop > scrollTrigger) {
     $('.show-on-scroll').addClass('show');
     $('.show-on-scroll').removeClass('hide');
     t = 1;
 }

 if (scrollTop < scrollTrigger && t === 1) {
     $('.show-on-scroll').addClass('hide');
 }

 $('.show-on-scroll').on('click', function(e) {
     e.preventDefault();
     $('html,body').stop(true).animate({
         scrollTop: 0
     }, 700);
 });
};

               /* Scroll To Top */
function playhost_scroll_to_top() {
    if (pxl_scroll_top < pxl_window_height) {
        $('.pxl-scroll-top').addClass('pxl-off').removeClass('pxl-on');
    }
    if (pxl_scroll_top > pxl_window_height) {
        $('.pxl-scroll-top').addClass('pxl-on').removeClass('pxl-off');
    }
}

function scrolling() {
 var mq = window.matchMedia("(min-width: 993px)");
 var ms = window.matchMedia("(min-width: 768px)");
 if (mq.matches) {
     var distanceY = window.pageYOffset || document.documentElement.scrollTop,
     shrinkOn = 0,
     header = jQuery("header");
     var header_fix = header.find('.pxl-header--fix');
     if (distanceY > shrinkOn) {
         header_fix.addClass("smaller");
     } else {
         if (header_fix.hasClass('smaller')) {
             header_fix.removeClass('smaller');
         }
     }
 }
}

    /* Header Sticky */
function playhost_header_sticky() {
    if($('#pxl-header-elementor').hasClass('is-sticky')) {
        if (pxl_scroll_top > 100) {
            $('.pxl-header-elementor-sticky.pxl-sticky-stb').addClass('pxl-header-fixed');
            $('#pxl-header-mobile').addClass('pxl-header-mobile-fixed');
        } else {
            $('.pxl-header-elementor-sticky.pxl-sticky-stb').removeClass('pxl-header-fixed');
            $('#pxl-header-mobile').removeClass('pxl-header-mobile-fixed');
        }

        if (pxl_scroll_status == 'up' && pxl_scroll_top > 100) {
            $('.pxl-header-elementor-sticky.pxl-sticky-stt').addClass('pxl-header-fixed');
        } else {
            $('.pxl-header-elementor-sticky.pxl-sticky-stt').removeClass('pxl-header-fixed');
        }
    }

    $('.pxl-header-elementor-sticky').parents('body').addClass('pxl-header-sticky');
}

    /* Header Mobile */
function playhost_header_mobile() {
    var h_header_mobile = $('#pxl-header-elementor').outerHeight();
    if(pxl_window_width < 1199) {
        $('#pxl-header-elementor').css('min-height', h_header_mobile + 'px');
    }
}

    /* Footer Fixed */
function playhost_footer_fixed() {
    setTimeout(function(){
        var h_footer = $('.pxl-footer-fixed #pxl-footer-elementor').outerHeight() - 1;
        $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
    }, 600);
}

    /* WooComerce Quantity */
function playhost_shop_quantity() {
    "use strict";
    $('#pxl-wapper .quantity').append('<span class="quantity-icon quantity-down pxl-icon--minus"></span><span class="quantity-icon quantity-up pxl-icon--plus"></span>');
    $('.quantity-up').on('click', function () {
        $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
        $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
    });
    $('.quantity-down').on('click', function () {
        $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
        $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
    });
    $('.quantity-icon').on('click', function () {
        var quantity_number = $(this).parents('.quantity').find('input[type="number"]').val();
        var add_to_cart_button = $(this).parents( ".product, .woocommerce-product-inner" ).find(".add_to_cart_button");
        add_to_cart_button.attr('data-quantity', quantity_number);
        add_to_cart_button.attr("href", "?add-to-cart=" + add_to_cart_button.attr("data-product_id") + "&quantity=" + quantity_number);
    });
    $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
}
})(jQuery);
