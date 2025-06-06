( function( $ ) {

    var pxl_swiper_handler = function( $scope, $ ) {

        var breakpoints = elementorFrontend.config.breakpoints,
        carousel = $scope.find(".pxl-swiper-container");
        if(carousel.length == 0){
            return false;
        }

        var numSlides = carousel.find(".pxl-swiper-slide").length;
        var initialThumbSlide = Math.floor(numSlides / 2);

        /* Arrow Custom */
        $('.pxl-swiper-arrow-custom').parents('.pxl-swiper-sliders').addClass('pxl--hide-arrow');
        $('.pxl-navigation-carousel').parents('.elementor-section').addClass('pxl--hide-arrow');
        setTimeout(function() {
            $('.pxl-swiper-arrow-custom.pxl-swiper-arrow-next').on('click', function () {
                $(this).parents('.pxl-swiper-sliders').find('.pxl-swiper-arrow-main.pxl-swiper-arrow-next').trigger('click');
            });
            $('.pxl-swiper-arrow-custom.pxl-swiper-arrow-prev').on('click', function () {
                $(this).parents('.pxl-swiper-sliders').find('.pxl-swiper-arrow-main.pxl-swiper-arrow-prev').trigger('click');
            });
        }, 300);

        setTimeout(function() {
            $('.pxl-navigation-carousel .pxl-navigation-arrow-prev').on('click', function () {
                $(this).parents('.elementor-section').find('.pxl-swiper-arrow.pxl-swiper-arrow-prev').trigger('click');
            });
            $('.pxl-navigation-carousel .pxl-navigation-arrow-next').on('click', function () {
                $(this).parents('.elementor-section').find('.pxl-swiper-arrow.pxl-swiper-arrow-next').trigger('click');
            });
        }, 300);

        /* Main Slider */
        var data = carousel.data(), 
        settings = data.settings, 
        carousel_settings = {
            direction: settings['slide_direction'],
            effect: settings['slide_mode'],
            wrapperClass : 'pxl-swiper-wrapper',
            slideClass: 'pxl-swiper-slide',
            slidesPerView: settings['slides_to_show'],
            slidesPerGroup: settings['slides_to_scroll'],
            slidesPerColumn: settings['slide_percolumn'],
            spaceBetween: 0,
            navigation: {
                nextEl: $scope.find(".pxl-swiper-arrow-next"),
                prevEl: $scope.find(".pxl-swiper-arrow-prev"),
            },
            pagination : {
                el: $scope.find(".pxl-swiper-dots"),
                clickable : true,
                modifierClass: 'pxl-swiper-pagination-',
                bulletClass : 'pxl-swiper-pagination-bullet',
                renderCustom: function (swiper, element, current, total) {
                    return current + ' of ' + total;
                },
                type: settings['pagination_type'],
            },
            speed: settings['speed'],
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
                0 : {
                    slidesPerView: settings['slides_to_show_xs'],
                    slidesPerGroup: settings['slides_to_scroll'],
                },
                576 : {
                    slidesPerView: settings['slides_to_show_sm'],
                    slidesPerGroup: settings['slides_to_scroll'],
                },
                768 : {
                    slidesPerView: settings['slides_to_show_md'],
                    slidesPerGroup: settings['slides_to_scroll'],
                },
                1025 : {
                    slidesPerView: settings['slides_to_show_lg'],
                    slidesPerGroup: settings['slides_to_scroll'],
                },
                1200 : {
                    slidesPerView: settings['slides_to_show'],
                    slidesPerGroup: settings['slides_to_scroll'],
                },
                1600 : {
                    slidesPerView: settings['slides_to_show_xxl'],
                    slidesPerGroup: settings['slides_to_scroll'],
                }
            }
        }; 

            // custom fraction
        if(settings['pagination_type'] === 'bullets'){
            carousel_settings['on'] = {
                slideChange: function(){
                    var currentSlideElement = document.querySelector('.pxl-swiper-current-slide');
                    if (currentSlideElement !== null) {
                      currentSlideElement.innerHTML = currentSlide;
                  }
              },
          };
      }

            // center
      if(settings['center'] === 'true'){
        if (numSlides % 2 === 0) {
            carousel_settings['centeredSlides'] = false;
        } else {
            carousel_settings['centeredSlides'] = true;
            carousel_settings['initialSlide'] = Math.floor(numSlides / 2);
        }
    }
            // effect
    if(settings['slide_mode'] === 'fade'){
        carousel_settings['fadeEffect'] = {
            crossFade: true
        };
    }
            // loop
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

    carousel.each(function(index, element) {

        var carousel_thumb = $scope.find(".pxl-swiper-thumbs");
        var loop = $scope.find(".pxl-swiper-thumbs").data("loop");
        var thumbxs = $scope.find(".pxl-swiper-thumbs").data("thumbxs");
        var thumbsm = $scope.find(".pxl-swiper-thumbs").data("thumbsm");
        var thumbmd = $scope.find(".pxl-swiper-thumbs").data("thumbmd");
        var thumblg = $scope.find(".pxl-swiper-thumbs").data("thumblg");
        if (carousel_thumb.length > 0) {
            var galleryThumbs = new Swiper(carousel_thumb, {
                spaceBetween: 0,
                slidesPerView: 3,
                freeMode: true,
                watchSlidesProgress: true,                
                loop: loop,
                breakpoints: {
                    0 : {
                        slidesPerView: typeof thumbxs !== 'undefined' ? thumbxs : 1,
                    },
                    576 : {
                        slidesPerView: typeof thumbsm !== 'undefined' ? thumbsm : 2,
                    },
                    768 : {
                        slidesPerView: typeof thumbmd !== 'undefined' ? thumbmd : 3,
                    },
                    1025 : {
                        slidesPerView: typeof thumblg !== 'undefined' ? thumblg : 3,
                    },
                },
                initialSlide: initialThumbSlide,
            });

            galleryThumbs.slideTo(initialThumbSlide);
            carousel_settings['thumbs'] = { swiper: galleryThumbs };
        }

        if(settings['center'] === 'true'){
            if (initialThumbSlide % 2 === 0) {
                carousel_settings['centeredSlides'] = false;
            } else {
                carousel_settings['centeredSlides'] = true;
                carousel_settings['initialSlide'] = Math.floor(initialThumbSlide / 2);
            }
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

        $scope.find(".swiper-filter-wrap .filter-item").on("click", function(){
            var target = $(this).attr('data-filter-target');
            var parent = $(this).closest('.pxl-swiper-sliders');
            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            if(target == "all"){
                parent.find("[data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide-filter");
                swiper.destroy();
                swiper = new Swiper(carousel, carousel_settings);
            } else {

                parent.find(".swiper-slide-filter").not("[data-filter^='"+target+"'], [data-filter*=' "+target+"']").addClass("non-swiper-slide").removeClass("swiper-slide-filter");
                parent.find("[data-filter^='"+target+"'], [data-filter*=' "+target+"']").removeClass("non-swiper-slide").addClass("swiper-slide-filter");
                swiper.destroy();
                swiper = new Swiper(carousel, carousel_settings);
            }
        });

        $('.swiper-filter-wrap').parents('.pxl-swiper-sliders').addClass('swiper-filter-active');

    });

};

    // Make sure you run this code under Elementor.
$( window ).on( 'elementor/frontend/init', function() {
        // Swipers
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_carousel.default', pxl_swiper_handler );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_gallery_carousel.default', pxl_swiper_handler );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_testimonial_carousel.default', pxl_swiper_handler );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_team_carousel.default', pxl_swiper_handler );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_partner_carousel.default', pxl_swiper_handler );
} );
} )( jQuery );