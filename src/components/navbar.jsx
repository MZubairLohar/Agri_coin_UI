function Navbar () {
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
            text-[#FFE990]
            bg-[#6F9D7E]
            transition-all

            hover:shadow-[-1px_-1px_5px_rgba(255,_255,_0,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_0,_0.8),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
            hover:text-[#FFE990]
          `}
        >
          <span>Donate</span>
        </button>        
           );
        };

    return(
        <>
        <div className="navbar z-10 -mt-10">
  <div className="navbar-start">
    <div className="dropdown z-20">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm bg-[#6F9D7E] dropdown-content rounded-box z-20 mt-3 w-52 p-2 shadow">
        <li><a>Register</a></li>
        <li><a>Donation</a></li>
        <li><a>Programs</a></li>
        <li><a>Blog</a></li>
        <li><a>Contact Us</a></li>
      </ul>
    </div>
  <img className="sm:w-32 sm:h-32 w-24 h-24 mt-2 sm:mt-0 -ml-8 sm:-ml-0" src="/agri-logo.png" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-3 text-black">
      <li>
      <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Register</button>
      </li>
      <li>
      <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Donation</button>
      </li>
      <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Programs</button>
      <li>
      <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Blog</button>
      </li>
      <li>
         <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Contact Us</button>
      </li>
    </ul>
  </div>
  <div className="navbar-end z-10 mt-2 sm:mt-0">
  <button className="btn btn-accent sm:px-6 sm:py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">Donate</button>
  </div>
</div>
        </>
    )
}

export default Navbar;