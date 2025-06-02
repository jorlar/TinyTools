'use client';

import { useState } from 'react';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Markdown Preview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="markdown" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Markdown Input
          </label>
          <textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-64 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Write your markdown here..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview
          </label>
          <div
            className="w-full h-64 p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white overflow-auto"
            dangerouslySetInnerHTML={{ __html: markdown }}
          />
        </div>
      </div>
    </div>
  );
} 