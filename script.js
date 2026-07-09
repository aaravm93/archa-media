// === IMPORT CSS ===
import './style.css';

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

let currentSlide = 0;
let slides = [];

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================

// Your FULL Form ID from the URL (including the e/)
const FORM_ID = 'e/1FAIpQLSc4GURxyw2VNxYm9u0VaGH7UbL-nrGJjYBpvr0ozxnQGWtI-Q';

// Your Entry IDs from the URL
const ENTRY_NAME = 'entry.1735684699';
const ENTRY_EMAIL = 'entry.1456880337';
const ENTRY_MESSAGE = 'entry.345317678';

// ============================================
// DOM CONTENT LOADED - INITIALIZE EVERYTHING
// ============================================

window.addEventListener("DOMContentLoaded", () => {
    // ---------- CAROUSEL INIT ----------
    slides = Array.from(document.querySelectorAll(".carousel-item"));
    const lightbox = document.getElementById("carouselLightbox");
    const pageHeader = document.querySelector('.photo-edit-header');

    let lightboxImage = null;
    let lightboxCaption = null;
    let closeButton = null;
    let prevButton = null;
    let nextButton = null;

    if (lightbox) {
        lightboxImage = lightbox.querySelector(".lightbox-image");
        lightboxCaption = lightbox.querySelector(".lightbox-caption");
        closeButton = lightbox.querySelector(".lightbox-close");
        prevButton = lightbox.querySelector(".lightbox-prev");
        nextButton = lightbox.querySelector(".lightbox-next");
    }

    function updateLightboxImage(index) {
        const img = slides[index];
        if (!img || !lightboxImage || !lightboxCaption) return;

        currentSlide = index;
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = img.alt || "Full screen view of the selected project image.";
    }

    function openLightbox(index) {
        if (!lightbox || !lightboxImage || !lightboxCaption) return;

        updateLightboxImage(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add('lightbox-open');
        if (pageHeader) {
            pageHeader.classList.add('hidden-during-lightbox');
        }
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove('lightbox-open');
        if (lightboxImage) {
            lightboxImage.src = "";
        }
        if (pageHeader) {
            pageHeader.classList.remove('hidden-during-lightbox');
        }
    }

    slides.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }
    if (prevButton) {
        prevButton.addEventListener("click", (event) => {
            event.stopPropagation();
            openLightbox((currentSlide - 1 + slides.length) % slides.length);
        });
    }
    if (nextButton) {
        nextButton.addEventListener("click", (event) => {
            event.stopPropagation();
            openLightbox((currentSlide + 1) % slides.length);
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        window.addEventListener("keydown", (event) => {
            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") {
                closeLightbox();
            }
            if (event.key === "ArrowLeft") {
                openLightbox((currentSlide - 1 + slides.length) % slides.length);
            }
            if (event.key === "ArrowRight") {
                openLightbox((currentSlide + 1) % slides.length);
            }
        });
    }

    showSlide(currentSlide);

    if (pageHeader) {
        const updateHeaderState = () => {
            pageHeader.classList.toggle('scrolled', window.scrollY > 24);
        };

        window.addEventListener('scroll', updateHeaderState, { passive: true });
        updateHeaderState();
    }

    // ---------- CONTACT FORM INIT ----------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const statusDiv = document.getElementById('form-status');

        // Remove designation field if it exists
        const designationField = document.getElementById('designation');
        if (designationField) {
            designationField.closest('.form-group')?.remove();
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            statusDiv.textContent = 'Sending...';
            statusDiv.style.color = '#666';

            // Get form data
            const name = document.getElementById('name').value.trim() || 'Anonymous';
            const email = document.getElementById('email').value.trim() || 'no-email@example.com';
            const message = document.getElementById('message').value.trim();

            if (!message) {
                statusDiv.textContent = 'Please write a message.';
                statusDiv.style.color = 'red';
                return;
            }

            // Build the form data
            const formData = new URLSearchParams();
            formData.append(ENTRY_NAME, name);
            formData.append(ENTRY_EMAIL, email);
            formData.append(ENTRY_MESSAGE, message);

            try {
                // Send to Google Forms
                await fetch(
                    `https://docs.google.com/forms/d/${FORM_ID}/formResponse`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData.toString(),
                        mode: 'no-cors'
                    }
                );

                statusDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                statusDiv.style.color = 'white';
                contactForm.reset();

            } catch (error) {
                statusDiv.textContent = 'Failed to send message. Please try again.';
                statusDiv.style.color = 'white';
                console.error('Error:', error);
            }
        });
    }
});