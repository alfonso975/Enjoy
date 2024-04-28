/* Create By Alfonso Lopez */
var provider = new firebase.auth.FacebookAuthProvider();
var providerGoo = new firebase.auth.GoogleAuthProvider();
var auth = firebase.auth();
var fire = firebase.firestore();
var data = firebase.database();
$("#login").click(function () {
    checkBox = document.getElementById("Check");
    if (checkBox.checked === true) {
        var correo = document.querySelector("#correoR").value;
        var contra = document.querySelector("#contraR").value;
        var validacion = /</;
        var validacion2 = />/;
        if (validacion.test(correo)) {
            document.getElementById("error").innerHTML = '"<" no es un caracter valido';
        } else {
            if (validacion2.test(correo)) {
                document.getElementById("error").innerHTML = '">" no es un caracter valido';
            } else {
                if (validacion.test(contra)) {
                    document.getElementById("error").innerHTML = '"<" no es un caracter valido';
                } else {
                    if (validacion2.test(contra)) {
                        document.getElementById("error").innerHTML = '">" no es un caracter valido';
                    } else {
                        auth.
                                createUserWithEmailAndPassword(correo, contra)
                                .then(function () {
                                    $("#correoR").val("");
                                    $("#contraR").val("");
                                    guardaDatosCorreo(correo, contra);
                                }, (err) => {
                                    document.getElementById("error").innerHTML = "";
                                    if (err === "Oops... Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).") {
                                        $("#error").append("<strong id='ops'>Oops... Correo o Contraseña incorrectos</strong>");
                                    } else {
                                        $("#error").append("<strong id='ops'>Oops... " + err.message + "</strong>");
                                    }
                                }
                                );
                    }
                }
            }
        }
    } else {
        document.getElementById("registroExitoso").innerHTML = "<h1 class='text-center' style='font-family: Comic Sans MS, cursive;margin:0px;width:auto;padding:0;color: #184c4c;font-size: 20px;'>\n\
<strong class='' style='font-family: Comic Sans MS, cursive;padding:0;color: #184c4c;font-size: 20px;'>*Debe aceptar los terminos y condiciones</strong></h1>";


    }





});
function check() {
    document.getElementById("registroExitoso").innerHTML = '';
    checkBox = document.getElementById("Check");
    if (checkBox.checked === true) {
        checkBox.style.backgroundColor = "#184c4c";
        checkBox.style.color = "#184c4c";
        checkBox.style.borderColor = "#184c4c";

    }
}
/*$("#a").click(function () {
 vaciarNR();
 firebase.auth().signInWithPopup(provider).then(function (result) {
 var correoAutenticacion = result.user.uid;
 var encripta = cifrar(correoAutenticacion.toString());
 var mail = encripta.palabraEncriptada;
 fire.collection("IMAGENES").where("mail", "==", mail)
 .get()
 .then(function (querySnapshot) {
 var search;
 var nombre;
 querySnapshot.forEach(function (doc) {
 var publicaciones = doc.data();
 search = publicaciones.mail;
 nombre = publicaciones.nombre;
 });
 busqueda(nombre, search, result);
 });
 
 });
 
 });
 /*$("#regFace").click(function () {
 checkBox = document.getElementById("Check");
 if (checkBox.checked === true) {
 firebase.auth().signInWithPopup(provider).then(function (result) {
 var correoAutenticacion = result.user.uid;
 var encripta = cifrar(correoAutenticacion.toString());
 var mail = encripta.palabraEncriptada;
 fire.collection("IMAGENES").where("mail", "==", mail)
 .get()
 .then(function (querySnapshot) {
 var search;
 var nombre;
 querySnapshot.forEach(function (doc) {
 var publicaciones = doc.data();
 search = publicaciones.mail;
 nombre = publicaciones.nombre;
 });
 busquedaRegistro(search, result, nombre);
 });
 });
 } else {
 document.getElementById("registroExitoso").innerHTML = "<h1 class='text-center' style='font-family: Comic Sans MS, cursive;margin:0px;width:auto;padding:0;color: #184c4c;font-size: 20px;'>\n\
 <strong class='' style='padding:0;color: #184c4c;font-size: 20px;'>*Debe aceptar los terminos y condiciones</strong></h1>";
 
 
 }
 });*/
