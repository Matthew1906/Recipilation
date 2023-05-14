import { themeConfig } from "../../utils/theme";

const Footer = () => {
  return <footer className={`p-5 w-full flex justify-center items-center ${themeConfig['red']}`}>
    <div className="max-w-[1440px] w-full justify-center items-center">
      <p className="text-center font-nunito font-light text-xs md:text-sm text-white-primary">Copyright © Matthew1906's Recipe Blog Project 2022</p>
    </div>
  </footer>;
};

export default Footer;
