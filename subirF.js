/*Create By Alfonso Lopez*/
var fichero = document.getElementById("file");
var auth = firebase.auth();
var fire = firebase.firestore();
var data = firebase.database().ref('Imagenes');
var storageRef = firebase.storage().ref();
$("#file").change(function () {
    document.getElementById("carrusel").innerHTML = '';
    if (fichero.files.length > 0 && fichero.files.length < 6) {
        var tamanoMax = 50000000;
        mayor = 0;
        menor = 0;
        for (var i = 0; i < fichero.files.length; i++) {
            val = fichero.files[i].size;
            if (val > mayor) {
                mayor = val;
                pos = i;
            }
        }
        var archivo = fichero.files[pos];
        if (archivo.size > tamanoMax) {
            const tamanioEnMb = tamanoMax / 1000000;
            var messageN = document.getElementById("messageN");
            messageN.innerHTML = '';
            $("#messageN").append('\
    <div class="container justify-content-center mt-3" style="border-radius:25px;display: flex; align-items: center;height:500px;background-image: url(img/alert.png);background-repeat: no-repeat;background-position: center;text-align: center">\n\
        <div class="container justify-content-center" style="border-radius:25px;background: rgba(0,0,0,.6);">        \n\
            <h2 class="comic" id="mensajeAlerta" style="color: white;font-family: Comic Sans MS, cursive;font-size: 38px;">El tamaño máximo es ' + tamanioEnMb + ' MB por archivo</h2> <br>\n\
            <button onclick="eliminar()" class="btn text-light zoom comic" style="margin-bottom:10px;font-family: Comic Sans MS, cursive;font-size:18px;border:solid 1px #2aa58a">Aceptar</button>\n\
        </div>\n\
    </div>');
        } else {
            for (var q = 0; q < fichero.files.length; q++) {
                createImg(fichero, q);
            }

        }
        document.getElementById("buttonS").style.display = "";
        document.getElementById("vacirInput").style.display = "";
        document.getElementById("newImg").style.display = "none";

    } else if (fichero.files.length === 0) {

        location.reload();
    } else if (fichero.files.length > 5) {
        var messageN = document.getElementById("messageN");
        messageN.innerHTML = '';
        $("#messageN").append('\
    <div class="container justify-content-center mt-3" style="border-radius:25px;display: flex; align-items: center;height:500px;background-image: url(img/alert.png);background-repeat: no-repeat;background-position: center;text-align: center">\n\
        <div class="container justify-content-center" style="border-radius:25px;background: rgba(0,0,0,.6);">        \n\
            <h2 class="comic" id="mensajeAlerta" style="color: white;font-family: Comic Sans MS, cursive;font-size: 38px;">Solo puedes seleccionar 5 archivos al mismo tiempo</h2> <br>\n\
            <button onclick="eliminar()" class="btn text-light zoom comic" style="margin-bottom:10px;font-family: cursive;font-size:18px;border:solid 1px #2aa58a">Aceptar</button>\n\
        </div>\n\
    </div>');
    }
});
function createImg(fichero, i) {
    var tip = fichero.files[i].type;

    var preguntaInput = $("#preguntaInput").val();
    if (preguntaInput === "imagen") {

        if (i === 0) {
            document.getElementById("iz").style.visibility = "hidden";
            document.getElementById("de").style.visibility = "hidden";
            if (tip === "image/jpeg"
                    || tip === "image/gif"
                    || tip === "image/png"
                    || tip === "image/tiff"
                    || tip === "image/pds"
                    || tip === "image/bmp") {
                var url = URL.createObjectURL(fichero.files[i]);
                $("#carrusel").append("<div class='item active'> \n\
<img alt='File not found' src='" + url + "' data-num='pricipal' class='img-responsive' style='width: 100%;border-radius:10px'> </div>\n\
");

            } else {
                $("#carrusel").append("<h2>Solo puedes elegir imagenes</h2>");
                eliminar();
            }
        } else if (i > 0) {
            document.getElementById("iz").style.visibility = "visible";
            document.getElementById("de").style.visibility = "visible";
            if (tip === "image/jpeg"
                    || tip === "image/gif"
                    || tip === "image/png"
                    || tip === "image/tiff"
                    || tip === "image/pds"
                    || tip === "image/bmp") {
                var url = URL.createObjectURL(fichero.files[i]);
                $("#carrusel").append("<div class='item' >\n\
 <img alt='File not found' src='" + url + "' data-num='pricipal' class='img-responsive' style='width: 100%;border-radius:10px'> </div>\n\
");
            } else {
                $("#carrusel").append("<h2>Solo puedes elegir imagenes</h2>");
                eliminar();
            }
        }
    } else if (preguntaInput === "video") {

        if (i === 0) {
            document.getElementById("iz").style.visibility = "hidden";
            document.getElementById("de").style.visibility = "hidden";
            if (tip === "video/mp4"
                    || tip === "video/avi"
                    || tip === "video/wmv"
                    || tip === "video/wma"
                    || tip === "video/mov"
                    || tip === "video/flv"
                    || tip === "video/mkv"
                    || tip === "video/mks"
                    || tip === "video/webm") {
                var url = URL.createObjectURL(fichero.files[i]);
                var videocomp = document.createElement("video");
                videocomp.src = url;
                videocomp.onloadedmetadata = function () {
                    var duration = videocomp.duration;
                    if (duration > 0 && duration < 241) {
                        $("#carrusel").append("<div class='item active'> \n\
<video src='" + url + "' data-num='pricipal' controls='true' class='img-responsive' style='width: 100%;border-radius:10px'>\n\
</div>");
                    } else {
                        var messageN = document.getElementById("messageN");
                        messageN.innerHTML = '';
                        $("#messageN").append('\
    <div class="container justify-content-center mt-3" style="border-radius:25px;display: flex; align-items: center;height:500px;background-image: url(img/alert.png);background-repeat: no-repeat;background-position: center;text-align: center">\n\
        <div class="container justify-content-center" style="border-radius:25px;background: rgba(0,0,0,.6);">        \n\
            <h2 class="comic" id="mensajeAlerta" style="color: white;font-family: Comic Sans MS, cursive;font-size: 38px;">Duracion maxima: 4 minutos por archivo/Maximum duration: 4 minutes by file</h2> <br>\n\
            <button onclick="eliminar()" class="btn text-light zoom comic" style="margin-bottom:10px;font-family: Comic Sans MS, cursive;font-size:18px;border:solid 1px #2aa58a">Aceptar</button>\n\
        </div>\n\
    </div>');

                    }
                };
            } else {
                $("#carrusel").append("<h2>Solo puedes elegir videos</h2>");
                eliminar();

            }
        } else if (i > 0) {
            document.getElementById("iz").style.visibility = "visible";
            document.getElementById("de").style.visibility = "visible";
            if (tip === "video/mp4"
                    || tip === "video/avi"
                    || tip === "video/wmv"
                    || tip === "video/wma"
                    || tip === "video/mov"
                    || tip === "video/flv"
                    || tip === "video/mkv"
                    || tip === "video/mks"
                    || tip === "video/webm") {
                var url = URL.createObjectURL(fichero.files[i]);
                var videocomp = document.createElement("video");
                videocomp.src = url;
                videocomp.onloadedmetadata = function () {
                    var duration = videocomp.duration;
                    if (duration > 0 && duration < 241) {
                        $("#carrusel").append("<div class='item'>\n\
 <video src='" + url + "' data-num='pricipal' controls='true' class='img-responsive' style='width: 100%;border-radius:10px'> </div>\n\
");
                    } else {
                        var messageN = document.getElementById("messageN");
                        messageN.innerHTML = '';
                        $("#messageN").append('\
    <div class="container justify-content-center mt-3" style="border-radius:25px;display: flex; align-items: center;height:500px;background-image: url(img/alert.png);background-repeat: no-repeat;background-position: center;text-align: center">\n\
        <div class="container justify-content-center" style="border-radius:25px;background: rgba(0,0,0,.6);">        \n\
            <h2 class="comic" id="mensajeAlerta" style="color: white;font-family: Comic Sans MS, cursive;font-size: 38px;">Duracion maxima: 4 minutos por archivo/Maximum duration: 4 minutes by file</h2> <br>\n\
            <button onclick="eliminar()" class="btn text-light zoom comic" style="margin-bottom:10px;font-family: Comic Sans MS, cursive;font-size:18px;border:solid 1px #2aa58a">Aceptar</button>\n\
        </div>\n\
    </div>');

                    }
                };
            } else {
                $("#carrusel").append("<h2>Solo puedes elegir videos</h2>");
                eliminar();
            }
        }

    }


}
function subir() {
    var element = document.getElementById("loader");
    element.style.display = 'flex';
    element.classList.toggle("loader");
    var tip = fichero.files[0].type;
    var palabra = [];
    var valores = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
        "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "-", "_"];
    var numero = 8;
    var numeroAleatorio;
    for (var j = 0; j < numero; j++) {
        numeroAleatorio = parseInt(Math.random() * valores.length);
        var resultado = valores[numeroAleatorio];
        palabra.push(resultado);
        var palabraResultante = palabra.join('');
    }
    if (tip === "video/mp4"
            || tip === "video/avi"
            || tip === "video/wmv"
            || tip === "video/wma"
            || tip === "video/mov"
            || tip === "video/flv"
            || tip === "video/mkv"
            || tip === "video/mks"
            || tip === "video/webm") {
        i = 0;
        bytesTotales = 0;
        bytesTransferred = 0;
        do {
            img = fichero.files[i];
            uploadTask = storageRef.child('imagenes/' + palabraResultante + i).put(img);
            i++;
        } while (i < fichero.files.length);
        function compStorage() {
            a = (parseInt(i) - 1);
            mayor = 0;
            menor = 0;
            for (var i = 0; i < fichero.files.length; i++) {
                val = fichero.files[i].size;
                if (val > mayor) {
                    mayor = val;
                    pos = i;
                }
            }
            busqueda = storageRef.child('imagenes/' + palabraResultante + pos.toString());
            busqueda.getDownloadURL().then(function (url) {
                clearInterval(timer);
                $("#text").attr("value", palabraResultante);
                $("#tamano").attr("value", i);
                obtenerURL();
            }).catch(function (error) {
            });


        }
        var timer = setInterval(compStorage, 8000);
    } else if (tip === "image/jpeg"
            || tip === "image/gif"
            || tip === "image/png"
            || tip === "image/tiff"
            || tip === "image/pds"
            || tip === "image/bmp") {
        auth.onAuthStateChanged(function (user) {
            var id = $("#text").val();
            var typeImgs = $("#types").val();
            if (user) {
                var mail = user.email;
                var encripta = cifrar(mail.toString());
                var correo = encripta.palabraEncriptada;
                fire.collection("IMAGENES").where("mail", "==", correo)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                var publicaciones = doc.data();
                                var nombreLink = publicaciones.nombre;
                                tamanoFichero = fichero.files.length;
                                var canvas = document.createElement('canvas');
                                var MAX_WIDTH = 950;
                                imagen = fichero.files[0];
                                var _URL = window.URL || window.webkitURL;
                                var img = new Image();
                                img.src = _URL.createObjectURL(imagen);
                                img.onload = function () {
                                    var ancho = img.width;
                                    var alto = img.height;
                                    calc = ancho / alto;
                                    if (ancho > MAX_WIDTH) {
                                        ancho = MAX_WIDTH;
                                        alto = ancho / calc;
                                    }
                                    canvas.width = ancho;
                                    canvas.height = alto;
                                    var ctx = canvas.getContext("2d");


                                    let cw = (canvas.width = ancho),
                                            cx = cw / 2;
                                    let ch = (canvas.height = alto),
                                            cy = ch - 10;
                                    ctx.textAlign = "center";
                                    ctx.textBaseline = "bottom";
                                    ctx.fillStyle = "rgba(255,255,255,.6)";
                                    ctx.drawImage(img, 0, 0, ancho, alto);
                                    let texto = "EnjoyTheMomentOfficial.com/" + nombreLink.toString() + "";
                                    let tamanoTexto = 300; // empieza con algo grande, más grande de lo que sea necesario

                                    ctx.font = tamanoTexto + "px Comic Sans MS";
                                    let anchuraTexto = ctx.measureText(texto).width;
                                    while (anchuraTexto > canvas.width - 20) {
                                        tamanoTexto--;
                                        ctx.font = tamanoTexto + "px Comic Sans MS";
                                        anchuraTexto = ctx.measureText(texto).width;
                                    }
                                    ctx.fillText(texto, cx, cy);

                                    canvas.toBlob((blob) => {
                                        let file = new File([blob], "fileName.jpg", {type: "image/jpeg"});
                                        uploadTask = storageRef.child('imagenes/' + palabraResultante + 0).put(file).then(function () {
                                            if (tamanoFichero > 1 && tamanoFichero < 6) {
                                                var canvas = document.createElement('canvas');
                                                imagen = fichero.files[1];
                                                var _URL = window.URL || window.webkitURL;
                                                var img = new Image();
                                                img.src = _URL.createObjectURL(imagen);
                                                img.onload = function () {
                                                    var ancho = img.width;
                                                    var alto = img.height;
                                                    calc = ancho / alto;
                                                    if (ancho > MAX_WIDTH) {
                                                        ancho = MAX_WIDTH;
                                                        alto = ancho / calc;
                                                    }
                                                    canvas.width = ancho;
                                                    canvas.height = alto;
                                                    var ctx = canvas.getContext("2d");
                                                    let cw = (canvas.width = ancho),
                                                            cx = cw / 2;
                                                    let ch = (canvas.height = alto),
                                                            cy = ch - 10;
                                                    ctx.textAlign = "center";
                                                    ctx.textBaseline = "bottom";
                                                    ctx.fillStyle = "rgba(255,255,255,.6)";
                                                    ctx.drawImage(img, 0, 0, ancho, alto);
                                                    let texto = "EnjoyTheMomentOfficial.com/" + nombreLink.toString() + "";
                                                    let tamanoTexto = 300; // empieza con algo grande, más grande de lo que sea necesario

                                                    ctx.font = tamanoTexto + "px Comic Sans MS";
                                                    let anchuraTexto = ctx.measureText(texto).width;
                                                    while (anchuraTexto > canvas.width - 20) {
                                                        tamanoTexto--;
                                                        ctx.font = tamanoTexto + "px Comic Sans MS";
                                                        anchuraTexto = ctx.measureText(texto).width;
                                                    }
                                                    ctx.fillText(texto, cx, cy);

                                                    canvas.toBlob((blob) => {
                                                        let file = new File([blob], "fileName.jpg", {type: "image/jpeg"});
                                                        uploadTask = storageRef.child('imagenes/' + palabraResultante + 1).put(file).then(function () {
                                                            if (tamanoFichero > 2 && tamanoFichero < 6) {
                                                                var canvas = document.createElement('canvas');
                                                                imagen = fichero.files[2];
                                                                var _URL = window.URL || window.webkitURL;
                                                                var img = new Image();
                                                                img.src = _URL.createObjectURL(imagen);
                                                                img.onload = function () {
                                                                    var ancho = img.width;
                                                                    var alto = img.height;
                                                                    calc = ancho / alto;
                                                                    if (ancho > MAX_WIDTH) {
                                                                        ancho = MAX_WIDTH;
                                                                        alto = ancho / calc;
                                                                    }
                                                                    canvas.width = ancho;
                                                                    canvas.height = alto;
                                                                    var ctx = canvas.getContext("2d");
                                                                    let cw = (canvas.width = ancho),
                                                                            cx = cw / 2;
                                                                    let ch = (canvas.height = alto),
                                                                            cy = ch - 10;
                                                                    ctx.textAlign = "center";
                                                                    ctx.textBaseline = "bottom";
                                                                    ctx.fillStyle = "rgba(255,255,255,.6)";
                                                                    ctx.drawImage(img, 0, 0, ancho, alto);
                                                                    let texto = "EnjoyTheMomentOfficial.com/" + nombreLink.toString() + "";
                                                                    let tamanoTexto = 300; // empieza con algo grande, más grande de lo que sea necesario

                                                                    ctx.font = tamanoTexto + "px Comic Sans MS";
                                                                    let anchuraTexto = ctx.measureText(texto).width;
                                                                    while (anchuraTexto > canvas.width - 20) {
                                                                        tamanoTexto--;
                                                                        ctx.font = tamanoTexto + "px Comic Sans MS";
                                                                        anchuraTexto = ctx.measureText(texto).width;
                                                                    }
                                                                    ctx.fillText(texto, cx, cy);

                                                                    canvas.toBlob((blob) => {
                                                                        let file = new File([blob], "fileName.jpg", {type: "image/jpeg"});
                                                                        uploadTask = storageRef.child('imagenes/' + palabraResultante + 2).put(file).then(function () {
                                                                            if (tamanoFichero > 3 && tamanoFichero < 6) {
                                                                                var canvas = document.createElement('canvas');

                                                                                imagen = fichero.files[3];
                                                                                var _URL = window.URL || window.webkitURL;
                                                                                var img = new Image();
                                                                                img.src = _URL.createObjectURL(imagen);
                                                                                img.onload = function () {
                                                                                    var ancho = img.width;
                                                                                    var alto = img.height;
                                                                                    calc = ancho / alto;
                                                                                    if (ancho > MAX_WIDTH) {
                                                                                        ancho = MAX_WIDTH;
                                                                                        alto = ancho / calc;
                                                                                    }
                                                                                    canvas.width = ancho;
                                                                                    canvas.height = alto;
                                                                                    var ctx = canvas.getContext("2d");
                                                                                    let cw = (canvas.width = ancho),
                                                                                            cx = cw / 2;
                                                                                    let ch = (canvas.height = alto),
                                                                                            cy = ch - 10;
                                                                                    ctx.textAlign = "center";
                                                                                    ctx.textBaseline = "bottom";
                                                                                    ctx.fillStyle = "rgba(255,255,255,.6)";
                                                                                    ctx.drawImage(img, 0, 0, ancho, alto);
                                                                                    let texto = "EnjoyTheMomentOfficial.com/" + nombreLink.toString() + "";
                                                                                    let tamanoTexto = 300; // empieza con algo grande, más grande de lo que sea necesario

                                                                                    ctx.font = tamanoTexto + "px Comic Sans MS";
                                                                                    let anchuraTexto = ctx.measureText(texto).width;
                                                                                    while (anchuraTexto > canvas.width - 20) {
                                                                                        tamanoTexto--;
                                                                                        ctx.font = tamanoTexto + "px Comic Sans MS";
                                                                                        anchuraTexto = ctx.measureText(texto).width;
                                                                                    }
                                                                                    ctx.fillText(texto, cx, cy);

                                                                                    canvas.toBlob((blob) => {
                                                                                        let file = new File([blob], "fileName.jpg", {type: "image/jpeg"});
                                                                                        uploadTask = storageRef.child('imagenes/' + palabraResultante + 3).put(file).then(function () {
                                                                                            if (tamanoFichero === 5) {
                                                                                                var canvas = document.createElement('canvas');
                                                                                                imagen = fichero.files[4];
                                                                                                var _URL = window.URL || window.webkitURL;
                                                                                                var img = new Image();
                                                                                                img.src = _URL.createObjectURL(imagen);
                                                                                                img.onload = function () {
                                                                                                    var ancho = img.width;
                                                                                                    var alto = img.height;
                                                                                                    calc = ancho / alto;
                                                                                                    if (ancho > MAX_WIDTH) {
                                                                                                        ancho = MAX_WIDTH;
                                                                                                        alto = ancho / calc;
                                                                                                    }
                                                                                                    canvas.width = ancho;
                                                                                                    canvas.height = alto;
                                                                                                    var ctx = canvas.getContext("2d");
                                                                                                    let cw = (canvas.width = ancho),
                                                                                                            cx = cw / 2;
                                                                                                    let ch = (canvas.height = alto),
                                                                                                            cy = ch - 10;
                                                                                                    ctx.textAlign = "center";
                                                                                                    ctx.textBaseline = "bottom";
                                                                                                    ctx.fillStyle = "rgba(255,255,255,.6)";
                                                                                                    ctx.drawImage(img, 0, 0, ancho, alto);
                                                                                                    let texto = "EnjoyTheMomentOfficial.com/" + nombreLink.toString() + "";
                                                                                                    let tamanoTexto = 300; 
                                                                                                    ctx.font = tamanoTexto + "px Comic Sans MS";
                                                                                                    let anchuraTexto = ctx.measureText(texto).width;
                                                                                                    while (anchuraTexto > canvas.width - 20) {
                                                                                                        tamanoTexto--;
                                                                                                        ctx.font = tamanoTexto + "px Comic Sans MS";
                                                                                                        anchuraTexto = ctx.measureText(texto).width;
                                                                                                    }
                                                                                                    ctx.fillText(texto, cx, cy);
                                                                                                    canvas.toBlob((blob) => {
                                                                                                        let file = new File([blob], "fileName.jpg", {type: "image/jpeg"});
                                                                                                        uploadTask = storageRef.child('imagenes/' + palabraResultante + 4).put(file).then(function () {
                                                                                                            $("#text").attr("value", palabraResultante);
                                                                                                            $("#tamano").attr("value", "5");
                                                                                                            obtenerURL();

                                                                                                        });
                                                                                                    }, 'image/jpeg');
                                                                                                };
                                                                                            } else {
                                                                                                $("#text").attr("value", palabraResultante);
                                                                                                $("#tamano").attr("value", "4");
                                                                                                obtenerURL();
                                                                                            }
                                                                                        });
                                                                                    }, 'image/jpeg');
                                                                                };
                                                                            } else {
                                                                                $("#text").attr("value", palabraResultante);
                                                                                $("#tamano").attr("value", "3");
                                                                                obtenerURL();
                                                                            }
                                                                        });
                                                                    }, 'image/jpeg');
                                                                };
                                                            } else {
                                                                $("#text").attr("value", palabraResultante);
                                                                $("#tamano").attr("value", "2");
                                                                obtenerURL();
                                                            }
                                                        });
                                                    }, 'image/jpeg');
                                                };
                                            } else {
                                                $("#text").attr("value", palabraResultante);
                                                $("#tamano").attr("value", "1");
                                                obtenerURL();
                                            }
                                        });
                                    }, 'image/jpeg');
                                };

                            });
                        });
            }
        });
    }






    timerMensaje = setInterval(chaM, 10000);
}

