"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Fetching random products...");
        // Fetch random 6 products for the featured section
        const response = await fetch('/api/products/random?count=6');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Random products fetched:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        // Fallback to static data if API fails
        setProducts([
          {
            id: 1,
            name: "Premium Headphones",
            description: "Immersive sound experience with noise cancellation",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 2,
            name: "Smart Watch",
            description: "Track your fitness and stay connected",
            price: 249.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 3,
            name: "Wireless Earbuds",
            description: "Crystal clear audio in a compact design",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogin = () => {
    Swal.fire({
      title: "Login with Google",
      text: "You'll be redirected to Google for authentication",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Continue",
      background: "#18181b",
      color: "#f4f4f5",
    }).then((result) => {
      if (result.isConfirmed) {
        signIn("google", { callbackUrl: "/" });
      }
    });
  };

  if (loading && isMounted) {
    return <Loading />;
  }

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-28 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Discover Premium Products
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Curated selection of high-quality items at unbeatable prices. Elevate your lifestyle with our exclusive collection.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href='/products' className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg">
                Shop Now
              </Link>
              <Link href='#' className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </section>

      {/* Product Highlights Section */}
      <section className="py-20 bg-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products designed to enhance your everyday life.
            </p>
          </div>
          {error ? (
            <div className="text-center py-10">
              <p className="text-red-400 mb-4">Unable to load products. Showing sample products instead.</p>
              <p className="text-zinc-500 text-sm">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product._id} className="bg-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-zinc-400 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-indigo-400">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <Link
                        href={`/products/${product._id}`}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href='/products' className="px-6 py-3 border border-zinc-700 hover:bg-zinc-800 rounded-lg font-medium transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose imaginary</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with these core values.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description: "Get your products delivered within 24 hours with our express shipping options.",
                icon: "🚀"
              },
              {
                title: "Secure Payments",
                description: "Your transactions are protected with bank-level security and encryption.",
                icon: "🔒"
              },
              {
                title: "Premium Quality",
                description: "All our products are carefully selected and tested for quality assurance.",
                icon: "⭐"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-zinc-800/50 p-8 rounded-2xl text-center transition-all duration-300 hover:bg-zinc-800">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-zinc-300 mb-10">
              Join thousands of satisfied customers and discover the imaginary difference today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={handleLogin} className="px-8 py-3 bg-white text-zinc-900 hover:bg-zinc-200 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg">
                Create Account
              </button>
              <Link href='/products' className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}