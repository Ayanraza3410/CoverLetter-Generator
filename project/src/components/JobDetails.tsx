import React from 'react';
import { JobDetailsData } from '../types';

interface Props {
  data: JobDetailsData;
  onChange: (data: Partial<JobDetailsData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function JobDetails({ data, onChange, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            required
            value={data.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            required
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description/Requirements</label>
          <textarea
            rows={4}
            value={data.jobDescription}
            onChange={(e) => onChange({ jobDescription: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Paste the job description or key requirements here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Writing Style</label>
          <select
            value={data.style}
            onChange={(e) => onChange({ style: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  );
}