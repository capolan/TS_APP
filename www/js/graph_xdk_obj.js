function getObjects(obj, key) {
    var val;
    for (var i in obj) {
        //      if (!obj.hasOwnProperty(i)) continue;
        if (obj[i] == null) continue;
        // if (key == "field1")   app.consoleLog(key + "  i="+i+" val="+obj[i]);
        if (i == key) {
            val = obj[i];
            return val;
        }
        if (typeof obj[i] == 'object') {
            return getObjects(obj[i], key);
        }
    }
    return false;
}
/***********************************************************/

function selectHandler(e) {
    alert('A table row was selected');
}
/********************************************************************/
function runGraph(_tipo, _id_div, _page, _titulo, _largura, _altura, _series, _modulo, _nro_pontos, _passo, _min_value, _max_value, _isStacked) {
    // tipo
    // 0 = gauge
    // 1 = area
    // 2 = linha
    // 3 = dounets
    this.tipo = _tipo;
    app.consoleLog(">runGraph", "entry");

    this.count = 0;
    this.ativo = true;
    this.status = null;
    this.offline_at = false;
    this.id_div = _id_div;
    this.page = _page;
    this.titulo = _titulo;
    // set your channel id here
    this.modulo = _modulo;
    // set your channel's read api key here if necessary
    this.isStacked = _isStacked;

    this.largura = _largura;
    this.altura = _altura;

    this.nro_pontos = _nro_pontos;
    this.passo = parseInt(_passo);
    if (isNaN(this.passo)) this.passo = 1;

    this.max_value = parseInt(_max_value);
    if (isNaN(this.max_value)) this.max_value = 1000;
    this.min_value = parseInt(_min_value);
    if (isNaN(this.min_value)) this.min_value = 0;

    this.series = _series;
    this.series = _series;
    this.created_at = 'NaN';

    // global variables
    //var chart, charts, data, options;
    this.chart = null;
    this.options = null;
    this.data = null;
    this.timerID = null;
    this.vcc = null;
    this.max = new Array(10);
    this.min = new Array(10);

    var self = this;

    this.ajustaData = function () {
        var contador;
        //            console.log(">ajustaData modulo="+self.modulo);
        if (self.modulo == null)
            contador = json_feed.channel.contador;
        else {
            var str = self.modulo + 1;
            var v_str = jsonPath(json_feed,
                "$.nodes" + str + ".contador");
            if (v_str != false) {
                contador = parseInt(v_str);
            }
        }
        //                console.log(json_feed);

        //            if (self.nro_pontos == self.nro_pontos_old || self.tipo==3)
        if (self.nro_pontos == contador || self.tipo == 3 || self.tipo == 0)
            return;
        console.log(">ajustaData " + self.id_div + "  pontos=" + self.nro_pontos + "  new=" + contador);
        self.nro_pontos = self.data.getNumberOfRows() - 1;
        self.data.removeRows(1, self.nro_pontos);
        self.nro_pontos = contador;
        var n = parseInt(self.nro_pontos);
        self.data.addRows(n);
    };

    // load the data
    this.loadData = function () {
        // get the data from thingspeak
        var d, j, k, valor;
        //   app.consoleLog(self.id_div," loadData");

        if (self.ativo == false) {
            app.consoleLog(self.id_div, " inativo");
            return;
        }

        if (json_feed == null) {
            app.consoleLog(self.id_div, " sem feed");
            return;
        }
        // console.log("json_feed="+JSON.stringify(json_feed.channel));
        // se nao visivel, nao atualiza grafico
        //  if (self.count >0 && $('#'+self.page).css('display') == 'none') {
        //      console.log("none="+self.id_div);
        //      return;
        //  }

        self.count++;
        self.ajustaData();

        // app.consoleLog("self.read_api_key",self.read_api_key+" self.id_div",self.id_div);
        //  app.consoleLog("self.modulo",self.modulo);
        //  app.consoleLog("self.nro_pontos",self.nro_pontos);
        //   app.consoleLog("self.passo",self.passo);
        if (window.cordova && navigator.connection.type == Connection.NONE) return;

        var valdata = json_feed;
        //    app.consoleLog("valdata",valdata);
        self.vcc = null;
        for (var i = 0, f = 0; i <= self.nro_pontos - 1; i = i + self.passo, f++) {
            var mensagem = false;
            if (valdata.feeds[i] === undefined) {
                app.consoleLog("poucos dados feed i=" + i + "   id_div=" + self.id_div);
                break;
            }

            if (self.modulo === null) {
                d = new Date(valdata.feeds[i].created_at);
                self.created_at = valdata.feeds[0].created_at;
                self.offline_at = getObjects(valdata.canal, "offline_at");
                if (self.vcc == null)
                    self.vcc = valdata.feeds[0].vcc;
            } else { // nodes
                if (self.modulo >= 0) {
                    var str = self.modulo + 1;
                    var v_str = jsonPath(valdata, "$.nodes_feed" + str + "[" + i + "].created_at");
                    d = new Date(v_str);
                    self.created_at = v_str;
                    self.offline_at = jsonPath(valdata, "$.nodes" + str + "[" + i + "].offline_at");
                    v_str = jsonPath(valdata, "$.nodes_feed" + str + "[" + i + "].vcc");
                    if (self.vcc == null && v_str != false)
                        self.vcc = v_str;
                }
            }
            if (self.tipo != 3) self.data.setCell(f, 0, d);
            j = 1;
            k = 0;
            for (var key in self.series) {
                var campo = self.series[key].campo;
                //     app.consoleLog("campo="+campo+"modulo=",self.modulo);
                switch (campo) {
                case 100: // min
                    if (self.modulo === null) {
                        valor = getObjects(valdata,
                            "field" + self.series[0].campo + "_min");
                    } else
                    if (self.modulo >= 0) {
                        var str = self.modulo + 1;
                        var v_str = jsonPath(json_config,
                            "$.node" + str + ".field1_min");
                        valor = parseInt(v_str);
                        //   self.min[str]=undefined;
                    }
                    break;
                case 101: // max
                    if (self.modulo === null) {
                        valor = getObjects(valdata,
                            "field" + self.series[0].campo + "_max");
                    } else
                    if (self.modulo >= 0) {
                        var str = self.modulo + 1;
                        var v_str = jsonPath(json_config,
                            "$.node" + str + ".field1_max");
                        valor = parseInt(v_str);
                        //    self.max[str]=undefined;
                    }
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    if (self.modulo == null) {
                        valor = getObjects(valdata.feeds[i], "field" + campo);
                        mensagem = getObjects(valdata.feeds[i], "mensagem");
                        self.min[campo] = getObjects(valdata,
                            "min_field" + campo);
                        self.max[campo] = getObjects(valdata,
                            "max_field" + campo);
                    } else
                    if (self.modulo >= 0) {
                        var str = self.modulo + 1;
                        var s;
                        var v_str = jsonPath(valdata,
                            "$.nodes_feed" + str + "[" + i + "].field" + campo);
                        valor = parseFloat(v_str);
                        s = "$.nodes_feed" + str + "[" + i + "].mensagem";
                        mensagem = jsonPath(valdata, s);
                        v_str = jsonPath(valdata,
                            "$.nodes" + str + ".min_field1");
                        self.min[1] = parseInt(v_str);
                        v_str = jsonPath(valdata,
                            "$.nodes" + str + ".max_field1");
                        self.max[1] = parseInt(v_str);


                    }
                    break;
                }
                if (self.tipo == 3) { // dounets
                    self.data.setCell(k, 0, self.series[key].nome);
                    self.data.setCell(k, 1, valor);
                    k++;
                } else {
                    //                    if (self.id_div == "chartx61_div") {
                    //                        app.consoleLog(self.id_div,
                    //                            "dados f=" + f + "  j=" + j + " valor=" + valor);
                    //                    }
                    if (isNaN(valor)) valor = null;
                    self.data.setCell(f, j++, valor);
                    if (self.tipo == 2 && campo <= 8) {
                        if (mensagem != false) {
                            self.data.setCell(f, j++, '+');
                            self.data.setCell(f, j++, "<p>" + mensagem + "</p>");
                        } else {
                            self.data.setCell(f, j++, '');
                            self.data.setCell(f, j++, '');
                        }
                    }
                } // else
            } // for
        }
        self.chart.draw(self.data, self.options);
        //     app.consoleLog("<self.id_div",self.id_div);

    };

    // initialize the chart
    this.initChart = function () {
        app.consoleLog("initChart=" + self.tipo, "entry");
        self.data = new google.visualization.DataTable();
        if (self.tipo == 1 || self.tipo == 2) {
            var flag = true;
            self.data.addColumn('datetime', 'Label');
            for (var key in self.series) {
                app.consoleLog(self.tipo + ':key=' + key + " titulo=" + self.series[key].nome + " data=" + self.series[key].campo);
                self.data.addColumn('number', self.series[key].nome);
                if (self.tipo == 2 && flag == true) { // linha
                    self.data.addColumn({
                        type: 'string',
                        role: 'annotation'
                    });
                    self.data.addColumn({
                        type: 'string',
                        role: 'annotationText',
                        p: {
                            html: true
                        }
                    });
                    flag = false;
                }
            }
        }

        var range_val = self.max_value - self.min_value;
        var red_value = range_val - (range_val * 0.1) + self.min_value;
        var yellow_value = range_val - (range_val * 0.25) + self.min_value;
        console.log("range=" + range_val + " yellow=" + yellow_value + " red=" + red_value + "  max=" + self.max_value + " min=" + self.min_value);
        var tick_value = 5;
        switch (self.tipo) {
        case 0: // gauge
            app.consoleLog("0.titulo=" + self.series[0].nome + " data=" + self.series[0].campo);
            self.data.addColumn('datetime', 'Label');
            self.data.addColumn('number', self.series[0].nome);
            self.data.addRows(1);
            self.nro_pontos = 1;
            self.chart = new google.visualization.Gauge(document.getElementById(self.id_div));
            self.options = {
                width: self.largura,
                height: self.altura,
                min: self.min_value,
                max: self.max_value,
                redFrom: red_value,
                redTo: self.max_value,
                yellowFrom: yellow_value,
                yellowTo: red_value,
                minorTicks: tick_value
            };
            break;
        case 1: // area
            self.chart = new google.visualization.AreaChart(document.getElementById(self.id_div));
            self.options = {
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'out'
                },
                title: self.titulo,
                titleTextStyle: {
                    color: 'white'
                },
                width: self.largura,
                height: self.altura,
                isStacked: self.isStacked,
                legend: {
                    position: 'bottom'
                },
                backgroundColor: 'white',
                hAxis: {
                    title: 'tempo',
                    titleTextStyle: {
                        color: 'blue'
                    },
                    textStyle: {
                        color: 'black'
                    }
                },
                vAxis: {
                    title: 'watts',
                    titleTextStyle: {
                        color: 'red'
                    },
                    textStyle: {
                        color: 'black'
                    },
                    minValue: 0
                }
            };
            break;
        case 2: // linha
            self.chart = new google.visualization.LineChart(document.getElementById(self.id_div));
            self.options = {
                title: self.titulo,
                legend: {
                    position: 'bottom'
                }, //interpolateNulls: true,
                tooltip: {
                    isHtml: true
                },
                width: self.largura,
                height: self.altura,
                chartArea: {
                    width: '80%',
                    height: '60%'
                },
                // explorer: {  actions: ['dragToZoom', 'rightClickToReset'] }
                //vAxis: {minValue:self.min, maxValue:self.max }
            };
            break;
        case 3: // dounets
            self.data.addColumn('string', self.titulo);
            self.data.addColumn('number', "xx");
            self.nro_pontos = 1;
            self.chart = new google.visualization.PieChart(document.getElementById(self.id_div));
            self.options = {
                title: self.titulo,
                pieHole: 0.4
            };
            break;

        }
        var n = parseInt(self.nro_pontos);
        if (isNaN(n)) {
            n = 20;
            self.nro_pontos = 20;
        }
        self.data.addRows(n);
        self.loadData();

        // load new data every 15 seconds
        //    setInterval('this.loadData()', 15000);
    };

    this.initChart();
    //    else
    //      google.setOnLoadCallback(this.initChart);
    // google.visualization.events.addListener(self.chart, 'click', selectHandler);
    app.consoleLog("<runGraph", "exit");
}
google.load('visualization', '1', {
    packages: ['gauge', 'corechart', 'table']
});
