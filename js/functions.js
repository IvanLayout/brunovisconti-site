$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload, .production-process__flex')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')

	// Выбор файла
	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).parents('.file-selection')

		parent.find('.file-selection__path span').text(val)
		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path span').text() == '') {
			let namePath = parent.find('.file-selection__path').data('name')
			parent.find('.file-selection__path span').text(namePath)
			parent.find('.file-selection__path').removeClass('_active')
		}
	})


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')
			$('.mini-over').removeClass('_show')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if( $(this).hasClass('mini-modal__btn_over') ) {
				$('.mini-over').addClass('_show')
			}

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
			$('.mini-over').removeClass('_show')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header-catalog') && !$(e.target).hasClass('open-catalog') && !$(e.target).closest('open-catalog') ) {
			$('.open-catalog').removeClass('_active')
			$('.header-catalog').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
			$('body').removeClass('_look-cat')
		}

		if ( !e.target.closest('.header-search') && !$(e.target).hasClass('open-search') && !e.target.closest('.open-search') ) {
			$('.open-search').removeClass('_active')
			$('.header-search').removeClass('_show')
			$('.overlay-search').removeClass('_show')
			$('body').removeClass('_look-search')
		}

		if ( !e.target.closest('.header__menu') && !$(e.target).hasClass('mob-menu-btn') && !e.target.closest('.mob-menu-btn') ) {
			$('.mob-menu-btn').removeClass('_active')
			$('.header__menu').removeClass('_show')
			$('body').removeClass('_look')
			$('.overlay-menu').removeClass('_show')
		}
	})

	$('body').on('click', '[data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
		$('.mini-over').removeClass('_show')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})

	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		let offsetTop = 10;

		if ( $(window).width() > 767 ){
			offsetTop = 75
		}

		if ( $('.product-fixed').length && $(window).width() > 767 ){
			offsetTop = $('.product-fixed').innerHeight() + 10
		}

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - offsetTop }, 1000)
	})

	
	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button_js', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('_active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let level = $(this).data('level')

			parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
			parent.find('.tab-content.' + level).removeClass('_active')

			$(this).addClass('_active')
			$(activeTab).addClass('_active')
			$(`.tab-content[data-id='${activeTab}']`).addClass('_active')
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button_js[data-content="'+ locationHash +'"]')
		if (activeTab.length) {
			setTimeout(function(){
				let parent = activeTab.closest('.tabs-container')
				let level = activeTab.data('level')

				parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
				parent.find('.tab-content.' + level).removeClass('_active')

				activeTab.addClass('_active')
				$(locationHash).addClass('_active')

				$(`.tab-content[data-id='${locationHash}']`).addClass('_active')

				$('html, body').stop().animate({
					scrollTop: $(locationHash).offset().top - 120
				}, 1000)
			}, 200)
		}
	}


	// Fancybox
	const myCloseBtn = '<button data-fancybox-close class="f-button is-close-button" title="Close"><svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L16 16" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M16 1L1 16" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg></button>';

	const commonOptions = {
		autoFocus: false,
		dragToClose: false,
		placeFocusBack: false,
		
		
		Html: {
			
			tpl: myCloseBtn
		},
		
		
		Toolbar: {
			display: {
				right: ["close"],
			},
			items: {
				close: {
					tpl: myCloseBtn
				}
			}
		}
	};

	// Открытие модалок
	$(document).on('click', '.modal-btn', function (e) {
		e.preventDefault();

		Fancybox.close();
	
		const target = $(this).attr('data-content');
		const isBig = $(this).attr('data-modal-big') !== undefined;

		setTimeout(() => {
			Fancybox.show([{
				src: target,
				type: 'inline'
			}], {
				...commonOptions,
				on: {
					reveal: () => {
						if (isBig) $('body').addClass('_big-modal');
					},
					destroy: () => {
						$('body').removeClass('_big-modal');
						$('.modal video').each(function () { this.pause(); });
					}
				}
			});
		}, 10);
	});

	// 2. Закритие через кнопку .modal-close
	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault();
		Fancybox.close();
	});

	// Для картинок
	Fancybox.bind('.fancy-img', {
		...commonOptions,
		Carousel: {
			Thumbs: false,
		},
	});

	// Кастомный select
	$('select').niceSelect()


	// Аккордион
	$('body').on('click', '.accordion__open', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.accordion__item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('_active') ) {
			parent.removeClass('_active')
			parent.find('.accordion__data').slideUp(300)
		} else {
			accordion.find('.accordion__item').removeClass('_active')
			accordion.find('.accordion__data').slideUp(300)

			parent.addClass('_active')
			parent.find('.accordion__data').slideDown(300)
		}
	})

	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})


	// commit

	// favorite
	$('body').on('click', '.product-favorite', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('.form__input-anim').each(function(){
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})

	$('.form__input-anim').change(function() {
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})


	$('body').on('click', '.product__btn', function (e) {
		e.preventDefault()
		
		$(this).closest('.product__bot').addClass('_hide')
		$(this).closest('.product').find('.product__added').addClass('_show')
	})

	$('body').on('click', '.product-global-buy', function (e) {
		e.preventDefault()
		
		$('.product-global-buy').addClass('_hide')
		$('.product-global-added').addClass('_show')
	})


	// Показать все
	$('body').on('click', '.product-info__bot-btn', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$(this).closest('.product-info__item').find('._item-hide').removeClass('_item-show')
		} else {
			$(this).addClass('_active')

			$(this).closest('.product-info__item').find('._item-hide').addClass('_item-show')
		}
	})


	// Аккордион простой
	$('body').on('click', '.accord__open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$(this).next().slideUp(300)
		} else {
			$(this).addClass('active')
			$(this).next().slideDown(300)
		}
	})

	$('.filter__item-more').click(function(e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ) {
			$(this).removeClass('_active')

			$(this).closest('.filter__data').removeClass('_all')
		} else {
			$(this).addClass('_active')

			$(this).closest('.filter__data').addClass('_all')
		}
	})

	$('.filter__data').each(function(){
		if ( $(this).find('.checkbox').length > 4 ) {
			$(this).find('.filter__item-more').addClass('_show')
		}
	})


	$('body').on('click', '.open-search', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.header-search').removeClass('_show')
			$('.overlay-search').removeClass('_show')
			$('body').removeClass('_look-search')
		} else {
			$(this).addClass('_active')
			$('.header-search').addClass('_show')
			$('.overlay-search').addClass('_show')
			$('body').addClass('_look-search')
		}
	})

	$('#search-input').on('input change', function () {
		if ($(this).val().trim() !== '') {
			$(this).addClass('_full');
			$('.header__search-scroll').addClass('_active');
		} else {
			$(this).removeClass('_full');
			$('.header__search-scroll').removeClass('_active');
		}
	});

	$('body').on('click', '.mob-menu-btn', function (e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ) {
			$(this).removeClass('_active')
			$('.header__menu').removeClass('_show')
			$('body').removeClass('_look')
			$('.overlay-menu').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$('.header__menu').addClass('_show')
			$('body').addClass('_look')
			$('.overlay-menu').addClass('_show')
		}
	})

	$('body').on('click', '.open-catalog', function (e) {
		e.preventDefault()

		if($(this).hasClass('_active')){
			$(this).removeClass('_active')
			$('.header-catalog').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
			$('body').removeClass('_look-cat')
		} else {
			$(this).addClass('_active')
			$('.header-catalog').addClass('_show')
			$('.overlay-catalog').addClass('_show')
			$('body').addClass('_look-cat')
		}
	})

	$('body').on('mouseover', '.header-list__item', function (e) {
		if ( $(window).width() > 1023 ) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.header-list').find('.header-list__item').removeClass('_active-pc')
	
				if ($(this).find('.header-list__link._sub').length) {
					$(this).addClass('_active-pc')
				}

				$('.header-catalog__top').addClass('_hide')
			}
		}
	})

	$('body').on('mouseover', '.header-secondlist__item', function (e) {
		if ( $(window).width() > 1023 ) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.header-list').find('.header-secondlist__item').removeClass('_active-pc')
	
				if ($(this).find('.header-secondlist__link._sub').length) {
					$(this).addClass('_active-pc')
				}
			}
		}
	})

	$('body').on('mouseover', '.header__menu-item', function (e) {
		if ( $(window).width() > 1023 ) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.header__menu').find('.header__menu-item').removeClass('_active-pc')
	
				$(this).addClass('_active-pc')

				if ( $(this).find('.header__menu-link._sub').length ) {
					$('.overlay-menu').addClass('_show')
				}
			}
		}
	})

	$('body').on('mouseleave', '.header__menu-item', function (e) {
		if ( $(window).width() > 1023 ) {
			$('.header__menu-item').removeClass('_active-pc')
			$('.overlay-menu').removeClass('_show')
		}
	})

	$('body').on('mouseover', '.submenu-second__item', function (e) {
		if ( $(window).width() > 1023 ) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.submenu-second').find('.submenu-second__item').removeClass('_active-pc')
	
				$(this).addClass('_active-pc')
			}
		}
	})

	$('body').on('click', '.header__menu-link._sub', function (e) {
		if ( $(window).width() < 1024 ) {
			e.preventDefault()

			$(this).next('.header__submenu').addClass('_show')

			$('.header__menu').addClass('_second')
		}
	})

	$('body').on('click', '.submenu-second__link._sub', function (e) {
		if ( $(window).width() < 1024 ) {
			e.preventDefault()

			$(this).next('.submenu-third').addClass('_show')

			$('.header__menu').addClass('_third')

			let titleCatalog = $(this).data('title-second')
			$(this).closest('.header__submenu').find('.header__submenu-close').text(titleCatalog).addClass('_third')
		}
	})

	$('body').on('click', '.header__submenu-close', function (e) {
		e.preventDefault()

		if ( $(this).hasClass('_third') ) {
			$('.submenu-third').removeClass('_show')

			$('.header__menu').removeClass('_third')

			let titleCatalog = $(this).closest('.header__submenu').find('.header__submenu-close').data('title-close')
			$(this).closest('.header__submenu').find('.header__submenu-close').removeClass('_third').text(titleCatalog)
		} else {
			$('.header__submenu').removeClass('_show')

			$('.header__menu').removeClass('_second')
		}
	})

	$('body').on('click', '.header-list__link._sub', function (e) {
		if ( $(window).width() < 1024 ) {
			e.preventDefault()

			let titleCatalog = $(this).data('title')
			$('.header-catalog__close').attr('data-title-second', titleCatalog).text(titleCatalog)

			$(this).next('.header-secondlist').addClass('_show')

			$('.header-catalog, .header-catalog__close').addClass('_second')
		}
	})

	$('body').on('click', '.header-secondlist__link._sub', function (e) {
		if ( $(window).width() < 1024 ) {
			e.preventDefault()

			let titleCatalog = $(this).data('title-second')
			$('.header-catalog__close').text(titleCatalog)

			$(this).next('.header-thirdlist').addClass('_show')
			$('.header-catalog, .header-catalog__close').addClass('_third')
		}
	})

	$('body').on('click', '.header-catalog__close', function (e) {
		e.preventDefault()

		if ( $(this).hasClass('_third') ) {
			$('.header-thirdlist').removeClass('_show')

			$('.header-catalog, .header-catalog__close').removeClass('_third')

			let titleCatalog = $('.header-catalog__close').data('title-second')
			$('.header-catalog__close').text(titleCatalog)
		} else if ( $(this).hasClass('_second') ) {
			$('.header-secondlist').removeClass('_show')
			$('.header-catalog, .header-catalog__close').removeClass('_second')

			let titleCatalog = $('.header-catalog__close').data('title-close')
			$('.header-catalog__close').text(titleCatalog)
		} else {
			console.log('asd')
			$('.open-catalog').removeClass('_active')
			$('.header-catalog').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
			$('body').removeClass('_look-cat')
		}
	})
})


$(window).on('load', () => {
	// commit
    if ( $('.header__info').length ) {
		if( $(window).scrollTop() > $('.header__info').offset().top > 0 ) {
			$('.header__info-wrap').addClass('_fix')
		} else {
			$('.header__info-wrap').removeClass('_fix')
		}
	}

	$(window).on('scroll', () => {
		if ( $('.header__info').length ) {
			if( $(window).scrollTop() > $('.header__info').offset().top > 0 ) {
				$('.header__info-wrap').addClass('_fix')
			} else {
				$('.header__info-wrap').removeClass('_fix')
			}
		}
	})
})

$(window).on('resize', function() {

})

// Вспомогательные функции
const widthScroll = () => {
	const div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'
	div.style.position = 'absolute'
	div.style.scrollbarWidth = 'thin' // Firefox

	document.body.appendChild(div)

	const scrollWidth = div.offsetWidth - div.clientWidth

	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)