/*********************************************************************/
function atualizaGrafico(objG, div, campo) {
    //console.log(">atualizaGrafico");
    var recursos = parseInt(json_config.canal.recursos);
    objG.loadData();
    if (div === null) return;
    //var d= new Date(g3.created_at);
    if (objG.id_div == 'chart1_div')
       console.log(objG.options);
    var d = moment(new Date(objG.created_at));
    var txt = '';
    var minmax = '';
    var offline = '';

    if (objG.message != undefined && objG.message != '') {
        document.getElementById(div).innerHTML = '<div align="center" style="size:6;color:red">' + objG.titulo + ':' + objG.message + '</div>';
        return;
    }

    if (objG.created_at != undefined) {
        if (objG.id_div != "chart1_div") txt = "Atualizado &agrave;s ";
        txt = txt + d.format('DD/MM/YYYY HH:mm:ss')
    }

    if (objG.offline_at != false) {
        offline = '<div style="color:red">[' + objG.offline_at + ']</div>';
        //$("#"+div).css('color','red');
    }
    if (objG.min[campo] != undefined) {
        var mi = parseFloat(objG.min[campo]);
        var ma = parseFloat(objG.max[campo]);
        minmax = "<br>min=" + mi.toFixed(1) +
            "&nbsp;&nbsp;m&aacute;x=" + ma.toFixed(1);
    }


    document.getElementById(div).innerHTML = txt +
        //        d.format('LLL')+
        minmax + offline + objG.message;
    // testa se tem rele no modulo principal
    if ((recursos & (1<<15)) > 0)
        if (json_feed.feeds[0].chave1 !== undefined) {
            var status=json_feed.channel.status;
            CHAVE1=json_feed.feeds[0].chave1;

            console.log("chave1=" + CHAVE1+ "  status=" + status);
            if (status==0)
                document.getElementById('text-rele-text').innerHTML='';
            else {
                document.getElementById('text-rele-text').innerHTML=json_feed.channel.status_msg;
            }
            document.getElementById('img-lamp-rele-g').innerHTML='Remoto';
            if (CHAVE1 == 1)
            {
                document.getElementById('img-lamp-rele').src="images/lamp_on.png";
            } else
            if (CHAVE1 == 0) {
                document.getElementById('img-lamp-rele').src="images/lamp_off.png";
            }
    }
}
/*********************************************************************/
function t_TelaTGG() {
    atualizaGrafico(g1, "text_pag_2_1", 1);
    atualizaGrafico(g2, "text_pag_2_2", 5);
    atualizaGrafico(g3, "text_pag_10", 1);
    atualizaGrafico(g4, null, 1);
    for (var i = 0; i < MAX_NODES; i++) {
        if (gm1[i][0] != undefined) {
            // gx1[i].loadData();
            var cp = i + 1;
            atualizaGrafico(gm1[i][0], "text-mod" + cp, 1);
            gm2[i][0].loadData();
        }
    }
}

function TelaTGG() {
    var max = Math.ceil((parseInt(json_config.canal.field5_max) + 10) / 10) * 10;
    var min = parseInt(json_config.canal.field5_min);
    if (min < 0) {
        min = Math.floor((min - 10) / 10) * 10;
    } else min = 0;
    g1 = new runGraph(2, 'chart1_div', 'uib_page_2', 'Bateria', 280, 200, [{
            nome: Cookies['campo5'],
            campo: 5
        }],
        null, Cookies["nro_pontos"], Cookies["passo"], min, max, false);
    g2 = new runGraph(2, 'chart2_div', 'uib_page_2', 'Rede externa', 280, 200, [{
            nome: Cookies["campo2"],
            campo: 2
        }],
        null, Cookies["nro_pontos"], Cookies["passo"], min, max, false);
    g3 = new runGraph(2, 'chart3_div', 'uib_page_10', 'Rede Gerada', 280, 200, [{
            nome: Cookies["campo3"],
            campo: 3
        }],
        null, Cookies["nro_pontos"], Cookies["passo"], 1, false);
    g4 = new runGraph(2, 'chart4_div', 'uib_page_10', 'RPM', 280, 200, [{
            nome: Cookies["campo4"],
            campo: 4
        }],
        null, Cookies['nro_pontos'], Cookies["passo"], min, max, false);
    g1.timerID = setInterval('t_TelaTGG()', 15000);
}

/*********************************************************************/
/*  Temperatura + Corrente */
/*********************************************************************/
function t_telaTS_temp_corrente() {
    atualizaGrafico(g1, "text_pag_2_1", 1);
    atualizaGrafico(g2, "text_pag_2_2", 5);
    atualizaGrafico(g3, "text_pag_10", 1);
    atualizaGrafico(g4, null, 1);
    atualizaGrafico(g5, "text_pag_11", 5);
    for (var i = 0; i < MAX_NODES; i++) {
        if (gm1[i][0] != undefined) {
            var cp = i + 1;
            atualizaGrafico(gm1[i][0], "text-mod" + cp, 1);
            gm2[i][0].loadData();
        }
    }
}

