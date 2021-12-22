document.addEventListener('touchstart', function(){}, true)

$(function(){
	// Исправление дёргания при открытии/закрытии всплывашки
	if (navigator.userAgent.indexOf('Mac') > 0) {
		$('html').addClass('macOS')
	}


	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		loop: true,
	    margin: 0,
	    dots: true,
	    nav: true,
	    navSpeed: 750,
	    dotsSpeed: 750,
	    smartSpeed: 750,
	    autoplaySpeed: 750,
	    items: 1,
	    autoplay: true,
		autoplayTimeout: 5000,
		onInitialized: function(event){
			$('.main_slider .owl-prev').css('margin-left', -($('.main_slider .owl-dots').width()/2) - $('.main_slider .owl-prev').width())
			$('.main_slider .owl-next').css('margin-right', -($('.main_slider .owl-dots').width()/2) - $('.main_slider .owl-next').width())
	    }
	})


	// Информация о предприятии
	$('.information .slider').owlCarousel({
		loop: true,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
		margin: 0,
	    responsive : {
		    1024 : {
		        items: 4
		    },
		    768 : {
		        items: 3
		    },
		    480 : {
		        items: 2
		    },
		    0 : {
		        items: 1
		    }
		},
		onInitialized: function(event){
			setHeight( $(event.target).find('.name') )
		}
	})


	// Нам доверяют
	$('.clients .slider').owlCarousel({
		loop: true,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
		margin: 0,
	    responsive : {
	    	1240 : {
		        items: 6
		    },
		    1024 : {
		        items: 5
		    },
		    768 : {
		        items: 4
		    },
		    480 : {
		        items: 3
		    },
		    0 : {
		        items: 2
		    }
		}
	})


	// Статьи
	$('.articles .slider').owlCarousel({
		loop: true,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
	    responsive : {
	    	1240 : {
		        items: 4,
		        margin: 20
		    },
		    1024 : {
		        items: 3,
		        margin: 20
		    },
		    768 : {
		        items: 2,
		        margin: 10
		    },
		    0 : {
		        items: 1,
		        margin: 10
		    }
		}
	})


	// Галерея
	$('.gallery .slider').owlCarousel({
		loop: true,
	    dots: false,
	    nav: true,
	    navSpeed: 500,
	    dotsSpeed: 500,
	    smartSpeed: 500,
	    margin: 0,
	    responsive : {
	    	1240 : {
		        items: 4
		    },
		    1024 : {
		        items: 3
		    },
		    768 : {
		        items: 2
		    },
		    0 : {
		        items: 1
		    }
		}
	})


	// Подписка
	$('.subscribe form').submit(function(e){
		e.preventDefault()

		var self = $(this)

		self.find('.success').fadeIn(300)

		clearTimeout( timer )
		var timer = setTimeout(function(){
			self.find('.success').fadeOut(200)
		}, 3000)
	})


	// Товар в корзину
	$('.product .buy_link').click(function(e){
		e.preventDefault()

		var parent = $(this).parent('.product')

		parent.find('.success').fadeIn(300)

		clearTimeout( timer )
		var timer = setTimeout(function(){
			parent.find('.success').fadeOut(200)
		}, 2000)
	})


	// Кнопка 'Вверх'
	$('.buttonUp a').click(function(e) {
		e.preventDefault()

		$('body,html').stop(false, false).animate({
			scrollTop: 0
		}, 800)
	})


	// Всплывающие окна
	$('.modal_link').click(function(e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : $(this).attr('href'),
			type : 'inline',
			opts : {
				speed: 300,
				autoFocus : false,
				i18n : {
					'en' : {
						CLOSE : 'Закрыть'
					}
				}
			}
		})
	})


	// Отправка форм
	$('.form.custom_submit').submit(function(e){
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : '#success_modal',
			type : 'inline',
			opts : {
				speed: 300,
				autoFocus : false,
				i18n : {
					'en' : {
						CLOSE : 'Закрыть'
					}
				},
				afterShow: function(){
					setTimeout(function(){
						$.fancybox.close()
					}, 2000)
				}
			}
		})
	})


	// Увеличение картинки
	$('.fancy_img').fancybox({
		loop: true,
		transitionEffect : 'slide',
		animationEffect : 'fade',
		i18n : {
			'en' : {
				CLOSE : 'Закрыть'
			}
		}
	})


	// Фильтр
	$('.filter .name.sub').click(function(e){
		e.preventDefault()

		if( $(this).hasClass('active') ){
			$(this).removeClass('active').next().slideUp()
		} else{
			$(this).addClass('active').next().slideDown()
		}
	})


	$('.filter input[type=radio] + label, .filter input[type=checkbox] + label').click(function(){
		var self = $(this)

		$('.filter .show_link').remove()

		setTimeout(function() {
        	if( self.prev().prop('checked') ) {
        		$('<a href="/" class="show_link">Подобрано 25</a>').appendTo( self.parents('.data') )
        	}
        }, 10)
	})


	$('.filter .reset_btn').click(function(){
		$('.filter .show_link').remove()

		$('.filter input[type=checkbox]').prop('checkced', false)
		$('.filter input[type=radio]').prop('checkced', false)
	})


	if( $(window).width() < 768 ){
		$('aside .filter .title').click(function(e){
			e.preventDefault()

			if( $(this).hasClass('active') ){
				$(this).removeClass('active')
				$('.filter form').slideUp()
			} else{
				$(this).addClass('active')
				$('.filter form').slideDown()
			}
		})
	}


	// Изменение количества товара
	$('.amount .minus').click(function(e){
	    e.preventDefault()

	    var input = $(this).parents('.amount').find('input')
	    var inputVal = parseInt(input.val().replace(/\s+/g, ''))
	    var minimum = parseInt(input.attr('data-minimum'))

	    if(inputVal > minimum){
	    	input.val((inputVal-1).toLocaleString())
	    }
	})

	$('.amount .plus').click(function(e){
	    e.preventDefault()

	    var input = $(this).parents('.amount').find('input')
	    var inputVal = parseInt(input.val().replace(/\s+/g, ''))
	    var maximum = parseInt(input.attr('data-maximum'))

	    if(inputVal < maximum){
	    	input.val((inputVal-(-1)).toLocaleString())
	    }
	})


	// Плавный сколл к якорю
	$('.scroll_link').click(function(e){
		e.preventDefault()

		$('html, body').stop().animate({
		   	scrollTop: $( $(this).attr('href') ).offset().top - 76
		}, 1000)
	})


	// Табы
	$('.tabs_container').each(function(){
	    $(this).find('.tab_content:first').show()
	})

	$('.tabs li').click(function() {
	    var parentBox = $(this).parents('.tabs_container')

	    $(parentBox).find('.tabs li').removeClass('active')
	    $(this).addClass('active')
	    $(parentBox).find('.tab_content').hide()

	    var activeTab = $(this).find('a').attr('href')
	    $(activeTab).fadeIn()
	    return false
	})


	// Мини всплывающие окна
	firstClick = false
	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    var modalId = $(this).attr('data-modal-id')

	    if($(this).hasClass('active')){
	        $(this).removeClass('active')
	        $('.mini_modal').fadeOut(200)
	        firstClick = false

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'default')
            }
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').fadeOut(200)
	        $(modalId).fadeIn(300, function(){
	        	initScroll( $(modalId) )
	        })
	        firstClick = true

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'pointer')
            }
	    }
	})

	//Закрываем всплывашку при клике вне неё
	$(document).click(function(e){
	    if (!firstClick && $(e.target).closest('.mini_modal').length == 0){
	        $('.mini_modal').fadeOut(300)
	        $('.mini_modal_link').removeClass('active')

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'default')
            }
	    }
	    firstClick = false
	})


	// FAQ
	$('.faq .name').click(function(e){
		e.preventDefault()

		if( $(this).hasClass('active') ){
			$(this).removeClass('active').next().slideUp()
		} else{
			$('.faq .name').removeClass('active')
			$('.faq .data').slideUp()

			$(this).addClass('active').next().slideDown()
		}
	})


	// Поиск
    $('header .search_link').click(function(e){
    	e.preventDefault()

		if( $(this).hasClass('active') ){
			$(this).removeClass('active')
        	$('header .search form').fadeOut(200)
		} else{
			$(this).addClass('active')
			$('header .search form').fadeIn(300)
		}
    })


    // Подписка
	$('.subscribe form').submit(function(e){
		e.preventDefault()

		var self = $(this)

		self.find('.success').fadeIn(300)
		self.find('.input').val('')

		clearTimeout( timer )
		var timer = setTimeout(function(){
			self.find('.success').fadeOut(200)
		}, 3000)
	})


	// Цифры
	if( $('.stats').length ) {
		inView('.stats')
		    .on('enter', function(el){
		    	var options = {
					useEasing : true,
					useGrouping : true,
					separator : ' ',
					decimal : '.',
					prefix : '',
					suffix : ''
				}

				var numAnim = new countUp('dynamic1', 0, $('#dynamic1').data('count'), 0, 3, options)
				var numAnim2 = new countUp('dynamic2', 0, $('#dynamic2').data('count'), 0, 3, options)
				var numAnim3 = new countUp('dynamic3', 0, $('#dynamic3').data('count'), 0, 3, options)
				var numAnim4 = new countUp('dynamic4', 0, $('#dynamic4').data('count'), 0, 3, options)

				setTimeout(function(){
					numAnim.start()
					numAnim2.start()
					numAnim3.start()
					numAnim4.start()
				}, 300)
		    })
	}


	// Моб. меню
    $('.mob_menu_link').click(function(e){
    	e.preventDefault()

		if( $(this).hasClass('active') ){
			$(this).removeClass('active')

        	$('header .menu').fadeOut(200)
        	$('header .top').fadeOut(200)
		} else{
			$(this).addClass('active')

			$('header .menu').fadeIn(300)
			$('header .top').fadeIn(300)
		}
    })

    if( is_touch_device() ){
    	$('.menu .menu_item > a.sub_link').addClass('toch_link')

    	$('.menu .menu_item > a.sub_link').click(function(e){
    		if( !$(this).next().is(':visible') ) {
	    		e.preventDefault()

				$('.menu .sub_menu').hide()

				$(this).next().fadeIn(300)
    		}
	    })
    }
})


