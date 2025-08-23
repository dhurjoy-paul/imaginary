export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-zinc-400">&copy; {new Date().getFullYear()} imaginary. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>

        </div>
      </div>
    </footer>
  );
}