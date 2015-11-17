////////////////////////////////////////////////////////////////////////////////
// Programar o Tsensor hw diretamente
function prog_ler_ip() {
    //    var myRe = new RegExp("([0-9\.]*)\<br\>([0-9\.]*)","g");
    var addr = 'http://192.168.4.1/?I&R';

    console.log("url=" + addr);
    if (navigator.connection.type == Connection.NONE) {
        text_wifi.innerHTML = "Sem conexão de rede.";
        return;
    }
    text_wifi.innerHTML = "Enviando ao TS";
    $.ajax({
        type: 'GET',
        url: addr,
        timeout: 15000,
        success: function (data) {
            console.log(data);
            myIP = data.split(/\s*,\s*/);
            var txt = 'AP=' + myIP[0] + '<br>STA=' + myIP[1];
            text_wifi.innerHTML = txt;
        },
        error: function (data) {
            console.log(data);
            text_wifi.innerHTML = 'ERRO:' + data.statusText;
        }
    });

}

// REBOOT
function prog_reboot_ts() {
    var addr = 'http://192.168.4.1/s?f=7&R';

    console.log("url=" + addr);
    if (navigator.connection.type == Connection.NONE) {
        text_wifi.innerHTML = "Sem conexão de rede.";
        return;
    }
    text_wifi.innerHTML = "Enviando ao TS";
    $.ajax({
        type: 'GET',
        url: addr,
        timeout: 15000,
        success: function (data) {
            console.log(data);
            text_wifi.innerHTML = data;
        },
        error: function (data) {
            console.log(data);
            text_wifi.innerHTML = 'ERRO:' + data.statusText;
        }
    });

}

// Programar o Tsensor hw diretamente
function prog_wifi() {
    var addr = 'http://192.168.4.1/s?f=1&R&s=' +
        $("#ssid").val() +
        '&p=' + $("#passwd").val() +
        '&y=' + $("#proxy").val();

    console.log("url=" + addr);
    if (window.cordova) {
        if (navigator.connection.type == Connection.NONE) {
            text_wifi.innerHTML = "Sem conexão de rede.";
            return;
        }
    }
    text_wifi.innerHTML = "Enviando ao TS";
    $.ajax({
        type: 'GET',
        url: addr,
        timeout: 15000,
        success: function (data) {
            console.log(data);
            text_wifi.innerHTML = data;
        },
        error: function (data) {
            console.log(data);
            text_wifi.innerHTML = 'ERRO:' + data.statusText;
        }
    });

}