function telaTS_temp_corrente() {
    console.log(">telaTS_temp_corrente");
    var max1 = Math.ceil((parseInt(json_config.canal.field1_max) + 100) / 100) * 100;
    var min1 = parseInt(json_config.canal.field1_min);
    if (min < 0) {
        min = Math.floor((min - 10) / 10) * 10;
    } else min = 0;
    g1 = new runGraph(0, 'chart1_div', 'uib_page_2', 'Consumo', 200, 200, [{
            nome: Cookies["campo1"],
            campo: 1
        }],
        null,
        1, 1, min1, max1, true);
    var max = Math.ceil((parseInt(json_config.canal.field5_max) + 10) / 10) * 10;
    var min = parseInt(json_config.canal.field5_min);
    if (min < 0) {
        min = Math.floor((min - 10) / 10) * 10;
    } else min = 0;
    g2 = new runGraph(0, 'chart2_div', 'uib_page_2', 'Temperatura', 200, 200, [{
            nome: Cookies["campo5"],
            campo: 5
        }],
        null,
        1, 1, min, max, true);

    g3 = new runGraph(3, 'chart3_div', 'uib_page_10', 'Fases', 200, 200, [{
                nome: Cookies["campo2"],
                campo: 2
            },
            {
                nome: Cookies["campo3"],
                campo: 3
            },
            {
                nome: Cookies["campo4"],
                campo: 4
            }],
        null,
        3, 1, 1, 1, true);
    g4 = new runGraph(1, 'chart4_div', 'uib_page_10', 'Fases', 280, 200, [{
                nome: Cookies["campo2"],
                campo: 2
            },
            {
                nome: Cookies["campo3"],
                campo: 3
            },
            {
                nome: Cookies["campo4"],
                campo: 4
            }],
        null,
        Cookies["nro_pontos"], Cookies["passo"], min1, max1, true);

    g5 = new runGraph(2, 'chart5_div', 'uib_page_11', 'Historio', 280, 200, [{
            nome: Cookies["campo5"],
            campo: 5
        }],
        null, Cookies["nro_pontos"], Cookies["passo"], min, max, false);
    $(".uib_row_19").css("display", "none");
    //g1.timerID=setInterval('t_telaTS_temp_corrente()', 15000);
    document.addEventListener("app.Get_Feed", t_telaTS_temp_corrente, false);
}

