import hero from "@/assets/images/hero-caroline-c.jpg";
import ReserverButton from "@/biopilates/components/ReserverButton";

export default function Hero() {
  return (
    <section className="relative max-sm:mx-[-20px] mt-6 mb-8 sm:mb-14 py-10 flex max-lg:flex-wrap justify-between lg:justify-between items-center gap-5 md:gap-9 lg:gap-14 xl:gap-16 min-h-[400px] md:min-h-[500px] lg:min-h-[500px] xl:min-h-[600px] 2xl:min-h-[700px] md:rounded-md">
      <img
        loading="lazy"
        src={hero}
        alt="Biopilate trainer"
        className="absolute h-full w-full object-cover sm:rounded-md"
      />
      <div className="absolute h-full w-full bg-black opacity-30 sm:rounded-md" />

      <div className="flex flex-col px-6 md:pl-14 xl:pl-24 w-[600px] gap-5 font-lato z-10 ">
        <div>
          <p className="text-bgColor text-xl md:text-3xl md:leading-10 font-bold font-ebGaramond">
            Équilibre et Élégance :
          </p>
          <p className="text-white text-xl md:text-3xl md:leading-10 font-bold font-ebGaramond">
            BioPilates votre Studio de Pilates à Paris
          </p>{" "}
        </div>
        <p className="text-white text-base leading-normal md:leading-7">
          Découvrez la force dans la fluidité et la grâce dans le mouvement, au
          cœur de Paris, avec notre approche personnalisée du Pilates.
        </p>
        <ReserverButton />
      </div>
    </section>
  );
}
