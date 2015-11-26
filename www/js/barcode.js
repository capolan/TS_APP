var json_barcode;
function barcodeScanned(evt) {
   // intel.xdk.notification.beep(1);
   // navigator.notification.alert("Leitura", alertDismissed, 'Barcode', 'Fechar');
    if (evt.type == "intel.xdk.device.barcode.scan") {
        if (evt.success == true) {
            //mensagemTela('BarCode',evt.codedata);
            var url = evt.codedata;
            var vars=[];
            var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
          //  intel.xdk.device.showRemoteSite(url, 264, 0,56, 48)
            //console.log(evt.codedata);

            //navigator.notification.alert(evt.codedata, alertDismissed, 'Barcode', 'Fechar');
            document.getElementById("modelo").value=vars['m'];
            document.getElementById("serie").value=vars['s'];
            document.getElementById("chave").value=vars['c'];
            Cookies["modelo"]=vars['m'];
            Cookies["serie"]=vars['s'];
            Cookies["chave"]=vars['c'];
            getMainConfig(0);
        } else {
          //scan cancelled
        }
    }
}
