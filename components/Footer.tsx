export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/60 py-8 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="font-barlow font-bold text-2xl text-white">MZ</span>
          <span className="font-barlow font-bold text-2xl text-violet-400">.</span>
        </div>
        <p className="text-zinc-500 text-sm text-right">
          {`© ${new Date().getFullYear()} Muhammad Zain. Built with Next.js.`}
        </p>
      </div>
    </footer>
  );
}
