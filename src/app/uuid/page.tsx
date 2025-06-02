'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => uuidv4());
    setUuids(newUuids);
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">UUID Generator</h1>
      
      <div className="flex gap-4 items-center">
        <input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-24 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={generateUUIDs}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, index) => (
          <div
            key={uuid}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <code className="text-sm text-gray-800 dark:text-gray-200">{uuid}</code>
            <button
              onClick={() => copyToClipboard(uuid)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 