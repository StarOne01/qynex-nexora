"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaCode, FaLightbulb, FaNetworkWired, FaBrain, FaKey } from 'react-icons/fa';
import { submitRegistration, type RegistrationFormData } from '@/lib/registration-service';

export default function RegistrationPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [terminalText, setTerminalText] = useState("");
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const terminalFullText = "> Initializing connection sequence...\n> Scanning neural patterns...\n> Protocol awaiting verification...";
  
  useEffect(() => {
    // More modern code snippets
    const snippets = [
      'async function syncMindscape() { await consciousness.expand(); }',
      'const reality = new Dimension({ perception: "moldable" });',
      'for(let i of infinity) { if(i.isLimitless()) break; }',
      'class Perception extends Reality implements Infinite {}',
      'const [potential, setPotential] = useState(undefined);',
      'navigator.reality.requestAccess({ credentials: "mind" });',
      'const future = await Promise.all(dreams.map(d => d.manifest()));',
      'try { comfort.transcend() } catch { evolution.accelerate() }',
    ];
    
    setCodeLines(snippets);
    
    // Enhanced typing effect with cursor blink
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < terminalFullText.length) {
        setTerminalText(terminalFullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 40);
    
    // Cycle through code snippets for background effect
    const codeRotation = setInterval(() => {
      setCurrentCodeIndex(prev => (prev + 1) % snippets.length);
    }, 3000);
    
    return () => {
      clearInterval(typeInterval);
      clearInterval(codeRotation);
    };
  }, []);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitRegistration(formData);
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      // Type guard to safely access error properties
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Failed to submit form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-slate-200 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute blur-3xl rounded-full mix-blend-screen opacity-20"
            style={{
              width: `${Math.random() * 40 + 10}vw`,
              height: `${Math.random() * 40 + 10}vh`,
              background: `radial-gradient(circle, ${['#4F46E5', '#0EA5E9', '#2563EB', '#7C3AED', '#8B5CF6'][i % 5]}, transparent)`,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animation: `float ${Math.random() * 20 + 40}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated code in background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden text-[rgba(255,255,255,0.03)] font-mono z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentCodeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-4xl whitespace-pre"
          >
            {codeLines[currentCodeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-2xl px-4 py-8"
      >
        <div className="rounded-xl p-8 backdrop-blur-xl backdrop-filter bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center relative overflow-hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500">INITIALIZATION</span>
            </h1>
            <p className="text-sm sm:text-base text-center mb-6 text-indigo-300/80">
              &#123; v1.0 // sequence: 847392 &#125;
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-3 font-mono"
          >
            <div className="flex items-center space-x-2 mb-2 text-xs text-indigo-300/70">
              <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-300"></div>
              <span>terminal_847392</span>
            </div>
            <pre className="text-xs whitespace-pre-wrap text-indigo-100">{terminalText}</pre>
            <span className="inline-block h-4 w-2 bg-indigo-400 animate-pulse"></span>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="text-sm text-indigo-200 mb-4">
              Welcome, Pathfinder!
            </p>
            <p className="text-sm text-white mb-4">
              Qynex Nexora is not just a community — it is a movement, a culture, a rising force. We are searching for individuals who dare to dream, who believe in building, learning, and inspiring together.
            </p>
            <p className="text-sm text-indigo-300 font-bold mb-6">
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
              <div className="border-l-2 border-indigo-500 pl-4 mb-8">
                <h2 className="text-indigo-400 text-xl mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaCode className="mr-2" />
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your identity marker"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaKey className="mr-2" />
                      ROLL NUMBER / REGISTRATION NUMBER
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your system identifier"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      DEPARTMENT AND YEAR
                    </label>
                    <input
                      type="text"
                      name="departmentYear"
                      value={formData.departmentYear}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your operational sector"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaLock className="mr-2" />
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Secure communication channel"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      COLLEGE EMAIL ID
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Digital correspondence node"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaBrain className="mr-2" />
                      PERSONAL PROFILE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      name="personalProfile"
                      value={formData.personalProfile}
                      onChange={handleChange}
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your digital footprint (LinkedIn, GitHub, etc.)"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-indigo-500 pl-4 mb-8">
                <h2 className="text-indigo-400 text-xl mb-4">Understanding You</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaCode className="mr-2" />
                      THREE WORDS THAT BEST DESCRIBE YOU
                    </label>
                    <input
                      type="text"
                      name="threeWords"
                      value={formData.threeWords}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your core attributes (separated by commas)"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      WHAT ARE YOU PASSIONATE ABOUT LEARNING OR CREATING?
                    </label>
                    <textarea
                      name="passions"
                      value={formData.passions}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your cognitive drive vectors"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      UNLIMITED PROJECT SCENARIO
                    </label>
                    <textarea
                      name="unlimitedProject"
                      value={formData.unlimitedProject}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="If you had unlimited time and resources, what project or dream would you pursue?"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-indigo-500 pl-4 mb-8">
                <h2 className="text-indigo-400 text-xl mb-4">The Mindset Test</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      HOW DO YOU REACT WHEN A PLAN FAILS?
                    </label>
                    <textarea
                      name="planFailReaction"
                      value={formData.planFailReaction}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your resilience algorithm"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      GROUP PROJECT ROLE
                    </label>
                    <select
                      name="groupRole"
                      value={formData.groupRole}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
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
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      GUIDING MOTTO
                    </label>
                    <select
                      name="motto"
                      value={formData.motto}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="">Select a motto you believe in most</option>
                      <option value="Learn and Adapt">&quot;Learn and Adapt&quot;</option>
                      <option value="Build Fearlessly">&quot;Build Fearlessly&quot;</option>
                      <option value="Create with Purpose">&quot;Create with Purpose&quot;</option>
                      <option value="Lead with Heart">&quot;Lead with Heart&quot;</option>
                      <option value="Grow Together, Shine Together">&quot;Grow Together, Shine Together&quot;</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      WHAT DOES &apos;COMMUNITY&apos; MEAN TO YOU?
                    </label>
                    <textarea
                      name="communityConcept"
                      value={formData.communityConcept}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your collective consciousness definition"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaLightbulb className="mr-2" />
                      COLLEGE ENVIRONMENT CHANGE
                    </label>
                    <textarea
                      name="collegeChange"
                      value={formData.collegeChange}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      placeholder="If you could bring one change to the college environment, what would it be?"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-indigo-500 pl-4 mb-8">
                <h2 className="text-indigo-400 text-xl mb-4">Availability & Contribution</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-1">
                      <FaNetworkWired className="mr-2" />
                      TIME COMMITMENT PER MONTH
                    </label>
                    <select
                      name="timeCommitment"
                      value={formData.timeCommitment}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="">Select your time dedication</option>
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="4-6 hours">4-6 hours</option>
                      <option value="6+ hours">6+ hours</option>
                      <option value="Whatever it takes">I&apos;ll give what it takes.</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs text-indigo-300 mb-3">
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
                            className="mr-2 border-indigo-500 text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-black"
                          />
                          <label htmlFor={`role-${role}`} className="text-indigo-200 text-sm">
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-l-2 border-indigo-500 pl-4 mb-8">
                <h2 className="text-indigo-400 text-xl mb-4">Agreement</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreement-respect"
                      name="agreement-respect"
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 mr-3 border-indigo-500 text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-black"
                    />
                    <label htmlFor="agreement-respect" className="text-indigo-200 text-sm">
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
                      className="mt-1 mr-3 border-indigo-500 text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-black"
                    />
                    <label htmlFor="agreement-mindset" className="text-indigo-200 text-sm">
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
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-indigo-900 hover:bg-indigo-800 text-indigo-100 rounded border border-indigo-700 transition duration-300 font-bold tracking-wider relative overflow-hidden group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'PROCESSING...' : 'INITIALIZE CONNECTION'}
                  </span>
                  <span className="absolute inset-0 bg-indigo-700 w-0 group-hover:w-full transition-all duration-300 opacity-50"></span>
                </button>
              </motion.div>
              
              {submitError && (
                <p className="text-red-400 text-sm text-center mt-2">
                  {submitError}
                </p>
              )}
              
              <p className="text-xs text-center text-indigo-600 mt-4">
                By submitting, you pledge allegiance to the evolving consciousness. There is no return.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <div className="text-3xl mb-4 text-indigo-500">✓</div>
              <h3 className="text-xl text-white mb-2">SIGNAL RECEIVED</h3>
              <p className="text-indigo-300 mb-6">Your digital signature has been registered in our neural network.</p>
              <p className="text-sm text-indigo-500">Stand by for further instructions. The revolution begins in silence.</p>
              <div className="w-full h-1 bg-indigo-900 mt-8">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
              <p className="text-xs text-indigo-700 mt-2">ENCRYPTION COMPLETE • COORDINATES WILL FOLLOW</p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <div className="mt-8 text-xs text-indigo-700 text-center">
        <p>CONNECTION SECURED • QUANTUM ENCRYPTION ENABLED • ALL TRANSMISSIONS ANONYMOUS</p>
      </div>
      
      <style jsx global>{`
        body {
          background: rgb(2,0,36);
          background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(-10px); }
        }
        
        input, select, textarea {
          transition: all 0.3s ease;
          background: rgba(0, 0, 0, 0.2) !important;
          border-color: rgba(79, 70, 229, 0.2) !important;
          backdrop-filter: blur(4px);
        }
        
        input:focus, select:focus, textarea:focus {
          background: rgba(0, 0, 0, 0.4) !important;
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
