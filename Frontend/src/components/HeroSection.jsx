
"use client";

const SearchBar = () => {
  return (
    <input
      type="search"
      placeholder="What are you searching for ?"
      className="self-stretch px-5 py-6 mt-2.5 max-w-full text-base text-black bg-white border border-solid border-[#DADDDF] min-h-[71px] rounded-[49px] w-[1114px]"
      aria-label="Search products"
    />
  );
};

const IconCircle = () => {
  return (
    <div
      className={`flex gap-2.5 justify-center items-center px-2.5 bg-blue-600 h-[110px] min-h-[110px] rounded-[70px] w-[110px]`}
    >
      <img
        loading="lazy"
        className="object-contain self-stretch my-auto w-20 aspect-square"
        alt="Healthcare icon"
      />
    </div>
  );
};

const HeroContent = () => {
  return (
    <article className="z-0 self-stretch my-auto text-black min-w-60 w-[699px] max-md:max-w-full">
      <h1 className="text-6xl font-bold leading-[96px] tracking-[3.2px] max-md:max-w-full max-md:text-4xl max-md:leading-[66px]">
        Wellness Medicine &<br />
        Suggestion
        <br />
        Care
      </h1>
      <p className="mt-8 text-base font-medium leading-6 max-md:max-w-full">
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
      <section className="flex flex-col justify-center items-center py-3 pr-2.5 pl-1 w-full min-h-[706px] max-md:max-w-full">
        <div className="flex relative justify-center items-start w-full max-w-[1901px] min-h-[604px] max-md:max-w-full">
          <HeroContent />

          <IconCircle
            iconSrc="https://cdn.builder.io/api/v1/image/assets/c6bff8acd2854098b340ca41cbd4cebb/fd63d656c0ba0a6048b080611bab6b904a0f3008011d2969127274bca90729b7?placeholderIfAbsent=true"
            className="absolute right-[726px] top-[152px]"
          />

          <IconCircle
            iconSrc="https://cdn.builder.io/api/v1/image/assets/c6bff8acd2854098b340ca41cbd4cebb/0198b4f8bf0c36c69db9bb3350fbf4d8e7d9f7169ead18e02a9f59dc15e19653?placeholderIfAbsent=true"
            className="absolute right-[695px] top-[217px]"
          />

          <IconCircle
            iconSrc="https://cdn.builder.io/api/v1/image/assets/c6bff8acd2854098b340ca41cbd4cebb/0fe098fba2d15f67ab809d9649926d0d43863657030b87e58643a24f4a473892?placeholderIfAbsent=true"
            className="absolute right-[661px] top-[87px]"
          />

          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/c6bff8acd2854098b340ca41cbd4cebb/e0249b470fe1461503f4a447ac68e40f82762719f91f3b6fe7f9f234263ac339?placeholderIfAbsent=true"
            className="object-contain z-0 shrink-0 self-stretch my-auto aspect-[0.97] min-w-60 w-[408px]"
            alt="Healthcare illustration"
          />
        </div>

        <SearchBar />
      </section>
    </main>
  );
};
export default HeroSection; 