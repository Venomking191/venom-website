( function( $ ) { 
    const progressBar = document.querySelector('.swiper-hero-progress');
    const fraction1 = document.getElementById("style-fraction");
    const slides1 = document.querySelectorAll(".pxl-slider-item");
    const slideCount1 = slides1.length;
    if (fraction1) {
        const fraction_span1 = document.createElement("span");
        fraction_span1.classList.add('slidenumber');
        fraction_span1.textContent = `1 `;                
        fraction1.appendChild(fraction_span1);
        const fraction_span2 = document.createElement("span");
        fraction_span2.classList.add('totalslides');
        fraction_span2.textContent = `/ ${slideCount1}`;                
        fraction1.appendChild(fraction_span2);
    }
    const fraction1_span = document.querySelector(".slidenumber");  
    const pxl_slider_handler = function( $scope, $ ) {
        var breakpoints = elementorFrontend.config.breakpoints,
        carousel = $scope.find(".pxl-slider-container");
        if(carousel.length == 0){
            return false;
        }

        var data = carousel.data(), 
        settings = data.settings,
        custom_dots = data.customdot,
        carousel_settings = {
            direction: settings['slide_direction'],
            effect: settings['slide_mode'],
            wrapperClass : 'pxl-slider-wrapper',
            slideClass: 'pxl-slider-item',
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
            navigation: {
              nextEl: $scope.find(".pxl-slider-arrow-next"),
              prevEl: $scope.find(".pxl-slider-arrow-prev"),
          },
          pagination : {
            type: settings['dots_style'],
            el: $scope.find('.pxl-slider-dots'),
            clickable : true,
            modifierClass: 'pxl-slider-pagination-',
            bulletClass : 'pxl-slider-pagination-bullet',
            formatFractionCurrent: function (number) {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: function (number) {
                return ('0' + number).slice(-2);
            },
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' +
                '<span class="divider">/</span>' +
                '<span class="' + totalClass + '"></span>';
            },
            renderCustom: function (swiper, element, current, total) {
                return current + ' of ' + total;
            }
        },
        speed: settings['speed'],
        watchSlidesProgress: true,
        watchSlidesVisibility: true,     
        autoplay: {
            delay : settings['delay'],
            disableOnInteraction : settings['pause_on_interaction']
        },
        on: {
            init : function (swiper){ 
                elementorFrontend.waypoint($scope.find('.pxl-animate'), function () {
                    var $this = $(this),
                    data = $this.data('settings');
                    if(typeof data['animation'] != 'undefined'){
                        setTimeout(function () {
                            $this.removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                        }, data['animation_delay']);
                    }
                });
                pxl_ken_burns(this);  
            },
            slideChangeTransitionStart : function (swiper){
                var activeIndex = this.activeIndex;
                var current = this.slides.eq(activeIndex);

                $scope.find('.pxl-elementor-animate').each(function(){
                    var data = $(this).data('settings');
                    if(typeof data['_animation'] != 'undefined')
                        $(this).removeClass('animated '+data['_animation']).addClass('elementor-invisible');
                });
                current.find('.pxl-elementor-animate').each(function(){
                    var  $item = $(this), 
                    data = $item.data('settings');
                    if(typeof data['_animation'] != 'undefined'){
                        setTimeout(function () {  
                            $item.removeClass('elementor-invisible').addClass('animated ' + data['_animation']);
                        }, data['_animation_delay']);
                    }
                });

                $scope.find('.swiper-slide .pxl-animate').each(function(){
                    var data = $(this).data('settings');
                    $(this).removeClass('animated '+data['animation']).addClass('pxl-invisible');
                });
                current.find('.pxl-animate').each(function(){
                    var  $item = $(this), 
                    data = $item.data('settings');
                    setTimeout(function () {
                        $item.removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                    }, data['animation_delay']);
                });
                pxl_ken_burns(this);  

            },
            slideChange: function (swiper) { 

                var activeIndex = this.activeIndex; 
                var current = this.slides.eq(activeIndex);
                // 
                if (fraction1_span) {
                    fraction1_span.textContent = `${this.realIndex + 1} `;        
                }

                $scope.find('.pxl-elementor-animate').each(function(){
                    var data = $(this).data('settings');
                    if(typeof data['_animation'] != 'undefined')
                        $(this).removeClass('wow animated '+data['_animation']).addClass('elementor-invisible');
                });
                current.find('.pxl-elementor-animate').each(function(){
                    var  $item = $(this), 
                    data = $item.data('settings');
                    if(typeof data['_animation'] != 'undefined'){
                        setTimeout(function () {  
                            $item.removeClass('elementor-invisible').addClass('wow animated ' + data['_animation']);
                        }, data['_animation_delay']);
                    }
                });

                $scope.find('.swiper-slide .pxl-animate').each(function(){
                    var data = $(this).data('settings');
                    $(this).removeClass('wow animated '+data['animation']).addClass('pxl-invisible');
                });
                current.find('.pxl-animate').each(function(){
                    var  $item = $(this), 
                    data = $item.data('settings');
                    setTimeout(function () {
                        $item.removeClass('pxl-invisible').addClass('wow animated ' + data['animation']);
                    }, data['animation_delay']);
                });
                pxl_ken_burns(this); 

                if($scope.find('.layout-square-thums').length > 0){
                    var total_slide = $scope.find('.pxl-slider-wrapper').attr('data-count');
                    var ridx = this.realIndex;
                    if(settings['loop'] === 'true'){
                        if( ridx == 0 ){
                            var prev_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(parseInt(total_slide) - 1)+'"] .item-thumb').attr('data-thumb');
                            var next_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="1"] .item-thumb').attr('data-thumb');
                        }else if(ridx == parseInt(total_slide) - 1) {
                            var prev_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-thumb');
                            var next_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="0"] .item-thumb').attr('data-thumb');
                        }else{
                            var prev_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-thumb');
                            var next_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx + 1)+'"] .item-thumb').attr('data-thumb');
                        }
                    }else{ 
                        if( ridx == 0 ){
                            var prev_thumb = this.slides.eq(parseInt(total_slide) - 1).find('.item-thumb').attr('data-thumb');
                            var next_thumb = this.slides.eq(1).find('.item-thumb').attr('data-thumb');
                        }else if(ridx == parseInt(total_slide) - 1) {
                            var prev_thumb = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-thumb');
                            var next_thumb = this.slides.eq(0).find('.item-thumb').attr('data-thumb');
                        }else{
                            var prev_thumb = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-thumb');
                            var next_thumb = this.slides.eq(ridx + 1).find('.item-thumb').attr('data-thumb');
                        }
                    }
                    $scope.find('.layout-square-thums .pxl-slider-arrow-prev').css('background-image','url('+prev_thumb+')');
                    $scope.find('.layout-square-thums .pxl-slider-arrow-next').css('background-image','url('+next_thumb+')');
                }
                if($scope.find('.layout-thums-title').length > 0){
                    var total_slide = $scope.find('.pxl-slider-wrapper').attr('data-count');
                    var ridx = this.realIndex;
                    if(settings['loop'] === 'true'){
                        if( ridx == 0 ){
                            var prev_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(parseInt(total_slide) - 1)+'"] .item-thumb').attr('data-thumb');
                            var next_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="1"] .item-thumb').attr('data-thumb');
                            var prev_sub_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(parseInt(total_slide) - 1)+'"] .item-thumb').attr('data-subtitle');
                            var prev_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(parseInt(total_slide) - 1)+'"] .item-thumb').attr('data-title');
                            var next_sub_title = $scope.find('.swiper-slide[data-swiper-slide-index="1"] .item-thumb').attr('data-subtitle');
                            var next_title = $scope.find('.swiper-slide[data-swiper-slide-index="1"] .item-thumb').attr('data-title');
                        }else if(ridx == parseInt(total_slide) - 1) {
                            var prev_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-thumb');
                            var next_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="0"] .item-thumb').attr('data-thumb');
                            var prev_sub_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-subtitle');
                            var prev_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-title');
                            var next_sub_title = $scope.find('.swiper-slide[data-swiper-slide-index="0"] .item-thumb').attr('data-subtitle');
                            var next_title = $scope.find('.swiper-slide[data-swiper-slide-index="0"] .item-thumb').attr('data-title');
                        }else{
                            var prev_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-thumb');
                            var next_thumb = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx + 1)+'"] .item-thumb').attr('data-thumb');
                            var prev_sub_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-subtitle');
                            var prev_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx - 1)+'"] .item-thumb').attr('data-title');
                            var next_sub_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx + 1)+'"] .item-thumb').attr('data-subtitle');
                            var next_title = $scope.find('.swiper-slide[data-swiper-slide-index="'+(ridx + 1)+'"] .item-thumb').attr('data-title');
                        }
                    }else{ 
                        if( ridx == 0 ){
                            var prev_thumb = this.slides.eq(parseInt(total_slide) - 1).find('.item-thumb').attr('data-thumb');
                            var next_thumb = this.slides.eq(1).find('.item-thumb').attr('data-thumb');
                            var prev_sub_title = this.slides.eq(parseInt(total_slide) - 1).find('.item-thumb').attr('data-subtitle');
                            var prev_title = this.slides.eq(parseInt(total_slide) - 1).find('.item-thumb').attr('data-title');
                            var next_sub_title = this.slides.eq(1).find('.item-thumb').attr('data-subtitle');
                            var next_title = this.slides.eq(1).find('.item-thumb').attr('data-title');
                        }else if(ridx == parseInt(total_slide) - 1) {
                            var prev_thumb = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-thumb');
                            var next_thumb = this.slides.eq(0).find('.item-thumb').attr('data-thumb');
                            var prev_sub_title = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-subtitle');
                            var prev_title = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-title');
                            var next_sub_title = this.slides.eq(0).find('.item-thumb').attr('data-subtitle');
                            var next_title = this.slides.eq(0).find('.item-thumb').attr('data-title');
                        }else{
                            var prev_thumb = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-thumb');
                            var next_thumb = this.slides.eq(ridx + 1).find('.item-thumb').attr('data-thumb');
                            var prev_sub_title = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-subtitle');
                            var prev_title = this.slides.eq(ridx - 1).find('.item-thumb').attr('data-title');
                            var next_sub_title = this.slides.eq(ridx + 1).find('.item-thumb').attr('data-subtitle');
                            var next_title = this.slides.eq(ridx + 1).find('.item-thumb').attr('data-title');
                        }
                    }
                    $scope.find('.layout-thums-title .thums-title-prev .thums-title-img').css('background-image','url('+prev_thumb+')');
                    $scope.find('.layout-thums-title .thums-title-prev .sub-title').html(prev_sub_title);
                    $scope.find('.layout-thums-title .thums-title-prev .custom-title').html(prev_title);

                    $scope.find('.layout-thums-title .thums-title-next .thums-title-img').css('background-image','url('+next_thumb+')');
                    $scope.find('.layout-thums-title .thums-title-next .sub-title').html(next_sub_title);
                    $scope.find('.layout-thums-title .thums-title-next .custom-title').html(next_title);
                }
            },
        },
        autoHeight: true
    };

    if(settings['center_mode'] == 'true')
        carousel_settings['centeredSlides'] = true;

    if(settings['loop'] === 'true'){
        carousel_settings['loop'] = true;
    }
            // auto play
    if(settings['autoplay'] === 'true'){
        carousel_settings['autoplay'] = {
            delay : settings['delay'],
            disableOnInteraction : settings['pause_on_interaction']
        };
    } else {
        carousel_settings['autoplay'] = false;
    }
            // Effect
    if(settings['slide_mode'] === 'cube'){
        carousel_settings['cubeEffect'] = {
            shadow: false,
            slideShadows: false,
            shadowOffset: 0,
                    shadowScale: 0, //0.94,
                };
            }
            if(settings['slide_mode'] === 'coverflow'){
                carousel_settings['centeredSlides'] = true;
                carousel_settings['coverflowEffect'] = {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                };
            }
            carousel.each(function(index, element) {
                if($(this).closest('.pxl-sliders-wrap').find('.pxl-sliders-thumbs').length > 0){  
                    var slide_thumbs = new Swiper($(this).closest('.pxl-sliders-wrap').find('.pxl-sliders-thumbs'), {
                        direction: 'vertical',
                        spaceBetween: 10,
                        slidesPerView: 3,
                    });
                    carousel_settings['thumbs'] = { swiper: slide_thumbs };
                }

                var swiper = new Swiper(carousel, carousel_settings);
                if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                    $(this).on({
                        mouseenter: function mouseenter() {
                            this.swiper.autoplay.stop();
                        },
                        mouseleave: function mouseleave() {
                            this.swiper.autoplay.start();
                        }
                    });
                }
            });   

            function pxl_ken_burns(item) {
                var activeIndex = item.activeIndex; 
                var current = item.slides.eq(activeIndex);
                if(current.find('.pxl-ken-burns').length > 0){
                    $('.pxl-slide-bg').removeClass('pxl-ken-burns--active');
                    current.find('.pxl-slide-bg').addClass('pxl-ken-burns--active');
                }
            } 
        };

    // Make sure you run this code under Elementor.
        $( window ).on( 'elementor/frontend/init', function() {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_slider.default', pxl_slider_handler );
        } );
    } )( jQuery );