"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaArrowRight, FaArrowLeft, FaFileUpload, FaGraduationCap, FaPhone, FaEnvelope, FaGithub, FaUserAlt, FaFileAlt, FaTools, FaSchool, FaMapMarkerAlt } from 'react-icons/fa';
import { submitRegistration, type RegistrationFormData } from '@/lib/registration-service';

export default function RegistrationPage() {
  // Generate random sequence number for display
  const [sequenceNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    educationLevel: '',
    yearOfStudy: '',
    institutionName: '',
    phoneNumber: '',
    email: '',
    location: '',
    resume: null,
    passion: '', // New field for passion
    experience: '', // New field for experience
    skills: '', // Field for skills
    joinReason: '', // Why they want to join
    contribution: '', // How they would contribute
    agreements: {
      respect: false,
      mindset: false
    }
  });
  
  // Add state for tracking current step (reduced to 3 steps)
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [terminalText, setTerminalText] = useState("");
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const terminalFullText = "> Initializing connection sequence...\n> SYN - ACK...\n> Protocol awaiting verification...";
  
  // Add the terminal text typing effect
  useEffect(() => {
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
    
    return () => {
      clearInterval(typeInterval);
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
    
    if (name.startsWith('agreement-')) {
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
        return formData.fullName && formData.educationLevel && formData.institutionName &&
               formData.yearOfStudy && formData.phoneNumber && formData.email && formData.location;
      case 2: // Passion & Contribution
        return formData.passion && formData.experience && formData.skills && 
               formData.joinReason && formData.contribution && formData.resume !== null;
      case 3: // Agreement
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
                  <FaUserAlt className="mr-2" />
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="flex items-center text-xs text-indigo-300 mb-1">
                  <FaSchool className="mr-2" />
                  EDUCATION LEVEL
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  <option value="">Select your education level</option>
                  <option value="School">School</option>
                  <option value="Junior College">Junior College</option>
                  <option value="College/University">College/University</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center text-xs text-indigo-300 mb-1">
                  <FaGraduationCap className="mr-2" />
                  INSTITUTION NAME
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  placeholder="Name of your school/college"
                />
              </div>
              
              <div>
                <label className="flex items-center text-xs text-indigo-300 mb-1">
                  <FaGraduationCap className="mr-2" />
                  YEAR OF STUDY
                </label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  placeholder="e.g., 2nd Year, Final Year"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center text-xs text-indigo-300 mb-1">
                  <FaMapMarkerAlt className="mr-2" />
                  LOCATION
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label className="flex items-center text-xs text-indigo-300 mb-1">
                  <FaPhone className="mr-2" />
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  placeholder="Your mobile number"
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaEnvelope className="mr-2" />
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Your email"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Your Passion & Contribution
            </h2>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaLightbulb className="mr-2" />
                TELL US ABOUT YOUR PASSION
              </label>
              <textarea
                name="passion"
                value={formData.passion}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="What do you love to do or are best at? What drives you?"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaFileAlt className="mr-2" />
                YOUR EXPERIENCE
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Tell us about things you have done in this field (projects, work, etc.)"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaTools className="mr-2" />
                YOUR SKILLS
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Where do you fit in? What are your technical and soft skills?"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaGithub className="mr-2" />
                WHY JOIN OUR COMMUNITY?
              </label>
              <textarea
                name="joinReason"
                value={formData.joinReason}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="Why do you want to join our community? What are your expectations?"
              />
            </div>
            
            <div>
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaLightbulb className="mr-2" />
                HOW WOULD YOU CONTRIBUTE?
              </label>
              <textarea
                name="contribution"
                value={formData.contribution}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border border-indigo-500 rounded p-2 text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="How do you plan to contribute to our community?"
              />
            </div>
            
            <div className="mt-4">
              <label className="flex items-center text-xs text-indigo-300 mb-1">
                <FaFileAlt className="mr-2" />
                RESUME / CV
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
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-indigo-400 text-xl mb-6 flex items-center">
              <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-slate-200 flex flex-col items-center justify-center relative font-sans">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full max-w-2xl px-4 py-8"
      >
        <div className="rounded-xl p-6 sm:p-8 bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center relative overflow-hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500">INITIALIZATION</span>
            </h1>
            <p className="text-sm text-center mb-4 text-indigo-300/80">
              &#123; v1.0 // sequence: {sequenceNumber} &#125;
            </p>
          </motion.div>
          
          {/* Terminal text component */}
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
              <span>terminal_{sequenceNumber}</span>
            </div>
            <pre className="text-xs whitespace-pre-wrap text-indigo-100">{terminalText}</pre>
            <span className="inline-block h-4 w-2 bg-indigo-400 animate-pulse"></span>
          </motion.div>

          {!isSubmitted ? (
            <>
              {/* Step indicator */}
              <div className="mb-4 flex justify-between items-center text-xs text-indigo-400">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{["Basic Info", "Passion & Contribution", "Agreement"][currentStep-1]}</span>
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
              <p className="text-indigo-300 mb-6">Your application has been registered.</p>
              <p className="text-sm text-indigo-500">Stand by for further instructions.</p>
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
      
      <div className="m-8 text-xs text-indigo-700 text-center">
        <p>CONNECTION SECURED • RSA ENCRYPTION ENABLED • ALL TRANSMISSIONS ANONYMOUS</p>
      </div>
      
      <style jsx global>{`
        body {
          background: rgb(2,0,36);
          background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%);
        }
        
        input, select, textarea {
          transition: all 0.3s ease;
          background: rgba(0, 0, 0, 0.2) !important;
          border-color: rgba(79, 70, 229, 0.2) !important;
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