$("#g").click(function () {
    vaciarNR();
    firebase.auth().signInWithPopup(providerGoo).then(function (result) {
        var correoAutenticacion = result.user.email;
        var encripta = cifrar(correoAutenticacion.toString());
        var mail = encripta.palabraEncriptada;
        fire.collection("IMAGENES").where("mail", "==", mail)
                .get()
                .then(function (querySnapshot) {
                    var search;
                    var nombre;
                    querySnapshot.forEach(function (doc) {
                        var publicaciones = doc.data();
                        search = publicaciones.mail;
                        nombre = publicaciones.nombre;
                    });
                    busqueda(nombre, search, result);
                });
    });
});
$("#gooReg").click(function () {
    checkBox = document.getElementById("Check");
    if (checkBox.checked === true) {
        firebase.auth().signInWithPopup(providerGoo).then(function (result) {
            var correoAutenticacion = result.user.email;
            var encripta = cifrar(correoAutenticacion.toString());
            var mail = encripta.palabraEncriptada;
            fire.collection("IMAGENES").where("mail", "==", mail)
                    .get()
                    .then(function (querySnapshot) {
                        var search;
                        var nombre;
                        querySnapshot.forEach(function (doc) {
                            var publicaciones = doc.data();
                            search = publicaciones.mail;
                            nombre = publicaciones.nombre;
                        });
                        busquedaRegistro(search, result, nombre);

                    });

        });
    } else {
        document.getElementById("registroExitoso").innerHTML = "<h1 class='text-center' style='font-family: Comic Sans MS, cursive;margin:0px;width:auto;padding:0;color: #184c4c;font-size: 20px;'>\n\
<strong class='' style='font-family: Comic Sans MS, cursive;padding:0;color: #184c4c;font-size: 20px;'>*Debe aceptar los terminos y condiciones</strong></h1>";

    }



});

