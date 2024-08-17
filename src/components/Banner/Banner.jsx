

const Banner = () => {
    return (
      <>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="w-full md:w-1/2 ">
    <img 
      src="https://i.postimg.cc/SNVKDyY2/Green-3-D-Abstract-Online-Sales-Best-Price-Ever-Promotion-Facebook-Post.png"
      className="w-full rounded-lg shadow-2xl" />
    </div>
    <div className="w-full md:w-1/2 ">
      <h1 className="text-5xl font-bold">Buy Latest Product!</h1>
      <p className="py-6">
        here you can buy the product you desire
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
      </>
    );
};

export default Banner;