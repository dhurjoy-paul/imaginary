"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative group px-3 py-2 h-fit hover:text-white transition-colors duration-300
  ${isActive ? "text-white" : "text-zinc-300"}`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-500 
        ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );
}