/*********************************************************************/
/*  Temperatura  */
/*********************************************************************/
function t_telaTS_temperatura() {
    //  console.log(">t_telaTS_temperatura");
    atualizaGrafico(g1, "text_pag_2_1", 5);
    atualizaGrafico(g2, null, 5);
    gtext[0].loadData();
    if (g3 != undefined && g3.ativo == true) {
        atualizaGrafico(g3, "text_pag_10", 6);
        atualizaGrafico(g4, null, 1);
        gtext[1].loadData();
    }
    if (g5 != undefined && g5.ativo == true) {
        atualizaGrafico(g5, "text_pag_11", 6);
        atualizaGrafico(g6, null, 1);
        gtext[2].loadData();
    }
    for (var i = 0; i < MAX_NODES; i++) {
        //console.log(">t_telaTS_temperatura i=" + i);
        if (gm1[i][1] != undefined) {
            for (var n = 1; n <= MAX_NODES_SENSORES; n++) {
                if (gm1[i][n] != undefined && gm1[i][n].ativo == true) {
                    //console.log(">><< n="+n);
                    var cp = i + 1;
                    atualizaGrafico(gm1[i][n], "text-mod" + cp, 1);
                    gm2[i][n].loadData();
                }
            }
            gt[i].loadData();
        }
    }

}
/**************************************************************/
function telaTS_temperatura() {
    var max = Math.ceil((parseInt(json_config.canal.field5_max) + 10) / 10) * 10;
    var min = parseInt(json_config.canal.field5_min);
    var n_div = 3;
    if (isNaN(max))
        max = 100;
    if (isNaN(min) == false || min < 0) {
        min = Math.floor((min - 10) / 10) * 10;
    } else min = 0;

    max = parseInt(json_config.canal.field5_max);
    min = parseInt(json_config.canal.field5_min);

    app.consoleLog(">telaTS_temperatura", "min=" + min + "   max=" + max);
    g1 = new runGraph(0, 'chart1_div', 'uib_page_2', 'Temperatura', 200, 200, [{
            nome: Cookies["campo5"],
            campo: 5
        }],
        null,
        1, 1, min, max, true, 't1');
    g2 = new runGraph(2, 'chart2_div', 'uib_page_2', 'Historio', 280, 200, [{
                nome: Cookies["campo5"],
                campo: 5
            },
            {
                nome: "min",
                campo: 100
            },
            {
                nome: "max",
                campo: 101
            }],
        null,
        Cookies["nro_pontos"], Cookies["passo"], min, max, false);
    gtext[0] = new lerMensagensSensor(null, "text_pag_2_2",5);

    if (rec_temperatura2 == true || rec_humidade == true) {
        console.log("rec_temperatura 2 || humidade");
        max = Math.ceil((parseInt(json_config.canal.field6_max) + 10) / 10) * 10;
        min = parseInt(json_config.canal.field6_min);
        if (isNaN(min) == false)
        if (min < 0) {
            min = Math.floor((min - 20) / 10) * 10;
        } else min = 0;
        g3 = new runGraph(0, 'chart' + n_div + '_div', 'uib_page_10', 'Temperatura', 200, 200, [{
                nome: Cookies["campo6"],
                campo: 6
            }],
            null,
            1, 1, min, max, true,'t2');
        n_div++;
        g4 = new runGraph(2, 'chart' + n_div + '_div', 'uib_page_10', 'Historio', 280, 200, [{
                    nome: Cookies["campo6"],
                    campo: 6
                },
                {
                    nome: "min",
                    campo: 100
                },
                {
                    nome: "max",
                    campo: 101
                }],
            null,
            Cookies["nro_pontos"], Cookies["passo"], min, max, true);
        gtext[1] = new lerMensagensSensor(null, "text_pag_10_2",6);

        n_div++;
    }
    if (rec_temperatura3 == true) {
        console.log("rec_temperatura 3");
        max = Math.ceil((parseInt(json_config.canal.field7_max) + 10) / 10) * 10;
        min = parseInt(json_config.canal.field7_min);
        if (isNaN(min) == false)
        if (min < 0) {
            min = Math.floor((min - 20) / 10) * 10;
        } else min = 0;
        g5 = new runGraph(0, 'chart' + n_div + '_div', 'uib_page_11', 'Temperatura', 200, 200, [{
                nome: Cookies["campo7"],
                campo: 7
            }],
            null,
            1, 1, min, max, true,'t3');
        n_div++;
        g6 = new runGraph(2, 'chart' + n_div + '_div', 'uib_page_11', 'Historio', 280, 200, [{
                    nome: Cookies["campo7"],
                    campo: 7
                },
                {
                    nome: "min",
                    campo: 100
                },
                {
                    nome: "max",
                    campo: 101
                }],
            null,
            Cookies["nro_pontos"], Cookies["passo"], min, max, true);
        gtext[2] = new lerMensagensSensor(null, "text_pag_11_2",7);

        n_div++;
    }
    if (rec_corrente_30a == true || rec_corrente_100a == true) {
        console.log("rec_corrente campo1="+Cookies["campo1"]);
        max = Math.ceil((parseInt(json_config.canal.field1_max) + 100) / 100) * 100;
        min = parseInt(json_config.canal.field1_min);
        //console.log("corrente min="+min);
        if (isNaN(min) == false)
        if (min < 0) {
            min = Math.floor((min - 200) / 100) * 100;
        } else min = 0;

    //max = parseInt(json_config.canal.field1_max);
    //min = parseInt(json_config.canal.field1_min);
        if (rec_temperatura2 == false && rec_humidade == false) {
        g3 = new runGraph(0, 'chart' + n_div + '_div', 'uib_page_10', 'Consumo', 200, 200, [{
                nome: Cookies["campo1"],
                campo: 1
            }],
            null,
            1, 1, min, max, true,'t2');
        n_div++;
        g4 = new runGraph(2, 'chart' + n_div + '_div', 'uib_page_10', 'Historio', 280, 200, [{
                    nome: Cookies["campo1"],
                    campo: 1
                },
                {
                    nome: "min",
                    campo: 100
                },
                {
                    nome: "max",
                    campo: 101
                }],
            null,
            Cookies["nro_pontos"], Cookies["passo"], min, max, true);
        gtext[1] = new lerMensagensSensor(null, "text_pag_10_2",1);
        n_div++;
           console.log("rec_temperatura2="+rec_temperatura2);
        }
        if (rec_temperatura3 == false) {
          g5 = new runGraph(3, 'chart' + n_div + '_div', 'uib_page_11', 'Fases', 200, 200, [{
                        nome: Cookies["campo2"],
                        campo: 2
            },
                    {
                        nome: Cookies["campo3"],
                        campo: 3
            },
                    {
                        nome: Cookies["campo4"],
                        campo: 4
            }],
                null,
                3, 1, 1, 1, true,'t3');
            n_div++;
            g6 = new runGraph(1, 'chart' + n_div + '_div', 'uib_page_11', 'Fases', 280, 200, [{
                       nome: Cookies["campo2"],
                        campo: 2
            },
                    {
                        nome: Cookies["campo3"],
                        campo: 3
            },
                    {
                        nome: Cookies["campo4"],
                        campo: 4
            }],
                null,
                Cookies["nro_pontos"], Cookies["passo"], min, max, true);
            gtext[2] = new lerMensagensSensor(null, "text_pag_11_2",1);
        }
        n_div++;
    } 
    //t_telaTS_temperatura();
    //      g1.timerID=setInterval('t_telaTS_temperatura()', 15000);
    document.addEventListener("app.Get_Feed", t_telaTS_temperatura, false);

    app.consoleLog("<telaTS_temperatura", "exit");

}


