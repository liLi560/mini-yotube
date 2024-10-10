// Simulando upload e armazenamento local de vídeos
const videoInput = document.getElementById('video-input');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const uploadBtn = document.getElementById('upload-btn');

// Função para armazenar os vídeos no localStorage
uploadBtn?.addEventListener('click', () => {
    const file = videoInput.files[0];
    const title = videoTitle.value;
    const description = videoDescription.value;

    if (file && title) {
        const videoURL = URL.createObjectURL(file);

        // Armazena os dados no localStorage
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push({
            url: videoURL,
            title: title,
            description: description
        });

        localStorage.setItem('videos', JSON.stringify(videos));
        alert('Vídeo publicado com sucesso!');
        window.location.href = 'index.html';
    } else {
        alert('Por favor, selecione um vídeo e preencha o título.');
    }
});

// Função para carregar vídeos na página inicial
if (window.location.pathname.includes('index.html')) {
    const videosContainer = document.getElementById('videos-container');
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    if (videos.length > 0) {
        videos.forEach((video, index) => {
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <video src="${video.url}" controls></video>
                <h3>${video.title}</h3>
                <button onclick="viewVideo(${index})">Assistir</button>
            `;
            videosContainer.appendChild(videoElement);
        });
    } else {
        videosContainer.innerHTML = '<p>Nenhum vídeo foi publicado ainda.</p>';
    }
}

// Função para exibir um vídeo específico
function viewVideo(index) {
    const videos = JSON.parse(localStorage.getItem('videos'));
    localStorage.setItem('currentVideo', JSON.stringify(videos[index]));
    window.location.href = 'video.html';
}

// Função para carregar o vídeo selecionado na página de vídeo
if (window.location.pathname.includes('video.html')) {
    const videoPlayer = document.getElementById('video-player');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    
    const currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    
    if (currentVideo) {
        videoPlayer.src = currentVideo.url;
        videoTitle.textContent = currentVideo.title;
        videoDescription.textContent = currentVideo.description;
    }
}


