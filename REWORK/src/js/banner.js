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
$("#error-close-wifi").click(function() {
    $("#error-banner-wifi").fadeOut(170)
})


////// Display Function
var timeoutHandle

function showBanner(type, title, message, key, hide) {
    window.clearTimeout(timeoutHandle)
    $('#'+type+'-banner').fadeIn(150)
    document.getElementById(type+'-title').innerHTML = title
    document.getElementById(type+'-info').innerHTML = message
    if (! key == "") {
        document.getElementById(type+'-banner').classList.add(key)
    }
    if (hide) {
        timeoutHandle = window.setTimeout( () => {
            $('#'+type+'-banner').fadeOut(350)
        }, 5000)
    }
}

function hideBanner(type, key) {
    if (type == "" && key == "") {
        $('#info-banner').fadeOut(250)
        $('#warning-banner').fadeOut(250)
        $('#error-banner').fadeOut(250)
    }
    else if (type == "" && ! key == "") {
        $('.' + key).fadeOut(250)
        $('.'+key).removeClass(key)
    }
    else {
        $('#'+type+'-banner').fadeOut(250)
    }
}