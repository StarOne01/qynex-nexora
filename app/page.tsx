'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Three.js Animation Component with mobile optimizations
const ThreeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Mobile-friendly sizing
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 1000 : 2000; // Reduce particles on mobile
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particles with optimized count for mobile
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      // Create a more expansive, cosmic feel
      posArray[i] = (Math.random() - 0.8) * (isMobile ? 15 : 20);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Enhanced colors for more expressiveness
    const particlesMaterials = [
      new THREE.PointsMaterial({
        size: isMobile ? 0.025 : 0.02,
        color: 0x6C63FF, // Deep Purple
        transparent: true,
        opacity: 0.8
      }),
      new THREE.PointsMaterial({
        size: isMobile ? 0.025 : 0.02,
        color: 0x2D3AF2, // Electric Blue
        transparent: true,
        opacity: 0.8
      }),
      new THREE.PointsMaterial({
        size: isMobile ? 0.02 : 0.015,
        color: 0xFFFFFF, // Subtle White (stars)
        transparent: true,
        opacity: 0.9
      })
    ];

    // Create different particle groups
    const particleGroups: THREE.Points[] = [];
    for (let i = 0; i < 3; i++) {
      const particles = new THREE.Points(particlesGeometry, particlesMaterials[i]);
      scene.add(particles);
      particleGroups.push(particles);
    }

    // Adjust camera position based on device
    camera.position.z = isMobile ? 4 : 6;

    // Create a more dynamic animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Create more mysterious, slower movements
      for (let i = 0; i < particleGroups.length; i++) {
        particleGroups[i].rotation.x = elapsedTime * 0.05 * (i + 1) / 6;
        particleGroups[i].rotation.y = elapsedTime * 0.08 * (i + 1) / 6;

        // Add enhanced pulsing effect
        const pulseScale = Math.sin(elapsedTime * 0.3) * 0.05 + 1;
        particleGroups[i].scale.set(pulseScale, pulseScale, pulseScale);
      }

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    // Better resize handling for all devices
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Adjust camera position when switching between mobile and desktop
      camera.position.z = isMobileNow ? 4 : 6;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 bg-black -z-10" />;
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  // Scroll animation detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Get all elements with animation classes
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        // If element is in viewport
        if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
          setAnimatedItems(prev => prev.includes(index) ? prev : [...prev, index]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once to check for elements already in view
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white overflow-x-hidden">
      <ThreeAnimation />

      {/* Navbar with improved mobile styling */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? ' backdrop-blur-md py-2' : 'py-3 sm:py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">
            QYNEX NEXORA
          </div>
          <Link href="/init/registration">
            <button
              className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md font-medium transition transform hover:scale-105 hover:shadow-[0_0_15px_rgba(108,99,255,0.5)] active:scale-95"
            >
              Join Now
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section with enhanced animations */}
      <section className="px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 flex flex-col justify-center min-h-[90vh] sm:h-screen items-center text-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0A0B14]/90 -z-10"></div>
        
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            Find Your <span className="text-[#6C63FF] animate-pulse-slow">People</span> at<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2]">
              Qynex Nexora
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mb-4 sm:mb-6 animate-slide-up">
            Connect with amazing people who share your passion for <span className="text-[#6C63FF]">creating</span>, <span className="text-[#2D3AF2]">learning</span>, and <span className="text-[#8B5CF6]">exploring</span> together
          </p>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mb-6 sm:mb-8 animate-slide-up-delayed">
            Born in Tamil Nadu, now connecting passionate student creators and innovators everywhere
          </p>
          <div className="flex flex-col xs:flex-row w-full xs:w-auto justify-center gap-3 sm:gap-6 animate-slide-up-delayed-more">
            <button 
              onClick={() => window.open('/init/registration')}
              className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-md text-base sm:text-lg font-bold transition transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(108,99,255,0.6)] active:translate-y-0 active:shadow-inner"
            >
              <span className="animate-bounce-light inline-block mr-1">✧</span> Find Your Community
            </button>
            <button 
              onClick={() => window.open('/init/registration')}
              className="bg-transparent border border-[#6C63FF] text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-md text-base sm:text-lg font-bold hover:bg-[#6C63FF]/10 transition transform hover:-translate-y-1 active:translate-y-0"
            >
              <span className="animate-spin-slow inline-block mr-1">⟡</span> Browse Interests
            </button>
          </div>
        </div>
      </section>

      {/* Featured Communities with enhanced animations */}
      <section id='comm' className="px-4 sm:px-6 py-12 sm:py-20 bg-[#0A0B14]">
        <div className="max-w-7xl mx-auto">
          <div className={`animate-on-scroll ${animatedItems.includes(0) ? "opacity-100 translate-y-0 transition-all duration-700" : "opacity-0 translate-y-10 transition-all duration-700"}`}>
            <h2 className="text-2xl sm:text-4xl font-black text-center mb-2 sm:mb-4">Popular <span className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">Communities</span></h2>
            <p className="text-center text-gray-400 mb-3 sm:mb-5 text-base sm:text-xl">Join these amazing groups and start creating with others</p>
            <p className="text-center text-gray-500 mb-8 sm:mb-12 text-xs sm:text-base">With roots in Tamil Nadu&apos;s creative ecosystem, now bringing together talent from everywhere</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {[
              { name: "Digital Artists", members: "100+", icon: "◈", color: "from-[#2D3AF2] to-[#3B82F6]" },
              { name: "Audio Engineers", members: "50+", icon: "⧖", color: "from-[#6366F1] to-[#8B5CF6]" },
              { name: "Data Scientists", members: "200+", icon: "⧫", color: "from-[#3B82F6] to-[#2563EB]" },
              { name: "UI/UX Designers", members: "3,250+", icon: "⟐", color: "from-[#9333EA] to-[#6366F1]" },
              { name: "Cybersecurity Experts", members: "685+", icon: "⧗", color: "from-[#4338CA] to-[#3B82F6]" },
              { name: "AI Researchers", members: "920+", icon: "✦", color: "from-[#8B5CF6] to-[#4F46E5]" }
            ].map((community, i) => (
              <div 
                key={i} 
                className={`bg-[#12131E] backdrop-blur-sm p-4 sm:p-6 rounded-lg hover:shadow-[0_0_25px_rgba(108,99,255,0.2)] transition transform border border-[#222536] animate-on-scroll ${
                  animatedItems.includes(i+1) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                } transition-all duration-700 delay-${i*100}`}
              >
                <div className="text-3xl sm:text-5xl mb-3 sm:mb-5 text-[#6C63FF] animate-pulse-slow">{community.icon}</div>
                <h3 className={`text-lg sm:text-2xl font-bold mb-2 bg-gradient-to-r ${community.color} bg-clip-text text-transparent`}>{community.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{community.members} members</p>
                <Link href="/init/registration" className="inline-block bg-[#1A1C2A] hover:bg-[#252836] px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-white text-sm sm:text-base transition transform hover:translate-x-1">
                  Join now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Categories with improved mobile layout */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-[#0D0E18]">
        <div className="max-w-7xl mx-auto">
          <div className={` animate-on-scroll ${animatedItems.includes(8) ? "opacity-100 translate-y-0 transition-all duration-700" : "opacity-0 translate-y-10 transition-all duration-700"}`}>
            <h2 className="text-2xl sm:text-4xl font-black text-center mb-2 sm:mb-4">Discover Your <span className="text-[#6C63FF]">Passion</span></h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg">Find groups that match what you love to do</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {[
              { name: "Digital Art", icon: "◈", examples: "Illustration, Animation, Design", count: "24" },
              { name: "Music", icon: "⧖", examples: "Production, Performance, Theory", count: "18" },
              { name: "Coding", icon: "⧗", examples: "Web, Apps, AI, Games", count: "32" },
              { name: "Writing", icon: "⟐", examples: "Fiction, Poetry, Journalism", count: "15" },
              { name: "Science", icon: "⧫", examples: "Physics, Biology, Astronomy", count: "22" },
              { name: "Editing", icon: "⟡", examples: "Video, Music, Image", count: "17" },
              { name: "Engineering", icon: "⟢", examples: "Robotics, Electronics, Making", count: "19" },
              { name: "Design", icon: "✧", examples: "UX/UI, Product, Architecture", count: "28" },
              { name: "Photography", icon: "◎", examples: "Portrait, Landscape, Street", count: "21" },
              { name: "Business", icon: "◬", examples: "Startups, Marketing, Finance", count: "16" },
              { name: "Filmmaking", icon: "⧉", examples: "Directors, Screenwriting, VFX", count: "14" },
              { name: "Gaming", icon: "◭", examples: "Esports, Development, Streaming", count: "26" }
            ].map((category, i) => (
              <div 
                key={i} 
                className={`bg-[#12131E] border border-[#222536] p-3 sm:p-5 rounded-lg hover:border-[#6C63FF] hover:shadow-[0_0_15px_rgba(108,99,255,0.15)] transition text-center transform hover:-translate-y-1 group relative overflow-hidden animate-on-scroll ${
                  animatedItems.includes(i+9) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } transition-all duration-700 delay-${Math.min(i*50, 500)}`}
              >
                <div className="absolute top-2 right-2 bg-[#6C63FF]/10 px-1.5 py-0.5 rounded-full text-xs text-[#6C63FF]">
                  {category.count}
                </div>
                <div className="text-2xl sm:text-4xl mb-2 bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">{category.icon}</div>
                <h3 className="font-bold text-sm sm:text-lg mb-0.5 text-white">{category.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-1">{category.examples}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/80 to-[#2D3AF2]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={"/init/registration"}>
                    <button className="bg-white text-[#12131E] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium text-xs sm:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with improved animations */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-[#090A12]">
        <div className="max-w-7xl mx-auto">
          <div className={`animate-on-scroll   ${animatedItems.includes(21) ? "opacity-100 translate-y-0 transition-all duration-700" : "opacity-0 translate-y-10 transition-all duration-700"}`}>
            <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-12">How It <span className="text-[#6C63FF]">Works</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { step: "01", title: "Sign Up", description: "Create your profile and tell us about what you love to do and want to learn ✧" },
              { step: "02", title: "Discover", description: "We'll match you with amazing communities that share your interests and goals ⟡" },
              { step: "03", title: "Connect", description: "Join events, collaborate on projects, and build lasting friendships ◈" }
            ].map((step, i) => (
              <div 
                key={i} 
                className={`text-center relative animate-on-scroll ${
                  animatedItems.includes(i+22) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } transition-all duration-700 delay-${i*200}`}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl sm:text-9xl font-black text-white/5">
                  {step.step}
                </div>
                <div className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center text-xl sm:text-2xl font-black mx-auto mb-4 sm:mb-6 transform hover:rotate-6 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced animations */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-r from-[#0A0B14] to-[#12131E] text-white text-center relative overflow-hidden">
        {/* Animated background geometric elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#6C63FF]/5 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#2D3AF2]/5 blur-3xl animate-pulse-slow delay-1000"></div>
          
          {/* Additional animated particles */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-[#6C63FF]/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        <div 
          className={`max-w-3xl mx-auto relative z-10 animate-on-scroll ${
            animatedItems.includes(25) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-1000`}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">Ready to <span className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">Join Us</span>?</h2>
          <p className="text-base sm:text-xl font-medium mb-6 sm:mb-8 text-gray-300">Thousands of amazing people are waiting to create, learn, and grow with you</p>
          <button 
            onClick={() => window.open('/init/registration')}
            className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] text-white px-6 sm:px-10 py-2.5 sm:py-4 rounded-md text-base sm:text-xl font-bold hover:shadow-[0_0_25px_rgba(108,99,255,0.5)] transition transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner group"
          >
            Get Started - Find them!
            <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">✧</span>
          </button>
        </div>
      </section>

      {/* Footer with enhanced mobile layout */}
      <footer className="px-4 sm:px-6 py-8 sm:py-12 bg-[#080910] text-white border-t border-[#1A1C2A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">QYNEX NEXORA</h3>
            <p className="text-gray-400 text-sm sm:text-base">Where passion meets community</p>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-end">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <Link href="#" className="text-gray-300 hover:text-[#6C63FF] transition hover:-translate-y-1 transform inline-block">About</Link>
              <Link href="#comm" className="text-gray-300 hover:text-[#6C63FF] transition hover:-translate-y-1 transform inline-block">Communities</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-base">
              <Link href="mailto:qynexnexora@gmail.com" className="text-gray-300 hover:text-[#6C63FF] transition flex items-center gap-2 hover:-translate-y-1 transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/company/qynex-nexora/" target="_blank" className="text-gray-300 hover:text-[#6C63FF] transition flex items-center hover:-translate-y-1 transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </Link>
              <Link href="https://www.instagram.com/qynex.nexora/" target="_blank" className="text-gray-300 hover:text-[#6C63FF] transition flex items-center hover:-translate-y-1 transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#1A1C2A] text-center text-gray-400">
          <p className="text-xs sm:text-sm">Founded in Tamil Nadu, made with 💙 by students, for students everywhere</p>
          <p className="mt-1 sm:mt-2 text-xs">© {new Date().getFullYear()} Qynex Nexora. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulseSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounceLight {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.8s ease-out 0.2s forwards;
        }
        
        .animate-slide-up-delayed {
          opacity: 0;
          animation: slideUp 0.8s ease-out 0.4s forwards;
        }
        
        .animate-slide-up-delayed-more {
          opacity: 0;
          animation: slideUp 0.8s ease-out 0.6s forwards;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
        
        .animate-bounce-light {
          animation: bounceLight 2s infinite ease-in-out;
        }
        
        /* Add responsive utility for extra-small screens */
        @media (min-width: 475px) {
          .xs\\:flex-row {
            flex-direction: row;
          }
          
          .xs\\:w-auto {
            width: auto;
          }
        }
      `}</style>
    </main>
  );
}
