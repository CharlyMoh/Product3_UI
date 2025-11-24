// Función para ocultar la portada
function entrar() {
    document.getElementById("portada").classList.add("hidden");
}

// Función para mostrar la portada nuevamente
function regresarPortada() {
    document.getElementById("portada").classList.remove("hidden");
    window.scrollTo(0, 0); // vuelve arriba para evitar bugs visuales
}

// Variables globales para el canvas y partículas
let canvas;
let ctx;
let particlesArray = [];
const numberOfParticles = 100;

// Clase para las partículas
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Función para inicializar las partículas
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Función para animar las partículas
function animateParticles() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

// Inicializar el fondo animado de partículas cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el canvas y su contexto
    canvas = document.getElementById("particles");
    if (canvas) {
        ctx = canvas.getContext("2d");
        
        // Configurar dimensiones del canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Manejar el redimensionamiento de la ventana
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Inicializar y animar partículas
        initParticles();
        animateParticles();
    }
});

