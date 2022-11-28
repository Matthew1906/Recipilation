import themeConfig from "../theme";

const Footer = () => {
  return <footer className={`p-5 w-full flex justify-center items-center ${themeConfig['red']}`}>
    <p className="text-center font-nunito font-light text-xs md:text-sm text-white-primary">Copyright © Matthew1906's Recipe Blog Project 2022</p>
  </footer>;
};

export default Footer;
