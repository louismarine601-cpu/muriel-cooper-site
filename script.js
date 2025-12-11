// ========== PAGE D'ACCUEIL - HERO TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const heroSide = document.querySelector('.hero-side');
    const heroSquare = document.querySelector('.hero-square');
    const arrow = document.querySelector('#arrow');
    
    // Animation d'arrivée du carré
    const animatedSquare = document.querySelector('.hero-square.animated');
    if (animatedSquare) {
        animatedSquare.classList.add('visible');
    }
    
    // Toggle expansion du carré
    if (toggleBtn && heroSide) {
        let expanded = false; // rétracté par défaut
        
        toggleBtn.addEventListener('click', function() {
            expanded = !expanded;
            
            if (expanded) {
                heroSide.classList.add('expanded');
                if (heroSquare) heroSquare.classList.add('expanded');
                if (arrow) arrow.innerHTML = '&#x25C0;'; // triangle gauche pour réduire
            } else {
                heroSide.classList.remove('expanded');
                if (heroSquare) heroSquare.classList.remove('expanded');
                if (arrow) arrow.innerHTML = '&#x25B6;'; // triangle droite pour agrandir
            }
        });
    }

    // ========== GALERIE LIGHTBOX ==========
    const galleryItems = document.querySelectorAll('.galerie-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = [];

    // Collect all images and their data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const longDesc = item.querySelector('.long-desc');
        if (img && longDesc) {
            images.push({
                src: img.src,
                alt: img.alt,
                description: longDesc.textContent
            });
        }
    });

    function openLightbox(index) {
        if (images.length === 0) return;
        
        currentImageIndex = index;
        const image = images[currentImageIndex];
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxDescription.textContent = image.description;
        lightboxDescription.innerHTML = image.description;
        
        lightboxModal.style.display = 'flex';
        lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.style.display = 'none';
        lightboxModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    function showPrevious() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const image = images[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxDescription.innerHTML = image.description;
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const image = images[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxDescription.innerHTML = image.description;
    }

    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        item.style.cursor = 'pointer';
    });

    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevious();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
    }

    // Close lightbox on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightboxModal.style.display === 'flex') {
                closeLightbox();
            }
        }
        // Navigate with arrow keys
        if (lightboxModal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') showPrevious();
            if (e.key === 'ArrowRight') showNext();
        }
    });

    // Close lightbox on clicking outside the image
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
});

