import { supabase } from './supabase-client';

// Define a type for the registration form data
export type RegistrationFormData = {
  fullName: string;
  educationLevel: string;
  yearOfStudy: string;
  institutionName: string;
  phoneNumber: string;
  email: string;
  location: string;
  resume: File | null;
  passion: string;    // New field about user's passion
  experience: string; // New field about user's experience
  skills: string;     // Field for user's skills
  joinReason: string; // Why they want to join
  contribution: string; // How they would contribute
  agreements: {
    respect: boolean;
    mindset: boolean;
  };
};

export async function submitRegistration(formData: RegistrationFormData) {
  try {
    let resumeUrl: string | null = null;
    
    // Upload resume to storage if provided
    if (formData.resume) {
      const fileExt = formData.resume.name.split('.').pop();
      const fileName = `${formData.fullName.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;
      const email = formData.email.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize email for file name
      
      // Create a more secure file path with user's name
      const filePath = `public/${formData.fullName.replace(/\s+/g, '_')}_${email}/${fileName}`;
      
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
      education_level: formData.educationLevel,
      year_of_study: formData.yearOfStudy,
      institution_name: formData.institutionName,
      phone_number: formData.phoneNumber,
      email: formData.email,
      location: formData.location,
      passion: formData.passion,
      experience: formData.experience,
      skills: formData.skills,
      join_reason: formData.joinReason,
      contribution: formData.contribution,
      respect_agreement: formData.agreements.respect,
      mindset_agreement: formData.agreements.mindset,
      resume_url: resumeUrl,
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
