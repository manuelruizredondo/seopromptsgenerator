function generarTexto() {
  


  var palabra1 = document.getElementById("input1").value;
  var palabra2 = document.getElementById("input2").value;
  var palabra3 = document.getElementById("input3").value;
  var palabra4 = document.getElementById("input4").value;
  var palabra5 = document.getElementById("input5").value;
  var palabra6 = document.getElementById("input6").value;
  var palabra7 = document.getElementById("input7").value;
    var palabra8 = document.getElementById("input8").value;

  var resultado = `
Escribe como un experto SEO y ${palabra1}  un artículo para el blog de mi web ${palabra8} . Sigue estas directrices:     
1. Resuelve la intención de búsqueda de un usuario que quiere saber ${palabra2}.
2. El post deberá tener una extensión de ${palabra3} palabras.
3. La palabra clave principal para las optimizaciones SEO es ${palabra4}.
4. Las palabras clave secundarias son ${palabra5}, ${palabra6} y ${palabra7}.
5. Incluye un único H1 al inicio.
6. Puedes usar tantos H2 y H3 como creas necesario para satisfacer la intención de búsqueda del artículo, no es necesario que los optimices todos para palabras clave.
7. El artículo debe ser informacional, ya que los usuarios están en el primer nivel de consciencia del customer journey, alejados de la compra.
8. Maximiza la retención del usuario, para que terminen de leer el artículo, usa un loop abierto al inicio para generar intriga.
9. No añadas contenido que no aporte valor, no inventes datos, todo el artículo debe ser útil.
10. Utiliza un lenguaje directo y sencillo, que entienda un niño de 10 años.

La estructura a seguir es la siguiente, ya que es un documento markdown 
      
      ---
subtitle: subtitulo del blog
title: titulo del blog
date: fecha actual en formato 2023-06-19
fecha: fecha actual en formato dia de mes de año
tags: ["tag1", "tag2"]
image: /assets/static/images/nombredelaimagendel1 al 10.jpg
imageAlt: texto alternativo para la imagen
eleventyComputed:
  metaTitle: Aqui va la meta title ocupa una sola línea y debe tener máximo 60 caracteres, El meta title ofrece a los usuarios una vista rápida sobre el contenido del contenido. Además de descriptivo tiene que ser atractivo y usaremos | como separador.
  metaDescription: Esta meta descripción tiene que contener entre 140-160 caracteres. Debe estar escrita con la intención de obtener más clics. Deberíamos usar al menos un emoji. Escribe tu llamada a la acción (call to action) mejor en imperativo y al final del texto.
  metaKeywords: "${palabra5},${palabra6},${palabra7}"
  metaRobots: "index, follow"
---

Contenido del blog de unas ${palabra3} palabras  palabras Aqui meteremos el Contenido del blog generado por chat gpt con las directrices comentadas anterior mente  

`;
  
        document.getElementById("resultado").textContent = resultado;
      document.getElementById("contador").textContent = "Número de palabras: " + contarPalabras(resultado);

}

function contarPalabras(texto) {
  var palabras = texto.split(" ");
  return palabras.length;
}

function copiarTexto() {
  var resultado = document.getElementById("resultado").textContent;

  // Crear un elemento de texto temporal
  var tempInput = document.createElement("input");
  tempInput.value = resultado;
  document.body.appendChild(tempInput);

  // Seleccionar y copiar el texto en el elemento temporal
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para dispositivos móviles

  document.execCommand("copy");
  document.body.removeChild(tempInput);

  alert("Texto copiado: " + resultado);
}