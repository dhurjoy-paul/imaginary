"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const productId = params.id;
  const { data: session } = useSession();
  const router = useRouter();

  const isOwner = session && product && session.user.email === product.userEmail;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        setRelatedLoading(true);
        const response = await fetch(`/api/products/random?count=3&excludeId=${productId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setRelatedProducts(data);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [productId]);

  const handleDeleteProduct = async () => {
    const result = await Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to delete this product? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Yes, delete it!",
      background: "#18181b",
      color: "#f4f4f5",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
        if (response.ok) {
          await Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
            confirmButtonColor: "#6366f1",
            background: "#18181b",
            color: "#f4f4f5",
          });
          router.push("/products");
        } else {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete product. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#18181b",
          color: "#f4f4f5",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-zinc-400 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
          >
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <Navbar />
      {/* Product Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Products
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-zinc-800 rounded-2xl overflow-hidden relative h-96 w-full">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Product Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-indigo-400 font-bold mb-6">${Number(product.price || 0).toFixed(2)}</p>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-zinc-300">{product.description}</p>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Details</h2>
                <p className="text-zinc-300">{product.details}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors flex-1">
                  Add to Cart
                </button>
                <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors flex-1">
                  Buy Now
                </button>
                {isOwner && (
                  <button
                    onClick={handleDeleteProduct}
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex-1"
                  >
                    Delete Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-20 bg-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Products</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover more products that complement your selection.
            </p>
          </div>

          {relatedLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="bg-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="h-48 relative">
                    <Image
                      src={relatedProduct.image || "/placeholder.png"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{relatedProduct.name}</h3>
                    <p className="text-zinc-400 mb-4">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-indigo-400">
                        ${Number(relatedProduct.price || 0).toFixed(2)}
                      </span>
                      <Link
                        href={`/products/${relatedProduct._id}`}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
