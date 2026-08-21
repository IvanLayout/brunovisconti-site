// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	$('body').on('click', '.mob-menu-btn', function (e) {
		e.preventDefault()

		$('.header__top').addClass('_show')
		$('.header__small-right').addClass('_show')
		$('body').addClass('_lock')
		$('.overlay').addClass('_show')
	})

	if ($('.inner-news__slider').length) {
		new Swiper(".inner-news__slider", {
			loop: false,
			spaceBetween: 15,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 15,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				}
			},
			on: {
				init: function (swiper) {
					let posTop = $(swiper.el).find('.inner-news__img').height()

					$(swiper.el).find('.slider-button-prev, .slider-button-next').css('top', posTop/2)
				},
				resize: function (swiper) {
					let posTop = $(swiper.el).find('.inner-news__img').height()

					$(swiper.el).find('.slider-button-prev, .slider-button-next').css('top', posTop/2)
				}
			}
		})
	}

	if ($('.reviews__slider').length) {
		new Swiper(".reviews__slider", {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 15,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 3
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')

					$(swiper.el).find('.reviews__name-city, .reviews__desc').height('auto')

					setHeight( $(swiper.el).find('.reviews__name-city') )
					setHeight( $(swiper.el).find('.reviews__desc') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.reviews__name-city, .reviews__desc').height('auto')

					setHeight( $(swiper.el).find('.reviews__name-city') )
					setHeight( $(swiper.el).find('.reviews__desc') )
				}
			}
		})
	}

	if ($('.products__slider').length) {
		new Swiper(".products__slider", {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 15,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.categories-small__slider').length) {
		new Swiper(".categories-small__slider", {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 15,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 25,
					slidesPerView: 'auto',
				}
			}
		})
	}

	$('body').on('submit', '.form-ajax', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})


	//
	$('body').on('click', '.amount__btn_minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let minimum = parseFloat(input.data('minimum'))
		let step = parseFloat(input.data('step'))

		if (inputVal > minimum) {
			input.val(inputVal - step)

			parent.find('.amount__btn_plus').prop("disabled", false)
		}

		if (inputVal-1 == minimum) {
			$(this).prop("disabled", true)
		}
	})

	$('body').on('click', '.amount__btn_plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let maximum = parseFloat(input.data('maximum'))
		let step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)

			parent.find('.amount__btn_minus').prop("disabled", false)
		}

		if (inputVal+1 == maximum) {
			$(this).prop("disabled", true)
		}
	})

	$('.amount__input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	//Ползунки
	$priceRange = $("#price_range").ionRangeSlider({
		type     : 'double',
		min      : 0,
		max      : 123000,
		from     : 11,
		to       : 123000,
		step     : 1,
		onChange : function (data) {
			$('.price_range input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range .range__input').keyup(function() {
		$priceRange.update({
			from : $('.price_range input.ot').val().replace(/\s/g,''),
			to : $('.price_range input.do').val().replace(/\s/g,'')
		})
	})
});


$(window).on('load', () => {
	if ($('.areas-activity__wrap').length){
		areasActivitySlider()
	}


	if( $('.products__grid').length ){
		$('.products__grid').each(function() {
			productsHeight($(this), parseInt($(this).css('--products_count')))
		})

		$('.products__grid').find('.product').removeClass('_loaded')
		setTimeout(() => {
			$('.products__grid').find('.product').addClass('_loaded')
		}, 100)
	}
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}


	if ($('.areas-activity__wrap').length){
		areasActivitySlider()
	}

	if( $('.products__grid').length ){
		$('.products__grid').each(function() {
			productsHeight($(this), parseInt($(this).css('--products_count')))
		})

		$('.products__grid').find('.product').removeClass('_loaded')
		setTimeout(() => {
			$('.products__grid').find('.product').addClass('_loaded')
		}, 100)
	}
});


function areasActivitySlider(){
	if ( $(window).width() < 1024 && !$('.areas-activity__wrap').hasClass('swiper-initialized') ) {
		$('.areas-activity__wrap').addClass('swiper')
		$('.areas-activity__grid').addClass('swiper-wrapper').removeClass('_flex')
		$('.areas-activity__item').addClass('swiper-slide')

		areasActivitySwiperSlider = new Swiper('.areas-activity__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 1,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2,
				}
			},
		})
	} else if ($(window).width() > 1023 && $('.areas-activity__wrap').hasClass('swiper-initialized')) {
		if ($('.areas-activity__wrap').length === 1 && $('.areas-activity__wrap').hasClass('swiper-initialized')) {
			areasActivitySwiperSlider.destroy(true, true)
		} else if ($('.areas-activity__wrap').length >= 2 && $('.areas-activity__wrap').hasClass('swiper-initialized')) {
			areasActivitySwiperSlider.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.areas-activity__wrap').removeClass('swiper')
		$('.areas-activity__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.areas-activity__item').removeClass('swiper-slide')
	}
}


function productsHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product')

	products.height('auto')
	products.find('.product__name').height('auto')
	products.find('.product__box').height('auto')
	products.find('.product__block').height('auto')
	products.find('.product__desc-items').height('auto')
	products.find('.product__prices').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish))
		setHeight(products.slice(start, finish).find('.product__name'))
		setHeight(products.slice(start, finish).find('.product__box'))
		setHeight(products.slice(start, finish).find('.product__block'))
		setHeight(products.slice(start, finish).find('.product__desc-items'))
		setHeight(products.slice(start, finish).find('.product__prices'))

		start  = start + step
		finish = finish + step
	}
}