function busqueda(nombre, search, result) {
    if (search === undefined) {

        busquedaRegistro(search, result, nombre);

    } else if (search) {
        if (nombre.includes('user')) {
            var url = "settings.html?";
            window.location.replace(url);
        } else if (nombre.includes('user') === false) {
            window.location.replace("publicaciones.html");
        }
    }
}
function busquedaRegistro(search, result, nombre) {
    if (search) {
        if (nombre.includes('user')) {
            $("#correo").attr("value", "");
            $("#contra").attr("value", "");
            var url = "settings.html";
            location.replace(url);
        } else if (nombre.includes('user') === false) {
            $("#correo").attr("value", "");
            $("#contra").attr("value", "");
            location.replace("publicaciones.html");
        }
    } else if (search === undefined) {
        var contNot = 1999999999999999;
        guardaDatosFire(result.user, contNot);
    }
}
function vaciarNR() {
    mensaje = document.getElementById("mensajeUserNot");
    if (mensaje) {
        div = document.getElementById("noRegistro");
        div.removeChild(div.lastChild);
    } else {
    }
}
var form = document.querySelector("#iniciosesion");
$("#iniciar").click(function () {
    var correo = document.querySelector("#correo").value;
    var contra = document.querySelector("#contra").value;
    var validacion = /</;
    var validacion2 = />/;
    if (validacion.test(correo)) {
        document.getElementById("errorDiv").innerHTML = '"<" no es un caracter valido';
    } else {
        if (validacion2.test(correo)) {
            document.getElementById("errorDiv").innerHTML = '">" no es un caracter valido';
        } else {
            if (validacion.test(contra)) {
                document.getElementById("errorDiv").innerHTML = '"<" no es un caracter valido';
            } else {
                if (validacion2.test(contra)) {
                    document.getElementById("errorDiv").innerHTML = '">" no es un caracter valido';
                } else {
                    auth.signInWithEmailAndPassword(correo, contra)
                            .then(function () {
                                var encripta = cifrar(correo.toString());
                                var mail = encripta.palabraEncriptada;
                                fire.collection("IMAGENES")
                                        .get()
                                        .then(function (querySnapshot) {
                                            var nombre;
                                            querySnapshot.forEach(function (doc) {
                                                var publicaciones = doc.data();
                                                var mailDb = publicaciones.mail;
                                                nombre = publicaciones.nombre;
                                                if (mail === mailDb) {
                                                    if (nombre.includes('user')) {
                                                        $("#correo").attr("value", "");
                                                        $("#contra").attr("value", "");
                                                        var url = "settings.html?";
                                                        window.location.replace(url);
                                                    } else if (nombre.includes('user') === false) {
                                                        $("#correo").attr("value", "");
                                                        $("#contra").attr("value", "");
                                                        window.location.replace("publicaciones.html");
                                                    }
                                                } else {
                                                    document.getElementById("error").innerHTML = 'error';
                                                }
                                            });
                                        });
                            }, (errO) => {
                                var correo = document.querySelector("#correo").value;
                                var contra = document.querySelector("#contra").value;
                                var validacion = /</;
                                var validacion2 = />/;
                                if (validacion.test(correo)) {
                                    document.getElementById("error").innerHTML = '"<" no es un caracter valido';
                                } else {
                                    if (validacion2.test(correo)) {
                                        document.getElementById("error").innerHTML = '">" no es un caracter valido';
                                    } else {
                                        if (validacion.test(contra)) {
                                            document.getElementById("error").innerHTML = '"<" no es un caracter valido';
                                        } else {
                                            if (validacion2.test(contra)) {
                                                document.getElementById("error").innerHTML = '">" no es un caracter valido';
                                            } else {
                                                auth.createUserWithEmailAndPassword(correo, contra)
                                                        .then(function () {
                                                            $("#correo").val("");
                                                            $("#contra").val("");
                                                            guardaDatosCorreo(correo, contra);
                                                        }, (err) => {
                                                            document.getElementById("error").innerHTML = "";
                                                            if (err === "Oops... Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).") {
                                                                $("#error").append("<strong id='ops'>Oops... Correo o Contraseña incorrectos</strong>");
                                                            } else {
                                                                $("#error").append("<strong id='ops'>Oops... " + err.message + "</strong>");
                                                            }
                                                        }
                                                        );
                                            }
                                        }
                                    }
                                }

                            });

                }
            }
        }
    }

});
function guardaDatosFire(user, c) {
    var palabraN = [];
    var valoresN = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
        "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "-", "_"];
    var numeroN = 7;
    var numeroAleatorioN;
    for (var i = 0; i < numeroN; i++) {
        numeroAleatorioN = parseInt(Math.random() * valoresN.length);
        var resultadoN = valoresN[numeroAleatorioN];
        palabraN.push(resultadoN);
        var palabraResultanteN = palabraN.join('');
    }
    var userName = "user_" + palabraResultanteN;
    if (user.email === null || user.email === undefined || user.email === "") {
        var encripta = cifrar(user.uid.toString());
        var mail = encripta.palabraEncriptada;
    } else {
        var encripta = cifrar(user.email.toString());
        var mail = encripta.palabraEncriptada;
    }

    var data = {
        presentacion: "",
        contNot: c,
        uid: user.uid,
        nombre: userName,
        mail: mail,
        contBandeja: c,
        susM: 5,
        seguidores: "",
        contSeg: 0,
        foto: "undefined"
    };
    firebase.firestore().collection('IMAGENES').doc(user.uid).set(data).then(function () {
        $("#registroExitoso").append("<h2 class='text-center' id='mensajeUserYes' style='font-family: Comic Sans MS, cursive;margin:0px;width:auto;padding:0;color: #27b477;font-size: 20px;'>\n\
<img src='img/checked.png' style='height: 20px;width:20px;margin-right:10px'><strong id='RegistroMensaje' style='padding:0;color: #27b477'>Usuario Registrado Exitosamente Ahora Puede Iniciar Sesión</strong></h2>");
        location.replace("settings.html");
    });
}
function guardaDatosCorreo(c, pas) {
    var encripta = cifrar(c.toString());
    var mail = encripta.palabraEncriptada;
    var palabra = [];
    var valores = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
        "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "-", "_"];
    var numero = 28;
    var numeroAleatorio;
    for (var i = 0; i < numero; i++) {
        numeroAleatorio = parseInt(Math.random() * valores.length);
        var resultado = valores[numeroAleatorio];
        palabra.push(resultado);
        var palabraResultante = palabra.join('');
    }
    var palabraN = [];
    var valoresN = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
        "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "-", "_"];
    var numeroN = 7;
    var numeroAleatorioN;
    for (var i = 0; i < numeroN; i++) {
        numeroAleatorioN = parseInt(Math.random() * valoresN.length);
        var resultadoN = valoresN[numeroAleatorioN];
        palabraN.push(resultadoN);
        var palabraResultanteN = palabraN.join('');
    }
    var userName = "user_" + palabraResultanteN;
    var contNot = 1999999999999999;
    var data = {
        presentacion: "",
        contra: pas,
        contNot: contNot,
        nombre: userName,
        mail: mail,
        contBandeja: contNot,
        susM: 5,
        uid: palabraResultante,
        seguidores: "",
        contSeg: 0,
        foto: "undefined"
    };
    firebase.firestore().collection('IMAGENES').doc(palabraResultante).set(data).then(function () {
        $("#registroExitoso").append("<h1 class='text-center' id='mensajeUserYes' style='font-family: Comic Sans MS, cursive;margin:0px;width:auto;padding:0;color: #27b477;font-size: 20px;'>\n\
<img src='img/checked.png' style='height: 20px;width:20px;margin-right:10px'><strong id='RegistroMensaje' style='padding:0;color: #27b477'>Usuario Registrado Exitosamente Ahora Puede Iniciar Sesión</strong></h1>");
        location.replace("settings.html");
    });
}
firebase.database().ref("users")
        .on("child_added", function (s) {
            var userdata = s.val();
            $("#fotouser").append("<img width='100px' src='" + userdata.foto + "'/>");
        }
        );
function recoverPass() {
    var auth = firebase.auth();
    var mailAdress = $("#correo").val();
    auth.sendPasswordResetEmail(mailAdress).then(function () {
        $("#errorDiv").append("<img src='img/checked.png' style='height: 20px;width:20px;margin-right:10px'><strong id='errorM' class='' style='font-family: Comic Sans MS, cursive;color: #27b477;font-size: 20px;'>Se ha enviado el correo de recuperacion de contraseña a la direccion '" + mailAdress + "', revise la bandeja de entrada o los correos no deseados. Siga los Instrucciones del mensaje.</strong>");
    }, function (error) {
        document.getElementById("errorDiv").innerHTML = "";
        $("#errorDiv").append("<strong class='' id='errorM' style='font-family: Comic Sans MS, cursive;font-size: 20px;'>\n\
    Oops... Parece que la dirección de correo electrónico tiene un formato incorrecto\n\
</strong>");

    });
}
function validaEmail() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
    }).catch(function (error) {
    });
}