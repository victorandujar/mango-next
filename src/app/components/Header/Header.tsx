import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";

const Header = (): React.ReactElement => {
  return (
    <header className="w-full flex justify-center items-center px-4">
      <Link href={"/"}>
        <Image src={"/mango-logo.png"} alt="logo" width={150} height={100} />
      </Link>
      <section className="absolute right-20 mobile:top-32">
        <Navbar />
      </section>
    </header>
  );
};

export default Header;
