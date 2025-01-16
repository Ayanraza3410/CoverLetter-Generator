import React, { useState } from 'react';
import { FileText, Briefcase, GraduationCap, Award, Send, Sparkles } from 'lucide-react';
import { PersonalInfo } from './components/PersonalInfo';
import { JobDetails } from './components/JobDetails';
import { Experience } from './components/Experience';
import { CoverLetterPreview } from './components/CoverLetterPreview';
import { generateCoverLetter } from './utils/coverLetterGenerator';
import type { FormData } from './types';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: ''
    },
    jobDetails: {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      style: 'professional'
    },
    experience: {
      workHistory: '',
      skills: '',
      education: '',
      achievements: ''
    }
  });
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    setStep(current => {
      const element = document.getElementById('form-container');
      element?.classList.add('slide-out');
      setTimeout(() => {
        element?.classList.remove('slide-out');
        element?.classList.add('slide-in');
        setTimeout(() => {
          element?.classList.remove('slide-in');
        }, 500);
      }, 300);
      return current + 1;
    });
  };

  const handleBack = () => {
    setStep(current => {
      const element = document.getElementById('form-container');
      element?.classList.add('slide-out-reverse');
      setTimeout(() => {
        element?.classList.remove('slide-out-reverse');
        element?.classList.add('slide-in-reverse');
        setTimeout(() => {
          element?.classList.remove('slide-in-reverse');
        }, 500);
      }, 300);
      return current - 1;
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const letter = generateCoverLetter(formData);
      setCoverLetter(letter);
      setIsGenerating(false);
      setStep(4);
    }, 1500);
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Cover Letter Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Create a professional cover letter in minutes</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4 mb-8">
            {[
              { icon: FileText, label: 'Personal Info' },
              { icon: Briefcase, label: 'Job Details' },
              { icon: GraduationCap, label: 'Experience' },
              { icon: Award, label: 'Preview' }
            ].map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center ${
                  index < step ? 'text-blue-600' : 'text-gray-400'
                } transition-colors duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                    index + 1 === step
                      ? 'bg-blue-600 text-white scale-110 shadow-lg'
                      : index + 1 < step
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="ml-2 text-sm font-medium">{item.label}</span>
                {index < 3 && (
                  <div className={`w-12 h-0.5 ml-2 transition-colors duration-300 ${
                    index < step - 1 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          <div id="form-container" className="bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 transform hover:shadow-lg">
            {step === 1 && (
              <PersonalInfo
                data={formData.personalInfo}
                onChange={(data) => updateFormData('personalInfo', data)}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <JobDetails
                data={formData.jobDetails}
                onChange={(data) => updateFormData('jobDetails', data)}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 3 && (
              <Experience
                data={formData.experience}
                onChange={(data) => updateFormData('experience', data)}
                onGenerate={handleGenerate}
                onBack={handleBack}
                isGenerating={isGenerating}
              />
            )}
            {step === 4 && (
              <CoverLetterPreview
                coverLetter={coverLetter}
                onBack={handleBack}
                formData={formData}
                onRegenerateClick={handleGenerate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;