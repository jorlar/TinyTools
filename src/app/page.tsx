import Link from 'next/link';

const tools = [
  {
    name: 'UUID Generator',
    description: 'Generate and copy UUIDs with ease',
    path: '/uuid',
    icon: '🔑',
  },
  {
    name: 'Slugify',
    description: 'Convert text to URL-friendly slugs',
    path: '/slugify',
    icon: '🔗',
  },
  {
    name: 'Base64',
    description: 'Encode and decode Base64 strings',
    path: '/base64',
    icon: '📝',
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          TinyTools
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A collection of useful developer tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 