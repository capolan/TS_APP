/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


/**********************************************************************/
function gravarComandoTS(text_obj) {
    var node=$("#sel-node option:selected").index();
    var cmd=$("#sel-cmd option:selected").index();
    var chave=Cookies["chave"];
    var addr='http://45.55.77.192/obj/ti/config_ts.php';
    var data='f=1&m='+Cookies['modelo']+
                '&s='+Cookies['serie']+
                "&c="+chave.substring(0,4)+
                "&nro_pontos"+Cookies["nro_pontos"];

    data =data + "&node="+node+
                "&cmd="+cmd+
                "&par1="+document.getElementById("text-s-par1").value+
                "&par2="+document.getElementById("text-s-par2").value+
                "&par3="+document.getElementById("text-s-par3").value;
    app.consoleLog(addr,data);
    if (window.cordova) {
    if (navigator.connection.type == Connection.NONE) {
        text_obj.innerHTML="Sem conexão de rede.";
        return;
    }
    }
    if (text_obj != null)
        text_obj.innerHTML="Enviando servidor";
    $.ajax({
                type:'GET',
                url:addr + '?' + data,
                success: function (data) {
                    console.log(data);
                    if (text_obj == null) {
                        if (window.cordova)
                        navigator.notification.alert(data,  // message
                            alertDismissed,'Comando','Fechar');
                        else
                            alert("Comando:"+data);
                    } else {
                        text_obj.innerHTML=data;
                    }
                },
                error: function (data) {
                    if (text_obj == null) {
                        if (window.cordova)
                        navigator.notification.alert(data,  // message
                            alertDismissed,'Erro','Fechar');
                        else
                            alert("Comando:"+data);
                    } else {
                        text_obj.innerHTML=data;
                    }
                }
            });
}

/**********************************************************************/
function gravarConfiguracao(pag, text_obj) {
    var chave=Cookies["chave"];
    var addr='http://45.55.77.192/obj/ti/config_ts.php?f=2'+
                '&m='+Cookies['modelo']+
                '&s='+Cookies['serie']+
                "&c="+chave.substring(0,4);

    addr = addr + '&pag='+pag;
    if (pag == 'w') {
                // wifi
    console.log("passwd="+Cookies["passwd"]);
                addr=addr+'&ssid='+Cookies['ssid']+
                '&passwd='+Cookies['passwd']+
                 '&proxy='+Cookies['proxy'];
    }
    if (pag == 't') {
                // TS
                addr=addr+"&updated_flag=10";
                addr=addr+'&offline_to_alert='+Cookies["inatividade"]+
                '&passo='+Cookies['passo']+
                '&nro_pontos='+Cookies['nro_pontos']+
                '&tempo_ler_corrente='+Cookies['tempo_ler_corrente']+
                '&contador_enviar_web='+Cookies['contador_enviar_web'];
    }
    if (pag == 'r') {
                // rede
                addr=addr+'&tensao='+Cookies["tensao"]+
                '&fases='+Cookies['fases']+
                '&vcc='+Cookies['vcc'];
    }
    if (pag == 'a') {
                // AP
                addr=addr+'&ap_ssid='+Cookies['ap_ssid']+
                '&ap_passwd='+Cookies['ap_passwd']+
                '&ap_canal='+Cookies['ap_canal']+
                '&ap_cripto='+Cookies['ap_cripto'];
    }
    if (pag == 'p') {
                // parametros
    }
    if (pag=='u') {
                addr=addr+'&updated_flag=1';
    }
        console.log("addr="+addr);
    if (window.cordova) {
        if (navigator.connection.type == Connection.NONE) {
        text_obj.innerHTML="Sem conexão de rede.";
        return;
        }
    }
        text_obj.innerHTML="Enviando servidor";
         $.ajax({
                type:'GET',
                url:addr,
                success: function (data) {
                    console.log(data);
                    text_obj.innerHTML=data;
                },
                error: function (data) {
                    text_obj.innerHTML='ERRO:'+data;
                }
            });
}
/**********************************************************************/

