  // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  });

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Navigation Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Animate hamburger icon
      this.classList.toggle('active');
      const bars = this.querySelectorAll('.bar');
      if (this.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars.forEach(bar => bar.style = '');
      }
    });
  }

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
      const bars = navToggle.querySelectorAll('.bar');
      bars.forEach(bar => bar.style = '');
    });
  });

  // Sticky Header on Scroll
  const navbar = document.querySelector('#navbar');
  const heroSection = document.querySelector('.hero');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
      } else {
        document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', scrollActive);

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const prevSlide = document.querySelector('.prev-slide');
  const nextSlide = document.querySelector('.next-slide');
  const sliderIndicators = document.querySelector('.slide-indicators');
  let currentSlide = 0;
  
  // Create indicators
  if (slides.length > 0 && sliderIndicators) {
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.dataset.slide = index;
      sliderIndicators.appendChild(indicator);
      
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }

  function goToSlide(slideIndex) {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      document.querySelector(`.indicator[data-slide="${index}"]`).classList.remove('active');
    });
    
    slides[slideIndex].classList.add('active');
    document.querySelector(`.indicator[data-slide="${slideIndex}"]`).classList.add('active');
    currentSlide = slideIndex;
  }

  function nextSlideHandler() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function prevSlideHandler() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }

  if (prevSlide) prevSlide.addEventListener('click', prevSlideHandler);
  if (nextSlide) nextSlide.addEventListener('click', nextSlideHandler);

  // Auto slide for hero slider
  let slideInterval = setInterval(nextSlideHandler, 5000);
  
  // Pause slider on hover
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlideHandler, 5000);
    });
  }

  // Gallery filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide gallery items based on filter
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          
          // Add animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          // Hide after animation
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Business category filter
  const categoryButtons = document.querySelectorAll('.category-btn');
  const businessCards = document.querySelectorAll('.business-card');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active category button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const categoryValue = this.getAttribute('data-category');
      
      // Show/hide business cards based on category
      businessCards.forEach(card => {
        if (categoryValue === 'all' || card.getAttribute('data-category') === categoryValue) {
          card.style.display = 'block';
          
          // Add animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          // Hide after animation
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Notable People Slider
  const peopleSlider = document.querySelector('.people-slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const personCards = document.querySelectorAll('.person-card');
  
  if (peopleSlider && prevBtn && nextBtn) {
    const cardWidth = personCards[0].offsetWidth + 30; // Card width + margin
    let scrollAmount = 0;
    
    // Calculate visible cards based on viewport
    const getVisibleCards = () => {
      const sliderWidth = peopleSlider.offsetWidth;
      return Math.floor(sliderWidth / cardWidth);
    };
    
    nextBtn.addEventListener('click', () => {
      scrollAmount += cardWidth * getVisibleCards();
      if (scrollAmount > peopleSlider.scrollWidth - peopleSlider.offsetWidth) {
        scrollAmount = peopleSlider.scrollWidth - peopleSlider.offsetWidth;
      }
      peopleSlider.scroll({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    prevBtn.addEventListener('click', () => {
      scrollAmount -= cardWidth * getVisibleCards();
      if (scrollAmount < 0) {
        scrollAmount = 0;
      }
      peopleSlider.scroll({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }

  // Video thumbnail click handler
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
  
  videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // In a real implementation, you would open a modal and play the video
      // For this example, we'll just show an alert
      alert('Video player would open here in a real implementation.');
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // In a real implementation, you would send this data to a server
      // For this example, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });
reveals.forEach(el => observer.observe(el));
// Toggle active state for filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Example: Filter cards (implement based on your filtering logic)
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.textContent.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';
    });
  });
});

