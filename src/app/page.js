"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

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
        const response = await fetch("/api/products/random?count=6");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setProducts([
          {
            id: 1,
            name: "Premium Headphones",
            description: "Immersive sound experience with noise cancellation",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 2,
            name: "Smart Watch",
            description: "Track your fitness and stay connected",
            price: 249.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 3,
            name: "Wireless Earbuds",
            description: "Crystal clear audio in a compact design",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isMounted || loading) return <Loading />;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="h-20 bg-zinc-800" />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 pt-28 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1950&q=80"
          alt="Hero background"
          fill
          className="object-cover opacity-25 absolute inset-0"
          priority
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-zinc-100 tracking-wider font-clash-display">
            Discover Premium <br /> Products
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Curated selection of high-quality items at unbeatable prices. Elevate your lifestyle with our exclusive collection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="#"
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent" />
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-zinc-800/50">
        <h1 className="text-3xl md:text-4xl font-bold mb-15 text-white text-center">
          Collect latest deals
        </h1>
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-10 text-red-400">
              <p className="mb-2">Unable to load products. Showing sample products instead.</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(products) &&
              products.map((product) => (
                <div key={product._id || product.id} className="bg-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-zinc-400 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-indigo-400">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                      <Link
                        href={`/products/${product._id || product.id}`}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-15">
          <Link href="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md text-base transition-colors"
          >
            Browse more
          </Link>
        </div>
      </section>
    </div>
  );
}
