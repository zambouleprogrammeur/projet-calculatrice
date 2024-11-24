const touches: HTMLElement[] = Array.from(document.querySelectorAll('.button'));
const listeKeycode: string[] = touches.map((touche) => touche.dataset.key || "");
const ecran = document.querySelector<HTMLElement>('.ecran');


if (ecran) {
  ecran.textContent = "0";
}


const ajouterTexte = (texte: string): void => {
  if (ecran) {
   
    if (ecran.textContent === "0" || ecran.textContent === "Maths Error") {
      ecran.textContent = texte;
    } else {
      ecran.textContent += texte; 
    }
  }
};


const calculer = (valeur: string): void => {
  if (!ecran) return;

  if (listeKeycode.includes(valeur)) {
    switch (valeur) {
      case '8': 
        ecran.textContent = "0";
        break;

      case '13':
        try {
          const expression = ecran.textContent || "0";

          
          if (expression.includes('/0')) {
            throw new Error("Division par zéro");
          }

          
          const calcul = eval(expression); 
          ecran.textContent = calcul.toString();
        } catch (error) {
          ecran.textContent = "Maths Error"; 
        }
        break;

      default: 
        const indexKeycode = listeKeycode.indexOf(valeur);
        const touche = touches[indexKeycode];
        if (touche) {
          ajouterTexte(touche.innerHTML);
        }
        break;
    }
  }
};


document.addEventListener('keydown', (e: KeyboardEvent) => {
  const valeur = e.keyCode.toString();
  calculer(valeur);
});


document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const valeur = target.dataset.key;
  if (valeur) {
    calculer(valeur);
  }
});


window.addEventListener('error', (e: ErrorEvent) => {
  if (ecran) {
    ecran.textContent = "Maths Error";
  }

});
