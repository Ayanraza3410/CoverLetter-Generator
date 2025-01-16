import React, { useState, useEffect } from 'react';
import { FormData } from '../types';
import { RefreshCw, Download, ArrowLeft, Copy, Check } from 'lucide-react';

interface Props {
  coverLetter: string;
  formData: FormData;
  onBack: () => void;
  onRegenerateClick: () => void;
}

export function CoverLetterPreview({ coverLetter, formData, onBack, onRegenerateClick }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState(coverLetter);
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = (isEditing ? editedLetter : coverLetter).trim().split(/\s+/).length;
    setWordCount(words);
  }, [coverLetter, editedLetter, isEditing]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(isEditing ? editedLetter : coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([isEditing ? editedLetter : coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${formData.jobDetails.companyName.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Your Cover Letter</h2>
          <p className="text-sm text-gray-500 mt-1">Word count: {wordCount}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary"
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>
          <button
            onClick={handleCopy}
            className="btn-secondary"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={onRegenerateClick}
            className="btn-secondary"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedLetter}
          onChange={(e) => setEditedLetter(e.target.value)}
          className="w-full h-[600px] p-6 font-mono text-sm rounded-lg border border-gray-200 
                   shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                   transition-all duration-200"
        />
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap
                      border border-gray-200 shadow-inner min-h-[600px]">
          {editedLetter || coverLetter}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Experience
        </button>
      </div>
    </div>
  );
}