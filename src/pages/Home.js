import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import './Home.css';
import slide1 from '../assets/images/1.jpg';
import slide2 from '../assets/images/2.jpg';
import slide3 from '../assets/images/3.jpg';
import slide4 from '../assets/images/4.jpg';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Add state for animated statistics
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    productGrades: 0,
    tons: 0,
    customers: 0,
    countries: 0
  });
  
  const statsRef = useRef(null);
  const animationTriggered = useRef(false);

  // Function to animate counting up
  const animateValue = (start, end, duration, onUpdate) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      onUpdate(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Check if element is in viewport
  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Handle scroll and animation
  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current && isInViewport(statsRef.current) && !animationTriggered.current) {
        animationTriggered.current = true;
        
        // Animate years
        animateValue(0, 60, 2000, (value) => {
          setAnimatedStats(prev => ({ ...prev, years: value }));
        });
        
        // Animate product grades
        animateValue(0, 3000, 2000, (value) => {
          setAnimatedStats(prev => ({ ...prev, productGrades: value }));
        });
        
        // Animate tons
        animateValue(0, 40000, 2000, (value) => {
          setAnimatedStats(prev => ({ ...prev, tons: value }));
        });
        
        // Animate customers
        animateValue(0, 6500, 2000, (value) => {
          setAnimatedStats(prev => ({ ...prev, customers: value }));
        });
        
        // Animate countries
        animateValue(0, 70, 2000, (value) => {
          setAnimatedStats(prev => ({ ...prev, countries: value }));
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the element is already in viewport on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <Helmet>
        <meta name="description" content="Zenith Rubber - Your trusted partner in industrial rubber manufacturing with over 50 years of industry experience." />
        <meta name="keywords" content="rubber manufacturing, industrial rubber, rubber products, rubber sheets, rubber flooring" />
        <link rel="canonical" href="https://zenithindustries.ca" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="slideshow">
          <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
            <img src={slide1} alt="Slide 1" />
            <div className="slide-caption">
              <h2 className="slide-caption-title">High Quality Rubber Sheets</h2>
              <p className="slide-caption-text">for wide range of industrial applications</p>
            </div>
          </div>
          <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
            <img src={slide2} alt="Slide 2" />
            <div className="slide-caption">
              <h2 className="slide-caption-title">Inflatable Products</h2>
              <p className="slide-caption-text">Air Cell, Gas Holder Balloon, Inflatable Work Boats and Life Rants</p>
            </div>
          </div>
          <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
            <img src={slide3} alt="Slide 3" />
            <div className="slide-caption">
              <h2 className="slide-caption-title">Abrasion Resistant Rubber Sheets</h2>
              <p className="slide-caption-text">for the Mining and Cement Industry</p>
            </div>
          </div>
          <div className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
            <img src={slide4} alt="Slide 4" />
            <div className="slide-caption">
              <h2 className="slide-caption-title">Zenith Industries</h2>
              <p className="slide-caption-text">Offering Quality and Durable Rubber Solutions</p>
            </div>
          </div>
          
          <button className="slide-arrow prev-arrow" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="slide-arrow next-arrow" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="company-intro">
        <div className="container">
          <div className="section-header">
            <h2>At the forefront of manufacturing Industrial Rubber Products since 1965</h2>
          </div>
          <div className="company-intro-flex">
            <div className="company-intro-video">
              <a
                href="https://www.youtube.com/watch?v=37YSjoyydD0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Zenith Rubber on YouTube"
              >
                <img
                  src="https://img.youtube.com/vi/37YSjoyydD0/hqdefault.jpg"
                  alt="Zenith Rubber YouTube Video"
                  className="youtube-thumbnail"
                />
                <span className="youtube-play-btn" />
              </a>
            </div>
            <div className="text-column">
              <p>Zenith Industrial Rubber Products Private Limited, has been a leading manufacturer and exporter of high-quality industrial rubber sheeting products since its establishment in 1965. Over the years, Zenith has achieved remarkable success in the global market and has become recognized as a trusted supplier.</p>
              <p>With a strong focus on delivering excellence, Zenith offers a diverse range of products including wear-resistant rubber sheets, antiskid flooring, waterproofing membranes, coated fabrics, rubber inflatables, rubber moulded and extruded profiles. These offerings showcase the company's expertise and commitment to providing solutions that meet the varied needs of customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="industry-solutions parallax-section">
        <div className="container">
          <h2 style={{ color: 'white' }}>Quality Rubber Solutions for every Industry</h2>
          <p style={{ color: 'white' }}>Zenith is a leading global brand offering a wide range of high quality industrial rubber products for every application;
          we specialize in developing customized rubber products as per the specific needs of our clients for their specific end use.</p>
          <div className="solutions-grid">
            {[
              { icon: 'fas fa-oil-can fa-2x', text: 'Oil & Gas' },
              { icon: 'fas fa-industry fa-2x', text: 'Manufacturing' },
              { icon: 'fas fa-hard-hat fa-2x', text: 'Mining' },
              { icon: 'fas fa-cogs fa-2x', text: 'Engineering' },
              { icon: 'fas fa-building fa-2x', text: 'Cement' },
              { icon: 'fas fa-truck fa-2x', text: 'Transportation' },
              { icon: 'fas fa-anchor fa-2x', text: 'Defense and Marine' },
              { icon: 'fas fa-train fa-2x', text: 'Railways & Airports' },
              { icon: 'fas fa-car fa-2x', text: 'Automotive' },
              { icon: 'fas fa-tools fa-2x', text: 'Construction' },
            ].map((solution, index) => (
              <div key={index} className="solution-item">
                <i className={solution.icon}></i>
                <span>{solution.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="product-categories">
        <h2>The most comprehensive range of Rubber Products</h2>
        <div className="categories-container">
          <div className="main-image">
            <img src={require('../assets/images/products-img1.jpg')} alt="Default Category" id="category-image" />
          </div>
          <div className="categories-grid">
            {[
              { name: 'Industrial Rubber Sheet', image: require('../assets/images/products-img1.jpg') },
              { name: 'Wear Resistant Rubber Sheet', image: require('../assets/images/products-img2.jpg') },
              { name: 'Rubber Flooring', image: require('../assets/images/products-img3.jpg') },
              { name: 'Transit Rubber Flooring', image: require('../assets/images/products-img4.jpg') },
              { name: 'Anti-Skid Flooring', image: require('../assets/images/products-img5.jpg') },
              { name: 'Coated Fabric', image: require('../assets/images/products-img6.jpg') },
              { name: 'Inflatables', image: require('../assets/images/products-img7.jpg') },
              { name: 'Water Proofing Membrane', image: require('../assets/images/products-img8.jpg') },
              { name: 'Rubber Moulded & Extrusion', image: require('../assets/images/products-img9.jpg') },
            ].map((category, index) => (
              <div
                key={index}
                className="category-block"
                onMouseEnter={() => {
                  document.getElementById('category-image').src = category.image;
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Certifications */}
      <section className="certifications">
        <h2>Product Certifications</h2>
        <p>Our products conform to the highest International Quality Standards. We follow manufacturing practices which are environment-friendly and promote green living.</p>
        <div className="certifications-grid">
          {/* Keep existing images */}
          <img src={require('../assets/images/c1.webp')} alt="Certification 1" />
          <img src={require('../assets/images/c2.webp')} alt="Certification 2" />
          <img src={require('../assets/images/c3.webp')} alt="Certification 3" />
          <img src={require('../assets/images/c4.webp')} alt="Certification 4" />
          <img src={require('../assets/images/c5.webp')} alt="Certification 5" />
          <img src={require('../assets/images/c6.webp')} alt="Certification 6" />
          <img src={require('../assets/images/fras.webp')} alt="FRAS Certification" />
        </div>
      </section>

      {/* Statistics Section */}
      <div ref={statsRef} className="statistics-section">
        <div className="statistic-item">
          <span className="statistic-prefix">Over</span>
          <div className="statistic-value">{animatedStats.years}</div>
          <div className="statistic-label">Years in countries</div>
        </div>
        <div className="statistic-item">
          <span className="statistic-prefix">More than</span>
          <div className="statistic-value">{animatedStats.productGrades}</div>
          <div className="statistic-label">Product Grades</div>
        </div>
        <div className="statistic-item">
          <span className="statistic-prefix">Production Capacity</span>
          <div className="statistic-value">{animatedStats.tons}</div>
          <div className="statistic-label">Tons</div>
        </div>
        <div className="statistic-item">
          <span className="statistic-prefix">Servicing over</span>
          <div className="statistic-value">{animatedStats.customers}</div>
          <div className="statistic-label">Customers</div>
        </div>
        <div className="statistic-item">
          <span className="statistic-prefix">Exports to</span>
          <div className="statistic-value">{animatedStats.countries}</div>
          <div className="statistic-label">Countries</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
