import hero from "@/assets/images/hero-caroline.jpg";
import ReserverButton from "@/biopilates/components/ReserverButton";

export default function Hero() {
  return (
    <section className="relative mt-6 mb-20 py-10 flex max-lg:flex-wrap justify-center lg:justify-between items-center gap-5 md:gap-9 lg:gap-14 xl:gap-16 min-h-[610px] rounded-md">
      <img
        loading="lazy"
        src={hero}
        alt="Biopilate trainer"
        className="absolute h-full w-full object-cover rounded-md"
      />
      <div className="absolute h-full w-full bg-black opacity-30 rounded-md" />

      <div className="flex flex-col pl-8 md:pl-14 xl:pl-24 w-[600px] gap-5 font-lato z-10 ">
        <div>
          <p className="text-bgColor text-3xl leading-10 font-bold font-ebGaramond">
            Équilibre et Élégance :
          </p>
          <p className="text-white text-3xl leading-10 font-bold font-ebGaramond">
            BioPilates votre Studio de Pilates à Paris
          </p>{" "}
        </div>
        <p className="text-white leading-7">
          Découvrez la force dans la fluidité et la grâce dans le mouvement, au
          cœur de Paris, avec notre approche personnalisée du Pilates.
        </p>
        <ReserverButton />
      </div>

      {/* <h1 className="absolute inset-0 flex justify-center items-center text-6xl sm:text-[100px] md:text-[160px] lg:text-[220px] xl:text-[280px] font-ebGaramond text-lightBgColor font-bold tracking-wider">
        PILATES
      </h1>

      <div className="flex flex-col pl-8 md:pl-14 xl:pl-24 w-[600px] gap-5 font-lato z-10 ">
        <div>
          <p className="text-marron text-3xl leading-10 font-bold font-ebGaramond">
            Équilibre et Élégance :
          </p>
          <p className="text-marron text-3xl leading-10 font-bold font-ebGaramond">
            BioPilates votre Studio de Pilates à Paris
          </p>{" "}
        </div>
        <p className="leading-7">
          Découvrez la force dans la fluidité et la grâce dans le mouvement, au
          cœur de Paris, avec notre approche personnalisée du Pilates.
        </p>
        <button
          className="flex mr-auto flex-col justify-center text-base rounded-lg px-10 py-4 text-bgColor bg-marron font-lato"
          onClick={() => {
            window.open(
              "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0 ",
              "_blank"
            );
          }}
        >
          Réserver
        </button>
      </div>
      <img
        loading="lazy"
        src={hero}
        alt="Biopilate trainer"
        className="max-h-[250px] lg:max-h-[350px] z-10 object-cover max-lg:px-10"
      /> */}

      {/* <div className="flex justify-center items-center gap-3 sm:gap-4 mr-2 sm:mr-4 border border-solid border-marron rounded-full w-[233px] h-[233px] sm:w-[428px] sm:h-[428px] pr-5 sm:pr-9 z-10">
        <div className="z-[1] absolute mr-[165px] mt-[170px] sm:mr-[290px] sm:mt-[280px]">
          <svg
            className="hidden sm:block"
            width="93"
            height="102"
            viewBox="0 0 93 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M63.656 1.13904C51.4861 21.6158 46.9384 27.2573 39.1356 31.598C31.5812 35.7406 23.7046 36.3331 6.43913 33.951C3.10123 33.4993 0.300303 33.1562 0.191594 33.2123C0.0828858 33.2684 2.25737 34.7409 4.94607 36.5092C18.1244 45.1015 25.0911 51.9901 28.327 59.6463C31.6181 67.5195 31.8337 76.8039 29.1179 93.7708C28.4235 98.0556 27.8825 101.665 27.8906 101.766C27.9531 101.839 29.903 98.6246 32.2626 94.6377C41.7784 78.4751 49.0885 70.8125 57.6121 68.1684C64.6438 65.9784 72.1796 65.8421 84.6057 67.6355C88.8229 68.2296 92.2541 68.6683 92.246 68.5673C92.1835 68.4943 89.4089 66.5951 86.081 64.3853C72.9254 55.6059 66.8396 49.3498 63.7116 41.3925C60.7166 33.6821 60.6008 23.9956 63.3182 7.51868C64.6533 -0.777763 64.6695 -0.575768 63.656 1.13904Z"
              fill="#756E66"
            />
          </svg>
          <svg
            className="block sm:hidden"
            width="49"
            height="52"
            viewBox="0 0 49 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.2414 0.797949C26.9555 11.1642 24.6053 14.0196 20.5698 16.2141C16.6626 18.3084 12.5866 18.6041 3.64968 17.3877C1.92193 17.157 0.472148 16.9816 0.415922 17.01C0.359696 17.0383 1.48596 17.7855 2.87853 18.6828C9.704 23.0429 13.3137 26.5364 14.9931 30.4168C16.7011 34.407 16.8183 39.1104 15.4231 47.7041C15.0664 49.8742 14.7886 51.7025 14.7929 51.7537C14.8252 51.7906 15.8324 50.1633 17.0512 48.145C21.9661 39.9626 25.7446 36.085 30.1542 34.7504C33.7921 33.6449 37.692 33.5801 44.124 34.4956C46.3069 34.7989 48.083 35.0231 48.0787 34.9719C48.0463 34.9349 46.6092 33.9712 44.8856 32.8499C38.0718 28.3951 34.9183 25.2224 33.2946 21.1896C31.7399 17.282 31.6741 12.3749 33.0704 4.02956C33.7564 -0.172512 33.7649 -0.0701752 33.2414 0.797949Z"
              fill="#756E66"
            />
          </svg>
        </div>

        <img
          loading="lazy"
          src={hero1}
          alt="Biopilate trainer"
          className="custom-half-circle-right h-[208px] sm:h-[455px] shadow-lg"
        />

        <img
          loading="lazy"
          src={hero2}
          alt="Biopilate trainer"
          className="custom-half-circle-left h-[160px] sm:h-[350px] shadow-lg pt-2"
        />
        <div className="z-[1] absolute ml-40 mb-44 sm:ml-80 sm:mb-[350px]">
          <svg
            className="hidden sm:block"
            width="44"
            height="48"
            viewBox="0 0 44 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.8913 0.065788C30.8194 0.154769 30.258 1.12103 29.627 2.20646C24.2565 11.4519 20.721 14.9587 15.6149 16.0943C12.7575 16.7333 8.61219 16.605 3.12778 15.704C1.99138 15.5083 0.971201 15.3581 0.86432 15.3602C0.757438 15.3624 1.55962 15.969 2.66398 16.6938C9.50409 21.2582 12.5415 24.3058 14.0786 28.128C15.5248 31.7243 15.5503 36.6827 14.1938 44.7314C13.9604 46.0748 13.7594 47.3285 13.7294 47.5217C13.7017 47.7451 14.1913 47.0143 15.1564 45.3715C19.6639 37.7064 22.3331 34.578 25.9422 32.7397C29.5467 30.9142 33.2781 30.7196 41.4233 31.9294C42.8432 32.1264 44.0021 32.2712 44 32.2598C43.998 32.2484 42.8757 31.4522 41.4376 30.5433C34.1425 26.0464 30.7927 22.9347 28.9645 18.9024C27.3227 15.2914 27.1613 11.0438 28.4954 2.92106C28.9223 0.167257 28.9935 -0.103415 28.7825 0.172446Z"
              fill="#756E66"
            />
          </svg>
          <svg
            className="block sm:hidden"
            width="24"
            height="26"
            viewBox="0 0 24 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0401 0.036017C16.9682 0.0858556 16.4626 0.775743 15.9547 1.53778C12.7566 6.44093 10.8817 8.41555 7.85494 9.07527C6.42058 9.38996 4.33174 9.33054 1.57034 8.80495C0.856273 8.67648 0.297762 8.58574 0.241538 8.58653C0.185314 8.58732 0.914967 9.07311 1.56312 9.57499C5.58086 12.5605 7.34657 14.3881 8.27627 17.1843C9.17077 19.8307 9.18494 23.0244 8.24598 28.1057C8.1086 28.9153 7.99772 29.6974 7.9821 29.8032C7.96647 29.9208 8.25783 29.4464 8.82934 28.5058C11.1551 24.568 12.6751 22.5482 14.7078 21.3981C16.7402 20.2562 18.8807 20.1442 23.5308 20.9085C24.1545 21.024 24.7071 21.1096 24.7052 21.0937C24.7033 21.0779 24.0707 20.6498 23.1927 20.1077C19.0881 17.2153 17.2432 15.2181 16.2083 12.4676C15.2712 10.1116 15.1863 7.68842 15.9537 2.31582C16.1957 0.967315 16.2325 0.62374 16.0401 0.036017Z"
              fill="#756E66"
            />
          </svg>
        </div>
      </div> */}
    </section>
  );
}
