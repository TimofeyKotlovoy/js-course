window.addEventListener('DOMContentLoaded', () => {

  'use strict'

  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  let hideTabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };

  hideTabContent(1);

  let showTabContent = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  };

  info.addEventListener('click', (event) => {
    let target = event.target;
    if (target && event.target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
		  hideTabContent(0);
		  showTabContent(i);
		  break;
        }
      }
    }
  });

  // Timer

  let deadline = '2020-10-30';

  let getTimeRemaining = (endtime) => {
	let t = Date.parse(endtime) - Date.parse(new Date()),
		seconds = Math.floor((t/1000) % 60),
		minutes = Math.floor((t/1000/60) % 60),
		hours = Math.floor((t/(1000*60*60)));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
  };

  let setClock = (id, endtime) => {
	let timer = document.getElementById(id),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds');

    let updateClock = () => {
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours < 10 ? '0' + t.hours : t.hours;
      minutes.textContent = t.minutes < 10 ? '0' + t.minutes : t.minutes;
      seconds.textContent = t.seconds < 10 ? '0' + t.seconds : t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
	};

	let timeInterval = setInterval(updateClock, 1000);
  };
  setClock('timer', deadline);

  // Modal

  let container = document.getElementById('about'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('description-btn') || event.target.classList.contains('more')) {
      overlay.style.display = 'block';
      container.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    }
  });

  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    container.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  // Form

  let message = {
	  loading: 'Загрузка...',
	  success: 'Спасибо! Скоро мы с вами свяжемся!',
	  failure: 'Что-то пошло не так'
  };

  let form = document.querySelector('.main-form'),
  	formBottom = document.getElementById('form'),
		input = document.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
		statusMessage.classList.add('status');

	function sendForm (elem) {
		elem.addEventListener('submit', function(event) {
			event.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);

			function postData(data) {
				return new Promise (function(resolve,reject){
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

					request.addEventListener('readystatechange', function(){
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4 && request.status == 200) {
							resolve();
						} else {
							reject();
						}
					});

					request.send(data);
				});
			};

			function clearInput () {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			};

			postData(formData)
												.then(() => statusMessage.innerHTML = message.loading)
												.then(() => statusMessage.innerHTML = message.success)
												.catch(() => statusMessage.innerHTML = message.failure);
												clearInput();
		});
	};
	sendForm(form);
	sendForm(formBottom);


	// Slider

	let slideIndex = 1,
			slides = document.querySelectorAll('.slider-item'),
			prev = document.querySelector('.prev'),
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector('.slider-dots'),
			dots = document.querySelectorAll('.dot');

	showSlides(slideIndex);

	function showSlides (n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => item.style.display = 'none');

		dots.forEach((item) => item.classList.remove('dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	};
	function plusSlides(n) {
		showSlides(slideIndex += n)
	};

	function currentSlide(n) {
		showSlides(slideIndex = n)
	};

	prev.addEventListener('click', function() {
		plusSlides(-1);
	});

	next.addEventListener('click', function() {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function(event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});


	// Calc

	let persons = document.querySelectorAll('.counter-block-input')[0],
			restDays = document.querySelectorAll('.counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function(){
		personsSum = +this.value;
		total = (daysSum * personsSum) * 4000;
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('input', function(){
		daysSum = +this.value;
		total = (daysSum * personsSum) * 4000;
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('input', function(){
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});

});
