/*********************************************************************/
function atualizaGrafico(objG, div, campo) {
    //console.log(">atualizaGrafico");
    objG.loadData();

    if (div === null) return;
    //var d= new Date(g3.created_at);
    //if (window.g3.created_at != null)
    //app.consoleLog("objG.id_div="+objG.id_div+"    div",div);
    var d = moment(new Date(objG.created_at));

    var minmax = '';
    var offline = '';
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
    document.getElementById(div).innerHTML = "Atualizado &agrave;s " +
        d.format('DD/MM/YYYY HH:mm:ss') +
        //        d.format('LLL')+
        minmax + offline;
}
/*********************************************************************/
var g1, g2, g3, g4, g5;
/*********************************************************************/
function t_TelaTGG() {
    atualizaGrafico(g1, "text_pag_2_1", 1);
    atualizaGrafico(g2, "text_pag_2_2", 5);
    atualizaGrafico(g3, "text_pag_10", 1);
    atualizaGrafico(g4, null, 1);
    for (var i = 0; i < MAX_NODES; i++) {
        if (gx1[i] != undefined) {
            // gx1[i].loadData();
            var cp = i + 1;
            atualizaGrafico(gx1[i], "text-mod" + cp, 1);
            gx2[i].loadData();
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
        if (gx1[i] != undefined) {
            var cp = i + 1;
            atualizaGrafico(gx1[i], "text-mod" + cp, 1);
            gx2[i].loadData();
        }
    }
}

function telaTS_temp_corrente() {
    console.log(">telaTS_temp_corrente");
    var max = Math.ceil((parseInt(json_config.canal.field5_max) + 10) / 10) * 10;
    var min = parseInt(json_config.canal.field5_min);
    if (min < 0) {
        min = Math.floor((min - 10) / 10) * 10;
    } else min = 0;
    g1 = new runGraph(0, 'chart1_div', 'uib_page_2', 'Consumo', 200, 200, [{
            nome: Cookies["campo1"],
            campo: 1
        }],
        null,
        1, 1, min, max, true);
    g2 = new runGraph(0, 'chart2_div', 'uib_page_2', 'Temperatura', 200, 200, [{
            nome: Cookies["campo5"],
            campo: 5
        }],
        null,
        1, 1, min, max, true);
    g3 = new runGraph(3, 'chart3_div', 'uib_page_10', 'Fases', 160, 160, [{
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
        Cookies["nro_pontos"], Cookies["passo"], 1, 1, true);

    g5 = new runGraph(2, 'chart5_div', 'uib_page_11', 'Historio', 280, 200, [{
            nome: Cookies["campo5"],
            campo: 5
        }],
        null, Cookies["nro_pontos"], Cookies["passo"], min, max, false);

    //g1.timerID=setInterval('t_telaTS_temp_corrente()', 15000);
    document.addEventListener("app.Get_Feed", t_telaTS_temp_temperatura, false);
}

/*********************************************************************/
/*  Temperatura  */
/*********************************************************************/
function t_telaTS_temperatura() {
    //  console.log(">t_telaTS_temperatura");
    atualizaGrafico(g1, "text_pag_2_1", 5);
    atualizaGrafico(g2, null, 5);
    if (rec_temperatura2) {
        atualizaGrafico(g3, "text_pag_10", 6);
        atualizaGrafico(g4, null, 1);
    }
    for (var i = 0; i < MAX_NODES; i++) {
        if (gx1[i] != undefined && gx1[i].ativo == true) {
            var cp = i + 1;
            atualizaGrafico(gx1[i], "text-mod" + cp, 1);
            gx2[i].loadData();
        }
    }

}
/**************************************************************/
function telaTS_temperatura() {
    var max = Math.ceil((parseInt(json_config.canal.field5_max) + 10) / 10) * 10;
    var min = parseInt(json_config.canal.field5_min);
    if (min < 0) {
        min = Math.floor((min - 10) / 10) * 10;
    } else min = 0;
    app.consoleLog(">telaTS_temperatura", "entry");
    g1 = new runGraph(0, 'chart1_div', 'uib_page_2', 'Temperatura', 200, 200, [{
            nome: Cookies["campo5"],
            campo: 5
        }],
        null,
        1, 1, min, max, true);
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

    if (rec_temperatura2) {
        max = Math.ceil((parseInt(json_config.canal.field6_max) + 10) / 10) * 10;
        min = parseInt(json_config.canal.field6_min);
        if (min < 0) {
            min = Math.floor((min - 20) / 10) * 10;
        } else min = 0;
        g3 = new runGraph(0, 'chart3_div', 'uib_page_10', 'Temperatura', 200, 200, [{
                nome: Cookies["campo6"],
                campo: 6
            }],
            null,
            1, 1, min, max, true);
        g4 = new runGraph(2, 'chart4_div', 'uib_page_10', 'Historio', 280, 200, [{
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

    if (flag_createGraphs == true) return;
    if (flag_getMainConfig &&
        g1 == undefined &&
        Cookies["tela_layout"] != undefined &&
        Cookies["api_key"] != undefined) {
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
    } // if
}
/********************************************************************/
var gx1 = [];
var gx2 = [];

function createGraphx(_modulo) {
    var chartx1, chartx2, campo;
    var modulo = parseInt(_modulo);
    var pagina = '';
    app.consoleLog("createGraphX=" + modulo, "entry");
    app.consoleLog("gx=" + gx1[modulo], modulo);
    if (window.gx1[modulo] == undefined) {
        var ncampo = 1;
        var n_mod = 1 + modulo;
        var num_mod = 6 + modulo;
        var max, min;
        var node;
        chartx1 = 'chartx' + num_mod + '1_div';
        chartx2 = 'chartx' + num_mod + '2_div';
        campo = 'campo6';
        node = '$.node' + n_mod;
        nome_campo = jsonPath(json_config, node + ".field1");
        max = parseInt(jsonPath(json_config, node + ".field1_max"));
        max = Math.ceil((max + 10) / 10) * 10;
        min = parseInt(jsonPath(json_config, node + ".field1_min"));
        if (min < 0) {
            min = Math.floor((min - 10) / 10) * 10;
        } else min = 0;

        gx1[modulo] = new runGraph(0, chartx1, pagina, nome_campo, 200, 200, [{
                nome: nome_campo,
                campo: ncampo
            }],
            modulo,
            1, 1, min, max, true);
        gx2[modulo] = new runGraph(2, chartx2, pagina, nome_campo, 280, 200, [{
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
    //app.consoleLog("gx2",gx2);
}
/**********************************************************************/
