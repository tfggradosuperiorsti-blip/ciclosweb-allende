// Mapa de videos con URLs absolutas de EducaMadrid
const videoMap = {
    sti: {
        "Iluminación": "https://url-ejemplo.educa.madrid.org/video/iluminacion.mp4",
        "Sonido": "https://url-ejemplo.educa.madrid.org/video/sonidoPA.mp4",
        "Vídeo": "https://url-ejemplo.educa.madrid.org/video/video.mp4",
        "Domótica": "https://url-ejemplo.educa.madrid.org/video/domotica.mp4",
        "Redes": "https://url-ejemplo.educa.madrid.org/video/Redes.mp4",
        "IoT": "https://url-ejemplo.educa.madrid.org/video/IoT.mp4",
        "Telefonía": "https://url-ejemplo.educa.madrid.org/video/telefonia.mp4",
        "ICT": "https://url-ejemplo.educa.madrid.org/video/ict.mp4",
        "Gestión de Proyectos": "https://url-ejemplo.educa.madrid.org/video/gestion_proyectos.mp4"
    },
    it: {
        "CCTV": "https://url-ejemplo.educa.madrid.org/video/cctv.mp4",
        "IEB": "https://url-ejemplo.educa.madrid.org/video/IEB.mp4",
        "Sonido": "https://url-ejemplo.educa.madrid.org/video/sonido_it.mp4",
        "ICT": "https://url-ejemplo.educa.madrid.org/video/ict_it.mp4",
        "Redes y telefonía": "https://url-ejemplo.educa.madrid.org/video/redes_telefonia.mp4",
        "Electrónica Aplicada": "https://url-ejemplo.educa.madrid.org/video/electronica.mp4"
    }
};

// Datos de estructura para los títulos y botones
const data = {
    sti: {
        title: "Sistemas de Telecomunicaciones e Informáticos",
        modules: ["Iluminación", "Sonido", "Vídeo", "Domótica", "Redes", "IoT", "Telefonía", "ICT", "Gestión de Proyectos"]
    },
    it: {
        title: "Instalaciones de Telecomunicaciones",
        modules: ["CCTV", "IEB", "Sonido", "ICT", "Redes y telefonía", "Electrónica Aplicada"]
    }
};

let currentType = '';

function showView(type) {
    currentType = type;
    const homeView = document.getElementById('homeView');
    const detailView = document.getElementById('detailView');
    const sidebar = document.getElementById('sidebar');
    const title = document.getElementById('detailTitle');
    const videoContainer = document.getElementById('videoContainer');

    // Limpiar estado anterior
    sidebar.innerHTML = '';
    videoContainer.innerHTML = `
        <p class="placeholder-text">
            <span class="text-desktop">Selecciona un módulo de la izquierda para ver el video</span>
            <span class="text-mobile">Selecciona un módulo de arriba para ver el video</span>
        </p>`;

    title.innerText = data[type].title;

    // Generar botones dinámicamente
    data[type].modules.forEach(mod => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn';
        btn.innerText = mod;
        btn.onclick = () => loadVideo(mod, btn);
        sidebar.appendChild(btn);
    });

    homeView.style.display = 'none';
    detailView.style.display = 'grid';
}

function loadVideo(name, element) {
    const container = document.getElementById('videoContainer');

    // Gestión visual de botones activos
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    element.classList.add('active');

    // Obtener la URL del mapa (ahora es una URL completa de EducaMadrid)
    const fullVideoUrl = videoMap[currentType][name];

    // Inyectar el reproductor (max-height para asegurar que quepa en el contenedor)
    container.innerHTML = `
        <video controls autoplay style="width: 100%; max-height: 100%; border-radius: 8px;">
            <source src="${fullVideoUrl}" type="video/mp4">
            Tu navegador no soporta videos. (Archivo: ${name})
        </video>
    `;
}

function goHome() {
    document.getElementById('homeView').style.display = 'grid';
    document.getElementById('detailView').style.display = 'none';
}