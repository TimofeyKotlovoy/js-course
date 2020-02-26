$(document).ready(function() {

  $('.main_nav ul li:nth-child(2) a, .main_btna.text-center, .main_btn.text-center.contact').on('click', function(){
    $('.overlay').fadeIn();
    $('.modal').slideToggle();
  });

  $('.close').on('click', function(){
    $('.overlay').fadeOut();
    $('.modal').slideToggle();
  });

});
