import Image from "next/image";
import Navbar from "../Navbar/Navbar";

const Header = (): React.ReactElement => {
  return (
    <header className="w-full flex justify-center items-center px-4">
      <Image src={"/mango-logo.png"} alt="logo" width={150} height={100} />
      <section className="absolute right-20">
        <Navbar />
      </section>
    </header>
  );
};

export default Header;
