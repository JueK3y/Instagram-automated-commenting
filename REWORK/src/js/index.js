$(document).ready(function(){
    $(".active").click(function(){
        alert("Minimize navbar!")
    });
});

function togglePassword() {
    const x = document.getElementById("password-form");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


/* if($(this).is(":checked")){
    $("#side-bar").animate({left: '0px', opacity: '1'});
    $("#big-line").animate({left: '60px', opacity: '1'}, 'slow');
}
else if($(this).is(":not(:checked)")){
    $("#side-bar").animate({left: '-80px', opacity: '0'});
    $("#big-line").animate({left: '0px', opacity: '0'}, 'slow');
} */