var mybutton = document.getElementById("myBtn");
window.onscroll = function() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
} else {
    mybutton.style.display = "none";
}
};

$('#myBtn').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