function gravarConfiguracaoSensor(pag, text_obj) {
    var chave=Cookies["chave"];
    var addr='http://45.55.77.192/obj/ti/config_ts.php';
    var data='f=2&m='+Cookies['modelo']+
                '&s='+Cookies['serie']+
                "&c="+chave.substring(0,4);


    if (pag == 'r') {
                // rede/corrente
                data=data+'&tensao='+Cookies["tensao"]+
                '&fases='+Cookies['fases']+
                '&field1_min='+Cookies['campo1_min']+
                '&field1_max='+Cookies['campo1_max'];
    }
    if (pag == 't') {
                // temperatura
                data=data+'&vcc='+Cookies["vcc"]+
                '&field5='+document.getElementById("text-s-temp-nome").value+
                '&field5_min='+Cookies['campo5_min']+
                '&field5_max='+Cookies['campo5_max'];
    }
    if (pag == 'x') {
                // temperatura
                data=data+
                '&field6='+document.getElementById("text-s-temp-nome").value+
                '&field6_min='+document.getElementById("text-s-temp-min").value+
                '&field6_max='+document.getElementById("text-s-temp-max").value;
    }
    if (pag=='m') {
            data =data + "&nome="+document.getElementById("text-s-nome").value+
                "&email="+document.getElementById("text-s-email").value+
                "&celular="+document.getElementById("text-s-celular").value;
    }
    // nodes limites e offline_at
    if (pag=='n') {
        var opt;
        var campo;
        app.consoleLog("campo",campo);
        if ($("#af-campo-6").prop("checked")) {
            opt=$("#sel-mod1 option:selected").index();
            campo = parseInt(opt)+1;
            data =data + "&node1="+json_config.node1.serie;
            data =data + "&node1_field"+campo+"_min="+$("#text-mod1-min").val()+
                    "&node1_field"+campo+"="+$("#text-mod1-campo").val()+
                    "&node1_field"+campo+"_max="+$("#text-mod1-max").val()+
                    "&node1_nome="+$("#text-mod1-nome").val()+
                    "&node1_vcc="+$("#text-mod1-vcc").val();
        }
        if ($("#af-campo-7").prop("checked")) {
            opt=$("#sel-mod2 option:selected").index();
            campo = parseInt(opt)+1;
            data =data + "&node2="+json_config.node2.serie;
            data =data + "&node2_field"+campo+"_min="+$("#text-mod2-min").val()+
                    "&node2_field"+campo+"="+$("#text-mod2-campo").val()+
                    "&node2_field"+campo+"_max="+$("#text-mod2-max").val()+
                    "&node2_nome="+$("#text-mod2-nome").val()+
                    "&node2_vcc="+$("#text-mod2-vcc").val();
        }
        if ($("#af-campo-8").prop("checked")) {
            opt=$("#sel-mod3 option:selected").index();
            campo = parseInt(opt)+1;
            data =data + "&node3="+json_config.node3.serie;
            data =data + "&node3_field"+campo+"_min="+$("#text-mod3-min").val()+
                    "&node3_field"+campo+"="+$("#text-mod3-campo").val()+
                    "&node3_field"+campo+"_max="+$("#text-mod3-max").val()+
                    "&node3_nome="+$("#text-mod3-nome").val()+
                    "&node3_vcc="+$("#text-mod3-vcc").val();
        }
    }

    if (pag=='u') {
                data = data+'&updated_flag=1';
    }
    app.consoleLog(addr,data);
    if (window.cordova) {
    if (navigator.connection.type == Connection.NONE) {
        text_obj.innerHTML="Sem conexão de rede.";
        return;
    }
    }
    if (text_obj != null)
        text_obj.innerHTML="Enviando servidor";
    $.ajax({
                type:'GET',
                url:addr + '?' + data,
                success: function (data) {
                    console.log(data);
                    if (text_obj == null) {
                        navigator.notification.alert(data,  // message
                            alertDismissed,'Modulo','Fechar');
                    } else {
                        text_obj.innerHTML=data;
                    }
                },
                error: function (data) {
                    if (text_obj == null) {
                        navigator.notification.alert(data,  // message
                            alertDismissed,'Erro','Fechar');
                    } else {
                        text_obj.innerHTML=data;
                    }
                }
            });
}


/**********************************************************************/
var json_feed=null;
function get_feed(flag_atualiza) {
    var horas=$("#sel-g1 option:selected").index();
    url='http://45.55.77.192/obj/ti/get_feed.php?'+
                'api_key='+Cookies["api_key"]+'&results='+Cookies["nro_pontos"];

    if (r_horas == null)
            url = url+'&horas='+horas;
    else
            url = url+'&r_horas='+r_horas;


    app.consoleLog("get_feed",url);
    if (Cookies["api_key"] == 'undefined' || Cookies['api_key'].length != 16)
        return;
    json_feed=null;
    $.ajax({
                type:'GET',
                url:url,
     //   dataType: 'json',
                success: function (data) {
                  //  console.log("get_feed="+data);
                //    json_feed = JSON.parse(data);
                    json_feed=data;
                    if (flag_atualiza)
                       document.dispatchEvent(evt_get_feed);

                },
                error: function (data) {
                    console.log(data);
                    text_wifi.innerHTML='ERRO get_feed:'+data.statusText;
                    json_feed=null;
                }
            });
}


