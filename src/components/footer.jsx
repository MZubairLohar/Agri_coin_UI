import { MdOutlineArrowForwardIos } from "react-icons/md";

const Footer = () => {
    const ButtonWrapper = () => {
        return (
          <div className="flex items-center justify-center">
            <NeumorphismButton />
          </div>
        );
      };
      
      const NeumorphismButton = () => {
        return (
          <button
            className="
              px-6 py-2 rounded-full 
              border border-amber-50
              flex items-center gap-2 
              text-[#6F9D7E] bg-[#FFE990]
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
            "
          >
            <span>Donate</span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
              <MdOutlineArrowForwardIos className="text-[#6F9D7E] text-md" />
            </div>
          </button>
        );
      };

  return (
    <footer className="relative py-12 mt-10 overflow-hidden bg-[#6F9D7E]">
      {/* Background Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#6F9D7E] opacity-90"></div>
        <div className="absolute w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-sigma-glow top-[-10%] right-[-10%] opacity-20"></div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Logo */}
          <h2 className="text-2xl font-bold gradient-text">AGRI</h2>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            {["About", "Whitepaper", "Roadmap", "DAO", "FAQ", "Support"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white/60 hover:text-white text-base md:text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
           <ButtonWrapper />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 mt-6 text-center">
          <div className="flex justify-center items-center space-y-4 md:space-y-0">
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300"
            >
              Terms & Conditions | Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