function deleteCancel() {
    i = $("#tamano").val();
    palabra = $("#text").val();

    for (j = 0; j < i; j++) {

        var desertRef = storageRef.child('imagenes/' + palabra + j);
        if (j === (parseInt(i) - 1)) {

            desertRef.delete().then(function () {
                location.reload();
            }).catch(function (error) {
            });
        } else {

            desertRef.delete();
        }
    }
}
function chaM() {

    var loaderMensaje = document.getElementById("loaderMensaje");
    loaderMensaje.innerHTML = 'Subiendo archivos, por favor espere...';
    clearInterval(timerMensaje);
    timerMensaje2 = setInterval(chaM2, 5000);
}
function chaM2() {

    var loaderMensaje = document.getElementById("loaderMensaje");
    loaderMensaje.innerHTML = 'Cifrando archivos, por favor espere...';
    clearInterval(timerMensaje2);
    timerMensaje3 = setInterval(chaM3, 12000);
}
function chaM3() {
    var loaderMensaje = document.getElementById("loaderMensaje");
    loaderMensaje.innerHTML = 'Terminando ultimos detalles';
    clearInterval(timerMensaje3);

}
function obtenerURL() {
    var loaderMensaje = document.getElementById("loaderMensaje");
    var element = document.getElementById("loader");
    element.style.display = 'none';
    element.classList.remove("loader");



    document.getElementById("unirUrl").style.display = "";
    document.getElementById("cancelarSubida").style.display = "";
    $("#unirUrl").attr("onclick", "compDes()");
    $("#cancelarSubida").attr("onclick", "deleteCancel()");

    document.getElementById("descripcion").style.display = "";
    document.getElementById("cantCaracteres").style.display = "";
    document.getElementById("buttonS").style.display = "none";
    document.getElementById("vacirInput").style.display = "none";
    i = $("#tamano").val();

    palabra = $("#text").val();
    var conU = 0;
    var conI = 0;
    var typeConcat = "";
    for (j = 0; j < i; j++) {
        var upload = storageRef.child('imagenes/' + palabra + conI);
        conI++;
        upload.getDownloadURL().then(function (downloadUrl) {
            loaderMensaje.innerHTML = 'Subiendo archivo ' + (j + 1) + ' por favor espere...';

            caja = document.getElementById("caja");
            url = document.createElement('input');
            url.type = "text";
            url.style.borderRadius = "20px";
            url.id = "url" + conU;
            url.onkeypress = "eliminar()";
            url.value = downloadUrl;
            url.style.display = 'none';

            caja.append(url);
            $("#url" + conU + "").attr("onkeypress", "eliminar()");
            $("#url" + conU + "").attr("readonly", "readonly");
            conU++;


        });


        if (parseInt(i) > 1) {

            typeConcat = typeConcat.concat(fichero.files[j].type + "-");


        } else if (parseInt(i) === 1) {

            typeConcat = typeConcat.concat(fichero.files[j].type);

        }

    }
    if (i > 1) {
        typeConcat = typeConcat.substring(0, typeConcat.length - 1);

    }

    valorJ = document.createElement('input');
    valorJ.type = "text";
    valorJ.style.borderRadius = "20px";
    valorJ.id = "valorJ";
    valorJ.value = i;
    caja.append(valorJ);
    valorType = document.createElement('input');
    valorType.type = "text";
    valorType.style.borderRadius = "20px";
    valorType.id = "types";

    valorType.value = typeConcat;
    valorType.style.display = 'none';
    valorJ.style.display = 'none';
    $("#valorJ").attr("onkeypress", "eliminar()");

    $("#valorJ").attr("readonly", "readonly");


    caja.append(valorType);
    $("#types").attr("onkeypress", "eliminar()");
    $("#types").attr("readonly", "readonly");




}
function unirUrl() {

    var concatUrl = "";
    i = $("#valorJ").val();

    for (var a = 0; a < i; a++) {
        urlGet = $("#url" + a).val();
        url = urlGet.toString();



        if (i > 1) {

            concatUrl = concatUrl.concat(url.toString() + "*");

        } else if (i === "1") {


            concatUrl = concatUrl.concat(url.toString());
        }


    }
    if (i > 1) {
        concatUrl = concatUrl.substring(0, concatUrl.length - 1);

    }


    auth.onAuthStateChanged(function (user) {
        var id = $("#text").val();
        var typeImgs = $("#types").val();
        if (user) {


            var mail = user.email;
            var encripta = cifrar(mail.toString());
            var correo = encripta.palabraEncriptada;

            fire.collection("IMAGENES").where("mail", "==", correo)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            var publicaciones = doc.data();
                            $("#prueba75").attr("value", publicaciones.nombre);
                            name = publicaciones.nombre;
                            profileIMG = publicaciones.foto;

                            crearNodoBD(name, typeImgs, concatUrl, profileIMG, id, correo, i);

                        });
                    })
                    .catch(function (error) {
                    });
        } else {
        }
    });




}
function crearNodoBD(n, tipo, url, p, id, c, i) {
    var descripcion = $("#descripcion").val();
    mode = document.getElementById("mode");
    if (mode.checked) {
        mode = "privada";
    } else {
        mode = "public";
    }

    var ref = firebase.database().ref("valorPrincipal/");
    ref.on("child_added", function (s) {
        dataValor = s.val();
        valorR = parseInt(dataValor.valor);
        numPub = valorR - 1;

        fire.collection("IMAGENES").where("mail", "==", c)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        var publicaciones = doc.data();
                        doc = publicaciones.uid;
                        var contSeg = publicaciones.contSeg;
                        var seguidores = publicaciones.seguidores;
                        var post = publicaciones.post;
                        var cuentaVerificada = publicaciones.cuentaVerificada;
                        if (cuentaVerificada === "true") {
                            if (descripcion.length > 0) {
                                console.log("cuenta verificada");
                                if (contSeg > 0) {
                                    if (p) {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                } else if (contSeg === 0) {
                                    if (p) {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                }
                            } else if (descripcion.length === 0) {
                                if (contSeg > 0) {
                                    if (p) {
                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                } else if (contSeg === 0) {
                                    if (p) {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            cuentaVerificada: "true",
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                }
                            }
                        } else {
                            if (descripcion.length > 0) {

                                if (contSeg > 0) {
                                    if (p) {

                                        var usuario = {
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                } else if (contSeg === 0) {
                                    if (p) {

                                        var usuario = {
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            mode: mode,
                                            descripcion: descripcion,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                }
                            } else if (descripcion.length === 0) {
                                if (contSeg > 0) {
                                    if (p) {
                                        var usuario = {
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: contSeg,
                                            seguidores: seguidores
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                } else if (contSeg === 0) {
                                    if (p) {

                                        var usuario = {
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: p,
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    } else {

                                        var usuario = {
                                            mode: mode,
                                            contadorPrincipal: numPub,
                                            ID: id,
                                            likes: 0,
                                            coms: 0,
                                            nombreU: n,
                                            type: tipo,
                                            url: url,
                                            profileIMG: "URL",
                                            correoI: c,
                                            diamantes: 0,
                                            contadorImagenes: i,
                                            contSeg: 0,
                                            seguidores: ""
                                        };
                                        firebase.database().ref("Imagenes/").push(usuario);
                                        actualizaValor(numPub, doc, post);
                                    }
                                }
                            }
                        }

                    });
                });
    });
}
function actualizaValor(n, uid, post) {

    var refTab = firebase.database().ref("valorPrincipal/").child("-MOJgJ1dOy1kR4NXHHn6");
    var newData = {
        valor: n
    };

    refTab.update(newData).then(function () {
        var postN;
        if (post > 0) {
            postN = post + 1;
            var docref = fire.collection('IMAGENES').doc(uid);
            dataNew = {
                post: postN
            };
            docref.update(dataNew).then(function () {
                window.location.replace('publicaciones.html');
            });
        } else if (post === 0) {
            postN = post + 1;
            var docref = fire.collection('IMAGENES').doc(uid);
            dataNew = {
                post: postN
            };
            docref.update(dataNew).then(function () {
                window.location.replace('publicaciones.html');
            });
        } else if (post === undefined) {
            postN = 1;
            var docref = fire.collection('IMAGENES').doc(uid);
            dataNew = {
                post: postN
            };
            docref.update(dataNew).then(function () {
                window.location.replace('publicaciones.html');
            });
        }
    });
}
function compDes() {
    var descripcion = $("#descripcion").val();
    var filtroLetra2 = ["(", ")", "$", "°", "|", "[", "]", "<", ">", "¬"];
    if (descripcion.includes(filtroLetra2[0])) {
        document.getElementById("errorCaracter").innerHTML = '"(" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[1])) {
        document.getElementById("errorCaracter").innerHTML = '")" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[2])) {
        document.getElementById("errorCaracter").innerHTML = '"$" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[3])) {
        document.getElementById("errorCaracter").innerHTML = '"°" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[4])) {
        document.getElementById("errorCaracter").innerHTML = '"|" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[5])) {
        document.getElementById("errorCaracter").innerHTML = '"[" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[6])) {
        document.getElementById("errorCaracter").innerHTML = '"]" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[7])) {
        document.getElementById("errorCaracter").innerHTML = '"<" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[8])) {
        document.getElementById("errorCaracter").innerHTML = '">" no es un caracter valido';
    } else if (descripcion.includes(filtroLetra2[9])) {
        document.getElementById("errorCaracter").innerHTML = '"¬" no es un caracter valido';
    } else {

        var validacion = /</;
        var validacion2 = />/;
        if (validacion.test(descripcion)) {
            document.getElementById("errorCaracter").innerHTML = '"<" no es un caracter valido';

        } else {
            if (validacion2.test(descripcion)) {
                document.getElementById("errorCaracter").innerHTML = '">" no es un caracter valido';

            } else {
                tamano = descripcion.length;
                document.getElementById("errorCaracteres").innerHTML = "";
                if (tamano > 200) {
                    document.getElementById("errorCaracteres").innerHTML = "*200 max";
                } else {
                    unirUrl();
                }
            }
        }
    }
}