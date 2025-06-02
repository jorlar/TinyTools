'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'icon';
}

export default function CopyButton({ text, className = '', variant = 'default' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
        title="Copy to clipboard"
      >
        {copied ? (
          <span className="text-green-500">✓</span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">📋</span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`}
    >
      {copied ? '✓' : 'Copy'}
    </button>
  );
} 