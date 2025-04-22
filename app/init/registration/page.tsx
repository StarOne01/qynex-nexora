"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCode, FaLightbulb, FaNetworkWired, FaBrain, FaKey } from 'react-icons/fa';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    registrationNumber: '',
    departmentYear: '',
    phoneNumber: '',
    email: '',
    personalProfile: '',
    threeWords: '',
    passions: '',
    unlimitedProject: '',
    planFailReaction: '',
    groupRole: '',
    motto: '',
    communityConcept: '',
    collegeChange: '',
    timeCommitment: '',
    roles: [] as string[],
    agreements: {
      respect: false,
      noGadget: false,
      mindset: false
    }
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [terminalText, setTerminalText] = useState("");
  const terminalFullText = "> Scanning for exceptional neural patterns...\n> Establishing secure connection...\n> Protocol NEXORA awaiting initialization...";
  
  useEffect(() => {
    // Generate random code snippets for background effect
    const snippets = [
      'function unlockPotential(mind) { return mind.innovate(); }',
      'class Nexora extends CommunityOfMinds implements Future {}',
      'if (you.think() !== others.think()) { world.evolve(); }',
      'const innovation = async () => { await challenges.solve(); }',
      'while(true) { greatMinds.connect(); barriers.break(); }',
      '// The network strengthens with each node...',
      'const impact = vision.map(idea => idea.execute());',
      'try { comfort.escape() } catch { greatness.achieve() }',
    ];
    
    setCodeLines(snippets);
    
    // Simulate typing effect
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < terminalFullText.length) {
        setTerminalText(terminalFullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
    
    return () => clearInterval(typeInterval);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('role-')) {
      const role = name.replace('role-', '');
      setFormData(prev => {
        const updatedRoles = checked 
          ? [...prev.roles, role]
          : prev.roles.filter(r => r !== role);
          
        return { ...prev, roles: updatedRoles };
      });
    } else if (name.startsWith('agreement-')) {
      const agreement = name.replace('agreement-', '');
      setFormData(prev => ({
        ...prev,
        agreements: {
          ...prev.agreements,
          [agreement]: checked
        }
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center relative overflow-hidden font-mono">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-2xl px-4 py-8"
      >
        <div className="border border-green-500 rounded-lg p-8 bg-black bg-opacity-80 backdrop-blur shadow-[0_0_15px_rgba(0,255,0,0.2)]">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center glitch">
              [NEXORA] <span className="text-white">INITIALIZATION</span>
            </h1>
            <p className="text-sm sm:text-base text-center mb-6 text-green-300">
              &#123; collective.consciousness(version: 1.0.0) &#125;
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-black border border-green-700 rounded p-3 text-green-400 font-mono"
          >
            <pre className="text-xs whitespace-pre-wrap">{terminalText}</pre>
            <span className="inline-block h-4 w-2 bg-green-500 animate-pulse"></span>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="text-sm text-green-200 mb-4">
              Welcome, Pathfinder!
            </p>
            <p className="text-sm text-white mb-4">
              Qynex Nexora is not just a community — it is a movement, a culture, a rising force. We are searching for individuals who dare to dream, who believe in building, learning, and inspiring together.
            </p>
            <p className="text-sm text-green-300 font-bold mb-6">
              This is your first step. Answer thoughtfully. We are looking for mindset over skillset.
            </p>
          </motion.div>
          
          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <div className="border-l-2 border-green-500 pl-4 mb-8">
                <h2 className="text-green-400 text-xl mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaCode className="mr-2" />
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your identity marker"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaKey className="mr-2" />
                      ROLL NUMBER / REGISTRATION NUMBER
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your system identifier"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      DEPARTMENT AND YEAR
                    </label>
                    <input
                      type="text"
                      name="departmentYear"
                      value={formData.departmentYear}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your operational sector"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaLock className="mr-2" />
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Secure communication channel"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      COLLEGE EMAIL ID
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Digital correspondence node"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaBrain className="mr-2" />
                      PERSONAL PROFILE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      name="personalProfile"
                      value={formData.personalProfile}
                      onChange={handleChange}
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your digital footprint (LinkedIn, GitHub, etc.)"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 mb-8">
                <h2 className="text-green-400 text-xl mb-4">Understanding You</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaCode className="mr-2" />
                      THREE WORDS THAT BEST DESCRIBE YOU
                    </label>
                    <input
                      type="text"
                      name="threeWords"
                      value={formData.threeWords}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your core attributes (separated by commas)"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      WHAT ARE YOU PASSIONATE ABOUT LEARNING OR CREATING?
                    </label>
                    <textarea
                      name="passions"
                      value={formData.passions}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your cognitive drive vectors"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      UNLIMITED PROJECT SCENARIO
                    </label>
                    <textarea
                      name="unlimitedProject"
                      value={formData.unlimitedProject}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="If you had unlimited time and resources, what project or dream would you pursue?"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 mb-8">
                <h2 className="text-green-400 text-xl mb-4">The Mindset Test</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      HOW DO YOU REACT WHEN A PLAN FAILS?
                    </label>
                    <textarea
                      name="planFailReaction"
                      value={formData.planFailReaction}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your resilience algorithm"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      GROUP PROJECT ROLE
                    </label>
                    <select
                      name="groupRole"
                      value={formData.groupRole}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                    >
                      <option value="">Select your natural role</option>
                      <option value="Leader">Leader</option>
                      <option value="Creative Contributor">Creative Contributor</option>
                      <option value="Organizer">Organizer</option>
                      <option value="Motivator">Motivator</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Finisher">Finisher</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      GUIDING MOTTO
                    </label>
                    <select
                      name="motto"
                      value={formData.motto}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                    >
                      <option value="">Select a motto you believe in most</option>
                      <option value="Learn and Adapt">"Learn and Adapt"</option>
                      <option value="Build Fearlessly">"Build Fearlessly"</option>
                      <option value="Create with Purpose">"Create with Purpose"</option>
                      <option value="Lead with Heart">"Lead with Heart"</option>
                      <option value="Grow Together, Shine Together">"Grow Together, Shine Together"</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      WHAT DOES 'COMMUNITY' MEAN TO YOU?
                    </label>
                    <textarea
                      name="communityConcept"
                      value={formData.communityConcept}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Your collective consciousness definition"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      COLLEGE ENVIRONMENT CHANGE
                    </label>
                    <textarea
                      name="collegeChange"
                      value={formData.collegeChange}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="If you could bring one change to the college environment, what would it be?"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 mb-8">
                <h2 className="text-green-400 text-xl mb-4">Availability & Contribution</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      TIME COMMITMENT PER MONTH
                    </label>
                    <select
                      name="timeCommitment"
                      value={formData.timeCommitment}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-green-500 rounded p-2 text-green-100 focus:outline-none focus:ring-1 focus:ring-green-400"
                    >
                      <option value="">Select your time dedication</option>
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="4-6 hours">4-6 hours</option>
                      <option value="6+ hours">6+ hours</option>
                      <option value="Whatever it takes">I'll give what it takes.</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-green-300 mb-3">
                      <FaLightbulb className="mr-2" />
                      ROLES YOU WOULD LOVE TO EXPLORE
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        'Event Planning',
                        'Team Building',
                        'Design & Creativity',
                        'Music/Dance/Cultural Arts',
                        'Public Speaking/Hosting',
                        'Community Management',
                        'Logistics & Operations',
                        'Tech Development',
                        'Content Writing',
                        'Outreach and Collaborations',
                        'Mentorship/Guidance',
                        'Others'
                      ].map(role => (
                        <div key={role} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`role-${role}`}
                            name={`role-${role}`}
                            onChange={handleCheckboxChange}
                            className="mr-2 border-green-500 text-green-600 focus:ring-green-500 h-4 w-4 bg-black"
                          />
                          <label htmlFor={`role-${role}`} className="text-green-200 text-sm">
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-green-500 pl-4 mb-8">
                <h2 className="text-green-400 text-xl mb-4">Agreement</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreement-respect"
                      name="agreement-respect"
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 mr-3 border-green-500 text-green-600 focus:ring-green-500 h-4 w-4 bg-black"
                    />
                    <label htmlFor="agreement-respect" className="text-green-200 text-sm">
                      I understand that Qynex Nexora is a platform built on respect, passion, and trust. I will strive to uphold its spirit and support fellow members.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreement-mindset"
                      name="agreement-mindset"
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 mr-3 border-green-500 text-green-600 focus:ring-green-500 h-4 w-4 bg-black"
                    />
                    <label htmlFor="agreement-mindset" className="text-green-200 text-sm">
                      I accept that participation in Qynex Nexora is based on mindset and commitment, not titles.
                    </label>
                  </div>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-900 hover:bg-green-800 text-green-100 rounded border border-green-700 transition duration-300 font-bold tracking-wider relative overflow-hidden group"
                >
                  <span className="relative z-10">INITIALIZE CONNECTION</span>
                  <span className="absolute inset-0 bg-green-700 w-0 group-hover:w-full transition-all duration-300 opacity-50"></span>
                </button>
              </motion.div>
              
              <p className="text-xs text-center text-green-600 mt-4">
                By submitting, you pledge allegiance to the evolving consciousness. There is no return.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <div className="text-3xl mb-4 text-green-500">✓</div>
              <h3 className="text-xl text-white mb-2">SIGNAL RECEIVED</h3>
              <p className="text-green-300 mb-6">Your digital signature has been registered in our neural network.</p>
              <p className="text-sm text-green-500">Stand by for further instructions. The revolution begins in silence.</p>
              <div className="w-full h-1 bg-green-900 mt-8">
                <motion.div 
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
              <p className="text-xs text-green-700 mt-2">ENCRYPTION COMPLETE • COORDINATES WILL FOLLOW</p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <div className="mt-8 text-xs text-green-700 text-center">
        <p>CONNECTION SECURED • QUANTUM ENCRYPTION ENABLED • ALL TRANSMISSIONS ANONYMOUS</p>
      </div>
      
      <style jsx global>{`
        body {
          background: #000;
        }
        
        .glitch {
          position: relative;
        }
        
        .glitch::before,
        .glitch::after {
          content: "[NEXORA] INITIALIZATION";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          left: 2px;
          text-shadow: -1px 0 red;
          animation: glitch-animation 2s infinite linear alternate-reverse;
        }
        
        .glitch::after {
          left: -2px;
          text-shadow: 1px 0 blue;
          animation: glitch-animation 3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-animation {
          0% {
            clip-path: inset(80% 0 0 0);
          }
          5% {
            clip-path: inset(10% 0 60% 0);
          }
          10% {
            clip-path: inset(40% 0 20% 0);
          }
          15% {
            clip-path: inset(80% 0 40% 0);
          }
          20% {
            clip-path: inset(20% 0 0% 0);
          }
          25% {
            clip-path: inset(60% 0 80% 0);
          }
          30% {
            clip-path: inset(10% 0 10% 0);
          }
          100% {
            clip-path: inset(80% 0 0% 0);
          }
        }
        
        /* Skill splatter effects */
        .skill-splatter {
          position: absolute;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 1rem 2rem;
          border-radius: 50%;
          color: rgba(0, 0, 0, 0.8);
          filter: blur(0.5px);
          letter-spacing: 1px;
          transform-origin: center;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        }
        
        .skill-splatter::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          z-index: -1;
          animation: morph 8s linear infinite alternate;
        }
        
        .skill-code::before {
          background: radial-gradient(ellipse at center, #00ff9d, #00ff9d00);
        }
        
        .skill-hack::before {
          background: radial-gradient(ellipse at center, #ff0048, #ff004800);
          animation-delay: 1s;
        }
        
        .skill-lead::before {
          background: radial-gradient(ellipse at center, #9d00ff, #9d00ff00);
          animation-delay: 2s;
        }
        
        .skill-disrupt::before {
          background: radial-gradient(ellipse at center, #ff7b00, #ff7b0000);
          animation-delay: 3s;
        }
        
        .skill-innovate::before {
          background: radial-gradient(ellipse at center, #00a2ff, #00a2ff00);
          animation-delay: 4s;
        }
        
        .skill-neural::before {
          background: radial-gradient(ellipse at center, #f200ff, #f200ff00);
          animation-delay: 5s;
        }
        
        .skill-crypto::before {
          background: radial-gradient(ellipse at center, #00ffea, #00ffea00);
          animation-delay: 6s;
        }
        
        .skill-quantum::before {
          background: radial-gradient(ellipse at center, #faff00, #faff0000);
          animation-delay: 7s;
        }
        
        @keyframes morph {
          0% {
            border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          }
          25% {
            border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
          }
          50% {
            border-radius: 30% 70% 70% 30% / 50% 60% 40% 50%;
          }
          75% {
            border-radius: 50% 50% 30% 70% / 60% 30% 70% 40%;
          }
          100% {
            border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
          }
        }
      `}</style>
    </div>
  );
}
