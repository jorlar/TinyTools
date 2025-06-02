'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setUuids([uuid, ...uuids].slice(0, 10));
  };

  const clearUUIDs = () => {
    setUuids([]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">UUID Generator</h1>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={generateUUID}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate UUID
          </button>
          <button
            onClick={clearUUIDs}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated UUIDs
            </label>
            {uuids.length > 0 && <CopyButton text={uuids.join('\n')} />}
          </div>
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <code className="text-gray-900 dark:text-white">{uuid}</code>
                <CopyButton text={uuid} variant="icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 