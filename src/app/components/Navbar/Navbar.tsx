import Link from "next/link";
import { navbarSections } from "./utils/navbarSections";

const Navbar = (): React.ReactElement => {
  return (
    <nav className="flex items-center gap-10">
      {navbarSections.map((section) => (
        <Link
          href={section.link}
          key={section.id}
          className="text-sm font-bold tracking-wide uppercase"
        >
          {section.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
