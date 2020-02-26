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
  	secondForm = document.getElementById('form'),
	input = form.getElementsByTagName('input'),
	secondInput = secondForm.getElementsByTagName('input'),
	statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach(function(value, key){
			obj[key] = value;
		});
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function(){
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});

	secondForm.addEventListener('submit', function(event) {
		event.preventDefault();
		secondForm.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		let formData = new FormData(secondForm);

		let obj = {};
		formData.forEach(function(value, key){
			obj[key] = value;
		});
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function(){
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < secondInput.length; i++) {
			secondInput[i].value = '';
		}
	});


});
