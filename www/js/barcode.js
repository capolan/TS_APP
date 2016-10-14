var json_barcode;
function xbarcodeScanned(evt) {
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
            localDB.modelo=vars['m'];
            localDB.serie=vars['s'];
            localDB.chave=vars['c'];
            getMainConfig(0);
        } else {
          //scan cancelled
        }
    }
}

function barcodeScanned(evt) {
   cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          "preferFrontCamera" : true, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   );

}
