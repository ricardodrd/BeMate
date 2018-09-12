


function getTransaction() {
    // var xhttp = new XMLHttpRequest();
    //  xhttp.onreadystatechange=function(){
    //if (this.readyState == 4 && this.status == 200){
    //recibimos en request la string entera
    //var res = request.responseText;
    //console.log(res);
    var res = "110182241902008000281701311701311000019193174009783CARLOS BANANERO RUIZ         \n2201822419170131170130028972000000000551180000000000ABONO COMP. TRU 30/1/2017   \n2201822419170131170130021731000000000003500000000000LIQUID.ABONO COM            \n2301012419-003002935-1                                                          \n2201822419170131170130041222000000000003502419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170130041221000000000551182419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170131028972000000000900600000000000ABONO COMP. TRU 31/1/2017   \n2201822419170131170131028972000000004984460000000000ABONO COMP. TRU 31/1/2017   \n2201822419170131170131041221000000000900602419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170131041221000000004984462419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170201028972000000001041250000000000ABONO COMP. TRU 30/1/2017   \n2201822419170131170201028972000000001191960000000000ABONO COMP. TRU 30/1/2017   \n2201822419170131170201021731000000000007000000000000LIQUID.ABONO COM            \n2301012419-003002933-8                                                          \n2201822419170131170201021731000000000016500000000000LIQUID.ABONO COM            \n2301012419-003002934-0                                                          \n2201822419170131170201041222000000000007002419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170201041222000000000016502419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170201041221000000001191962419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170201041221000000001041252419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170202028972000000007865630000000000ABONO COMP. TRU 31/1/2017   \n2201822419170131170202028972000000008973270000000000ABONO COMP. TRU 31/1/2017   \n2201822419170131170202041221000000007865632419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n2201822419170131170202041221000000008973272419080002TRASPASO MOVTOS.            \n2301TRASP. DST: 1128-020-0156824                                                \n3301822419020080002800010000000025535350001000000002553535100001919317400978    \n88999999999999999999000035"
    //if (res.success == true){
    //	var dataTable=document.getElementById("datatable");

    //	var existe = exists(dataTable, );
    var codigo_registro = res.substring(0, 2); //2
    var clave_entidad = res.substring(2, 6); //4
    var clave_oficina = res.substring(6, 10); //4
    var accouunt_number = res.substring(10, 20); //10
    var init_date = res.substring(20, 26); //6
    var year = init_date.substring(0, 2);
    var month = init_date.substring(2, 4);
    var day = init_date.substring(4, 6);
    var op_date = new Date(year, month - 1, day);
    var end_date = res.substring(26, 32); //6
    var debe_haber = res.substring(32, 33); //1, bool
    var balance = res.substring(33, 47); //14
    var clave_divisa = res.substring(47, 50); //3
    var inf_modalidad = res.substring(50, 51); //1
    var nombre_abreviado = res.substring(51, 77); //26
    var index = 81;
    var ccooddee = 0;
    var transaction_count = 0;
    while (ccooddee != 33) {
        if (ccooddee == 22) {
            transaction_count++;
        }
        ccooddee = res.substring(index, index + 2);
        index = 81 + index;
    }
    index -= 81;
    var final_registro = res.substring(index);
    var transacciones = [];
    for (var i = 0; i < transaction_count; i++) {
        // elements in each transaction
        transacciones[i] = new Array(35);
    }

    index = 81;
    var i;
    for (i = 0; i < transaction_count; i++) {
        //0-Codigo_de_registro:22
        transacciones[i][0] = res.substring(index, index + 2);
        index += 2;
        //1-Libre:0182
        transacciones[i][1] = res.substring(index, index + 4);
        index += 4;
        // 2-Clave_de_oficina_origen:2419
        transacciones[i][2] = res.substring(index, index + 4);
        index += 4
        // 3-Fecha_de_operacion:170131
        var badFecha = res.substring(index, index + 6);
        var ano1 = badFecha.substring(0, 2) + "/";
        if (ano1 > 40) {//comprobante inventado en 40 de cuando hay que poner año 1900 o 2000
            ano1 = "19" + ano1;
        }
        else {
            ano1 = "20" + ano1;
        }
        var mes1 = badFecha.substring(2, 4) + "/";
        var dia1 = badFecha.substring(4, 6);
        var correcto = ano1.concat(mes1, dia1);
        transacciones[i][3] = correcto;
        index += 6;
        // 4-Fecha_de_valor:170130
        badFecha = res.substring(index, index + 6);
        ano1 = badFecha.substring(0, 2) + "/";
        if (ano1 > 40) {//comprobante inventado en 40 de cuando hay que poner año 1900 o 2000
            ano1 = "19" + ano1;
        }
        else {
            ano1 = "20" + ano1;
        }
        mes1 = badFecha.substring(2, 4) + "/";
        dia1 = badFecha.substring(4, 6);
        correcto = ano1.concat(mes1, dia1);
        transacciones[i][4] = correcto;
        index += 6;
        // 5-Concepto_comun:02
        transacciones[i][5] = res.substring(index, index + 2);
        index += 2;
        // 6-Concepto_propio:1730
        transacciones[i][6] = res.substring(index, index + 3);
        index += 3;
        // 7-Debe_haber:1
        transacciones[i][7] = res.substring(index, index + 1);
        index += 1;
        // 8-Importe:00000000000350//14 posiciciones
        var entero = res.substring(index, index + 12);
        var decimal = res.substring(index + 12, index + 14);
        /*quitar ceros de la izquierda*/
        entero = parseFloat(entero).toFixed(0);
        if (transacciones[i][7] == 1) {//si es un cobro o un pago
            correcto = "-" + entero + "." + decimal + "&euro;";
        }
        else {
            correcto = "+" + entero + "." + decimal + "&euro;";
        }
        transacciones[i][8] = correcto;
        // transacciones[i][8] = res.substring(index, index + 14);
        index += 14;
        // 9-Numero_de_documento:0000000000
        transacciones[i][9] = res.substring(index, index + 10);
        index += 10;
        // 10-Referencia_1:LIQUID.ABONO//12 posiciciones
        transacciones[i][10] = res.substring(index, index + 12);
        /*CATEGORIZACIÓN*/
        if (transacciones[i][10].search("IMPUESTO") != -1) {
            /*pongo que está en la categoría impuesto*/
        }
        else if (transacciones[i][10].search("NÓMINA") != -1) {
            /*pongo que está en la categoría nómina*/
        }
        else if (transacciones[i][10].search("GASTOS") != -1) {
            /*pongo que está en la categoría de gastos*/
        }
        else if (transacciones[i][10].search("COMISIÓN") != -1) {
            /*pongo que está en la categoría de comisión*/
        }
        else if (transacciones[i][10].search("RECIBO") != -1) {
            /*se hace no se que*/
        }/*PRUEBA CON ABONO AUNQUE NO PERTENEZCA A LAS CATEGORIAS QUE NOS HAN DICHO*/
        else if (transacciones[i][10].search("ABONO") != -1) {
            transacciones[i][30] = "ABONADO";
            console.log(transacciones[i][10]);//por algun motivo la primera letra no la encuentra, si pongo ABONO es como si la A no la detecta
        }
        else {
            transacciones[i][30] = "SIN CATEGOR&IacuteA";
        }
        index += 12;
        // 11-Referencia_2: COM            //16 posiciciones
        transacciones[i][11] = res.substring(index, index + 16);
        index += 16;
        //salto de linea
        index++;
        /*
                        var year = transacciones[i][3].substring(0,2);
                        var month = transacciones[i][3].substring(2,4);
                        var day  = transacciones[i][3].substring(4,6);
                        var op_date= new Date(year, month-1, day);
                        year = transacciones[i][4].substring(0,2);
                        month = transacciones[i][4].substring(2,4);
                        day  = transacciones[i][4].substring(4,6);
                        var value_date= new Date(year, month-1, day);
    
                        if (existe != -1)
                        {
                            // oldLast = Number(dataTable.rows[existe].cells[4].innerHTML);
                            // oldTrend = Number(dataTable.rows[existe].cells[5].innerHTML);
                            dataTable.rows[existe].cells[0].innerHTML =  op_date;
                            dataTable.rows[existe].cells[1].innerHTML =  value_date;
                            dataTable.rows[existe].cells[2].innerHTML =  transacciones[i][2];
                            dataTable.rows[existe].cells[3].innerHTML =  transacciones[i][8];
                            dataTable.rows[existe].cells[4].innerHTML = transacciones[i][10];
                        }
                        else
                        {
                            var row, cell;
                            row = dataTable.insertRow(-1);
                            var cell = row.insertCell(0);
                            cell.innerHTML = op_date ;
                            cell = row.insertCell(1);
                            cell.innerHTML = value_date;
                            cell = row.insertCell(2);
                            cell.innerHTML = transacciones[i][2];
                            cell = row.insertCell(3);
                            cell.innerHTML = transacciones[i][8];
                            cell = row.insertCell(4);
                            cell.innerHTML = transacciones[i][10];
                            existe=3;
                        }
                */
        var next_register = res.substring(index, index + 2);
        var j = 12;
        while (next_register == 23 || next_register == 24) {
            transacciones[i][j] = next_register;
            index += 2;
            j++;
            if (next_register == 23) {
                //01
                transacciones[i][j] = res.substring(index, index + 2);
                index += 2;
                switch (transacciones[i][j]) {
                    case '01':
                        j++;
                        transacciones[i][j] = res.substring(index, index + 38);
                        index += 38;
                        j++;
                        transacciones[i][j] = res.substring(index, index + 38);
                        index += 38;
                        j++;
                        break;
                    /*	case 02:
                            j++;
                            transacciones[i][j]=res.substring(index, index+35);
                            index+=35;
                            j++;
                            transacciones[i][j]=res.substring(index, index+41);
                            index+=10;
                            j++;
                            break;
                        case 03:
        
                            break;
                        case 04:
        
                            break;
                        case 05:
        
                            break;
                    */
                }
            } else if (next_register == 24) {
                //01
                transacciones[i][j] = res.substring(index, index + 2);
                index += 2;
                j++;
                //clase de divisa origen del movimiento
                transacciones[i][j] = res.substring(index, index + 3);
                index += 3;
                j++;
                //importe
                transacciones[i][j] = res.substring(index, index + 14);
                index += 14;
                j++;
                //Libre
                index += 59;
            }
            index++;
            next_register = res.substring(index, index + 2);
        }
    }

    //fecha sin poner bien

    //proceso para poner la fecha con el formato adecuado
    var ano = transacciones[2][3].substring(0, 2) + "/";
    var mes = transacciones[2][3].substring(2, 4) + "/";
    var dia = transacciones[2][3].substring(4, 6);
    var formatFecha = ano.concat(mes, dia);
    var fin_codigo = final_registro.substring(0, 2);
    var fin_entidad = final_registro.substring(2, 6);
    var fin_oficina = final_registro.substring(6, 10);
    var fin_numero_cuenta = final_registro.substring(10, 20);
    var fin_numero_apuntes_debe = final_registro.substring(20, 25);
    var fin_total_importe_debe = final_registro.substring(25, 39);
    var fin_numero_apuntes_haber = final_registro.substring(39, 44);
    var fin_total_importe_haber = final_registro.substring(44, 58);
    var fin_codigo_saldo = final_registro.substring(58, 59);
    var fin_importe_saldo = final_registro.substring(59, 73);
    var fin_clave_divisa = final_registro.substring(73, 76);
    //		}
    //};
    //xhttp.open("GET", "aeb_test.txt", false);
    //xhttp.send();
    let cuerpoTabla = document.getElementById('cuerpo')
    let even = true
    /*
    for (let fila of transacciones) {
        even = !even
        let HTMLFila = `<tr role="row" class="${even ? 'even' : 'odd'}">`
        HTMLFila += `<td>${fila[3]}</td>`
        HTMLFila += `<td>${fila[4]}</td>`
        HTMLFila += `<td>${fila[8]}</td>`
        HTMLFila += `<td>${fila[30]}</td>`
        HTMLFila += `<td>${fila[10]}</td>`
        HTMLFila += `<td>${fila[11]}</td>`
        HTMLFila += '</tr>\n'
        cuerpoTabla.innerHTML = cuerpoTabla.innerHTML + HTMLFila
    }
    */
}



function hfunction() {
    //var t=setInterval($.myfunction, 5000);

};
// window.onload = () => {
// let cuerpoTabla = document.getElementById('cuerpo')
// for (let fila of transacciones) {
// let HTMLFila = '<tr>'
// for (let campo of fila) HTMLFila += `<td>${campo}</td>`
// HTMLFila += '</tr>\n'
// cuerpoTabla.innerHTML = cuerpoTabla.innerHTML + HTMLFila
// }
// }
//}
