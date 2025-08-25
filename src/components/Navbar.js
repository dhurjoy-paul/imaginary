"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
    ${isScrolled ? "bg-zinc-900/95 backdrop-blur-lg shadow-lg py-5" : "bg-zinc-900/80 backdrop-blur-md py-5"}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-0% to-purple-500 font-clash-display font-semibold">
            imaginary
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 text-base md:text-lg lg:text-xl font-clash-display font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            {session && <NavLink href="/dashboard/add-product">Add Product</NavLink>}
            {session ? (
              <button onClick={() => signOut()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 lg:px-6 py-2 rounded-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap ml-4">Logout</button>
            ) : (
              <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 lg:px-6 py-2 rounded-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap ml-4">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
          >
            {!isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-800/95 backdrop-blur-lg border-t border-zinc-700">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="py-2 space-y-1">
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="block text-zinc-300 hover:bg-zinc-700 hover:text-white px-3 py-3 rounded-md text-base transition-colors"
              >
                Products
              </Link>
              {session && (
                <Link
                  href="/dashboard/add-product"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-zinc-300 hover:bg-zinc-700 hover:text-white px-3 py-3 rounded-md text-base transition-colors"
                >
                  Add Product
                </Link>
              )}
              {session ? (
                <button
                  onClick={() => { signOut(); setIsMenuOpen(false); }}
                  className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-3 rounded-md text-base transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-3 rounded-md text-base transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}