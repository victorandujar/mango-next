import Image from "next/image";

const Header = (): React.ReactElement => {
  return (
    <header className="w-full flex justify-center">
      <Image src={"/mango-logo.png"} alt="logo" width={150} height={100} />
    </header>
  );
};

export default Header;
