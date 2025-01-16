export interface PersonalInfoData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

export interface JobDetailsData {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  style: 'professional' | 'casual' | 'enthusiastic';
}

export interface ExperienceData {
  workHistory: string;
  skills: string;
  education: string;
  achievements: string;
}

export interface FormData {
  personalInfo: PersonalInfoData;
  jobDetails: JobDetailsData;
  experience: ExperienceData;
}