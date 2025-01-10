"use client";

import Link from "next/link";
import { navbarSections } from "./utils/navbarSections";
import { usePathname } from "next/navigation";

const Navbar = (): React.ReactElement => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-10">
      {navbarSections.map((section) => (
        <Link
          href={section.link}
          key={section.id}
          className={`text-sm font-bold tracking-wide uppercase ${pathname === section.link && "underline"}`}
        >
          {section.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
