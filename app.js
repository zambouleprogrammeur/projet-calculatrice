var touches = Array.from(document.querySelectorAll('.button'));
var listeKeycode = touches.map(function (touche) { return touche.dataset.key || ""; });
var ecran = document.querySelector('.ecran');
if (ecran) {
    ecran.textContent = "0";
}
var ajouterTexte = function (texte) {
    if (ecran) {
        if (ecran.textContent === "0" || ecran.textContent === "Maths Error") {
            ecran.textContent = texte;
        }
        else {
            ecran.textContent += texte;
        }
    }
};
var calculer = function (valeur) {
    if (!ecran)
        return;
    if (listeKeycode.includes(valeur)) {
        switch (valeur) {
            case '8':
                ecran.textContent = "0";
                break;
            case '13':
                try {
                    var expression = ecran.textContent || "0";
                    if (expression.includes('/0')) {
                        throw new Error("Division par zéro");
                    }
                    var calcul = eval(expression);
                    ecran.textContent = calcul.toString();
                }
                catch (error) {
                    ecran.textContent = "Maths Error";
                }
                break;
            default:
                var indexKeycode = listeKeycode.indexOf(valeur);
                var touche = touches[indexKeycode];
                if (touche) {
                    ajouterTexte(touche.innerHTML);
                }
                break;
        }
    }
};
document.addEventListener('keydown', function (e) {
    var valeur = e.keyCode.toString();
    calculer(valeur);
});
document.addEventListener('click', function (e) {
    var target = e.target;
    var valeur = target.dataset.key;
    if (valeur) {
        calculer(valeur);
    }
});
window.addEventListener('error', function (e) {
    if (ecran) {
        ecran.textContent = "Maths Error";
    }
});
