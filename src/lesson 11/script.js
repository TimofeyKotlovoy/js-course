'use strict'

window.addEventListener('DOMContentLoaded', function(){
  let age = document.getElementById('age');
  function showUser(surname, name) {
    alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
  }
  showUser.call(age,'Tim','Kot');
});
