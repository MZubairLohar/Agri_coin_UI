import { IoMdShare } from "react-icons/io";

function Projects() {

    const ButtonWrapper2 = () => {
        return (
          <div className="flex items-center mt-6 justify-center">
            <NeumorphismButton2 />
          </div>
        );
      };
      
      const NeumorphismButton2 = () => {
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
            <span>Explore more</span>
          </button>
        );
      };
      

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
        <div className="relative flex flex-col items-center mt-20 text-center px-4 md:px-10 lg:px-20 w-full">
           <div className="z-10 flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6">
             <h1 className="text-3xl font-semibold text-black">
               Take a look at our projects
             </h1>
           </div>

           <div className="flex gap-4 mt-10">
           <div className="card bg-white text-black card-sm w-80 h-80 shadow-lg">
  <figure>
    <img
      src="/tree-pic.jpg"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">
      Food Restoration and Rehabilitation
    </h2>
    <p className="text-start">A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-between">
     <ButtonWrapper />
     <IoMdShare className="text-2xl" />
    </div>
  </div>
</div>

<div className="card bg-white text-black card-sm w-80 h-80 shadow-lg">
  <figure>
    <img
      src="corn-pic.jpg"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">
      Food Restoration and Rehabilitation
    </h2>
    <p className="text-start">A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-between">
    <ButtonWrapper />
     <IoMdShare className="text-2xl" />
    </div>
  </div>
</div>

<div className="card bg-white text-black card-sm w-80 h-80 shadow-lg">
  <figure>
    <img
      src="/tractor-pic.jpg"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">
      Food Restoration and Rehabilitation
    </h2>
    <p className="text-start">A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-between">
    <ButtonWrapper />
    <IoMdShare className="text-2xl" />
    </div>
  </div>
</div>
           </div>
           <ButtonWrapper2 />
         </div>
       </>
    )
}

export default Projects;