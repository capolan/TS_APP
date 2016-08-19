/*********************************************************************/
function atualizaGrafico(objG, div, campo) {
    //console.log(">atualizaGrafico");
    var recursos = parseInt(json_config.canal.recursos);
    objG.loadData();
    if (div === null) return;
    //var d= new Date(g3.created_at);
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

            //console.log("chave1=" + CHAVE1+ "  status=" + status);
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
/*  Global  */
/*********************************************************************/
function t_telaTS_global() {
    //  console.log(">t_telaTS_global");
    var sens, aux, _div;
    for (var i = 1; i <= MAX_CAIXA_SENSORES; i++) {
        //console.log(">t_telaTS_global i=" + i);
        if (gg1[i] != undefined) {
            atualizaGrafico(gg1[i], "text_pag_" + i, i);
            gg2[i].loadData();
        }
    }
    gtext[0].loadData();

    /* BEGIN Localiza o visivel */
        sens=0;
        aux=1;
        while (aux <=MAX_CAIXA_SENSORES && sens==0) {
            _div="#chart1" + aux + '_div';
            if ($(_div).css('display') == 'block') {
                sens=aux;
            }
            aux++;
        }

        if (sens >0) {
            if (gg1[sens].ativo==false) {
                sens=0;
                for (aux=1; aux<=MAX_CAIXA_SENSORES; aux++) {
                    $('#chart1' +aux +"_div").css("display", "none");
                    $('#chart2' +aux +"_div").css("display", "none");
                    $('#text_pag_' +aux).css("display", "none");
                    if (gg1[aux].ativo == true && sens==0)
                            sens=aux;
                }

            }
        }

        if (sens > 0) {
            $('#chart1' + sens + '_div').css("display", "block");
            $('#chart2' + sens + '_div').css("display", "block");
            $('#text_pag_' +sens).css("display", "block");
        }

    /* END Localiza o visivel */

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
                if (gm1[i][n] != undefined) {
//                if (gm1[i][n] != undefined && gm1[i][n].ativo == true) {
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

/**************************************************************/
var gg1 = new Array(MAX_CAIXA_SENSORES);
var gg2 = new Array(MAX_CAIXA_SENSORES);


function telaTS_global() {
    var chartx1, chartx2, chart;
    var n_div = 3;
    var pagina = '';
    app.consoleLog("telaTS_global", "entry");
    if (gg1[1] == undefined) {
        var nome_campo, ncampo, recursos;
        var max, min;
        recursos = jsonPath(json_config, "$.canal.recursos");
        for (ncampo = 1; ncampo <= MAX_CAIXA_SENSORES; ncampo++) {
            chartx1 = 'chart1' + ncampo + '_div';
            chartx2 = 'chart2' + ncampo + '_div';
            nome_campo = jsonPath(json_config, "$.canal.field" + ncampo);
            if (nome_campo == null) {
                nome_campo='sem_nome';
            }
            max = parseInt(jsonPath(json_config, "$.canal.field" + ncampo + "_max"));
            min = parseInt(jsonPath(json_config, "$.canal.field" + ncampo + "_min"));
console.log("max="+max+" min="+min);
            gg1[ncampo] = new runGraph(0, chartx1, pagina, nome_campo, 200, 200, [{
                    nome: nome_campo,
                    campo: ncampo
            }],
                null,
                1, 1, min, max, true);
            gg2[ncampo] = new runGraph(2, chartx2, pagina, nome_campo, 280, 200, [{
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
                null,
                Cookies["nro_pontos"], Cookies["passo"], 20, 1, min, max, false);
        }
        gtext[0] = new lerMensagensSensor(null, 'text_pag_2_2');
    }
    /*
     * CORRENTE
     */
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


    document.addEventListener("app.Get_Feed", t_telaTS_global, false);
    app.consoleLog("<telaTS_global","exit");

}


/*********************************************************************/
var flag_getMainConfig = false;
var flag_createGraphs = false;

function createGraphs() {
    app.consoleLog("createGraph", "entry  flag_createGraphs=" + flag_createGraphs + " flag_getMainConfig=" + flag_getMainConfig);

    app.consoleLog("tela=" + Cookies["tela_layout"]);
    if (Cookies["tela_layout"] == undefined)
            Cookies.create("tela_layout", "1", 100);
    switch (Cookies["tela_layout"]) {
        case '0':
            telaTS_global();
            break;
    } // switch
    flag_createGraphs = true;
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
            if (acampo == null) acampo=ncampo;
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