// Programar o Tsensor hw diretamente
function prog_ler_ip() {
//    var myRe = new RegExp("([0-9\.]*)\<br\>([0-9\.]*)","g");
    var addr='http://192.168.4.1?I&R';

    console.log("url="+addr);
    if (navigator.connection.type == Connection.NONE) {
        text_wifi.innerHTML="Sem conexão de rede.";
        return;
    }
        text_wifi.innerHTML="Enviando ao TS";
         $.ajax({
                type:'GET',
                url:addr,
                timeout: 15000,
                success: function (data) {
                    console.log(data);
                    myIP = data.split(/\s*,\s*/);
                    var txt='AP='+myIP[0]+'<br>STA='+myIP[1];
                    text_wifi.innerHTML=txt;
                },
                error: function (data) {
                    console.log(data);
                    text_wifi.innerHTML='ERRO:'+data.statusText;
                }
            });

}

// Programar o Tsensor hw diretamente
function prog_reboot_ts() {
    var addr='http://192.168.4.1/s?f=7&R';

    console.log("url="+addr);
    if (navigator.connection.type == Connection.NONE) {
        text_wifi.innerHTML="Sem conexão de rede.";
        return;
    }
        text_wifi.innerHTML="Enviando ao TS";
         $.ajax({
                type:'GET',
                url:addr,
                timeout: 15000,
                success: function (data) {
                    console.log(data);
                    text_wifi.innerHTML=data;
                },
                error: function (data) {
                    console.log(data);
                    text_wifi.innerHTML='ERRO:'+data.statusText;
                }
            });

}

// Programar o Tsensor hw diretamente
function prog_wifi() {
    var addr='http://192.168.4.1/s?f=1&R&s='+
        $("#ssid").val() +
        '&p='+$("#passwd").val()+
        '&y='+$("#proxy").val();

    console.log("url="+addr);
	if (window.cordova) {
        if (navigator.connection.type == Connection.NONE) {
            text_wifi.innerHTML="Sem conexão de rede.";
            return;
        }
    }
    text_wifi.innerHTML="Enviando ao TS";
    $.ajax({
                type:'GET',
                url:addr,
                timeout: 15000,
                success: function (data) {
                    console.log(data);
                    text_wifi.innerHTML=data;
                },
                error: function (data) {
                    console.log(data);
                    text_wifi.innerHTML='ERRO:'+data.statusText;
                }
            });

}

/************************************************************************/
function lerStatus() {

    this.data = null;
    this.table= null;
    this.flag=false;
    var self=this;

    console.log(">lerStatus");

    if (window.cordova) {
    if (navigator.connection.type == Connection.NONE) {
            return;
        }
    }
//    google.load("visualization", "1.1", {'packages':["table"]}, {'callback' : this.drawTable});
 //   google.setOnLoadCallback(this.drawTable);


    this.loadData = function () {
        //$("#pag_info_status").html("Conectando servidor.");
        var xhr = new XMLHttpRequest();
        var url= "http://45.55.77.192/obj/ti/config_ler_status.php?f=1&m="+Cookies['modelo']+"&s="+Cookies['serie']+'&limit='+pagina_status;
        console.log(url);
        xhr.timeout = 4000;
        xhr.open("GET",url, true);
        xhr.onload = function(){
        if(xhr.status == 200)
        {
            var json_string = xhr.responseText;
            var json = JSON.parse(json_string);
            var len=json.feeds.length;
            console.log("onLoad len="+len);
            self.flag=true;
            if (len==0) {
                $("#pag_info_status").html("Sem registros. posição="+pagina_status);
            } else {
            for (var i=0; i< len;i++) {
         //    console.log("i:"+i+" date="+json.feeds[i].created_at+"  status="+ json.feeds[i].status);
             self.data.addRow([pagina_status+i+1,json.feeds[i].created_at,{v:'1',f:json.feeds[i].status}]);
            }
            self.table.draw(self.data, {showRowNumber: false, width: '100%', height: '100%'});

        }
        }
        else if(xhr.status == 404)
        {
            alert("Web Service Doesn't Exist", "Error");
        }
        else
        {
            alert("Unknown error occured while connecting to server", "Error");
        }
        if ($("#btn_info").hasClass("check"))
                            $("#btn_info").toggleClass("info check");
        };
        xhr.send();
    };

    this.drawTable = function() {
        console.log(">drawTable");
        self.data = new google.visualization.DataTable();
        self.data.addColumn('number', 'Data');
        self.data.addColumn('string', 'Data');
        self.data.addColumn('string', 'Evento');
        self.table = new google.visualization.Table(document.getElementById("pag_info_status"));
        self.loadData();
    };

    //google.setOnLoadCallback(this.drawTable);

    if (this.data == null)
        this.drawTable();
    else
        this.loadData();
    console.log("<lerStatus");
}