$(window).load(function(){
	// Шапка
	$('header').wrap('<div class="header_wrap" style="height: ' + $('header').innerHeight() + 'px"></div>')


	// Фильтр
	$('aside .filter .scroll').each(function(){
		if( $(this).find('.line').size() > 6 ){
			let scrollHeight = 0

			if( $(window).width() > 767 ){
				$(this).find('label').slice(0, 5).each(function(){
					scrollHeight += $(this).innerHeight()
				})

				scrollHeight += parseInt($(this).find('.line:last').css('margin-top'))*5
			} else {
				scrollHeight = 250
			}

			$(this).slimScroll({
		        height: scrollHeight + 'px',
		        position: 'right',
			    railVisible: true,
			    alwaysVisible: true,
			    color: '#d9d9d9',
		    	size: '11px',
		    	distance: '0',
		    	railColor: '#ebebeb',
		    	railOpacity: 1
		    })
		}
	})
})


$(window).scroll(function(){
	// Шапка
	if( $(window).width() > 1023 && $(window).scrollTop() > $('.header_wrap').innerHeight() ) {
		$('header').addClass('fixed')
	}else{
		$('header').removeClass('fixed')
	}


	// Кнопка 'Вверх'
	if( $(this).scrollTop() > $(window).innerHeight() ){
		$('.buttonUp').fadeIn(300)
	} else {
		$('.buttonUp').fadeOut(200)
	}
})


$(window).resize(function(){
	// Шапка
	if( $(window).width() < 1024 ) {
		$('header').removeClass('fixed')
		$('.header_wrap').height('auto')
	}
})


function initScroll($context) {
	$context.find('.scroll').each(function(){
		if( $(this).find('.line').size() > 10 ){
			let scrollHeight = 0

			if( $(window).width() > 767 ){
				$(this).find('.line').slice(0, 9).each(function(){
					scrollHeight += $(this).innerHeight()
				})

				scrollHeight += parseInt($(this).find('.line:last').css('margin-top'))*9
			} else {
				scrollHeight = 240
			}

			$(this).slimScroll({
		        height: scrollHeight + 'px',
		        position: 'right',
			    railVisible: true,
			    alwaysVisible: true,
			    color: '#a6a6a6',
		    	size: '11px',
		    	distance: '0',
		    	railColor: '#f2f2f2',
		    	railOpacity: 1
		    })
		}
	})
}


function setHeight(className){
    var maxheight = 0

    $(className).each(function() {
        if( $(this).innerHeight() > maxheight ) {
        	maxheight = $(this).innerHeight()
        }
    })

    $(className).innerHeight(maxheight)
}


function is_touch_device() {
	return !!('ontouchstart' in window);
}