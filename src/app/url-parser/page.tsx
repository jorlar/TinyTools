'use client';

import { useState } from 'react';

export default function URLParser() {
  const [url, setUrl] = useState('');
  const [parsed, setParsed] = useState<{
    protocol: string;
    host: string;
    path: string;
    query: string;
  }>({
    protocol: '',
    host: '',
    path: '',
    query: '',
  });

  const parseURL = () => {
    try {
      const urlObj = new URL(url);
      setParsed({
        protocol: urlObj.protocol,
        host: urlObj.host,
        path: urlObj.pathname,
        query: urlObj.search,
      });
    } catch (err) {
      setParsed({
        protocol: '',
        host: '',
        path: '',
        query: '',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">URL Parser</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter URL..."
          />
        </div>
        <button
          onClick={parseURL}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Parse
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Parsed URL
          </label>
          <pre className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white overflow-auto">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 