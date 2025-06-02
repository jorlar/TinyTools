'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About TinyTools</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A collection of useful developer tools to help you work more efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                Email: <a href="mailto:post@jornlarsen.no" className="text-blue-500 hover:text-blue-600">post@jornlarsen.no</a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                GitHub: <a href="https://github.com/jorlar/TinyTools" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub Repo</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {currentYear} TinyTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 