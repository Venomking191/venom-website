( function( $ ) {

        //animation
    function playhost_animation_handler($scope){   
        elementorFrontend.waypoint($scope.find('.pxl-animate'), function () {
            var $animate_el = $(this),
            data = $animate_el.data('settings');  
            if(typeof data != 'undefined' && typeof data['animation'] != 'undefined'){
                setTimeout(function () {
                    $animate_el.removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);
            }else{
                setTimeout(function () {
                    $animate_el.removeClass('pxl-invisible').addClass('animated fadeInUp');
                }, 300);
            }
        });
        elementorFrontend.waypoint($scope.find('.pxl-divider.animated'), function () {
            $(this).addClass('pxl-animated');
        }); 
    }

    function playhost_css_inline_js(){
        var _inline_css = "<style>";
        $(document).find('.pxl-inline-css').each(function () {
            var _this = $(this);
            _inline_css += _this.attr("data-css") + " ";
            _this.remove();
        });
        _inline_css += "</style>";
        $('head').append(_inline_css);
    }

    function playhost_zoom_point_js(){
        elementorFrontend.waypoint($(document).find('.pxl-zoom-point'), function () {
            var offset = $(this).offset();
            var offset_top = offset.top;
            var scroll_top = $(window).scrollTop();
        }, {
            offset: -100,
            triggerOnce: true
        });
    }

    function playhost_text_marquee($scope){

        const text_marquee = $scope.find('.pxl-text--marquee');

        const boxes = gsap.utils.toArray(text_marquee);

        const loop = text_horizontalLoop(boxes, {paused: false,repeat: -1,});

        function text_horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
            length = items.length,
            startX = items[0].offsetLeft,
            times = [],
            widths = [],
            xPercents = [],
            curIndex = 0,
            pixelsPerSecond = (config.speed || 1) * 300,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
            totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, {
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, {x: 0});
            totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
                .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
                .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
                let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
                if (time > tl.time() !== index > curIndex) { 
                    vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex+1, vars);
            tl.previous = vars => toIndex(curIndex-1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true);
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            return tl;
        }
    }

    function playhost_section_before_render(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl-custom-section/before-render', function( html, settings, el ) {
            if (typeof settings['row_divider'] !== 'undefined') {
                if(settings['row_divider'] == 'angle-top' || settings['row_divider'] == 'angle-bottom' || settings['row_divider'] == 'angle-top-right' || settings['row_divider'] == 'angle-bottom-left') {
                    html =  '<svg class="pxl-row-angle" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>';
                    return html;
                }
                if(settings['row_divider'] == 'angle-top-bottom' || settings['row_divider'] == 'angle-top-bottom-left') {
                    html =  '<svg class="pxl-row-angle pxl-row-angle-top" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg><svg class="pxl-row-angle pxl-row-angle-bottom" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>';
                    return html;
                }
                if(settings['row_divider'] == 'wave-animation-top' || settings['row_divider'] == 'wave-animation-bottom') {
                    html =  '<svg class="pxl-row-angle" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 150" fill="#fff"><path d="M 0 26.1978 C 275.76 83.8152 430.707 65.0509 716.279 25.6386 C 930.422 -3.86123 1210.32 -3.98357 1439 9.18045 C 2072.34 45.9691 2201.93 62.4429 2560 26.198 V 172.199 L 0 172.199 V 26.1978 Z"><animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="10s" values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z; M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z; M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z; M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z"></animate></path></svg>';
                    return html;
                }
                if(settings['row_divider'] == 'curved-top' || settings['row_divider'] == 'curved-bottom') {
                    html =  '<svg class="pxl-row-angle" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1920 128" version="1.1" preserveAspectRatio="none" style="fill:#ffffff"><path stroke-width="0" d="M-1,126a3693.886,3693.886,0,0,1,1921,2.125V-192H-7Z"></path></svg>';
                    return html;
                }
            }
        } );
    }   

    function playhost_tab_icon_box($scope) {      
        var scope1 = $('.pxl-tab-icon-box1');
        scope1.find(".pxl--item").on("click", function(e){
            e.preventDefault();
            var targetid = $(this).data("target");
        var target = $(targetid); // Select the target element using the ID obtained from data-target
        console.log(target);
        var parent = $(this).parents(".pxl-tab-icon-box-inner");
        parent.find(".pxl-item--inner").removeClass("active wow skewIn");
        parent.find(".pxl--item").removeClass('active');
        $(this).addClass("active");
        target.addClass("active wow skewIn");
    });      
    var visibleTabs = 4; // Change this as per your preference
    var increment = 4;   // Change this as per your preference
    $('.pxl-tab-icon-box1 .pxl--item').each(function (index) {
        if (index >= visibleTabs) {
            $(this).css('display', 'none');
        }
    });

    $('#loadMoreButton').on('click', function () {            
        $('.pxl--item:hidden').slice(0, increment).slideDown();
        if ($('.pxl--item:hidden').length === 0) {
            $('#loadMoreButton').fadeOut('slow');
        }
    });
}

function playhost_col_offset($scope) {
    var pxl_window_width = $(window).width();
    var w_vc_row_lg = ($('#pxl-main').width() - 1300) / 2;

    if (pxl_window_width > 1200) {
        var isRtl = $('body').hasClass('rtl');
        
        var leftPaddingSelector = isRtl ? '.col-offset-right' : '.pxl-section-offset-left';
        var rightPaddingSelector = isRtl ? '.col-offset-left' : '.pxl-section-offset-right';
        
        var $leftElements = $scope.find(leftPaddingSelector + '.elementor-column > .elementor-widget-wrap');
        var $rightElements = $scope.find(rightPaddingSelector + '.elementor-column > .elementor-widget-wrap');

        $leftElements.css(isRtl ? 'padding-right' : 'padding-left', w_vc_row_lg + 'px');
        $rightElements.css(isRtl ? 'padding-left' : 'padding-right', w_vc_row_lg + 'px');
    }
}

function slide_vertical($scope) {
    var height_slide = $('.pxl-sliders-wrap.pxl-slider-thumbs >.pxl-slider-container').height();
    $('.pxl-sliders-wrap.pxl-slider-thumbs .pxl-sliders-thumbs.thumbs-1').height(height_slide);
}

var PXL_Icon_Contact_Form = function( $scope, $ ) {

    setTimeout(function () {
        $('.pxl--item').each(function () {
            var icon_input = $(this).find(".pxl--form-icon"),
            control_wrap = $(this).find('.wpcf7-form-control');
            control_wrap.before(icon_input.clone());
            icon_input.remove();
        });
    }, 50);

};

$( window ).on( 'elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
        playhost_animation_handler($scope);
        slide_vertical($scope);        
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
        playhost_tab_icon_box($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
        playhost_col_offset($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_text_marquee.default', function( $scope ) {
        playhost_text_marquee($scope);
    } );
    playhost_css_inline_js();
    playhost_zoom_point_js();
    playhost_section_before_render();
    elementorFrontend.hooks.addAction( 'frontend/element_ready/contact_form.default', PXL_Icon_Contact_Form );
} );

} )( jQuery );