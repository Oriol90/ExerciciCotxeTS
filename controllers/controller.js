"use strict";
var car;
function createCar() {
    var hiddenRodes = document.getElementById('hiddenRodes');
    var lblColor = document.getElementById('lblColor');
    var lblMarca = document.getElementById('lblBrand');
    var lblPlate = document.getElementById('lblPlate');
    var color = document.getElementById('color').value;
    var brand = document.getElementById('brand').value;
    var plate = document.getElementById('plate').value;
    if (validaPlate(plate)) {
        car = new Car(plate, color, brand);
        lblColor.innerText = "Color: " + car.color;
        lblMarca.innerText = "Brand: " + car.brand;
        lblPlate.innerText = "Plate: " + car.plate;
        hiddenRodes.style.display = "block";
    }
    else {
        lblColor.innerText = "Color: -";
        lblMarca.innerText = "Brand: -";
        lblPlate.innerText = "Plate: -";
        hiddenRodes.style.display = "none";
    }
}
function addWheels() {
    var inputsRoda = document.getElementsByClassName('inputsRoda');
    var labelsRoda = document.getElementsByClassName('labelsRoda');
    for (var i = 0; i < 8; i = i + 2) {
        var diametre = 0;
        var numRoda = i / 2 + 1;
        var correcte = true;
        var arrayRodes = new Array();
        if (!(isNaN(parseInt(inputsRoda[i + 1].value)))) {
            diametre = parseInt(inputsRoda[i + 1].value);
            if (diametre < 0.4 || diametre > 2) {
                correcte = false;
                alert('El diametre de la roda ' + numRoda + ' no te un diàmetre entre 0.4 i 2.');
            }
            else {
                var wheel = new Wheel(diametre, inputsRoda[i].value);
                arrayRodes.push(wheel);
            }
        }
        else {
            alert('El diametre de la roda ' + numRoda + ' no és un número.');
            correcte = false;
        }
        if (correcte) {
            for (var z = 0; z < arrayRodes.length; z++) {
                car.addWheel(arrayRodes[z]);
            }
        }
    }
    for (var x = 0; x < 4; x++) {
        var roda = car.wheels[x];
        var numRoda = x + 1;
        labelsRoda[x].innerText = "Brand wheel " + numRoda + ": " + roda.brand;
        labelsRoda[x + 4].innerText = "Diameter wheel " + numRoda + ": " + roda.diameter;
    }
}
function validaPlate(plate) {
    var valida = true;
    if (!(plate.length == 7)) {
        valida = false;
        alert("La matrícula ha de tenir 7 caràcters");
    }
    else {
        /*Per comprobar si elcaracter es una lletro o un numero, ho passo a codi ASCII per tal de poder
        identificar quin es el caracter que falla la expressió regular seria aixi:
        /[A-Z|a-z][A-Z|a-z][A-Z|a-z][A-Z|a-w][0-9][0-9][0-9]/g             */
        for (var i = 0; i < 7; i++) {
            var numCaracter = i + 1;
            var caracter = plate.charCodeAt(i);
            if (i < 4) {
                if (!(caracter > 64 && caracter < 91) && !(caracter > 96 && caracter < 123)) {
                    valida = false;
                    alert("El caracter " + numCaracter + " de la matrícula ha de ser una lletra.");
                }
            }
            else {
                if (!(caracter > 47 && caracter < 58)) {
                    valida = false;
                    alert("El caracter " + numCaracter + " de la matrícula ha de ser un número.");
                }
            }
        }
    }
    return valida;
}
