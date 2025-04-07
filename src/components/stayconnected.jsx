function Connected () {
    const ButtonWrapper = () => {
        return (
          <div>
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
              bg-[#676ED2]
              shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
              
              transition-all
      
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-white
          `}
          >
            <span>Donate</span>
          </button>
           );
        };
    return(
        <>
        <div className="card lg:card-side w-4/5 mt-16 bg-[#B9CDC1] h-[400px] shadow-sm p-4 mx-auto">
            <div className="card-body w-3/5 text-[#7C71BD]">
                <h2 className="card-title text-4xl">Stay Connected</h2>
                <p className="text-md">Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on earth.</p>
                <div className="space-y-8 mt-4">
                <input type="text" placeholder="Your Email" className="input input-primary bg-[#B9CDC1]" />
                <textarea type="text" placeholder="Your Message" className="textarea textarea-primary bg-[#B9CDC1]"></textarea>
                <ButtonWrapper />
                </div>
            </div>
            
            <div className="card-body w-2/5 flex">
            <div className="flex gap-4">
                <div className="flex items-center justify-center">
                    <img src="turtles-pic.jpg" className="rounded-lg" />
                </div>
                <div className="space-y-4">
                    <img src="wheat-pic.jpg" className="rounded-lg h-48 -mt-13" />
                    <img id="pic" src="working-fields.jpg" className="rounded-lg w-full" />
                </div>
            </div>
    
            </div>
        </div>
        </>
    )
}

export default Connected;