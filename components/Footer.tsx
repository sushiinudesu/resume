export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