function myEventBase64Encode()
    {
        var encodedString = Base64.encode(document.getElementById("en_entrada").value);
        console.log(encodedString);
        document.getElementById("en_saida").value=encodedString;
    }

function validarInteiro(valor, minval, maxval){
      //tento converter a inteiro.
     //se for um inteiro nao lhe afeta, se não for tenta convertelo
     valor = parseInt(valor);

      //Comprovo se é um valor numérico
      if (isNaN(valor) || valor < minval ||valor > maxval) {
            //entao (nao e numero) devuelvo el valor cadena vacia
            return "";
      } else{
            //No caso contrario (Se for um número) devolvo o valor
            return valor;
      }
}

/* COOKIES */

var Cookies = {
	init: function () {
		var allCookies = document.cookie.split('; ');
		for (var i=0;i<allCookies.length;i++) {
			var cookiePair = allCookies[i].split('=');
			this[cookiePair[0]] = cookiePair[1];
		}
	},
	create: function (name,value,days) {
        if (this[name] == undefined) {
		  if (days) {
			 var date = new Date();
			 date.setTime(date.getTime()+(days*24*60*60*1000));
			 var expires = "; expires="+date.toGMTString();
            }
		  else var expires = "";
		  document.cookie = name+"="+value+expires+"; path=/";
        }
		this[name] = value;
	},
	erase: function (name) {
		this.create(name,'',-1);
		this[name] = undefined;
	}
};

Cookies.init();

/*********************************************************************/
function atualizaGraficoConfig() {
    console.log(">atualizaGRaficoConfig");
    get_feed(false);
    testarBotoesModulo();
    Cookies["api_key"]=document.getElementById("api_key").value;
    // campo 5 temperatura
    var max=Math.ceil((parseInt(json_config.canal.field5_max)+10)/10)*10;
    var min=parseInt(json_config.canal.field5_min);
    if (min < 0) {
            min=Math.floor((min-10)/10)*10;
    } else min=0;
    var range_val = max-min;
    var red_value= range_val - (range_val * 0.1) + min;
    var yellow_value= range_val - (range_val * 0.25) + min;
    g1.data.setColumnLabel(1,Cookies["campo5"]);
    g1.options.min=min;
    g1.options.max=max;
    g1.options.redFrom=red_value;
    g1.options.redTo=max;
    g1.options.yellowFrom=yellow_value;
    g1.options.yellowTo=red_value;
    // grafico linha
    g2.data.setColumnLabel(1,Cookies["campo5"]);
    g2.options.title=Cookies["campo5"];
    //g2.options.vAxis.minValue=min;
    //g2.options.vAxis.maxValue=max;
    if (window.g3 != undefined) {
        g3.data.setColumnLabel(1,Cookies["campo6"]);
        g3.data.setColumnLabel(1,Cookies["campo6"]);
    }


    for (var m=0; m<3; m++) {
        var v_str;
        var t=m+1;
        var node="$.node"+t;
        if (gx1[m] != undefined && getObjects(json_config,node)) {
            console.log("modulo="+m);
        max=Math.ceil((parseInt(json_config.node1.field1_max)+10)/10)*10;
        v_str=jsonPath(json_config,node+".field1_min");
            console.log("min="+v_str);
        min=parseInt(v_str);
        if (min < 0) {
            min=Math.floor((min-10)/10)*10;
        } else min=0;

        range_val = max-min;
        red_value= range_val - (range_val * 0.1) + min;
        yellow_value= range_val - (range_val * 0.25) + min;
        v_str=jsonPath(json_config,node+".field1");
            console.log("field1="+v_str);
        gx1[m].data.setColumnLabel(1,v_str);
        gx1[m].options.min=min;
        gx1[m].options.max=max;
        gx1[m].options.redFrom=red_value;
        gx1[m].options.redTo=max;
        gx1[m].options.yellowFrom=yellow_value;
        gx1[m].options.yellowTo=red_value;
        gx2[m].data.setColumnLabel(1,v_str);
        gx2[m].options.title=v_str;
        gx2[m].options.vAxis.minValue=min;
        gx2[m].options.vAxis.maxValue=max;
        }
    }
    atualiza_dados();
}
/**********************************************************************/
function testarBotoesModulo() {
    console.log(">testarBotoesModulo");
   // console.log("json_feed.nodes1.name="+json_feed.nodes1.name);
   // $("#af-campo-6").prop("checked",Cookies["flag-campo6"]);
    var page=null;
    if (json_config == null) return;
    for (var m=2; m>=0; m--) {
        var n_mod=m+1;
        var node=jsonPath(json_config,"$.canal.node"+n_mod);
     if (node != false) {
             $("#btn_mod"+n_mod).show();
             $("#cfg-mod"+n_mod).show();
             $("#btn_mod"+n_mod).html($("#text-mod"+n_mod+"-nome").val());
             createGraphx(m);
            page=n_mod;
     } else{
             $("#btn_mod"+n_mod).hide();
             $("#cfg-mod"+n_mod).hide();
             if (gx1[m] != undefined) {
                gx1[m].ativo=false;
                gx2[m].ativo=false;
             }
     }
    }

    if (page != null) {
             $("#btn_mod_extras").show();
    } else {
             $("#btn_mod_extras").hide();
    }
}

