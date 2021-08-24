////// Close

$("#info-close").click(function() {
    $("#info-banner").fadeOut(170)
})
$("#warning-close").click(function() {
    $("#warning-banner").fadeOut(170)
})
$("#error-close").click(function() {
    $("#error-banner").fadeOut(170)
})


////// Display Function
var timeoutHandle

function showBanner(type, title, message, hide) {
    window.clearTimeout(timeoutHandle)
    $('#'+type+'-banner').fadeIn(150)
    document.getElementById(type+'-title').innerHTML = title
    document.getElementById(type+'-info').innerHTML = message
    if (hide) {
        timeoutHandle = window.setTimeout( () => {
            $('#'+type+'-banner').fadeOut(350)
        }, 5000)
    }
}