function destroy(id){
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
}

var textacopier;

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}


function copytoclipbard() {
    str = textacopier;
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Le texte a bien été copié !");

}

function coder(){
    document.getElementById("textresultat").style = "color : rgb(229, 57, 53);"

    original = document.getElementById("txtOri").value;
    acacher = document.getElementById("txtcacher").value;
    
    
    console.log("longeur de original " + original.length)
    console.log("longeur de acacher " +  acacher.length)
    
    
    if (original.length < acacher.length * 8) {
        err = "Erreur ! Le message original est trop court ! Il a besoin de " + (acacher.length * 8) + " caractères. <br> <strong> Soit " + (acacher.length * 8 - original.length) + " de plus.</strong><br> Ou, on peut aussi <strong>raccoucir le message caché de " + (acacher.length - Math.round((original.length / 8))) +  " lettres.</strong>";
        document.getElementById("textresultat").innerHTML  = err;
        return err;
    }

    
        
    listeBase2 = []
    for (const lettre of acacher) {
        console.log(lettre);
        binary = dec2bin(lettre.charCodeAt(0)).toString()
        if (binary.length > 8) {
            err = "Le caractère " + lettre + " est trop loin dans la table UTF-8";
            document.getElementById("textresultat").innerHTML  = err;
            return err;
        }
        while (binary.length < 8) {
            binary = '0' + binary;
        }
            
        listeBase2.push(binary);
    }

    console.log(listeBase2);
        
    

    var chaineFinale = "";
    var compteur = 0;
    for (const binaires of listeBase2) {
        for (const unbit of binaires) {
            chaineFinale += original[compteur];
            if (unbit == "1") {
                chaineFinale += "\u034f"
            }
                
            compteur += 1
        }
    }

    
    
    
    chaineFinale += original.substring(compteur, original.length);
    document.getElementById("textresultat").innerHTML = "Le message a bien été généré !";
    document.getElementById("textresultat").style = "color : rgb(17, 80, 153);"

    document.getElementById("valider").innerHTML = "En générer un autre";
    document.getElementById("valider").style = "background-color : rgb(17, 80, 153);"
    document.getElementById("valider").setAttribute('onclick', "location.reload()");

    destroy("txtcacher");
    destroy("title2");

    document.getElementById("title1").innerText = "Le message modifié est :";

    copy = document.createElement("button");
    copy.innerText = "Copier dans le presse papier";
    copy.className = "valider espaces";

    console.log(chaineFinale.includes('\n'));

    textacopier = chaineFinale;


    copy.setAttribute('onclick','copytoclipbard()');
    document.getElementsByClassName("centered")[1].appendChild(copy);

    

    console.log(chaineFinale);
    return chaineFinale;

    
    
}


function decoder(){
    var message = document.getElementById("txtOri").value;

    var listebinaire = [];
    var binaire = "";
    var caractere = 1;
    while (caractere < message.length) {
        
        if (message[caractere] == "\u034f") {
            binaire += "1";
        } else {
            binaire += "0"
            caractere -= 1
        }
        
        caractere += 2
        
        

        if (binaire.length == 8 && binaire != "00000000") {
            listebinaire.push(binaire)
            binaire = "";
        }
            
    }
        
        
        
        
    
    var strfinale = "";
    for (lettre of listebinaire) {
        strfinale += String.fromCharCode(parseInt(lettre, 2));
    }
    
        
    console.log(strfinale);

    destroy("txtOri");
    document.getElementById("title1").innerHTML = "Le message caché était :"
    document.getElementById("textresultat").innerHTML = strfinale;

    document.getElementById("valider").innerHTML = "En décoder un autre";
    document.getElementById("valider").style = "background-color : rgb(17, 80, 153);"
    document.getElementById("valider").setAttribute('onclick', "location.reload()");

    return strfinale;
}