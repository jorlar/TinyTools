'use client';

import { useState } from 'react';

export default function Base64() {
  const [text, setText] = useState('');
  const [base64, setBase64] = useState('');

  const encodeToBase64 = (input: string) => {
    try {
      return btoa(input);
    } catch (err) {
      return 'Error: Invalid input for encoding';
    }
  };

  const decodeFromBase64 = (input: string) => {
    try {
      return atob(input);
    } catch (err) {
      return 'Error: Invalid Base64 input';
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setBase64(encodeToBase64(newText));
  };

  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBase64 = e.target.value;
    setBase64(newBase64);
    setText(decodeFromBase64(newBase64));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Base64 Encoder/Decoder</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text
          </label>
          <div className="relative">
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
              className="w-full h-32 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter text to encode..."
            />
            <button
              onClick={() => copyToClipboard(text)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="base64" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Base64
          </label>
          <div className="relative">
            <textarea
              id="base64"
              value={base64}
              onChange={handleBase64Change}
              className="w-full h-32 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter Base64 to decode..."
            />
            <button
              onClick={() => copyToClipboard(base64)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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