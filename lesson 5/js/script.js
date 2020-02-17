let buttons = document.querySelectorAll('.menu-item'),
    button = document.createElement('li'),
    menu = document.querySelector('.menu'),
    text = document.getElementById('title');
    column = document.querySelectorAll('.column'),
    adv = document.querySelector('.adv'),
    promptElement = document.getElementById('prompt');


menu.insertBefore(buttons[2], buttons[1]);

button.classList.add('menu-item');
button.innerHTML = 'Пятый пункт';
menu.appendChild(button);

document.body.style.backgroundImage = "url('../lesson 5/img/apple_true.jpg')";
text.textContent = 'Мы продаем только подлинную технику Apple';
column[1].removeChild(adv);

// function getQuestion () {
//   let question = prompt('Отношение к технике apple?', '');
//   promptElement.textContent = question;
// }

// getQuestion();
