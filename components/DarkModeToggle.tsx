'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is already enabled
    const theme = document.documentElement.getAttribute('data-theme');
    const isDarkMode = theme === 'dark';
    setIsDark(isDarkMode);

    // Also check localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    } else if (savedMode === 'false') {
      document.documentElement.setAttribute('data-theme', 'light');
      setIsDark(false);
    }
  }, []);

  const handleToggle = () => {
    const newState = !isDark;
    setIsDark(newState);

    if (newState) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('darkMode', String(newState));
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-gray-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
}
