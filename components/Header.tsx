import { ActiveLink } from "./ActiveLink";
import { CardIcon } from "./Cart/CartIcon";

export const Header = () => {
  return (
    <div className="w-full flex justify-center bg-gray-800 ">
      <header className="w-full max-w-5xl   gap-4 items-center  flex text-white justify-between px-4 py-2">
        <nav className="flex gap-4  ">
          <ActiveLink href={"/"}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href={"/about/"}>
            <a>About</a>
          </ActiveLink>
          <ActiveLink href={"/products/"}>
            <a>Products</a>
          </ActiveLink>
        </nav>
        <CardIcon />
      </header>
    </div>
  );
};
