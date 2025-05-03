import { supabase } from './supabase-client';

// Define a type for the registration form data
export type RegistrationFormData = {
  fullName: string;
  registrationNumber: string;
  departmentYear: string;
  phoneNumber: string;
  email: string;
  personalProfile: string;
  threeWords: string;
  resume: File | null; // Add resume file field
  passions: string;
  // unlimitedProject: string; - Removed
  planFailReaction: string;
  groupRole: string;
  // motto: string; - Removed
  communityConcept: string;
  collegeChange: string;
  // timeCommitment: string; - Removed
  // New field
  githubLink: string;
  // New mindset questions
  joinReason: string;
  fieldExperience: string;
  futurePlans: string;
  initiativeStory: string;
  eventIdea: string;
  additionalInfo: string;  // Optional field
  roles: string[];
  agreements: {
    respect: boolean;
    noGadget: boolean;
    mindset: boolean;
  };
};

export async function submitRegistration(formData: RegistrationFormData) {
  try {
    let resumeUrl: string | null = null;
    
    // Upload resume to storage if provided
    if (formData.resume) {
      const fileExt = formData.resume.name.split('.').pop();
      const fileName = `${formData.registrationNumber.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;
      
      // Create a more secure file path with user's registration number
      const filePath = `public/${formData.registrationNumber.replace(/\s+/g, '_')}/${fileName}`;
      
      // Upload to Supabase storage - works for unauthenticated users with proper bucket policy
      const { error: fileError } = await supabase.storage
        .from('resumes')
        .upload(filePath, formData.resume, {
          cacheControl: '3600',
          upsert: false,
          contentType: getContentType(fileExt || ''),
        });
      
      if (fileError) {
        console.error('Resume upload error:', fileError);
        throw new Error(`Failed to upload resume: ${fileError.message}`);
      }
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);
      
      resumeUrl = data.publicUrl;
    }

    // Format the data to match the expected schema
    const submissionData = {
      full_name: formData.fullName,
      registration_number: formData.registrationNumber,
      department_year: formData.departmentYear,
      phone_number: formData.phoneNumber,
      email: formData.email,
      personal_profile: formData.personalProfile,
      three_words: formData.threeWords,
      passions: formData.passions,
      // unlimited_project: formData.unlimitedProject, - Removed
      plan_fail_reaction: formData.planFailReaction,
      group_role: formData.groupRole,
      // motto: formData.motto, - Removed
      community_concept: formData.communityConcept,
      college_change: formData.collegeChange,
      // time_commitment: formData.timeCommitment, - Removed
      github_link: formData.githubLink,
      join_reason: formData.joinReason,
      field_experience: formData.fieldExperience,
      future_plans: formData.futurePlans,
      initiative_story: formData.initiativeStory,
      event_idea: formData.eventIdea,
      additional_info: formData.additionalInfo,
      roles: formData.roles.join(', '),
      agreements: JSON.stringify(formData.agreements),
      resume_url: resumeUrl, // Add the resume URL to database record
      created_at: new Date().toISOString()
    };

    console.log('Submitting data to Supabase:', submissionData);

    // Use simple insert instead of upsert since we don't have unique constraints
    const { data, error } = await supabase
      .from('registrations')
      .insert([submissionData]);

    if (error) {
      console.error('Supabase insertion error:', error);
      throw new Error(`Failed to submit: ${error.message}`);
    }

    console.log('Submission successful:', data);
    return data;
  } catch (error) {
    console.error('Registration submission error:', error);
    throw error;
  }
}

// Helper function to set proper content type
function getContentType(extension: string): string {
  const contentTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Add more types as needed
  };
  
  return contentTypes[extension.toLowerCase()] || 'application/octet-stream';
}
