'use client';

import { useState } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g');
      const found = testString.match(regex) || [];
      setMatches(found);
    } catch (err) {
      setMatches(['Invalid regex pattern']);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Regex Tester</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Regex Pattern
          </label>
          <input
            id="pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter regex pattern..."
          />
        </div>
        <div>
          <label htmlFor="testString" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Test String
          </label>
          <textarea
            id="testString"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full h-32 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter test string..."
          />
        </div>
        <button
          onClick={testRegex}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Test
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Matches
          </label>
          <pre className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white overflow-auto">
            {matches.join(', ')}
          </pre>
        </div>
      </div>
    </div>
  );
} 