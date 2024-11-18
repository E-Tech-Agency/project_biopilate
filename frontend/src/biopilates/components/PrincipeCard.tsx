interface info {
  name: string;
  image: string;
  description: string;
}

export default function PrincipeCard({ principe }: { principe: info }) {
  return (
    <div className=" flex justify-center items-center max-w-[630px] xl:max-w-[680px] min-w-[230px] h-[280px] sm:h-[300px] shadow-xl rounded-lg bg-white py-2 sm:py-4 px-4 sm:px-8 gap-4 mx-2">
      <img
        loading="lazy"
        src={principe.image}
        alt="Principe"
        className="rounded-full w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] object-cover max-sm:mt-[-100px]"
      />
      <div className="flex flex-col gap-3 w-[62%]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-ebGaramond text-marron font-bold">
          {principe.name}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: principe.description,
          }}
          className="text-justify text-[#5a5a5a] text-xs sm:text-sm md:text-base leading-normal overflow-y-auto max-h-44 font-lato"
        ></p>
      </div>
    </div>
  );
}
