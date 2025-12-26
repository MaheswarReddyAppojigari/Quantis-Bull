import { NavLink } from "react-router";

const Title = () => (
  <a href="#">
    <img
      className="logo"
      alt="my logo"
      src="..\QUANTISBULL.jpg"
      style={{ height: "60px", width: "auto" }} // Increased the logo size
    />
  </a>
);

const Header = () => {
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6"> 
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="..\QUANTISBULL.jpg"
          className="h-16" 
          alt="Flowbite Logo"
        />
        <span className="self-center text-3xl text-heading font-semibold whitespace-nowrap">
          Quantis Bull
        </span>
      </a>
      
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
          <li>
            <a
              href="#"
              className="block py-3 px-5 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <NavLink to='/stock'
              href="#"
              className="block py-3 px-5 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
            >
              Stocks
            </NavLink>
          </li>
          <li>
            <NavLink to='/crypto'
              href="#"
              className="block py-3 px-5 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
            >
              Crypto
            </NavLink>
          </li>
          <li>
            <NavLink to='forex'
              href="#"
              className="block py-3 px-5 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
            >
              Forex
            </NavLink>
          </li>
          <li>
            <NavLink to='chatbot'
              href="#"
              className="block py-3 px-5 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
            >
              Chat Bot
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

