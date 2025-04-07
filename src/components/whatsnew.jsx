function Whatsnew () {
    return(
        <>
          <div className="relative flex flex-col items-center mt-20 text-center px-4 md:px-10 lg:px-20 w-full">
                   <div className="z-10 flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6">
                     <h1 className="text-4xl font-bold text-black">
                       What's New
                     </h1>
                   </div>

                  <div className="flex gap-6 mt-8">
                   <div className="card bg-white text-black card-sm w-2/4 h-2/4 shadow-lg">
                     <figure>
                       <img
                         src="beans-pic.jpg"
                         alt="Shoes" />
                     </figure>
                     <div className="card-body">
                       <h2 className="card-title text-start">
                         Food Restoration and Rehabilitation
                       </h2>
                       <div className="card-actions justify-between">
                      <p className="text-start">Food Restoration and Rehabilitation</p>
                      <button className="btn btn-xs bg-white text-black">Primary</button>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-3">
                   <div className="card h-36 w-lg card-side bg-white text-black shadow-lg">
  <figure>
    <img
      src="turtles-pic.jpg"
      alt="Movie"
      className="w-sm object-cover" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h2>
    <div className="card-actions justify-between flex mt-6">
                      <p className="text-start">Food Restoration</p>
                      <button className="btn btn-xs bg-white text-black">Primary</button>
                       </div>
  </div>
</div>

<div className="card h-36 w-lg card-side bg-white text-black shadow-lg">
  <figure>
    <img
      src="mountain-pic.jpg"
      alt="Movie"
      className="w-sm object-cover" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">Id corrupti deserunt maiores nihil et dolore aut libero iusto</h2>
    <div className="card-actions justify-between flex mt-6">
                      <p className="text-start">Account permit</p>
                      <button className="btn btn-xs bg-white text-black">Primary</button>
                       </div>
  </div>
</div>

<div className="card h-36 w-lg card-side bg-white text-black shadow-lg">
  <figure>
    <img
      src="turtles-pic.jpg"
      alt="Movie"
      className="w-sm object-cover" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-start">sint ab sapiente repellendus incidunt fuga impedit</h2>
    <div className="card-actions justify-between flex mt-6">
                      <p className="text-start">Deny access</p>
                      <button className="btn btn-xs bg-white text-black">Primary</button>
                       </div>
  </div>
</div>
</div>
</div>
                 </div>
        </>
    )
}

export default Whatsnew;