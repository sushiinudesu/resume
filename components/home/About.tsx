export default function About() {
  return (
    <section id="about" className="flex flex-col items-center justify-center gap-6 px-4 py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-black dark:text-zinc-50">About Me</h2>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Add your about information here. Share your background, experience, and what drives you as a developer.
        </p>
      </div>
    </section>
  );
}
