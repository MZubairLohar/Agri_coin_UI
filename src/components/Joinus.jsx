import { FaRegHeart } from "react-icons/fa";

function Joinus () {
    const ButtonWrapper = () => {
        return (
          <div className="bg-slate-100 flex items-center justify-center">
            <NeumorphismButton />
          </div>
        );
      };
      
      const NeumorphismButton = () => {
        return (
          <button
            className={`
              px-8 py-2 rounded-full 
              flex items-center gap-2 
              text-white
              bg-[#1BCDB2]
              shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
              
              transition-all
      
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-violet-500
          `}
          >
            <span>Donate</span>
          </button>
           );
        };
    return(
        <>
      <div className="relative h-[650px] bg-[#6F9D80] flex flex-col items-center mt-10 text-center px-4 md:px-10 lg:px-20 w-full">
                 <div className="z-10 flex flex-col items-center mt-10 w-full max-w-2xl space-y-4 md:space-y-6">
                   <h1 className="text-3xl font-semibold text-black">
                     Join Us: Together for a Better Future
                   </h1>
                 </div>
      
                 <div className="flex gap-4 mt-10 text-black">
                 <div className="card bg-white w-96 shadow-sm">
  <figure className="px-4 pt-4">
    <img
      src="farmer-pic.jpg"
      alt="Shoes"
      className="rounded-xl h-60" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">Amazon Forest</h2>
    <p className="text-start">A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <p className="text-start text-lg mt-2"><span className="text-xl font-bold text-purple-600">$86,812</span> reload of $100,000 goal</p>
    <progress className="progress progress-secondary w-full" value="50" max="100"></progress>
    <div className="card-actions justify-between mt-2">
  <div className="flex items-center">
    <FaRegHeart className="text-2xl text-pink-600" />
    <span className="ml-2 text-base text-gray-700">1254 Supporter</span>
  </div>
  
  <ButtonWrapper />
</div>

  </div>
</div>
      
<div className="card bg-white w-96 shadow-sm">
  <figure className="px-4 pt-4">
    <img
      src="turtle-pic.jpg"
      alt="Shoes"
      className="rounded-xl h-60" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">Amazon Forest</h2>
    <p className="text-start">A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <p className="text-start text-lg mt-2"><span className="text-xl font-bold text-purple-600">$86,812</span> reload of $100,000 goal</p>
    <progress className="progress progress-secondary w-full" value="50" max="100"></progress>
    <div className="card-actions justify-between mt-2">
  <div className="flex items-center">
    <FaRegHeart className="text-2xl text-pink-600" />
    <span className="ml-2 text-base text-gray-700">1254 Supporter</span>
  </div>
  
  <ButtonWrapper />
</div>

  </div>
</div>
      
<div className="card bg-white w-96 shadow-sm">
  <figure className="px-4 pt-4">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      className="rounded-xl h-60" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">Amazon Forest</h2>
    <p className="text-start">A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <p className="text-start text-lg mt-2"><span className="text-xl font-bold text-purple-600">$86,812</span> reload of $100,000 goal</p>
    <progress className="progress progress-secondary w-full" value="50" max="100"></progress>
    <div className="card-actions justify-between mt-2">
  <div className="flex items-center">
    <FaRegHeart className="text-2xl text-pink-600" />
    <span className="ml-2 text-base text-gray-700">1254 Supporter</span>
  </div>
  
  <ButtonWrapper />
</div>

  </div>
</div>
                 </div>
               </div>
               helooo
        </>
    )
}

export default Joinus;