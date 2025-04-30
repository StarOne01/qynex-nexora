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
  passions: string;
  unlimitedProject: string;
  planFailReaction: string;
  groupRole: string;
  motto: string;
  communityConcept: string;
  collegeChange: string;
  timeCommitment: string;
  roles: string[];
  agreements: {
    respect: boolean;
    noGadget: boolean;
    mindset: boolean;
  };
};

export async function submitRegistration(formData: RegistrationFormData) {
  try {
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
      unlimited_project: formData.unlimitedProject,
      plan_fail_reaction: formData.planFailReaction,
      group_role: formData.groupRole,
      motto: formData.motto,
      community_concept: formData.communityConcept,
      college_change: formData.collegeChange,
      time_commitment: formData.timeCommitment,
      roles: formData.roles.join(', '),
      agreements: JSON.stringify(formData.agreements),
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