function alertDismissed() {
    // do something
}


/*********************************************************************/
var json_config=null;
// tipo = 0 ler todos os dados
//        1 = somente os módulos
function getMainConfig(tipo) {
    app.consoleLog(">getMainConfig","");

    /*    if (window.cordova) {
        if (navigator.connection.type == Connection.NONE) {
        text_obj.innerHTML="Sem conexão de rede.";
        return;
        }
    }
  */
    if (window.Cookies["modelo"] != undefined &&
        window.Cookies["serie"] != undefined &&
        window.Cookies["chave"] != undefined) {
        console.log("modelo=" + Cookies["modelo"]);
        var chave=Cookies["chave"];
        var url="http://45.55.77.192/obj/ti/config_ler.php?f=0&m="+Cookies["modelo"]+"&s="+Cookies["serie"]+"&c="+chave.substring(0,4);

        console.log("url="+url);
      //  document.getElementById("text_config").innerHTML=url;
      //  document.getElementById("text_config").innerHTML="GET";

        $.ajax({
                type: 'GET',
                url: url,
            dataType: 'json',
                success: function(data) {
                    json_config=data;
        /*  intel.xdk.notification.alert(json.channel.name, "Canal"); */
                console.log("api_key="+json_config.canal.api_key);
                // TS
         if (data != 'null') {
        document.getElementById("text_config").innerHTML="OK";

                if (tipo == 0) {
                if (json_config.nro_pontos == null)
                    Cookies.create("nro_pontos",40,10*356);
                if (json_config.passo == null)
                    Cookies.create("passo",1,10*356);
                if (json_config.tempo_ler_corrente == null)
                    Cookies.create("tempo_ler_corrente",20,10*356);
                else
                    Cookies.create("tempo_ler_corrente",json_config.canal.tempo_ler_corrente, 10*356);
                if (json_config.contador_enviar_web == null)
                    Cookies.create("contador_enviar_web",3,10*356);
                else
                    Cookies.create("contador_enviar_web",json_config.canal.contador_enviar_web, 10*356);
                             // WIFI
                Cookies.create("ssid",json_config.canal.ssid,10*356);
                Cookies.create("passwd",json_config.canal.passwd,10*356);
                if (json_config.canal.proxy == undefined)
                    Cookies.create("proxy","0:0",10*356);
                else
                    Cookies.create("proxy",json_config.canal.proxy,10*356);
                // TENSAO
                Cookies.create("tensao",json_config.canal.tensao,10*356);
                Cookies.create("fases",json_config.canal.fases,10*356);
                // TS
                Cookies.create("api_key",json_config.canal.api_key,10*356);
                Cookies.create("inatividade",json_config.canal.offline_to_alert,10*356);

                // AP wifi
                Cookies.create("ap_ssid",json_config.canal.ap_ssid,10*356);
                Cookies.create("ap_passwd",json_config.canal.ap_passwd,10*356);
                Cookies.create("ap_canal",json_config.canal.ap_canal,10*356);
                Cookies.create("ap_cripto",json_config.canal.ap_cripto,10*356);
                // Titulo dos campos
                Cookies.create("descricao",json_config.canal.descricao,10*356);
                Cookies.create("campo1",json_config.canal.field1,10*356);
                Cookies.create("campo2",json_config.canal.field2,10*356);
                Cookies.create("campo3",json_config.canal.field3,10*356);
                Cookies.create("campo4",json_config.canal.field4,10*356);
                Cookies.create("campo5",json_config.canal.field5,10*356);
                Cookies.create("campo6",json_config.canal.field6,10*356);
                Cookies.create("campo7",json_config.canal.field7,10*356);
                Cookies.create("campo8",json_config.canal.field8,10*356);

             // sensor
             Cookies.create("nome",json_config.canal.nome,10*356);
             Cookies.create("email",json_config.canal.email,10*356);
             Cookies.create("celular",json_config.canal.celular,10*356);

             // limites
                // corrente
                Cookies.create("campo1_min",json_config.canal.field1_min,10*356);
                Cookies.create("campo1_max",json_config.canal.field1_max,10*356);
                // temp principal
                Cookies.create("campo5_min",json_config.canal.field5_min,10*356);
                Cookies.create("campo5_max",json_config.canal.field5_max,10*356);
                Cookies.create("vcc",json_config.canal.vcc,10*356);
                $("#text-s-temp-nome").val(json_config.canal.field5);
                $("#af-header-0-tit").html("<h1>"+json_config.canal.nome+"</h1>");
                define_recuros();
                } // tipo==0
             // modulos
                if (json_config.canal.node1 != undefined) {
                    $("#sel-mod1 option:eq(0)").prop('selected',true);
                    $("#af-campo-6").prop("checked",true);
                    if (json_config.node1.name == null)
                        $("#text-mod1-nome").val("Mod1");
                    else
                        $("#text-mod1-nome").val(json_config.node1.name);
                    $("#text-mod1-campo").val(json_config.node1.field1);
                    $("#text-mod1-min").val(json_config.node1.field1_min);
                    $("#text-mod1-max").val(json_config.node1.field1_max);
                    $("#text-mod1-vcc").val(json_config.node1.vcc_min);
                } else {
                    $("#af-campo-6").prop("checked",false);
                }
                if (json_config.canal.node2 != undefined) {
                    $("#sel-mod2 option:eq(0)").prop('selected',true);
                    $("#af-campo-7").prop("checked",true);
                    if (json_config.node2.name == null)
                        $("#text-mod2-nome").val("Mod2");
                    else
                        $("#text-mod2-nome").val(json_config.node2.name);
                    $("#text-mod2-campo").val(json_config.node2.field1);
                    $("#text-mod2-min").val(json_config.node2.field1_min);
                    $("#text-mod2-max").val(json_config.node2.field1_max);
                    $("#text-mod2-vcc").val(json_config.node2.vcc_min);
                } else {
                    $("#af-campo-7").prop("checked",false);
                }
                if (json_config.canal.node3 != undefined) {
                    $("#sel-mod3 option:eq(0)").prop('selected',true);
                    $("#af-campo-8").prop("checked",true);
                    if (json_config.node3.name == null)
                        $("#text-mod3-nome").val("Mod3");
                    else
                        $("#text-mod3-nome").val(json_config.node3.name);
                    $("#text-mod3-campo").val(json_config.node3.field1);
                    $("#text-mod3-min").val(json_config.node3.field1_min);
                    $("#text-mod3-max").val(json_config.node3.field1_max);
                    $("#text-mod3-vcc").val(json_config.node3.vcc_min);
                } else {
                    $("#af-campo-8").prop("checked",false);
                }
                Cookies.create("tela_layout",json_config.canal.tela_layout,10*356);
                flag_getMainConfig=true;
             createGraphs();
             testarBotoesModulo();
             writeMainConfig();
                atualizaGraficoConfig();


         }
            },
                error: function (data){
        navigator.notification.alert(
            data.statusText, alertDismissed,
            'Aviso:' + data.status, 'Fechar');
                }

            });
    } else {
        document.getElementById("text_config").innerHTML="ajuste modelo/serie/chave";
    }// if modelo
}
/*********************************************************************/
function writeMainConfig() {
    var xhr = new XMLHttpRequest();
    app.consoleLog(">writeMainConfig","");
    if (window.Cookies["modelo"] != undefined &&
        window.Cookies["serie"] != undefined) {
       // document.getElementById("chave").readOnly=true;
        document.getElementById("modelo").value=Cookies["modelo"];
        document.getElementById("serie").value=Cookies["serie"];
        document.getElementById("chave").value=Cookies["chave"];
            document.getElementById("canal").value=Cookies["canal"];
            document.getElementById("passo").value=Cookies["passo"];
            document.getElementById("tempo_ler_corrente").value=Cookies["tempo_ler_corrente"];
            document.getElementById("contador_enviar_web").value=Cookies["contador_enviar_web"];
            // TS
            document.getElementById("api_key").value=Cookies["api_key"];
        app.consoleLog("Cookies[api_key]=",Cookies["api_key"]);
            document.getElementById("inatividade").value=Cookies["inatividade"];
            // WIFI
            document.getElementById("ssid").value=Cookies["ssid"];
            document.getElementById("passwd").value=Cookies["passwd"];
            document.getElementById("proxy").value=Cookies["proxy"];
            // AP wifi
            document.getElementById("ap_ssid").value=Cookies["ap_ssid"];
            document.getElementById("ap_passwd").value=Cookies["ap_passwd"];
            document.getElementById("ap_canal").value=Cookies["ap_canal"];
            document.getElementById("ap_cripto").value=Cookies["ap_cripto"];


            // PAGINA SENSOR
            document.getElementById("text-s-nome").value=Cookies["nome"];
            document.getElementById("text-s-email").value=Cookies["email"];
            document.getElementById("text-s-celular").value=Cookies["celular"];

            // TEMPERATURA
            document.getElementById("text-s-vcc").value=Cookies["vcc"];
            document.getElementById("text-s-temp-min").value=Cookies["campo5_min"];
            document.getElementById("text-s-temp-max").value=Cookies["campo5_max"];
            // CORRENTE/REDE
            if (Cookies["tensao"]=='220')
                document.getElementById("af-radio-s-220").checked=true;
            else
                document.getElementById("af-radio-s-127").checked=true;
            document.getElementById("text-s-fases").value=Cookies["fases"];
            document.getElementById("text-s-vcc").value=Cookies["vcc"];
            document.getElementById("text-s-corrente-min").value=Cookies["campo1_min"];
            document.getElementById("text-s-corrente-max").value=Cookies["campo1_max"];

        //        if (json.nome != 'undefined')
        //            $("#af-header-0").html(json.nome);
    } // if modelo
}
/**********************************************************************/
function lerFlagStatus() {
//    console.log(">lerFlag_Status");
    if (json_feed == null) return;

    if ($("#btn_info").hasClass("close"))
                $("#btn_info").toggleClass("info close");

    $("#text_ips").html('AP='+json_feed.channel.ip0+'<br>');
    $("#text_ips").append('STA='+json_feed.channel.ip1);
    myIP_updated_at = json_feed.channel.updated_ip_at;
    $("#text_ips").append('<br>'+myIP_updated_at+ '(atualizado)');
    $("#text_ips").append('<br>'+json_feed.channel.updated_at+':');
    switch (json_feed.channel.updated_flag) {
                        case '0': txt='OK'; break;
                        case '-1': txt='config OK'; break;
                        case '1': txt='enviado config'; break;
                        default: txt='invalido';
    }
    $("#text_ips").append(txt);

    if (json_feed.channel.status == "1") {
        if ($("#btn_info").hasClass("info"))
                $("#btn_info").toggleClass("info check");
    } else
        if ($("#btn_info").hasClass("check"))
                $("#btn_info").toggleClass("info check");


}


