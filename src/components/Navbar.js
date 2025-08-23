"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle login with SweetAlert
  const handleLogin = () => {
    Swal.fire({
      title: "Login with Google",
      text: "You'll be redirected to Google for authentication",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#6366f1", // indigo-500
      cancelButtonColor: "#3f3f46", // zinc-700
      confirmButtonText: "Continue",
      background: "#18181b", // zinc-900
      color: "#f4f4f5", // zinc-100
    }).then((result) => {
      if (result.isConfirmed) {
        signIn("google", { callbackUrl: "/products" });
      }
    });
  };

  // Handle logout with SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // red-500
      cancelButtonColor: "#3f3f46", // zinc-700
      confirmButtonText: "Logout",
      background: "#18181b", // zinc-900
      color: "#f4f4f5", // zinc-100
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-zinc-900/95 backdrop-blur-lg shadow-lg py-3"
          : "bg-zinc-900/80 backdrop-blur-md py-5"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-fit">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              imaginary
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link
                href="/products"
                className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-zinc-800/50"
              >
                Products
              </Link>

              {/* Only show Add Product link if user is logged in */}
              {session && (
                <Link
                  href="/dashboard/add-product"
                  className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-zinc-800/50"
                >
                  Add Product
                </Link>
              )}

              {session ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-800/95 backdrop-blur-lg border-t border-zinc-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/products"
              className="text-zinc-300 hover:bg-zinc-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            {/* Only show Add Product link if user is logged in */}
            {session && (
              <Link
                href="/dashboard/add-product"
                className="text-zinc-300 hover:bg-zinc-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Product
              </Link>
            )}

            {session ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}