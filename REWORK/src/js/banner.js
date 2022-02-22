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
function hoverCheck(type, key) {
    if ($('#'+type+'-banner:hover').length != 0) {
        document.getElementById(type+'-banner').addEventListener("mouseleave", () => {                      // -!- Eventuell wird EventListener nicht zurückgesetzt -!- //
            setTimeout(() => {
                $('#'+type+'-banner').fadeOut(350)
                $('#'+type+'-banner').removeClass(key)
            }, 250)
        }, false)
    }
    else {
        $('#'+type+'-banner').fadeOut(350)
        $('#'+type+'-banner').removeClass(key)
    }
}

let timeoutHandle

function showBanner(type, title, message, key, hide) {
    // -!- If other banner already exists, add margin here -!- //
    window.clearTimeout(timeoutHandle)
    $('#'+type+'-banner').fadeIn(150)
    document.getElementById(type+'-title').innerHTML = title
    document.getElementById(type+'-info').innerHTML = message
    if (key != "") {
        document.getElementById(type+'-banner').classList.add(key)
    }
    if (hide) {
        timeoutHandle = window.setTimeout(() => {
            hoverCheck(type, key)
        }, 5000)
    }
}

function hideBanner(type) {
    if (type == undefined) {
        $('#info-banner').fadeOut(250)
        $('#warning-banner').fadeOut(250)
        $('#error-banner').fadeOut(250)
    }
    else if (type == "info" || type == "warning" || type == "error") {
        $('#'+type+'-banner').fadeOut(250)
    }
    else {
        $('.' + type).fadeOut(250)
        $('.'+type).removeClass(type)
    }
}