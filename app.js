let amigos = []; // Lista para guardar los nombres
let cantidadAmigos = 0; // Límite máximo de amigos permitido
let intentosRestantes = 3; // Intentos para corregir nombres

// Función para solicitar la cantidad de amigos
function solicitarCantidadAmigos() {
    let mensaje = "¿Cuántos amigos deseas ingresar? (1 a 50)";
    let cantidad = prompt(mensaje);

    if (cantidad !== null && cantidad !== "") {
        let esNumero = true;
        for (let i = 0; i < cantidad.length; i++) {
            if (cantidad[i] < "0" || cantidad[i] > "9") {
                esNumero = false;
                break;
            }
        }

        if (esNumero && cantidad >= 1 && cantidad <= 50) {
            cantidadAmigos = parseInt(cantidad); // Convertir a número
            mostrarMensaje(`Puedes agregar hasta ${cantidadAmigos} amigos.`);
        } else {
            alert("Por favor, ingresa un número válido entre 1 y 50.");
            solicitarCantidadAmigos(); // Volver a preguntar si es inválido
        }
    } else {
        alert("Debes ingresar una cantidad.");
        solicitarCantidadAmigos();
    }
}

// Función para agregar un amigo
function agregarAmigo() {
    if (amigos.length >= cantidadAmigos) {
        alert("¡Has alcanzado el límite de amigos permitido!");
        document.getElementById("amigo").value = ""; // Limpiar el campo de entrada
        return;
    }
    let amigoInput = document.getElementById("amigo");
    let nombre = amigoInput.value;

    // Validar que el nombre tenga al menos un nombre y apellido
    if (nombre === "" || nombre.split(" ").length < 2) {
        manejarError("Debes ingresar un nombre y apellido.");
        return;
    }

    // Restablecer intentos y agregar nombre manualmente
    intentosRestantes = 3;
    amigos[amigos.length] = nombre;

    actualizarListaAmigos();
    amigoInput.value = ""; // Limpiar el campo de entrada

    if (amigos.length === cantidadAmigos) {
        document.querySelector(".button-draw").disabled = false; // Habilitar sorteo
        mostrarMensaje("¡Has alcanzado el número máximo de amigos! Puedes realizar el sorteo.");
    } else {
        mostrarMensaje(`Amigos restantes por agregar: ${cantidadAmigos - amigos.length}`);
    }
}

// Función para manejar errores
function manejarError(mensaje) {
    intentosRestantes--;

    if (intentosRestantes > 0) {
        alert(`${mensaje} Te quedan ${intentosRestantes} intentos.`);
    } else {
        alert("Has agotado tus intentos. El campo se deshabilitará.");
        document.getElementById("amigo").disabled = true;
    }
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpiar la lista

    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement("li");
        li.textContent = amigos[i];
        listaAmigos.appendChild(li);
    }
}

// Función para mostrar mensajes dinámicos en el HTML
function mostrarMensaje(mensaje) {
    let mensajeHTML = document.getElementById("mensajeUsuario");
    mensajeHTML.textContent = mensaje;
}

// Función para sortear un ganador
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos para sortear. Por favor, agrega nombres primero.");
        return;
    }

    let indiceGanador = Math.floor(Math.random() * amigos.length);
    let ganador = amigos[indiceGanador];

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <div style="text-align: center; font-size: 20px; color: #4B69FD; background-color: #FFF9EB; padding: 15px; border-radius: 8px;">
            <h2>¡Felicidades, ${ganador}!</h2>
            <p>¡Eres el ganador del amigo secreto! 🎉</p>
        </div>
    `;

    setTimeout(() => jugarDeNuevo(), 2000); // Preguntar jugar de nuevo
}

// Función para jugar de nuevo
function jugarDeNuevo() {
    let confirmar = confirm("¿Quieres jugar de nuevo?");
    if (confirmar) {
        reiniciarJuego();
    } else {
        alert("¡Gracias por jugar!");
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    amigos = [];
    cantidadAmigos = 0;
    intentosRestantes = 3;

    document.getElementById("amigo").value = "";
    document.getElementById("amigo").disabled = false;
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.querySelector(".button-draw").disabled = true;

    mostrarMensaje(""); // Limpiar mensajes
    solicitarCantidadAmigos(); // Reiniciar cantidad de amigos
}

// Función para manejar tecla Enter
document.getElementById("amigo").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

// Iniciar el juego
window.onload = function () {
    solicitarCantidadAmigos();
    document.querySelector(".button-draw").disabled = true;
};
