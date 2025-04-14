const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const genreFilter = document.getElementById('genreFilter');
const toggleMode = document.getElementById('toggleMode');
const body = document.body;

// Data anime
const data = [
  {
    type: "photo",
    title: "koneko",
    genre: "ecchi",
    src: "koneko.jpg"
  },
  {
    type: "photo",
    title: "koneko",
    genre: "ecchi",
    src: "koneko(2).jpg"
  },
  {
    type: "photo",
    title: "High School DxD",
    genre: "ecchi",
    src: "highschooldxd.jpg"
  },
  {
  type: "photo",
  title: "Furina",
  genre: "ecchi",
  src: "furina.jpg"
  },
  {
    type: "photo",
    title: "Hentai",
    genre: "hentai",
    src: "hentai.jpg"
  },
  {
    type: "photo",
    title: "higehiro",
    genre: "ecchi",
    src: "higehiro.jpg"
  },
  {
    type: "photo",
    title: "aqua",
    genre: "ecchi",
    src: "aqua.jpg"
  },
  {
    type: "photo",
    title: "aqua",
    genre: "ecchi",
    src: "aqua-konosuba.jpg"
  },
  {
    type: "photo",
    title: "darknees",
    genre: "ecchi",
    src: "darknees.jpg"
  },
  {
    type: "photo",
    title: "esdeath",
    genre: "ecchi",
    src: "esdeath.jpg"
  },
  {
    type: "photo",
    title: "Blue Archive",
    genre: "ecchi",
    src: "bluearchive.jpg"
  },
  {
    type: "photo",
    title: "Alya",
    genre: "ecchi",
    src: "alya.jpg"
  },
  {
    type: "photo",
    title: "Rika",
    genre: "ecchi",
    src: "rika.jpg"
  }
];

// Render konten
function renderGallery() {
  gallery.innerHTML = "";
  const query = searchInput.value.toLowerCase();
  const genre = genreFilter.value;

  data.forEach(item => {
    const matchTitle = item.title.toLowerCase().includes(query);
    const matchGenre = genre === "" || genre === item.genre;

    if (matchTitle && matchGenre) {
      const div = document.createElement('div');
      div.className = `item ${item.type}`;
      div.dataset.title = item.title;
      div.dataset.genre = item.genre;

      if (item.type === "photo") {
        div.innerHTML = `
          <img src="${item.src}" alt="${item.title}" />
          <div class="info">
            <button class="like">♥</button>
            <button class="bookmark">🔖</button>
            <a href="${item.src}" download="${item.title}.jpg">
              <button class="download"> <img src="image/download.png" style="width: 20px; height: 20px;" /> </button>
            </a>
          </div>
        `;
      } else {
        div.innerHTML = `
          <video muted>
            <source src="${item.src}" type="video/mp4">
            Browser tidak mendukung video.
          </video>
          <div class="info">
            <button class="like">♥</button>
            <button class="bookmark">🔖</button>
          </div>
        `;
      }

      gallery.appendChild(div);
    }
  });

  activateLightbox();
  activateButtons();
}

searchInput.addEventListener('input', renderGallery);
genreFilter.addEventListener('change', renderGallery);
toggleMode.addEventListener('click', () => {
  body.classList.toggle('light-mode');
});

function activateLightbox() {
  // Gambar
  const imgs = document.querySelectorAll('.photo img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('closeLightbox');

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  // Video
  const videos = document.querySelectorAll('.video video');
  const videoLightbox = document.getElementById('videoLightbox');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const closeVideoBtn = document.getElementById('closeVideoLightbox');

  videos.forEach(video => {
    video.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      lightboxVideo.src = video.querySelector('source').src;
      videoLightbox.classList.remove('hidden');
      lightboxVideo.play();
    });
  });

  closeVideoBtn.addEventListener('click', () => {
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    videoLightbox.classList.add('hidden');
  });
}

function activateButtons() {
  document.querySelectorAll('.like').forEach(btn => {
    btn.onclick = () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '❤️' : '♥';
    };
  });

  document.querySelectorAll('.bookmark').forEach(btn => {
    btn.onclick = () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '✅' : '🔖';
    };
  });
}

renderGallery();
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const titleInput = document.getElementById('titleInput');
const genreInput = document.getElementById('genreInput');

uploadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const file = fileInput.files[0];
  const title = titleInput.value;
  const genre = genreInput.value;
  
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const fileURL = event.target.result;
    const type = file.type.startsWith("video") ? "video" : "photo";
    
    data.push({
      type: type,
      title: title,
      genre: genre,
      src: fileURL
    });
    
    renderGallery();
    uploadForm.reset();
  };
  
  reader.readAsDataURL(file);
});
