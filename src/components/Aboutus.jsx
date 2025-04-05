function Aboutus () {
    return(
        <>
        <div className="card lg:card-side w-4/5 bg-[#F5D082] h-[500px] shadow-sm p-8 mx-auto">
            <div className="card-body w-2/4 text-black">
                <h2 className="card-title text-[#7C71BD] text-4xl">About Us</h2>
                <p className="text-lg">Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on earth.</p>
                
                <div className="join join-vertical bg-[#F5D082] -ml-4">
                    <div className="collapse collapse-arrow join-item">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-lg font-semibold">Who are you?</div>
                        <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                    </div>
                    <div className="collapse collapse-arrow join-item">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-lg font-semibold">What we do?</div>
                        <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                    </div>
                    <div className="collapse collapse-arrow join-item">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-lg font-semibold">How To Help?</div>
                        <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                    <div className="collapse collapse-arrow join-item">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-lg font-semibold">Where we work?</div>
                        <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                </div>
            </div>
            
            <div className="card-body w-2/4">
                <video className="h-32 rounded-3xl" controls>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video className="h-32 rounded-3xl" controls>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video className="h-32 rounded-3xl" controls>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        </>
    )
}

export default Aboutus;
