var json_barcode;
function barcodeScanned(evt) {
   // intel.xdk.notification.beep(1);
   // navigator.notification.alert("Leitura", alertDismissed, 'Barcode', 'Fechar');
    if (evt.type == "intel.xdk.device.barcode.scan") {
        if (evt.success == true) {
            var url = evt.codedata;
          //  intel.xdk.device.showRemoteSite(url, 264, 0,56, 48)
            console.log(evt.codedata);
            navigator.notification.alert(evt.codedata, alertDismissed, 'Barcode', 'Fechar');
            url=url.replace(/\\/g,"");
            //alert(url);
            json_barcode = JSON.parse(url);
            document.getElementById("modelo").value=json_barcode.m;
            document.getElementById("serie").value=json_barcode.s;
            document.getElementById("modelo").value=json_barcode.c;
        } else {
          //scan cancelled
        }
    }
}
