"use client";

import home_icon1 from "../assets/home_icon1.png";
import home_icon2 from "../assets/home_icon2.png";
import home_icon3 from "../assets/home_icon3.png";
import home_doc from "../assets/home_doc.png";

const SearchBar = () => {
  return (
    <input
      type="search"
      placeholder="What are you searching for ?"
      className="self-stretch px-5 py-6 mt-8 max-w-full text-base text-black bg-white border border-solid border-[#DADDDF] min-h-[71px] rounded-[49px] w-[1114px]"
      aria-label="Search products"
    />
  );
};

const IconCircle = ({ iconSrc }) => {
  return (
    <div className="flex justify-center items-center bg-blue-600 h-[110px] w-[110px] rounded-full">
      <img src={iconSrc} alt="Icon" className="w-14 h-14 object-contain" />
    </div>
  );
};

const HeroContent = () => {
  return (
    <article className="text-black max-w-xl">
      <h1 className="text-5xl font-bold leading-[96px] tracking-[3.2px] max-md:text-4xl max-md:leading-[66px]">
        Wellness Medicine &<br />
       <p className="-ml-28">Suggestion  Care</p>
       
      </h1>
      <p className="mt-8 text-base font-medium leading-6">
        A one-stop digital healthcare shop for a variety of prescription drugs, health and wellness items, vitamins, diet and exercise supplements, herbal goods, baby and mother care items and cosmetics.
        <br />
        Order online and have your medicine delivered to your door.
      </p>
    </article>
  );
};

const HeroSection = () => {
  return (
    <main className="overflow-hidden bg-white">
      <section className="flex flex-col items-center py-10 w-full min-h-[706px]">
        <div className="flex justify-between items-center gap-8 w-full max-w-[1400px] px-4 flex-wrap">
          
          {/* Left Side Content */}
          <HeroContent />

          {/* Right Side - Illustration and Icons */}
          <div className="relative flex flex-col items-center justify-center">
            <img
              src={home_doc}
              alt="Healthcare Illustration"
              className="w-[400px] h-auto z-0"
            />
            <div className="absolute -top-12 -left-8">
              <IconCircle iconSrc={home_icon1} />
            </div>
            <div className="absolute top-[62px] left-[-152px]">
              <IconCircle iconSrc={home_icon2} />
            </div>
            <div className="absolute top-[170px] left-[-30px]">
              <IconCircle iconSrc={home_icon3} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar />
      </section>
    </main>
  );
};

export default HeroSection;
