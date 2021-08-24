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

function hideBanner(type) {
    if (type == "all") {
        $('#info-banner').fadeOut(250)
        $('#warning-banner').fadeOut(250)
        $('#error-banner').fadeOut(250)
    }
    else {
        $('#'+type+'-banner').fadeOut(250)
    }
}