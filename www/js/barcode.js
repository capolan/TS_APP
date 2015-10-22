var json_barcode;
function barcodeScanned(evt) {
   // intel.xdk.notification.beep(1);
   // navigator.notification.alert("Leitura", alertDismissed, 'Barcode', 'Fechar');
    if (evt.type == "intel.xdk.device.barcode.scan") {
        if (evt.success == true) {
            var url = evt.codedata;
            var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
          //  intel.xdk.device.showRemoteSite(url, 264, 0,56, 48)
            console.log(evt.codedata);
            navigator.notification.alert(evt.codedata, alertDismissed, 'Barcode', 'Fechar');

            document.getElementById("modelo").value=vars['m'];
            document.getElementById("serie").value=vars['s'];
            document.getElementById("modelo").value=vars['c'];
        } else {
          //scan cancelled
        }
    }
}
