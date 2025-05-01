"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InitPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleExplore = () => {
    router.push("/about");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <div className={`max-w-4xl transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Qynex Nexora
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            A tech community for developers, designers, and creators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/80 transition">
            <h2 className="text-xl font-bold mb-3 text-blue-400">Connect</h2>
            <p className="text-gray-300">Join a thriving community of tech enthusiasts and expand your network.</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/80 transition">
            <h2 className="text-xl font-bold mb-3 text-purple-400">Learn</h2>
            <p className="text-gray-300">Access resources, mentorship, and collaborative learning opportunities.</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/80 transition">
            <h2 className="text-xl font-bold mb-3 text-teal-400">Create</h2>
            <p className="text-gray-300">Collaborate on projects and turn your innovative ideas into reality.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={handleExplore}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/25"
          >
            Explore Community
          </button>
          
          <Link href="/init/registration" target="_blank">
            <button className="px-8 py-3 bg-gray-800 rounded-full font-bold hover:bg-gray-700 transition-all border border-gray-700">
              Join Us
            </button>
          </Link>
        </div>
      </div>
      
      <footer className={`absolute bottom-4 text-sm text-gray-500 transition-all duration-1000 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
        © {new Date().getFullYear()} Qynex Nexora • A community for tech enthusiasts
      </footer>
    </main>
  );
}
