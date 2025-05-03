"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaCode, FaLightbulb, FaNetworkWired, FaBrain, FaKey, FaArrowRight, FaArrowLeft, FaLinkedin, FaFileUpload } from 'react-icons/fa';
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
    resume: null, // Changed from empty string to null to match File | null type
    passions: '',
    unlimitedProject: '',
    planFailReaction: '',
    groupRole: '',
    motto: '',
    communityConcept: '',
    collegeChange: '',
    timeCommitment: '',
    // New mindset fields
    joinReason: '',
    fieldExperience: '',
    futurePlans: '',
    initiativeStory: '',
    eventIdea: '',
    additionalInfo: '',
    roles: [] as string[],
    agreements: {
      respect: false,
      noGadget: false,
      mindset: false
    }
  });
  
  // Add state for tracking current step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [terminalText, setTerminalText] = useState("");
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const terminalFullText = "> Initializing connection sequence...\n> Scanning neural patterns...\n> Protocol awaiting verification...";
  
  // Add state to track the name of the uploaded file
  const [resumeFileName, setResumeFileName] = useState<string>("");
  
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
  
  // Add a specific handler for file inputs
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFileName(file.name);
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
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
  
  // Handle step navigation
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      nextStep();
      return;
    }
    
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
  
  // Validate current step to enable next button
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: // Basic Information
        return formData.fullName && formData.registrationNumber && 
               formData.departmentYear && formData.phoneNumber && formData.email && 
               formData.personalProfile && formData.resume !== null; // Updated to include LinkedIn and resume
      case 2: // Understanding You
        return formData.threeWords && formData.passions && formData.unlimitedProject;
      case 3: // Mindset Test
        return formData.planFailReaction && formData.groupRole && 
               formData.motto && formData.communityConcept && formData.collegeChange;
      case 4: // Personal Journey (new step)
        return formData.joinReason && formData.fieldExperience && 
               formData.futurePlans && formData.initiativeStory && formData.eventIdea;
      case 5: // Availability & Contribution (now step 5)
        return formData.timeCommitment && formData.roles.length > 0;
      case 6: // Agreement (now step 6)
        return formData.agreements.respect && formData.agreements.mindset;
      default:
        return true;
    }
  };
  
  // Step content components
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Basic Information
            </h2>
            
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
                  ROLL NUMBER
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
                  <FaLinkedin className="mr-2" />
                  LINKEDIN PROFILE
                </label>
                <input
                  type="url"
                  name="personalProfile"  // Changed from linkedInProfile to match the state field name
                  value={formData.personalProfile}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center text-xs text-indigo-300 mb-1">
                  <FaFileUpload className="mr-2" />
                  RESUME UPLOAD
                </label>
                <div className="flex items-center">
                  <label className="w-full flex items-center justify-center bg-black/40 border border-dashed border-indigo-500 rounded p-3 text-indigo-300 cursor-pointer hover:bg-black/60 transition-all">
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <FaFileUpload className="mr-2" />
                    {resumeFileName || "Upload your resume (PDF, DOC, DOCX)"}
                  </label>
                </div>
                {resumeFileName && (
                  <p className="mt-2 text-xs text-indigo-400">
                    Selected: {resumeFileName}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Understanding You
            </h2>
            
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
                rows={3}
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
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="If you had unlimited time and resources, what project or dream would you pursue?"
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              The Mindset Test
            </h2>
            
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="">Select a motto</option>
                  <option value="Learn and Adapt">&quot;Learn and Adapt&quot;</option>
                  <option value="Build Fearlessly">&quot;Build Fearlessly&quot;</option>
                  <option value="Create with Purpose">&quot;Create with Purpose&quot;</option>
                  <option value="Lead with Heart">&quot;Lead with Heart&quot;</option>
                  <option value="Grow Together">&quot;Grow Together, Shine Together&quot;</option>
                </select>
              </div>
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
                placeholder="If you could change one thing about your college, what would it be?"
              />
            </div>
          </div>
        );
        
      case 4: // New step for deeper mindset questions
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Your Journey
            </h2>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaLightbulb className="mr-2" />
                WHY DO YOU WANT TO JOIN QYNEX NEXORA?
              </label>
              <textarea
                name="joinReason"
                value={formData.joinReason}
                onChange={handleChange}
                required
                rows={2}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Share your motivations and what you hope to gain from this community"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaNetworkWired className="mr-2" />
                TELL US ABOUT YOUR FIELD OF INTEREST
              </label>
              <textarea
                name="fieldExperience"
                value={formData.fieldExperience}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="What technology/field are you passionate about? What experience have you gained so far?"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaBrain className="mr-2" />
                YOUR FUTURE ROADMAP
              </label>
              <textarea
                name="futurePlans"
                value={formData.futurePlans}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="What are your plans for the upcoming years and what steps are you taking to achieve them?"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaCode className="mr-2" />
                SHARE A LEADERSHIP EXPERIENCE
              </label>
              <textarea
                name="initiativeStory"
                value={formData.initiativeStory}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Describe a time when you took initiative to solve a problem or lead a project. What challenges did you face and what was the outcome?"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaLightbulb className="mr-2" />
                YOUR PITCH FOR QYNEX NEXORA
              </label>
              <textarea
                name="eventIdea"
                value={formData.eventIdea}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Pitch an innovative event or initiative you think our community should organize this year"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaNetworkWired className="mr-2" />
                ANYTHING ELSE?
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={2}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Is there anything else you'd like us to know about you? (Optional)"
              />
            </div>
          </div>
        );
        
      case 5: // Previous case 4 (Availability)
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
              Availability & Contribution
            </h2>
            
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/50 p-4 rounded-lg border border-indigo-500/20">
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
                      checked={formData.roles.includes(role)}
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
        );
        
      case 6: // Previous case 5 (Agreement)
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">6</span>
              Agreement
            </h2>
            
            <div className="bg-black/50 p-5 rounded-lg border border-indigo-500/20">
              <div className="flex items-start mb-4">
                <input
                  type="checkbox"
                  id="agreement-respect"
                  name="agreement-respect"
                  onChange={handleCheckboxChange}
                  checked={formData.agreements.respect}
                  required
                  className="mt-1.5 mr-3 border-indigo-500 text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-black"
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
                  checked={formData.agreements.mindset}
                  required
                  className="mt-1.5 mr-3 border-indigo-500 text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-black"
                />
                <label htmlFor="agreement-mindset" className="text-indigo-200 text-sm">
                  I accept that participation in Qynex Nexora is based on mindset and commitment, not titles.
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-indigo-300 mb-4">
                You&apos;ve reached the final step. Once submitted, your application will be encrypted and transmitted to the Qynex Nexora neural network for processing.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Progress bar
  const ProgressBar = () => (
    <div className="w-full bg-black/50 h-1 rounded-full my-6">
      <div 
        className="bg-indigo-500 h-1 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
  
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
        <div className="rounded-xl p-6 sm:p-8 backdrop-blur-xl backdrop-filter bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center relative overflow-hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500">INITIALIZATION</span>
            </h1>
            <p className="text-sm text-center mb-4 text-indigo-300/80">
              &#123; v1.0 // sequence: 847392 &#125;
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 bg-black/40 backdrop-blur-sm border border-indigo-900/30 rounded-lg p-3 font-mono"
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

          {!isSubmitted ? (
            <>
              {/* Step indicator */}
              <div className="mb-4 flex justify-between items-center text-xs text-indigo-400">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{["Identity", "Mindscape", "Neural Patterns", "Your Journey", "Contribution", "Protocol"][currentStep-1]}</span>
              </div>
              
              <ProgressBar />
              
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-between mt-8 pt-4 border-t border-indigo-900/30">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-4 py-2 rounded flex items-center space-x-2 ${currentStep === 1 ? 'text-indigo-800 cursor-not-allowed' : 'text-indigo-300 hover:text-indigo-100'}`}
                    whileHover={currentStep !== 1 ? { scale: 1.03 } : {}}
                    whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
                  >
                    <FaArrowLeft className="mr-2" />
                    Back
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !isCurrentStepValid()}
                    className={`px-6 py-2 bg-indigo-900 hover:bg-indigo-800 text-indigo-100 rounded border border-indigo-700 transition duration-300 font-bold relative overflow-hidden flex items-center ${(isSubmitting || !isCurrentStepValid()) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: isCurrentStepValid() ? 1.03 : 1 }}
                    whileTap={{ scale: isCurrentStepValid() ? 0.98 : 1 }}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'PROCESSING...' : 
                       currentStep === totalSteps ? 'TRANSMIT DATA' : 'CONTINUE'}
                    </span>
                    {currentStep < totalSteps && <FaArrowRight className="ml-2" />}
                  </motion.button>
                </div>
                
                {submitError && (
                  <p className="text-red-400 text-sm text-center mt-2">
                    {submitError}
                  </p>
                )}
              </motion.form>
            </>
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
