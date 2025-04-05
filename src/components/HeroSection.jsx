function Herosection () {

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
              px-8 py-2 rounded-full 
              border border-blue-600
              flex items-center gap-2 
              text-blue-600 bg-white
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
            "
          >
            <span>Join Us</span>
          </button>
        );
      };
      
      const ButtonWrapper1 = () => {
        return (
          <div className="flex items-center justify-center">
            <NeumorphismButton1 />
          </div>
        );
      };
      
      const NeumorphismButton1 = () => {
        return (
          <button
            className="
              px-8 py-2 rounded-full 
              border border-amber-50
              flex items-center gap-2 
              bg-[#1BCDB2]
              text-white
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-white
            "
          >
            <span>Donate</span>
          </button>
        );
      };

    return(
        <>
         <div
        className="relative min-h-screen flex flex-col items-center text-center px-4 md:px-10 lg:px-20 
        bg-white bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-30"></div>

        <div className="z-10 pt-8 flex flex-col items-center w-full max-w-[90%] sm:max-w-[80%] md:max-w-[100%] lg:w-full space-y-4 md:space-y-6">
          <h1 className="text-2xl w-2/4 sm:text-3xl md:text-4xl font-bold text-black">
            The Future of Stable, Precious Metal-Backed Digital
          </h1>

          <h2 className="text-sm sm:text-md md:text-lg w-2/4 font-semibold text-black">
            A decentralized currency secured by gold & silver, designed for financial stability, growth, and real-world impact
          </h2>

          <div className="flex flex-wrap gap-3 justify-center">
            <ButtonWrapper />
            <ButtonWrapper1 />
          </div>

          <div className="flex flex-wrap gap-4 md:gap-12 justify-center">
            <div className="space-y-4 -mt-20">
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-2xl" src="/farm-pic.jpg" />
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-24 rounded-2xl" src="/farm-pic3.jpg" />
            </div>
            <img className="w-24 h-24 sm:w-32 mt-8 sm:h-32 md:w-48 md:h-48 rounded-2xl" src="/farm-pic4.jpg" />
            <img className="w-20 h-20 md:w-28 md:h-28 mt-28 rounded-2xl" src="/farm-pic2.jpg" />
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 mt-8 md:h-48 rounded-2xl" src="/farm-pic4.jpg" />
            <div className="space-y-4 -mt-20">
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-24 rounded-2xl" src="/farm-pic3.jpg" />
            <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-2xl" src="/farm-pic.jpg" />
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Herosection;