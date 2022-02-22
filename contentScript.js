

const init = function(){
  const injectElement = document.createElement('div');
  injectElement.className = 'Extension';
  //injectElement.innerHTML = 'Extensión para Chrome';
  document.body.appendChild(injectElement);
  
  
var filename = document.querySelector('[name="Filename"]').value;
console.log(filename);

var xhr = new XMLHttpRequest();
xhr.responseType = 'arraybuffer';
xhr.open('GET', filename);
xhr.onload = function (e) {
  var tiff = new Tiff({buffer: xhr.response});
  var canvas = tiff.toCanvas();

  let image = new Image();
  image.src = canvas.toDataURL('image/jpeg', 0.5);
  image.setAttribute('style', 'display: block; margin-left: auto; margin-right: auto; transform: rotate(90deg) ; width:50%; margin-top: -200');
  image.id = "imagencedula";
  document.querySelector("#ImagN1").appendChild(image);

  let btn = document.createElement("button");
  btn.innerHTML = "IMPRIMIR";
  btn.onclick = printImage;
  btn.setAttribute('style', 'display: block; margin: 0 auto; padding:0.3em 1.2em; border-radius:2em; font-weight:800; color:#0; background-color:#BFBBBA; text-align:center; margin-top: -200; margin-bottom: 60;');
  document.querySelector("#ImagN1").appendChild(btn);

  document.querySelector(".textos").setAttribute('style', 'display: none');

};
xhr.send();
};


function printImage()
{
        image = document.getElementById('imagencedula');
        var printWindow = window.open('', 'Print Window', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Imprimir Cédulas</title>');
        printWindow.document.write('</head><body ><img style="display: block; margin-left: auto; margin-right: auto; width:85%;" src=\'');
        printWindow.document.write(image.src);
        printWindow.document.write('\' /></body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        setTimeout(function () { printWindow.close(); }, 100);
}

init();
