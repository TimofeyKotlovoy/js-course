window.addEventListener('DOMContentLoaded', function(){

  'use strict'
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(event) {
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

  function getTimeRemaining(endtime) {
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

  function setClock(id, endtime) {
	let timer = document.getElementById(id),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
		timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours < 10 ? '0' + t.hours : t.hours;
      minutes.textContent = t.minutes < 10 ? '0' + t.minutes : t.minutes;
      seconds.textContent = t.seconds < 10 ? '0' + t.seconds : t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    };
  };
  setClock('timer', deadline);

  // Modal

  let container = document.getElementById('about'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  container.addEventListener('click', function(event){
    if (event.target.classList.contains('description-btn') || event.target.classList.contains('more')) {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    }
  });

  close.addEventListener('click', function(){
    overlay.style.display = 'none';
    this.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

});
