'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Three.js Animation Component
const ThreeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth - 100, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a more expansive, cosmic feel
      posArray[i] = (Math.random() - 0.8) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create materials with mysterious purple and blue colors
    const particlesMaterials = [
      new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6C63FF // Deep Purple
      }),
      new THREE.PointsMaterial({
        size: 0.02,
        color: 0x2D3AF2 // Electric Blue
      }),
      new THREE.PointsMaterial({
        size: 0.015,
        color: 0xFFFFFF // Subtle White (stars)
      })
    ];

    // Create different particle groups
    const particleGroups: THREE.Points[] = [];
    for (let i = 0; i < 3; i++) {
      const particles = new THREE.Points(particlesGeometry, particlesMaterials[i]);
      scene.add(particles);
      particleGroups.push(particles);
    }

    camera.position.z = 6;

    // Create an animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Create more mysterious, slower movements
      for (let i = 0; i < particleGroups.length; i++) {
        particleGroups[i].rotation.x = elapsedTime * 0.05 * (i + 1) / 6;
        particleGroups[i].rotation.y = elapsedTime * 0.08 * (i + 1) / 6;

        // Add subtle pulsing effect
        const pulseScale = Math.sin(elapsedTime * 0.3) * 0.03 + 1;
        particleGroups[i].scale.set(pulseScale, pulseScale, pulseScale);
      }

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white overflow-x-hidden">
      <ThreeAnimation />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? ' backdrop-blur-md py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">
            QYNEX NEXORA
          </div>
          <Link href="/init/registration">
            <button
              className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] text-white px-4 py-2 text-sm sm:text-base sm:px-5 sm:py-2 rounded-md font-medium transition transform hover:scale-105 hover:shadow-[0_0_15px_rgba(108,99,255,0.5)]"
            >
              Join Now
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 pt-28 sm:pt-40 pb-16 sm:pb-24 flex flex-col justify-center min-h-[90vh] sm:h-screen items-center text-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0A0B14]/90 -z-10"></div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
          Find Your <span className="text-[#6C63FF]">People</span> at<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2]">
            Qynex Nexora
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mb-6 sm:mb-8">
          Connect with amazing people who share your passion for <span className="text-[#6C63FF]">creating</span>, <span className="text-[#2D3AF2]">learning</span>, and <span className="text-[#8B5CF6]">exploring</span> together
        </p>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mb-8 sm:mb-10">
          Born in Tamil Nadu, now connecting passionate student creators and innovators everywhere
        </p>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 sm:gap-6">
          <button 
            onClick={() => window.open('/init/registration')}
            className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg font-bold transition transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(108,99,255,0.6)]"
          >
            ✧ Find Your Community
          </button>
          <button 
            onClick={() => window.open('/init/registration')}
            className="bg-transparent border border-[#6C63FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg font-bold hover:bg-[#6C63FF]/10 transition transform hover:-translate-y-1"
          >
            ⟡ Browse Interests
          </button>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-[#0A0B14]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3 sm:mb-4">Popular <span className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">Communities</span></h2>
          <p className="text-center text-gray-400 mb-4 sm:mb-6 text-lg sm:text-xl">Join these amazing groups and start creating with others</p>
          <p className="text-center text-gray-500 mb-10 sm:mb-16 text-sm sm:text-base">With roots in Tamil Nadu&apos;s creative ecosystem, now bringing together talent from everywhere</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              { name: "Digital Artists", members: "842+", icon: "◈", color: "from-[#2D3AF2] to-[#3B82F6]" },
              { name: "Audio Engineers", members: "730+", icon: "⧖", color: "from-[#6366F1] to-[#8B5CF6]" },
              { name: "Data Scientists", members: "890+", icon: "⧫", color: "from-[#3B82F6] to-[#2563EB]" },
              { name: "UI/UX Designers", members: "1,250+", icon: "⟐", color: "from-[#9333EA] to-[#6366F1]" },
              { name: "Cybersecurity Experts", members: "685+", icon: "⧗", color: "from-[#4338CA] to-[#3B82F6]" },
              { name: "AI Researchers", members: "920+", icon: "✦", color: "from-[#8B5CF6] to-[#4F46E5]" }
            ].map((community, i) => (
              <div key={i} className="bg-[#12131E] backdrop-blur-sm p-5 sm:p-8 rounded-lg hover:shadow-[0_0_25px_rgba(108,99,255,0.2)] transition transform hover:-translate-y-1 border border-[#222536]">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-5 text-[#6C63FF]">{community.icon}</div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r ${community.color} bg-clip-text text-transparent`}>{community.name}</h3>
                <Link href="/init/registration" className="inline-block bg-[#1A1C2A] hover:bg-[#252836] px-4 sm:px-5 py-2 rounded-md text-white text-sm sm:text-base transition">
                  Join now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Categories */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-[#0D0E18]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3 sm:mb-4">Discover Your <span className="text-[#6C63FF]">Passion</span></h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-10 sm:mb-16 text-base sm:text-xl">Find groups that match what you love to do</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { name: "Digital Art", icon: "◈", examples: "Illustration, Animation, Design" },
              { name: "Music", icon: "⧖", examples: "Production, Performance, Theory" },
              { name: "Coding", icon: "⧗", examples: "Web, Apps, AI, Games" },
              { name: "Writing", icon: "⟐", examples: "Fiction, Poetry, Journalism" },
              { name: "Science", icon: "⧫", examples: "Physics, Biology, Astronomy" },
              { name: "Editing", icon: "⟡", examples: "Video, Music, Image" },
              { name: "Engineering", icon: "⟢", examples: "Robotics, Electronics, Making" },
              { name: "Design", icon: "✧", examples: "UX/UI, Product, Architecture" }
            ].map((category, i) => (
              <div key={i} className="bg-[#12131E] border border-[#222536] p-4 sm:p-6 rounded-lg hover:border-[#6C63FF] transition text-center transform hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">{category.icon}</div>
                <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1 text-white">{category.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{category.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-[#090A12]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-16">How It <span className="text-[#6C63FF]">Works</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16">
            {[
              { step: "01", title: "Sign Up", description: "Create your profile and tell us about what you love to do and want to learn ✧" },
              { step: "02", title: "Discover", description: "We'll match you with amazing communities that share your interests and goals ⟡" },
              { step: "03", title: "Connect", description: "Join events, collaborate on projects, and build lasting friendships ◈" }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-8xl sm:text-9xl font-black text-white/5">
                  {step.step}
                </div>
                <div className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center text-xl sm:text-2xl font-black mx-auto mb-4 sm:mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-gray-400 text-base sm:text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 bg-gradient-to-r from-[#0A0B14] to-[#12131E] text-white text-center relative overflow-hidden">
        {/* Background geometric elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#6C63FF]/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#2D3AF2]/5 blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">Ready to <span className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">Join Us</span>?</h2>
          <p className="text-lg sm:text-xl font-medium mb-6 sm:mb-10 text-gray-300">Thousands of amazing people are waiting to create, learn, and grow with you</p>
          <button 
            onClick={() => window.open('/init/registration')}
            className="bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-md text-lg sm:text-xl font-bold hover:shadow-[0_0_25px_rgba(108,99,255,0.5)] transition transform hover:-translate-y-1"
          >
            Get Started — It&apos;s Free ✧
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-12 sm:py-16 bg-[#080910] text-white border-t border-[#1A1C2A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#6C63FF] to-[#2D3AF2] bg-clip-text text-transparent">QYNEX NEXORA</h3>
            <p className="text-gray-400">Where passion meets community</p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-base sm:text-lg">
            <Link href="#" className="text-gray-300 hover:text-[#6C63FF] transition">About</Link>
            <Link href="#" className="text-gray-300 hover:text-[#6C63FF] transition">Communities</Link>
            <Link href="#" className="text-gray-300 hover:text-[#6C63FF] transition">Events</Link>
            <Link href="#" className="text-gray-300 hover:text-[#6C63FF] transition">Contact</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#1A1C2A] text-center text-gray-400">
          <p className="text-sm sm:text-base">Founded in Tamil Nadu, made with 💙 by students, for students everywhere</p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm">© {new Date().getFullYear()} Qynex Nexora. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