/************************************************************/
function atualiza_dados () {
    console.log(">atualiza_dados");
    get_feed(true);
    lerFlagStatus();
}

function atualiza_modulos () {
    getMainConfig(1) ;
        testarBotoesModulo();
}
/***************************************************************/
/* comandos */
/* número de parametros obrigatórios */
/* 0 - Sleep  ... 10-Remover 11 - reset de firmware 12-limites*/
var ts_cmds_par = [ 2,3,3,3,1,1,0,0,0,1,0,3 ];

var r_horas = 6;

var evt_get_feed = document.createEvent("Event") ;
evt_get_feed.initEvent("app.Get_Feed", false, false) ;

function onDeviceReady() {
    console.log("onDeviceReady");
    if (Cookies["nro_pontos"] == undefined ||
        validarInteiro(Cookies["nro_pontos"],1,100) == "") {
        Cookies.create("nro_pontos",20,10*365);
    }

    if (getMainConfig(0)) {
        writeMainConfig();
    } else {
        document.getElementById("modelo").value=Cookies["modelo"];
        document.getElementById("serie").value=Cookies["serie"];
        document.getElementById("chave").value=Cookies["chave"];
        activate_subpage("#uib_page_5");
    }

        atualiza_dados();
        createGraphs();
        testarBotoesModulo();
        setInterval('atualiza_dados()',10000,true);
        setInterval('atualiza_modulos()',60000,true);
    moment.locale("pt-BR");
    $('#api_key').prop('readonly', true);
    $('#canal').prop('readonly', true);
/*      var hash = CryptoJS.MD5("45.55.77.192,TS0,3");
    app.consoleLog("hash",hash.toString(CryptoJS.enc.Hex));
    var s=hash.toString(CryptoJS.enc.Hex);
    document.getElementById("chave").value=s;
*/
}

