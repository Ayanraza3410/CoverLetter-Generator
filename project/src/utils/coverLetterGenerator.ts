import { FormData } from '../types';

const getStyleSpecificOpening = (style: string, companyName: string) => {
  switch (style) {
    case 'casual':
      return `Hi ${companyName} team,`;
    case 'enthusiastic':
      return `Dear ${companyName} Hiring Team,\n\nI'm thrilled to apply for`;
    default:
      return `Dear Hiring Manager,\n\nI am writing to express my interest in`;
  }
};

const getStyleSpecificClosing = (style: string) => {
  switch (style) {
    case 'casual':
      return "Looking forward to discussing this opportunity further!";
    case 'enthusiastic':
      return "I'm excited about the possibility of joining your team and would welcome the opportunity to discuss how I can contribute to your success.";
    default:
      return "Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your organization.";
  }
};

export const generateCoverLetter = (formData: FormData): string => {
  const { personalInfo, jobDetails, experience } = formData;
  const opening = getStyleSpecificOpening(jobDetails.style, jobDetails.companyName);
  const closing = getStyleSpecificClosing(jobDetails.style);

  const letter = `${personalInfo.fullName}
${personalInfo.email}
${personalInfo.phone}
${personalInfo.location}

${new Date().toLocaleDateString()}

${opening} the ${jobDetails.jobTitle} position at ${jobDetails.companyName}.

With ${experience.workHistory}

My key skills include ${experience.skills}

${experience.education}

${experience.achievements ? `Some of my notable achievements include ${experience.achievements}\n` : ''}

${closing}

Best regards,
${personalInfo.fullName}`;

  return letter;
}