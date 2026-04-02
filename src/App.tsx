import { useState, useEffect, useRef, ReactNode, FormEvent, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Star, Users, Calendar, MapPin, ChevronRight, 
  Instagram, Facebook, Linkedin, Phone, MessageCircle, 
  ArrowRight, Heart, Briefcase, Palette, Music, Search,
  Maximize2, Globe, CheckCircle2, Award, Clock, ArrowLeft
} from 'lucide-react';

// --- Shared Components ---

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}>
            GOLDEN APPLE
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold ${isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'}`}
              >
                {link.name}
              </Link>
            )
          ))}
          <Link to="/#contact" onClick={() => handleNavClick('/#contact')} className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-gold transition-colors">
            Plan Your Event
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'} />
          ) : (
            <Menu className={isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-lg font-serif text-black border-b border-gray-100 pb-2"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif text-black border-b border-gray-100 pb-2"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/#contact" onClick={() => handleNavClick('/#contact')} className="bg-black text-white py-4 uppercase tracking-widest text-center">
              Plan Your Event
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://i.ibb.co/5gQZkRfG/image.png",
    "https://i.ibb.co/9mMhJbKC/image.png",
    "https://i.ibb.co/WWbJ3Whf/image.png",
    "https://i.ibb.co/KjFb329R/image.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Cinematic Image Slider Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-gold text-xs uppercase tracking-[0.6em] mb-8 block font-semibold">
            Exclusively Curated Since 2010
          </span>
          <h1 className="text-5xl md:text-8xl text-white font-serif mb-8 leading-[1.1] tracking-tight">
            Bespoke Celebrations <br /> 
            <span className="italic text-gold-light">For the Extraordinary</span>
          </h1>
          <p className="text-white/70 text-lg md:text-2xl mb-12 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            Limited bookings per season. Tailored for clients who expect nothing less than excellence in Dehradun, Jaipur & Beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a href="#contact" className="group relative bg-white text-black px-12 py-5 uppercase tracking-widest text-xs font-bold overflow-hidden transition-all duration-500 hover:text-white w-full sm:w-auto text-center">
              <span className="relative z-10">Check Availability</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a href="#services" className="group border border-white/30 text-white px-12 py-5 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all duration-500 w-full sm:w-auto text-center">
              View Signature Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 rotate-90 origin-left translate-x-2">Scroll</span>
        <div className="w-[1px] h-12 bg-linear-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        setHasAnimated(true);
      }
    }, { threshold: 0.5 });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const TrustBar = () => {
  const stats = [
    { label: 'Elite Weddings', value: 80, suffix: '+', icon: Heart },
    { label: 'Luxury Events', value: 100, suffix: '+', icon: Calendar },
    { label: 'Years of Mastery', value: 14, suffix: '+', icon: Award },
    { label: 'Client Rating', value: 4.8, suffix: '⭐', icon: Star },
  ];

  return (
    <div className="bg-black border-y border-white/5 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-6xl font-serif mb-4 text-gold group-hover:scale-110 transition-transform duration-500">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SignatureExperience = () => {
  return (
    <section className="py-32 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">The Philosophy</span>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">Our Signature <br /> Experience</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-8 group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <span className="font-serif text-xl">01</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-3">Bespoke Design</h3>
                  <p className="text-gray-400 leading-relaxed">We don’t follow trends — we create timeless experiences tailored to your unique narrative.</p>
                </div>
              </div>
              
              <div className="flex gap-8 group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <span className="font-serif text-xl">02</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-3">Attention to Detail</h3>
                  <p className="text-gray-400 leading-relaxed">From the scent in the air to the texture of the linens, every element is curated with absolute precision.</p>
                </div>
              </div>
              
              <div className="flex gap-8 group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <span className="font-serif text-xl">03</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-3">Execution Excellence</h3>
                  <p className="text-gray-400 leading-relaxed">Our on-ground production team ensures a flawless transition from concept to reality.</p>
                </div>
              </div>
            </div>

            <p className="text-2xl font-serif italic text-gold-light border-l-2 border-gold pl-8 py-4">
              "We don't just plan events; we orchestrate legacies."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://i.ibb.co/fGrkXYJq/image.png" 
                alt="Signature Decor" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 border border-gold/20 -z-10 hidden md:block" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-gold/5 -z-10 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">The Transformation</span>
          <h2 className="text-4xl md:text-6xl font-serif">From Vision to Reality</h2>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video overflow-hidden cursor-ew-resize select-none group"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* After Image */}
          <img 
            src="https://i.ibb.co/nsdMkkpm/image.png" 
            alt="After" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img 
              src="https://i.ibb.co/ns9Z10nW/image.png" 
              alt="Before" 
              className="absolute inset-0 w-[100vw] h-full object-cover grayscale brightness-50"
              style={{ width: containerRef.current?.clientWidth }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-4 py-2">
              Before Setup
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute inset-y-0 w-[2px] bg-gold z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-gold/30 rounded-full" />
                <div className="w-1 h-4 bg-gold rounded-full" />
                <div className="w-1 h-4 bg-gold/30 rounded-full" />
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-8 bg-gold text-black text-[10px] uppercase tracking-widest px-4 py-2 z-10">
            Final Experience
          </div>
        </div>
      </div>
    </section>
  );
};

const FounderSection = () => {
  return (
    <section className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img 
                src="https://i.ibb.co/hxgF22Zn/Untitled-design-1.png" 
                alt="Founder" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-black text-white p-12 hidden md:block">
              <p className="text-3xl font-serif italic mb-4">"Events are temporary, but the emotions we create are eternal."</p>
              <span className="text-gold text-xs uppercase tracking-widest font-bold">— The Founder's Vision</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-10"
          >
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">The Visionary</span>
              <h2 className="text-5xl md:text-6xl font-serif">Crafting Legacies Since 2010</h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded on the principle that every celebration should be a masterpiece, Golden Apple Entertainment has redefined luxury event planning in India.
              </p>
              <p>
                Our journey began with a simple passion for storytelling through design. Today, we stand as a beacon of excellence, serving a global clientele who expect nothing less than perfection.
              </p>
              <p>
                We don't just manage vendors; we curate talent. We don't just book venues; we transform them. Our commitment is to exclusivity, ensuring that every event we touch is as unique as the individuals we serve.
              </p>
            </div>
            <div className="pt-8 flex items-center gap-8">
              <div>
                <div className="text-3xl font-serif text-black">14+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400">Years Mastery</div>
              </div>
              <div className="w-[1px] h-12 bg-gray-200" />
              <div>
                <div className="text-3xl font-serif text-black">100+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400">Elite Events</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VideoTestimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const testimonials = [
    {
      name: "Rishabh & Sneha",
      event: "Luxury Wedding, Dehradun",
      video: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-park-44553-large.mp4",
      text: "Golden Apple turned our dream into a reality. The attention to detail was beyond anything we could have imagined."
    },
    {
      name: "Corporate Gala",
      event: "Annual Awards, Jaipur",
      video: "https://assets.mixkit.co/videos/preview/mixkit-people-clapping-at-a-conference-44550-large.mp4",
      text: "A flawless execution that perfectly represented our brand. The production quality was world-class."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Client Stories</span>
          <h2 className="text-4xl md:text-6xl font-serif">Voices of Excellence</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video bg-black overflow-hidden group">
            <video 
              key={activeIdx}
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover opacity-80"
            >
              <source src={testimonials[activeIdx].video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="text-xl font-serif mb-2">{testimonials[activeIdx].name}</div>
              <div className="text-[10px] uppercase tracking-widest text-gold">{testimonials[activeIdx].event}</div>
            </div>
          </div>

          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <Star className="w-12 h-12 text-gold fill-gold" />
                <p className="text-3xl font-serif italic leading-relaxed text-gray-800">
                  "{testimonials[activeIdx].text}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-16 h-1 bg-gray-200 transition-all duration-500 ${idx === activeIdx ? 'bg-gold w-24' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden group">
              <img 
                src="https://i.ibb.co/hxgF22Zn/Untitled-design-1.png" 
                alt="Our Team"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/5 -z-10 hidden md:block" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Our Legacy</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Tailored For Those Who <br /> Expect Excellence</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                At Golden Apple Entertainment, we don’t just plan events — we produce legacies. Since 2010, we have been the preferred choice for high-net-worth individuals who demand absolute precision and creative brilliance.
              </p>
              <p>
                We operate on an exclusive basis, taking on a limited number of bookings each season to ensure that every client receives our undivided attention and the highest standard of execution.
              </p>
              <p>
                Our approach is bespoke. We don't use templates; we use your story as the blueprint for an experience that is uniquely yours.
              </p>
            </div>
            <button className="mt-12 group flex items-center gap-4 text-sm uppercase tracking-widest font-bold border-b-2 border-black pb-2 hover:text-gold hover:border-gold transition-all">
              Discover Our Signature Process
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Luxury Wedding Planning',
      desc: 'Tailored weddings designed around your vision, style, and story.',
      icon: Heart,
      link: '/luxury-wedding-planning'
    },
    {
      title: 'Destination Weddings',
      desc: 'Seamless planning across stunning locations — stress-free and flawless.',
      icon: MapPin,
      link: '/destination-weddings'
    },
    {
      title: 'Corporate Events',
      desc: 'Professional, impactful events that elevate your brand presence.',
      icon: Briefcase,
      link: '/corporate-events'
    },
    {
      title: 'Theme Decor & Production',
      desc: 'Visually stunning setups that transform spaces into experiences.',
      icon: Palette,
      link: '/theme-decor-production'
    },
    {
      title: 'Artist Management',
      desc: 'From live performers to celebrity appearances — we handle it all.',
      icon: Music,
      link: '/artist-management'
    }
  ];

  return (
    <section id="services" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Bespoke Event Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Elevating every moment with precision and artistry.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 border border-white/10 hover:border-gold/50 transition-all duration-500 hover:bg-white/5"
            >
              <service.icon className="w-10 h-10 text-gold mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{service.desc}</p>
              <Link to={service.link} className="text-xs uppercase tracking-widest font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                Explore More <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://i.ibb.co/HpxWnzbM/FW-SA-1621-scaled.jpg",
    "https://i.ibb.co/hxgF22Zn/Untitled-design-1.png",
    "https://i.ibb.co/8nYzhhH2/traditional-indian-wedding-stockcake.webp",
    "https://i.ibb.co/Pz5ywnzS/7ab593d3144e1c9e47c3d07f1898f877.jpg",
    "https://i.ibb.co/zVt76Wq6/image.png",
    "https://i.ibb.co/BKS9Z51v/image.png",
    "https://i.ibb.co/ns9Z10nW/image.png",
    "https://i.ibb.co/nsdMkkpm/image.png",
    "https://i.ibb.co/b59STq29/image.png",
    "https://i.ibb.co/mCSqRm1C/image.png",
    "https://i.ibb.co/zTVGbTHr/image.png",
    "https://i.ibb.co/jKYc04f/image.png",
    "https://i.ibb.co/9kYwB6Qt/image.png",
    "https://i.ibb.co/fGrkXYJq/image.png",
    "https://i.ibb.co/67c3xbdt/image.png",
    "https://i.ibb.co/pjdKB56D/image.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Our Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif">A Glimpse Into Our Creations</h2>
          </div>
          <div className="flex gap-4">
            {['All', 'Weddings', 'Corporate', 'Decor'].map((filter) => (
              <button key={filter} className="text-xs uppercase tracking-widest font-bold px-4 py-2 border-b border-transparent hover:border-black transition-all">
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-rotating Showcase */}
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden mb-12 group">
          <AnimatePresence mode='wait'>
            <motion.img 
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setSelectedImage(images[currentIndex])}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute bottom-8 right-8 flex gap-2">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <Maximize2 className="text-white w-10 h-10" />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="relative aspect-square overflow-hidden group cursor-zoom-in"
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img} 
                alt={`Portfolio ${idx}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Luxury Wedding</span>
                <span className="text-lg font-serif">Dehradun, 2023</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-gold transition-colors">
              <X className="w-10 h-10" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Rishabh Dubey",
      role: "Groom",
      text: "The quality of the decor was absolutely top-notch. Every detail exceeded our expectations. The team was professional and handled everything seamlessly.",
      rating: 5
    },
    {
      name: "Ananya Sharma",
      role: "Corporate Client",
      text: "Flawless execution and a team that truly understands your vision. Our annual gala was a huge success thanks to Golden Apple Entertainment.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Destination Wedding",
      text: "Planning a wedding in Jaipur from abroad was stressful until we met this team. They are the best in the business. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div>
                <div className="font-serif text-lg">{review.name}</div>
                <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: 'Consultation', desc: 'Understanding your vision & expectations' },
    { title: 'Concept Design', desc: 'Creating a unique event blueprint' },
    { title: 'Planning', desc: 'Vendor coordination & logistics' },
    { title: 'Execution', desc: 'Seamless on-ground management' },
    { title: 'Celebration', desc: 'You enjoy, we handle everything' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Our Method</span>
          <h2 className="text-4xl md:text-5xl font-serif">How We Bring Your Vision to Life</h2>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2 hidden lg:block" />
          <div className="grid lg:grid-cols-5 gap-12 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                  <span className="text-xl font-serif group-hover:text-white transition-colors">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-serif mb-4">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Locations = () => {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Our Reach</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Wherever Your Dream Takes You</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              Based in Dehradun, with a strong presence in Jaipur and destination weddings across India — we bring your vision to life anywhere. Our network of premium vendors and local expertise ensures a flawless experience regardless of the location.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-gold font-serif text-2xl mb-2">Dehradun</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">Headquarters</div>
              </div>
              <div>
                <div className="text-gold font-serif text-2xl mb-2">Jaipur</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">Regional Office</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white/5 rounded-full flex items-center justify-center p-12 border border-white/10">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gold mx-auto mb-6 animate-bounce" />
                <div className="text-3xl font-serif mb-2">Serving Pan India</div>
                <p className="text-gray-500 text-sm uppercase tracking-widest">Global Standards, Local Soul</p>
              </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-gold rounded-full animate-ping" />
            <div className="absolute bottom-20 right-10 w-3 h-3 bg-gold rounded-full animate-ping delay-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Luxury Wedding',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "9798399440";
    const text = `*New Inquiry from Golden Apple Website*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Event Type:* ${formData.eventType}%0A*Budget:* ${formData.budget}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    
    // Reset form after submission
    setFormData({
      name: '',
      phone: '',
      eventType: 'Luxury Wedding',
      budget: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Limited Availability</span>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">Secure Your Date <br /> For 2026/27</h2>
              <p className="text-gray-600 text-xl mt-8 font-light leading-relaxed">
                We accept only 12 signature weddings per year to maintain our standard of excellence. Book your 30-minute consultation today.
              </p>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-gold/5 flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-500">
                  <Phone className="w-6 h-6 text-gold group-hover:text-black" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Direct Inquiry</div>
                  <div className="text-2xl font-serif">9798399440</div>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-gold/5 flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-500">
                  <MapPin className="w-6 h-6 text-gold group-hover:text-black" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Studio Location</div>
                  <div className="text-2xl font-serif">Dehradun, Uttarakhand, India</div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a href="https://wa.me/9798399440" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-4 bg-green-600 text-white px-10 py-5 uppercase tracking-widest text-xs font-bold hover:bg-green-700 transition-all overflow-hidden">
                <MessageCircle className="w-5 h-5" />
                <span className="relative z-10">Chat with a Specialist</span>
              </a>
            </div>
          </div>

          <div className="bg-black text-white p-12 md:p-20 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 -z-10" />
            <div className="mb-12">
              <h3 className="text-3xl font-serif mb-4">Inquiry Form</h3>
              <p className="text-gray-400 text-sm">Get a personalized quote in 10 minutes.</p>
            </div>
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 focus:border-gold outline-hidden transition-colors text-lg font-light" 
                    placeholder="E.g. Alexander Knight" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 focus:border-gold outline-hidden transition-colors text-lg font-light" 
                    placeholder="+91 00000 00000" 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Event Type</label>
                  <select 
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 focus:border-gold outline-hidden transition-colors text-lg font-light appearance-none"
                  >
                    <option className="bg-black">Luxury Wedding</option>
                    <option className="bg-black">Destination Wedding</option>
                    <option className="bg-black">Corporate Gala</option>
                    <option className="bg-black">Theme Production</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Budget Range</label>
                  <input 
                    type="text" 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 focus:border-gold outline-hidden transition-colors text-lg font-light" 
                    placeholder="₹50L - ₹1Cr+" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Tell Us Your Vision</label>
                <textarea 
                  rows={3} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 focus:border-gold outline-hidden transition-colors text-lg font-light resize-none" 
                  placeholder="Describe your dream event..."
                ></textarea>
              </div>

              <button type="submit" className="group w-full bg-gold text-black py-6 uppercase tracking-[0.3em] text-xs font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-4">
                Check Availability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="text-2xl font-serif font-bold tracking-tighter">GOLDEN APPLE</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Crafting luxury experiences across India since 2010. Excellence in every detail, passion in every production.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gold">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gold">Services</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Wedding Planning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Destination Weddings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Theme Decor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artist Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8 text-gold">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                9798399440
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                Dehradun, Uttarakhand, India
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-600">
          <div>© 2026 Golden Apple Entertainment. All Rights Reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-12"
          >
            <h3 className="text-2xl font-serif mb-8 text-gray-400 uppercase tracking-widest">The Challenge</h3>
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Planning a Wedding is Overwhelming</h2>
            <ul className="space-y-6">
              {[
                'Too many vendors to manage',
                'No clear vision or cohesive design',
                'Execution stress on your big day',
                'Budget overruns and hidden costs'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-600">
                  <X className="w-5 h-5 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black text-white p-12"
          >
            <h3 className="text-2xl font-serif mb-8 text-gold uppercase tracking-widest">The Solution</h3>
            <h2 className="text-3xl md:text-4xl font-serif mb-8">We Handle Everything — So You Can Enjoy</h2>
            <ul className="space-y-6">
              {[
                'Single point of contact for all vendors',
                'Bespoke design tailored to your story',
                'Flawless on-ground execution',
                'Transparent pricing and value management'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-300">
                  <Heart className="w-5 h-5 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://i.ibb.co/8nYzhhH2/traditional-indian-wedding-stockcake.webp" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Limited Availability</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Secure Your Date for a <br /> Premium Experience</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            We take on a limited number of events to ensure the highest standards of luxury and personalization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#contact" className="bg-white text-black px-12 py-5 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-white transition-all w-full sm:w-auto">
              Get Free Consultation
            </a>
            <a href="https://wa.me/9798399440" className="border border-white/30 text-white px-12 py-5 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all w-full sm:w-auto">
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative selection:bg-gold selection:text-white">
      <Navbar />
      
      {/* Back Button for Service Pages */}
      {location.pathname !== '/' && (
        <button 
          onClick={() => navigate(-1)}
          className="fixed top-24 left-8 z-40 bg-white/80 backdrop-blur-md text-black p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300 group flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-widest font-bold pr-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Back
          </span>
        </button>
      )}

      {children}
      <Footer />
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/9798399440" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-white text-black text-[10px] uppercase tracking-widest font-bold px-3 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </div>
  );
};

const HomePage = () => (
  <main>
    <Hero />
    <TrustBar />
    <About />
    <SignatureExperience />
    <BeforeAfter />
    <ProblemSolution />
    <Services />
    <Portfolio />
    <FounderSection />
    <VideoTestimonials />
    <Testimonials />
    <Process />
    <Locations />
    <FinalCTA />
    <Contact />
  </main>
);

const ServicePageHero = ({ title, sub, bg }: { title: string, sub: string, bg: string }) => (
  <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <img src={bg} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
    <div className="relative z-20 text-center px-6 max-w-4xl">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl text-white font-serif mb-6 leading-tight"
      >
        {title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/80 text-xl md:text-2xl font-light tracking-wide"
      >
        {sub}
      </motion.p>
    </div>
  </section>
);

const LuxuryWeddingPlanning = () => (
  <Layout>
    <ServicePageHero 
      title="Luxury Wedding Planning, Designed Around You" 
      sub="Personalized, seamless, and unforgettable wedding experiences."
      bg="https://i.ibb.co/HpxWnzbM/FW-SA-1621-scaled.jpg"
    />
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-4xl font-serif mb-8">Excellence in Every Detail</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We offer full-service wedding planning that covers every aspect of your big day. From the initial concept to the final farewell, our team ensures that your wedding is a reflection of your unique love story, executed with absolute precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Venue Selection', 'Vendor Management', 'Decor Design', 
                'Guest Handling', 'Logistics & Travel', 'On-ground Coordination'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold w-5 h-5" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black p-12 text-white">
            <h3 className="text-2xl font-serif mb-6 text-gold">Why Choose Us</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <Award className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h4 className="font-serif text-xl mb-2">Experience Since 2010</h4>
                  <p className="text-gray-400 text-sm">Over a decade of creating high-end celebrations across India.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Star className="w-8 h-8 text-gold shrink-0" />
                <div>
                  <h4 className="font-serif text-xl mb-2">Premium Execution</h4>
                  <p className="text-gray-400 text-sm">We don't just plan; we produce cinematic experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </div>
    </section>
  </Layout>
);

const DestinationWeddings = () => (
  <Layout>
    <ServicePageHero 
      title="Destination Weddings Without the Stress" 
      sub="We plan, manage, and execute your dream wedding anywhere in India."
      bg="https://i.ibb.co/67c3xbdt/image.png"
    />
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-4xl font-serif mb-8">Your Dream Location, Our Expertise</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Destination weddings require a unique set of logistics and local knowledge. We specialize in scouting the perfect locations—from the palaces of Jaipur to the hills of Dehradun—and managing every detail so you can focus on the celebration.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-l-4 border-gold">
                <MapPin className="text-gold w-6 h-6" />
                <span className="font-medium">Expertise in Jaipur, Dehradun & Beyond</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-l-4 border-gold">
                <Globe className="text-gold w-6 h-6" />
                <span className="font-medium">Complete Travel & Guest Logistics</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <img src="https://i.ibb.co/pjdKB56D/image.png" alt="Destination" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
        <Portfolio />
        <Contact />
      </div>
    </section>
  </Layout>
);

const CorporateEvents = () => (
  <Layout>
    <ServicePageHero 
      title="Corporate Events That Elevate Your Brand" 
      sub="Strategic, impactful, and flawlessly executed events."
      bg="https://i.ibb.co/ns9Z10nW/image.png"
    />
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-4xl font-serif mb-8">Precision & Professionalism</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We understand that corporate events are an extension of your brand. Our approach is focused on strategic alignment, meticulous planning, and flawless execution to ensure your business objectives are met with style.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Conferences', 'Product Launches', 'Exhibitions', 
                'Corporate Parties', 'Brand Activations', 'Award Ceremonies'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Briefcase className="text-black w-5 h-5" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 p-12">
            <h3 className="text-2xl font-serif mb-6">Efficiency & Impact</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-black shrink-0" />
                <p className="text-gray-600">Strict adherence to timelines and schedules.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-black shrink-0" />
                <p className="text-gray-600">Seamless integration with your brand identity.</p>
              </div>
            </div>
          </div>
        </div>
        <Portfolio />
        <Contact />
      </div>
    </section>
  </Layout>
);

const ThemeDecorProduction = () => (
  <Layout>
    <ServicePageHero 
      title="Transforming Spaces Into Experiences" 
      sub="Creative, customized decor that brings your vision to life."
      bg="https://i.ibb.co/nsdMkkpm/image.png"
    />
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif mb-6">Visual Storytelling Through Decor</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our production team specializes in creating immersive environments. We don't just decorate; we transform spaces using advanced lighting, custom stage designs, and exquisite floral arrangements.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { title: 'Stage Design', icon: Palette },
            { title: 'Floral Decor', icon: Heart },
            { title: 'Lighting Design', icon: Star }
          ].map((item) => (
            <div key={item.title} className="text-center p-10 bg-gray-50">
              <item.icon className="w-12 h-12 mx-auto mb-6 text-gold" />
              <h3 className="text-xl font-serif mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm">Customized concepts tailored to your event theme.</p>
            </div>
          ))}
        </div>
        <Portfolio />
        <Contact />
      </div>
    </section>
  </Layout>
);

const ArtistManagement = () => (
  <Layout>
    <ServicePageHero 
      title="Entertainment That Brings Your Event to Life" 
      sub="From live artists to celebrity acts — we manage it all."
      bg="https://i.ibb.co/mCSqRm1C/image.png"
    />
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-4xl font-serif mb-8">The Best Talent for Your Event</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We have an extensive network of artists, from soulful live singers and high-energy DJs to celebrity performers. Our team handles everything from booking to on-ground coordination, ensuring a vibrant atmosphere.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Live Singers', 'DJs', 'Dancers', 'Celebrity Acts', 'Live Bands', 'Emcees'].map((item) => (
                <div key={item} className="p-4 bg-gray-50 text-center font-medium border border-gray-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <Music className="w-20 h-20 text-gold animate-pulse" />
            <div className="absolute bottom-6 left-6 text-white text-xs uppercase tracking-widest">Live Performance Clips</div>
          </div>
        </div>
        <Portfolio />
        <Contact />
      </div>
    </section>
  </Layout>
);

// --- Main App ---

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="relative selection:bg-gold selection:text-white">
        {/* Custom Cursor */}
        <motion.div 
          className="custom-cursor"
          animate={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        />

        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/luxury-wedding-planning" element={<LuxuryWeddingPlanning />} />
          <Route path="/destination-weddings" element={<DestinationWeddings />} />
          <Route path="/corporate-events" element={<CorporateEvents />} />
          <Route path="/theme-decor-production" element={<ThemeDecorProduction />} />
          <Route path="/artist-management" element={<ArtistManagement />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

