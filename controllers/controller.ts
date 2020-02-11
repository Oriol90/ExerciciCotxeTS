var car:Car;

function createCar(){
    
    const hiddenRodes = (<HTMLDivElement>document.getElementById('hiddenRodes'));
    const lblColor = (<HTMLLabelElement>document.getElementById('lblColor'));
    const lblMarca = (<HTMLLabelElement>document.getElementById('lblBrand'));
    const lblPlate = (<HTMLLabelElement>document.getElementById('lblPlate'));
    const color = (<HTMLInputElement>document.getElementById('color')).value;
    const brand = (<HTMLInputElement>document.getElementById('brand')).value;
    const plate = (<HTMLInputElement>document.getElementById('plate')).value;

    if(validaPlate(plate)){
        car=new Car(plate,color,brand);
        lblColor.innerText="Color: " + car.color;
        lblMarca.innerText="Brand: " + car.brand;
        lblPlate.innerText="Plate: " + car.plate; 
        hiddenRodes.style.display = "block";
    }else{
        lblColor.innerText="Color: -";
        lblMarca.innerText="Brand: -";
        lblPlate.innerText="Plate: -";
        hiddenRodes.style.display = "none";
    }
}  

function addWheels(){

    const inputsRoda = (<HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName('inputsRoda'));
    const labelsRoda = (<HTMLCollectionOf<HTMLLabelElement>>document.getElementsByClassName('labelsRoda'));

    for(var i:number = 0; i<8; i=i+2){
        var diametre:number = 0;
        var numRoda:number = i/2+1;
        var correcte:Boolean = true;
        var arrayRodes:Wheel[] = new Array();

        if(!(isNaN(parseInt(inputsRoda[i+1].value)))){
            diametre = parseInt(inputsRoda[i+1].value);

            if(diametre < 0.4 || diametre > 2){
                correcte = false;
                alert('El diametre de la roda ' + numRoda + ' no te un diàmetre entre 0.4 i 2.')
            }else{
                let wheel = new Wheel(diametre, inputsRoda[i].value);
                arrayRodes.push(wheel);
            }

        }else{
            alert('El diametre de la roda ' + numRoda + ' no és un número.')
            correcte = false;
        }

        if(correcte){
            for(var z:number = 0; z<arrayRodes.length; z++){
                car.addWheel(arrayRodes[z]);
            }
        }
        
    }

    for(var x:number = 0; x<4; x++){
        var roda:Wheel = car.wheels[x];
        var numRoda:number = x+1;
        labelsRoda[x].innerText = "Brand wheel " + numRoda + ": " + roda.brand;
        labelsRoda[x+4].innerText = "Diameter wheel " + numRoda + ": " + roda.diameter;
    }

}

function validaPlate(plate:string){
    var valida:Boolean = true;

    if(!(plate.length == 7)){
        valida = false;
        alert("La matrícula ha de tenir 7 caràcters")
    }else{
        for(let i:number = 0; i<7; i++){
            let numCaracter:number = i+1;
            let caracter:number = plate.charCodeAt(i);
            if(i < 4){
                if(!(caracter > 64 && caracter < 91 ) && !(caracter > 96 && caracter < 123)){
                    valida = false;
                    alert("El caracter " + numCaracter + " de la matrícula ha de ser una lletra.");
                }
            }else{
                if(!(caracter > 47 && caracter < 58 )){
                    valida = false;
                    alert("El caracter " + numCaracter + " de la matrícula ha de ser un número.");
                }
            }    
        }
    }
    return valida;
}
