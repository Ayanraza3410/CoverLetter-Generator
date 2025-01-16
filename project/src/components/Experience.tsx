import React from 'react';
import { ExperienceData } from '../types';
import { Loader2 } from 'lucide-react';

interface Props {
  data: ExperienceData;
  onChange: (data: Partial<ExperienceData>) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export function Experience({ data, onChange, onGenerate, onBack, isGenerating }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experience & Qualifications</h2>
      
      <div className="space-y-6">
        <div className="group">
          <label className="form-label">Work History</label>
          <textarea
            rows={4}
            required
            value={data.workHistory}
            onChange={(e) => onChange({ workHistory: e.target.value })}
            className="form-textarea group-hover:shadow-md"
            placeholder="Summarize your relevant work experience..."
          />
        </div>

        <div className="group">
          <label className="form-label">Skills</label>
          <textarea
            rows={3}
            required
            value={data.skills}
            onChange={(e) => onChange({ skills: e.target.value })}
            className="form-textarea group-hover:shadow-md"
            placeholder="List your key skills and competencies..."
          />
        </div>

        <div className="group">
          <label className="form-label">Education</label>
          <textarea
            rows={2}
            required
            value={data.education}
            onChange={(e) => onChange({ education: e.target.value })}
            className="form-textarea group-hover:shadow-md"
            placeholder="Your educational background..."
          />
        </div>

        <div className="group">
          <label className="form-label">Notable Achievements</label>
          <textarea
            rows={3}
            value={data.achievements}
            onChange={(e) => onChange({ achievements: e.target.value })}
            className="form-textarea group-hover:shadow-md"
            placeholder="List any relevant achievements or accomplishments..."
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
          disabled={isGenerating}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Cover Letter'
          )}
        </button>
      </div>
    </form>
  );
}