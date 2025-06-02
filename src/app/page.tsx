'use client';

import Link from 'next/link';

export default function Home() {
  const tools = [
    { name: 'UUID Generator', path: '/uuid', description: 'Generate random UUIDs', icon: '🔑' },
    { name: 'Slugify', path: '/slugify', description: 'Convert text to URL-friendly slugs', icon: '🔗' },
    { name: 'Base64', path: '/base64', description: 'Encode and decode Base64 strings', icon: '📝' },
    { name: 'JSON Formatter', path: '/json-formatter', description: 'Format and validate JSON data', icon: '📋' },
    { name: 'Color Picker', path: '/color-picker', description: 'Pick colors and convert between formats', icon: '🎨' },
    { name: 'URL Parser', path: '/url-parser', description: 'Parse and analyze URLs', icon: '🌐' },
    { name: 'Markdown Preview', path: '/markdown-preview', description: 'Preview markdown in real-time', icon: '📝' },
    { name: 'Code Minifier', path: '/code-minifier', description: 'Minify your code', icon: '⚡' },
    { name: 'Regex Tester', path: '/regex-tester', description: 'Test regular expressions', icon: '🔍' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">TinyTools</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">A collection of useful developer tools</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 