/*
//  RECURSOS
#define REC_CORRENTE_30A 0
#define REC_CORRENTE_100A 1
// temperatura
// 000 sem sensor temp
// 001 LM35
// 010 DHT11
// 011 DS18B20
// 100 DS18B20 segundo sensor
#define REC_LM35          0b000100
#define REC_DHT11         0b001000
#define REC_DS18B20       0b001100
#define REC_DS18B20_EXTRA 0b010000
// rele
#define REC_RELE 5
#define REC_LED1 6
#define REC_LED2 7
#define REC_LED3 8
#define REC_BOTAO 9
#define REC_ALIMENTACAO 10  // alimentação da rede
#define REC_FLUXO_AGUA 11
#define REC_SENSOR_9 12 // PIR, sensor de contato, digital 0 ou 1
#define REC_SENSOR_10 13 // PIR, sensor de contato, digital 0 ou 1
#define REC_ULTRASOM 14
*/
var rec_corrente_30a, rec_corrente_100a;
var rec_lm35, rec_dht11, rec_ds18b20, rec_temperatura;
var rec_temperatura2, rec_ds18b20_extra;
var rec_rele, rec_led1, rec_led2, rec_led3, rec_alimentacao, rec_botao;

function define_recuros() {
     var recursos=parseInt(json_config.canal.recursos);
     app.consoleLog(">recursos="+recursos, recursos.toString(16));
    // CORRENTE
    if ((recursos & 0x0001) == 0x0001) {
        rec_corrente_30a=true;
        $("#btn-s-corrente").show();
    } else {
        rec_corrente_30a=false;
        $("#btn-s-corrente").hide();
    }

    // TEMPERATURA
    var x=recursos & 0x000C;
    if ((recursos & 0x0C) > 0) {
        rec_temperatura=true;
        if (recursos & 0x0004 == 0x0004)
            rec_lm35=true;
        else
            rec_lm35=false;

        if (recursos & 0x0008 == 0x0008)
            rec_dht11=true;
        else
            rec_dht11=false;

        if (recursos & 0x000C == 0x000C)
            rec_ds18b20=true;
        else
            rec_ds18b20=false;
    } else {
            rec_temperatura=false;
    }

    // TEMPERATURA EXTRA DS18B20
    if ((recursos & 0x10) == 0x10) {
            rec_temperatura2=true;
            rec_ds18b20_extra=true;
    } else {
            rec_temperatura2=false;
            rec_ds18b20_extra=false;
    }
    // RELE
    if ((recursos & 0x20) == 0x20) {
            rec_rele=true;
        $("#btn-s-rele").show();
    } else {
            rec_rele=false;
        $("#btn-s-rele").hide();
    }
    // BOTAO
    if ((recursos & 0x200) == 0x200)
        rec_botao=true;
    else
        rec_botao=false;
    // ALIMENTACAO
    if ((recursos & 0x400) == 0x400) {
        rec_alimentacao=true;
        $("#btn-s-aliementacao").show();
    } else {
        rec_alimentacao=false;
        $("#btn-s-aliementacao").hide();
    }

}
