'use client';

import { useState } from 'react';

export default function Slugify() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[æøå]/g, (match) => {
        const map: { [key: string]: string } = {
          'æ': 'ae',
          'ø': 'o',
          'å': 'a'
        };
        return map[match] || match;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    setSlug(generateSlug(newInput));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slug);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Slugify Tool</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            className="w-full h-32 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter text to convert to slug..."
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Generated Slug
          </label>
          <div className="flex items-center gap-2">
            <input
              id="slug"
              type="text"
              value={slug}
              readOnly
              className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 