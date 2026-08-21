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

		if ( !e.target.closest('.header-catalog') && !e.target.closest('.header-catalog__open') && !e.target.closest('.fix-btns') ) {
			$('.header-catalog__open').removeClass('_active')
			if($('.header-catalog__block').hasClass('_show')){
				$('.overlay').removeClass('_show')
				$('body').removeClass('_lock')
			}
			$('.header-catalog__block').removeClass('_show')
			if($('.header-catalog').hasClass('_show')){
				$('body').removeClass('_lock')
			}
			$('.header-catalog').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
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