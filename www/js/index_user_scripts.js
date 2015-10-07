(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {

     /* button  Push */
    $(document).on("click", ".uib_w_8", function(evt)
    {
        /* your code goes here */
    });

        /* button  gravar wifi */
    $(document).on("click", ".uib_w_10", function(evt)
    {
        Cookies["ssid"]=document.getElementById("ssid").value;
        Cookies["passwd"]=document.getElementById("passwd").value;
        Cookies["proxy"]=document.getElementById("proxy").value;
        gravarConfiguracao('w', document.getElementById("text_wifi"));
    });

        /* button  btn_remote_config */
    $(document).on("click", "#btn_remote_config", function(evt)
    {
        gravarConfiguracao('u', document.getElementById("text_wifi"));
    });

        /* button  TS */
    $(document).on("click", ".uib_w_19", function(evt)
    {
        document.getElementById("text_ts").value='';
         activate_subpage("#uib_page_6");
    });

        /* button  Ler Configuracao */
    $(document).on("click", ".uib_w_28", function(evt)
    {
       //var modelo;
        var modelo=document.getElementById("modelo").value;
        var serie=document.getElementById("serie").value;
        var chave=document.getElementById("chave").value;
//        alert(modelo);
        document.getElementById("text_config").innerHTML="";

        if (typeof modelo !== 'undefined') {
            document.getElementById("text_config").innerHTML="pesquisando servidor...";
            Cookies.erase("modelo");
            Cookies.erase("serie");
            Cookies.erase("chave");
            Cookies.create("modelo",modelo,10*365);
            Cookies.create("serie",serie,10*365);
            Cookies.create("chave",chave,10*365);
            console.log("modelo=" + modelo);
            console.log("serie=" + serie);
            console.log("chave=" + chave);
            if (getMainConfig(0)) {
                document.getElementById("modelo").value=Cookies["modelo"];
                document.getElementById("serie").value=Cookies["serie"];
                writeMainConfig();
                document.getElementById("text_config").innerHTML="OK";
            } else {
                document.getElementById("text_config").innerHTML="Erro na leitura";
            }
        }

    });
     /* button  Inicio */
    $(document).on("click", ".uib_w_17", function(evt)
    {
         activate_subpage("#uib_page_2");
    });

        /* button  AP */
    $(document).on("click", ".uib_w_16", function(evt)
    {
        document.getElementById("text_ap").value='';
         activate_subpage("#uib_page_8");
    });

        /* button  Config */


        /* button  WIFI */
    $(document).on("click", ".uib_w_18", function(evt)
    {
         activate_subpage("#uib_page_3");
        document.getElementById("text_ips").value=myIP[0];
    });

        /* button  Config */
    $(document).on("click", ".uib_w_49", function(evt)
    {
        document.getElementById("text_config").value='';
         activate_subpage("#uib_page_5");
    });

        /* button  #btn_encode */
    $(document).on("click", "#btn_encode", function(evt)
    {
        var encodedString = Base64.encode(document.getElementById("en_entrada").value);
        console.log(encodedString);
        document.getElementById("en_saida").value=encodedString;
    });

        /* button  #btn_decode */
    $(document).on("click", "#btn_decode", function(evt)
    {
        var decodedString = Base64.decode(document.getElementById("en_entrada").value);
        document.getElementById("en_saida").value=decodedString;
    });

        /* button  #btn_gravar_ts */
    $(document).on("click", "#btn_gravar_ts", function(evt)
    {
        Cookies["api_key"]=document.getElementById("api_key").value;
        Cookies["canal"]=document.getElementById("canal").value;
Cookies["nro_sensores"]=document.getElementById("nro_sensores").value;
        gravarConfiguracao('t',document.getElementById("text_ts"));
    });

        /* button  #btn_gravar_ap */
    $(document).on("click", "#btn_gravar_ap", function(evt)
    {
        Cookies["ap_ssid"]=document.getElementById("ap_ssid").value;
        Cookies["ap_passwd"]=document.getElementById("ap_passwd").value;
        Cookies["ap_canal"]=document.getElementById("ap_canal").value;
        Cookies["ap_cripto"]=document.getElementById("ap_cripto").value;
        gravarConfiguracao('a',document.getElementById("text_ap"));
    });

        /* button  #btn-config2 */
    $(document).on("click", "#btn-config2", function(evt)
    {
        Cookies["nro_pontos"]=document.getElementById("nro_pontos").value;
        Cookies["passo"]=document.getElementById("passo").value;
        Cookies["tempo_ler_corrente"]=document.getElementById("tempo_ler_corrente").value;
        Cookies["contador_enviar_web"]=document.getElementById("contador_enviar_web").value;
        gravarConfiguracao('p',document.getElementById("text_config"));
    });

     /* button  Config */
    $(document).on("click", ".uib_w_6", function(evt)
    {
         activate_subpage("#uib_page_5");
    });

        /* button  #btn_info */
    $(document).on("click", "#btn_info", function(evt)
    {
        activate_subpage("#uib_page_info");
        lerStatus();
        $("#text_info_modelo").html('Platform:'+device.platform+'<BR>');
        $("#text_info_modelo").append('Model:'+device.model+'<BR>');
        $("#text_info_modelo").append('Version:'+device.version+'<BR>');
        $("#text_info_modelo").append('UUID:'+device.uuid+'<BR>');
        $("#text_info_modelo").append('Cordova:'+device.cordova+'<BR>');
    });

        /* button  #btn_ler_status */
    $(document).on("click", "#btn_ler_status", function(evt)
    {
        pagina_status=0;
        lerStatus();
    });

    $(document).on("click","#chart1_div", function(evt)
    {
//     app.consoleLog("[204] rec_temperatura2",rec_temperatura2);
     if (rec_temperatura2==false)  // Temperatura
         return;
    activate_subpage("#uib_page_10");
    });

     $(document).on("click","#chart2_div", function(evt)
    {
     if (Cookies["tela_layout"] == "0" )  // Temperatura
         return;
     if (Cookies["tela_layout"] == "1")  // TGG
         activate_subpage("#uib_page_10");
     else {
  //       atualizaGrafico(g5,"text_pag_11");
         activate_subpage("#uib_page_11");
     }
    });

    $(document).on("click","#chartx61_div", function(evt)
    {
        var txt;
        if (json_feed.nodes_feed1[0] == undefined) {
            txt="sem dados";
        } else {
        var d=moment(new Date(json_feed.nodes_feed1[0].created_at));
        var tensao=parseInt(json_feed.nodes_feed1[0].vcc) / 1000;
            txt="tensão: "+tensao+
            " às "  +   d.format('DD/MM/YYYY HH:mm:ss');  // message

            txt = txt + '  [' + json_feed.nodes1.contador+']'+json_feed.nodes1.status;
        if (window.cordova) {
            navigator.notification.alert(txt,alertDismissed,'Bateria','Fechar');
        } else {
            alert(msg);
        }
        }
    });


    $(document).on("click","#chartx71_div", function(evt)
    {
        var txt;
        if (json_feed.nodes_feed2[0] == undefined) {
            txt="sem dados";
        } else {
        var d=moment(new Date(json_feed.nodes_feed2[0].created_at));
        var tensao=parseInt(json_feed.nodes_feed2[0].vcc) / 1000;
            txt="tensão: "+tensao+
            " às "  +   d.format('DD/MM/YYYY HH:mm:ss');  // message
            txt = txt + '  [' + json_feed.nodes2.contador+']'+json_feed.nodes2.status;
        if (window.cordova) {
            navigator.notification.alert(txt,alertDismissed,'Bateria','Fechar');
        } else {
            alert(msg);
        }
        }

    });

    $(document).on("click","#chartx81_div", function(evt)
    {
        var txt;
        if (json_feed.nodes_feed3[0] == undefined) {
            txt="sem dados";
        } else {
        var d=moment(new Date(json_feed.nodes_feed3[0].created_at));
        var tensao=parseInt(json_feed.nodes_feed3[0].vcc) / 1000;
            txt="tensão: "+tensao+
            " às "  +   d.format('DD/MM/YYYY HH:mm:ss');  // message
            txt = txt + '  [' + json_feed.nodes3.contador+']'+json_feed.nodes3.status;

        if (window.cordova) {
            navigator.notification.alert(txt,alertDismissed,'Bateria','Fechar');
        } else {
            alert(msg);
        }
        }

    });


     /* button  #btn_home */
    $(document).on("click", "#btn_home", function(evt)
    {
        /* your code goes here */
         activate_subpage("#uib_page_2");
    });


        /* button  #btn_mod1 */
    $(document).on("click", "#btn_mod1", function(evt)
    {
         activate_subpage("#uib_page_mod1");
    });

        /* button  #btn_mod2 */
    $(document).on("click", "#btn_mod2", function(evt)
    {
         activate_subpage("#uib_page_mod2");
    });

        /* button  #btn_mod3 */
    $(document).on("click", "#btn_mod3", function(evt)
    {
         activate_subpage("#uib_page_mod3");
    });

        /* button  #btn_inicio_mod */
    $(document).on("click", "#btn_inicio_mod", function(evt)
    {
         activate_subpage("#uib_page_2");
    });

    $(document).on("change", "#af-campo-6", function(evt)
    {
//         Cookies.create("flag-campo6",this.checked,10*365);
         testarBotoesModulo();
    });

    $(document).on("change", "#af-campo-7", function(evt)
    {
         Cookies.create("flag-campo7",this.checked,10*365);
         testarBotoesModulo();
    });

  $(document).on("change", "#af-campo-8", function(evt)
    {
         Cookies.create("flag-campo8",this.checked,10*365);
         testarBotoesModulo();
    });

     /* button  page_9 */


        /* button  #btn_scan */
    $(document).on("click", "#btn_scan", function(evt)
    {
            intel.xdk.device.scanBarcode();
    });

        /* button  #btn_ler_config_web */
    $(document).on("click", "#btn_let_config_web", function(evt)
    {
        var ret;
        var xhr = new XMLHttpRequest();
        var modelo=document.getElementById("modelo").value;
        var serie=document.getElementById("serie").value;
        var chave=document.getElementById("chave").value;
//        alert(modelo);
        document.getElementById("text_config").innerHTML="";
        if (typeof modelo !== 'undefined') {
            document.getElementById("text_config").innerHTML="pesquisando servidor...";
            Cookies.erase("modelo");
            Cookies.erase("serie");
            Cookies.erase("chave");
            Cookies.create("modelo",modelo,10*365);
            Cookies.create("serie",serie,10*365);
            Cookies.create("chave",chave,10*365);
            ret=getMainConfig(0);
        }

    });

        /* button  #btn_ler_barcode */
    $(document).on("click", "#btn_ler_barcode", function(evt)
    {
        intel.xdk.device.scanBarcode();
    });

        /* button  #btn_status_anterior */
    $(document).on("click", "#btn_status_anterior", function(evt)
    {
        pagina_status = pagina_status-10;
        if (pagina_status < 0)
                pagina_status=0;
        lerStatus();
    });

        /* button  #btn_status_proximo */
    $(document).on("click", "#btn_status_proximo", function(evt)
    {
        pagina_status = pagina_status+10;
        lerStatus();
    });


    $(document).on("click", "#btn_sair", function(evt)
    {
        navigator.app.exitApp();
    });

        /* button  Enviar TS */
    $(document).on("click", ".uib_w_101", function(evt)
    {
        prog_wifi();
    });

        /* button  #btn_browser */
    $(document).on("click", "#btn_browser", function(evt)
    {
     var url='http://192.168.4.1';
        $("text_wifi").html(url);
          window.open(url,'_blank','');
    });

        /* button  #btn_prog_wifi */
    $(document).on("click", "#btn_prog_wifi", function(evt)
    {
       prog_wifi();
    });

        /* button  #btn_reboot_ts */
    $(document).on("click", "#btn_reboot_ts", function(evt)
    {
        prog_reboot_ts();
    });

        /* button  #btn_ler_ip */
    $(document).on("click", "#btn_ler_ip", function(evt)
    {
       prog_ler_ip();
    });

        /* button  Sensor */
    $(document).on("click", ".uib_w_5", function(evt)
    {
        app.consoleLog("recursos=",json_config.canal.recursos);

        // corrente
        if (rec_corrente_30a || rec_corrente_100a)
            document.getElementById("af-checkbox-s-corrente").checked=true;
        else
            document.getElementById("af-checkbox-s-corrente").checked=false;
        // TEMPERATURA
        document.getElementById("af-checkbox-s-temp").checked=rec_temperatura;
        // Alimentacao
        document.getElementById("af-checkbox-s-alimentacao").checked=rec_alimentacao;
        // Rele/chave
        document.getElementById("af-checkbox-s-rele").checked=rec_rele;
        // TEMPERATURA EXTRA DS18B20
        document.getElementById("af-checkbox-s-extra").checked=rec_temperatura2;
         activate_subpage("#sub-page-sensor-main");
    });

        /* button  #btn-s-temp */
    $(document).on("click", "#btn-s-temp", function(evt)
    {
         document.getElementById("text-s-temp").innerHTML="";
         activate_subpage("#sub-page-sensor-temp");
    });

        /* button  #btn-s-s-temp */
    $(document).on("click", "#btn-s-s-temp", function(evt)
    {
        var opt=$("#sel-temp option:selected").index();
        var valor=parseFloat(document.getElementById("text-s-vcc").value);
        if (isNaN(valor)){
            document.getElementById("text-s-temp").innerHTML="Ajuste invalido";
            return;
         }

        valor=parseFloat(document.getElementById("text-s-temp-min").value);
        if (isNaN(valor)){
            document.getElementById("text-s-temp").innerHTML="Minimo invalido";
            return;
         }

        valor=parseFloat(document.getElementById("text-s-temp-max").value);
        if (isNaN(valor)) {
            document.getElementById("text-s-temp").innerHTML="Max invalido";
            return;
         }
        document.getElementById("text-s-temp").innerHTML="";
        if (opt==0) {
            Cookies["vcc"]=document.getElementById("text-s-vcc").value;
            Cookies["campo5_min"]=document.getElementById("text-s-temp-min").value;
            Cookies["campo5_max"]=document.getElementById("text-s-temp-max").value;
            gravarConfiguracaoSensor('t',document.getElementById("text-s-temp"));
        }
        // temp extra
        if (opt==1) {
            gravarConfiguracaoSensor('x',document.getElementById("text-s-temp"));
        }
    });

    $(document).on("change", "#sel-temp", function(evt)
    {
        /* your code goes here */
        var opt=$("#sel-temp option:selected").index();
        if (rec_temperatura2 == false) {
            document.getElementById("text-s-temp").innerHTML="Nao possui sensor extra";
            $("#sel-temp option:eq(0)").prop('selected',true);
            return;
        }
        document.getElementById("text-s-temp").innerHTML="";

        if (opt==0) {
            document.getElementById("text-s-vcc").value=Cookies["vcc"];
            document.getElementById("text-s-temp-min").value=Cookies["campo5_min"];
            document.getElementById("text-s-temp-max").value=Cookies["campo5_max"];
        }
        if (opt==1) {
            document.getElementById("text-s-vcc").value=0;
            document.getElementById("text-s-temp-min").value=json_config.canal.field6_min;
            document.getElementById("text-s-temp-max").value=json_config.canal.field6_max;
        }
    });

    $(document).on("change", "#sel-cmd", function(evt)
    {
        var opt=$("#sel-cmd option:selected").index();
        app.consoleLog(opt, ts_cmds_par[opt]);
        if (ts_cmds_par[opt] < 3) {
            $("#text-s-par3").prop('disabled',true);
            $("#text-s-par3").css({'background-color':'#FFFEEE'});
    } else {
            $("#text-s-par3").prop('disabled',false);
            $("#text-s-par3").css({'background-color':'#FFFFFF'});
    }
        if (ts_cmds_par[opt] < 2) {
            $("#text-s-par2").prop('disabled',true);
            $("#text-s-par2").css({'background-color':'#FFFEEE'});
    } else {
            $("#text-s-par2").prop('disabled',false);
            $("#text-s-par2").css({'background-color':'#FFFFFF'});
 }
     if (ts_cmds_par[opt] < 1) {
            $("#text-s-par1").prop('disabled',true);
            $("#text-s-par1").css({'background-color':'#FFFEEE'});
} else {
            $("#text-s-par1").prop('disabled',false);
            $("#text-s-par1").css({'background-color':'#FFFFFF'});
 }

    });

    $(document).on("change", "#sel_horas", function(evt)
    {
        var opt=$("#sel_horas option:selected").index();
        if (opt==0) r_horas=2;
        if (opt==1) r_horas=6;
        if (opt==2) r_horas=24;
    });

     // modulo 1 selecao do campo
    $(document).on("change", "#sel-mod1", function(evt)
    {
        var opt=$("#sel-mod1 option:selected").index();
        switch (opt) {
            case 0: // temperatura
                $("#text-mod1-campo").val(json_config.node1.field1);
                $("#text-mod1-min").val(json_config.node1.field1_min);
                $("#text-mod1-max").val(json_config.node1.field1_max);
                break;
            case 1: // sensor 2
                $("#text-mod1-campo").val(json_config.node1.field2);
                $("#text-mod1-min").val(json_config.node1.field2_min);
                $("#text-mod1-max").val(json_config.node1.field2_max);
                break;
            case 2:
                $("#text-mod1-campo").val(json_config.node1.field3);
                $("#text-mod1-min").val(json_config.node1.field3_min);
                $("#text-mod1-max").val(json_config.node1.field3_max);
                break;
        }
    });

     // modulo 1 selecao do campo
    $(document).on("change", "#sel-g1", function(evt)
    {
            atualiza_dados();
    });

     // modulo 1 selecao do campo
    $(document).on("change", "#sel-mod2", function(evt)
    {
        var opt=$("#sel-mod2 option:selected").index();
        switch (opt) {
            case 0: // temperatura
                $("#text-mod2-campo").val(json_config.node1.field1);
                $("#text-mod2-min").val(json_config.node2.field1_min);
                $("#text-mod2-max").val(json_config.node2.field1_max);
                break;
            case 1: // sensor 2
                $("#text-mod2-campo").val(json_config.node1.field2);
                $("#text-mod2-min").val(json_config.node2.field2_min);
                $("#text-mod2-max").val(json_config.node2.field2_max);
                break;
            case 2:
                $("#text-mod2-campo").val(json_config.node1.field3);
                $("#text-mod2-min").val(json_config.node2.field3_min);
                $("#text-mod2-max").val(json_config.node2.field3_max);
                break;
        }
    });

     // modulo 1 selecao do campo
    $(document).on("change", "#sel-mod3", function(evt)
    {
        var opt=$("#sel-mod3 option:selected").index();
        switch (opt) {
            case 0: // temperatura
                $("#text-mod3-campo").val(json_config.node3.field1);
                $("#text-mod3-min").val(json_config.node3.field1_min);
                $("#text-mod3-max").val(json_config.node3.field1_max);
                break;
            case 1: // sensor 2
                $("#text-mod3-campo").val(json_config.node3.field2);
                $("#text-mod3-min").val(json_config.node3.field2_min);
                $("#text-mod3-max").val(json_config.node3.field2_max);
                break;
            case 2:
                $("#text-mod3-campo").val(json_config.node3.field3);
                $("#text-mod3-min").val(json_config.node3.field3_min);
                $("#text-mod3-max").val(json_config.node3.field3_max);
                break;
        }
    });

     /* button  #btn_s_config */
    $(document).on("click", "#btn_s_config", function(evt)
    {
         activate_subpage("#sub-page-sensor-main");
    });

        /* button  #btn-s-corrente */
    $(document).on("click", "#btn-s-corrente", function(evt)
    {
         activate_subpage("#sub-page-sensor-corrente");
    });

        /* button  #btn-s-s-corrente */
    $(document).on("click", "#btn-s-s-corrente", function(evt)
    {
        Cookies["fases"]=document.getElementById("text-s-fases").value;
        Cookies["campo1_min"]=document.getElementById("text-s-corrente-min").value;
        Cookies["campo1_max"]=document.getElementById("text-s-corrente-max").value;
        if (document.getElementById("af-radio-s-127").checked)
            Cookies["tensao"]='220';
        else
            Cookies["tensao"]='127';
        gravarConfiguracaoSensor('r',document.getElementById("text-s-corrente"));
    });


     /* button  #btn-s-s-main */
    $(document).on("click", "#btn-s-s-main", function(evt)
    {
        /* your code goes here */
        gravarConfiguracaoSensor('m',document.getElementById("text-s-corrente"));
    });


        /* button  #btn_mod_extras */
    $(document).on("click", "#btn_mod_extras", function(evt)
    {
        if ($("#btn_mod1").css("display") != "none")
            activate_subpage("#uib_page_mod1");
        else
        if ($("#btn_mod2").css("display") != "none")
            activate_subpage("#uib_page_mod2");
        else
            activate_subpage("#uib_page_mod3");
    });

        /* button  #btn-m-config */
    $(document).on("click", "#btn-m-config", function(evt)
    {
         activate_subpage("#uib_page_mod_config");
    });

        /* button  #btn-mod-salvar */
    $(document).on("click", "#btn-mod-salvar", function(evt)
    {
        // salva nodes
        gravarConfiguracaoSensor('n', document.getElementById("text-mod-text"));
    });

        /* button  #btn-s-cmd */
    $(document).on("click", "#btn-s-cmd", function(evt)
    {
         activate_subpage("#uib-page-cmd");
    });

        /* button  #btn-s-enviar-cmd */
    $(document).on("click", "#btn-s-enviar-cmd", function(evt)
    {
        gravarComandoTS(document.getElementById("text-cmd-text"));
    });

    }
     document.addEventListener("app.Ready", register_event_handlers, false);
})();
//getMainConfig();

var pagina_status=0;
var myIP = new Array();
var myIP_updated_at = null;

//Cookies.create("modelo","TS0",10*365);
//Cookies.create("serie","2",10*365);

console.log("index_user_script.js   FIM");

if(! window.cordova  ) {
    $("#btn_ler_ip").hide();
    $("#btn_reboot_ts").hide();
    $("#btn_prog_wifi").hide();
  //  onDeviceReady();
}