/*********************************************************************/
var flag_getMainConfig = false;
var flag_createGraphs = false;

function createGraphs() {
    app.consoleLog("createGraph", "entry  flag_createGraphs=" + flag_createGraphs + " flag_getMainConfig=" + flag_getMainConfig);

  //  if (flag_createGraphs == true) return;
  //  if (flag_getMainConfig &&
//        g1 == undefined &&
//        Cookies["tela_layout"] != undefined &&
//        Cookies["api_key"] != undefined) {
        app.consoleLog("tela=" + Cookies["tela_layout"]);
        if (Cookies["tela_layout"] == undefined)
            Cookies.create("tela_layout", "1", 100);
        switch (Cookies["tela_layout"]) {
        case '1': // TGG
            TelaTGG();
            break;
        case '0':
            telaTS_temperatura();
            break;
        case '2':
            telaTS_temp_corrente();
            break;
        } // switch
        flag_createGraphs = true;
//    } // if
}
/********************************************************************/
//var gx1 = [];
//var gx2 = [];
var gt = [];

var gm1 = new Array(4);
var gm2 = new Array(4);

for (var i = 0; i < 4; i++) {
    gm1[i] = new Array(MAX_NODES_SENSORES);
    gm2[i] = new Array(MAX_NODES_SENSORES);
}


function createGraphx(_modulo) {
    var chartx1, chartx2, chart;
    var modulo = parseInt(_modulo);
    var pagina = '';
    app.consoleLog("createGraphX=" + modulo, "entry");
    if (gm1[modulo][1] == undefined) {
        var nome_campo, ncampo, recursos;
        var acampo = null;
        var n_mod = 1 + modulo;
        var num_mod = 6 + modulo;
        var max, min;
        var node;
        chart = 'chartx' + num_mod + '_div';
        node = '$.node' + n_mod;
        recursos = jsonPath(json_config, node + ".recursos");
        for (ncampo = 1; ncampo <= MAX_NODES_SENSORES; ncampo++) {
            chartx1 = 'chartx' + num_mod + "" + ncampo + '1_div';
            chartx2 = 'chartx' + num_mod + "" + ncampo + '2_div';
            nome_campo = jsonPath(json_config, node + ".field" + ncampo);
            if (nome_campo == null) {
                nome_campo='sem_nome';
            }
           // app.consoleLog("nome_campo=" + nome_campo + " ncampo=" + ncampo + "  chartx1=" + chartx1);
            if (ncampo==2 && (recursos & 0x10) != 0x10) {
                continue;
            }
            
            if (acampo == null) acampo=ncampo;
            max = parseInt(jsonPath(json_config, node + ".field" + ncampo + "_max"));
            max = Math.ceil((max + 10) / 10) * 10;
            min = parseInt(jsonPath(json_config, node + ".field" + ncampo + "_min"));
            if (min > 0) {
                min = 0;
            } else
                min = Math.floor((min - 10) / 10) * 10;

            max = parseInt(jsonPath(json_config, node + ".field" + ncampo + "_max"));
            min = parseInt(jsonPath(json_config, node + ".field" + ncampo + "_min"));
console.log("max="+max+" min="+min);
            gm1[modulo][ncampo] = new runGraph(0, chartx1, pagina, nome_campo, 200, 200, [{
                    nome: nome_campo,
                    campo: ncampo
            }],
                modulo,
                1, 1, min, max, true,"n"+n_mod + "" + ncampo);
            gm2[modulo][ncampo] = new runGraph(2, chartx2, pagina, nome_campo, 280, 200, [{
                        nome: nome_campo,
                        campo: ncampo
                },
                    {
                        nome: "min",
                        campo: 100
                },
                    {
                        nome: "max",
                        campo: 101
                }],
                modulo,
                Cookies["nro_pontos"], Cookies["passo"], 20, 1, min, max, false);
        }
        gt[modulo] = new lerMensagensSensor(modulo, chart, acampo);
    }
    app.consoleLog("<createGraphX=" + modulo, "entry");
}
/**********************************************************************/

/**********************************************************************/
