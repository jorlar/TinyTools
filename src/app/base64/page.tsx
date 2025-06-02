'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function Base64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConversion = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (err) {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Base64 Encoder/Decoder</h1>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'encode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mode === 'decode'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Decode
          </button>
        </div>
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder={`Enter text to ${mode}...`}
          />
        </div>
        <button
          onClick={handleConversion}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <pre
            id="output"
            className="w-full h-32 p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white overflow-auto"
          >
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
} 