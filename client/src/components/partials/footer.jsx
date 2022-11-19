import themeConfig from "../theme";

const Footer = () => {
  return <footer className={`p-5 w-full flex justify-center items-center ${themeConfig['red']}`}>
    <p className="font-nunito font-light text-sm text-white-primary">Copyright © Matthew1906's Recipe Blog Project 2022</p>
  </footer>;
};

export default Footer;
