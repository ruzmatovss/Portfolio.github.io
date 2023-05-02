// get the carousel elements
const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelector('.carousel-images');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const dotsContainer = document.querySelector('.carousel-dots');

// load the JSON file
fetch('./js/carousel.json')
  .then(response => response.json())
  .then(data => {
    // create the carousel images
    data.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      const caption = document.createElement('div');
      caption.classList.add('caption');
      caption.textContent = item.caption;
      slide.appendChild(img);
      slide.appendChild(caption);
      carouselImages.appendChild(slide);

      // create the dots
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
      dotsContainer.appendChild(dot);
    });

    // set up the carousel
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].clientWidth;
    let currentSlide = 0;
    let autoSlide;

    function showSlide(slideIndex) {
      // move the images container to show the correct slide
      carouselImages.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

      // update the active dot
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === slideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      showSlide(currentSlide);
    }

    function startAutoSlide() {
      autoSlide = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    showSlide(currentSlide);
    startAutoSlide();

    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    carousel.addEventListener('mouseenter', () => {
      stopAutoSlide();
    });

    carousel.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  });
