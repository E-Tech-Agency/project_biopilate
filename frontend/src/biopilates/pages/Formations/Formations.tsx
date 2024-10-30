import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";

import Planning from "./Planning";
import reformer from "@/assets/images/reformer.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import formation2 from "@/assets/images/formation-2.jpg";
import formation3 from "@/assets/images/formation-3.png";
import formation5 from "@/assets/images/formation-5.png";
import formation6 from "@/assets/images/formation-6.jpg";

import FormationSwiper from "./FormationSwiper";
import PourquoiBiopilates from "./PourquoiBiopilates";
import FinancerVotreFormation from "./FinancerVotreFormation";
import WorkshopSlider from "./WorkshopSlider";

export default function Formations() {
  const images = [formation3, reformer, formation5, formation1, formation2];

  const plans = [
    {
      title: "Reformer",
      niveau: "débutant et intermédiare",
      image: reformer,
      date: "Du 21 au 25/10/2024 et du 4 au 8/11/2024",
      timeSlots: [
        "Lun.21/10/2024 :  8h - 13h",
        "Mar. 22/10/2024 :  8h - 13h",
        "Mer. 23/10/2024 :  8h - 13h",
        "Jeu. 24/10/2024 :  8h - 13h",
        "Ven. 25/10/2024 :  8h - 13h",
        "Lun. 04/11/2024 : 14h - 19.30h",
        "Mar. 05/11/2024 :  8h - 13.30h",
        "Mer. 06/11/2024 :  8h - 13.30h",
        "Jeu. 07/11/2024 :  8h - 13.30h",
        "Ven. 08/11/2024 :  8h - 13.30h",
      ],
    },
    {
      title: "Intensive Matwork",
      niveau: "débutant et intermédiare",
      image: formation6,
      date: "Du 18 au 22/11/2024 et du 03 au 06/12/2024",
      timeSlots: [
        "Mar. 19/10/2024 :  8h - 13h",
        "Mer. 20/10/2024 :  8h - 13h",
        "Jeu. 21/10/2024 :  8h - 13h",
        "Ven. 22/10/2024 :  8h - 13h",
        "Mar. 03/12/2024 :  8h - 13h",
        "Mer. 04/12/2024 :  8h - 13h",
        "Jeu. 05/12/2024 :  8h - 13h",
        "Ven. 06/12/2024 :  8h - 13h",
      ],
    },
  ];

  return (
    <div className="flex flex-col mx-5 md:mx-12">
      <section className="my-14 flex flex-col-reverse lg:flex-row justify-center lg:justify-between gap-8">
        {/* carousel */}

        {/* <CircleCarousel images={images} /> */}
        <CircleSwiperCarousel images={images} />

        {/* text */}
        <div className="flex flex-col items-center md:items-baseline py-6 min-w-min md:px-2 gap-5 font-lato w-[90%]">
          <p className="text-marron text-4xl leading-snug font-ebGaramond font-bold">
            Formations Biopilates
          </p>
          <p className="leading-7 text-3xl text-blueText font-ebGaramond font-normal">
            Devenez instructeur certifié avec Biopilates
          </p>
          <p className="leading-8 text-lg">
            <strong>Biopilates</strong>, pionnier du{" "}
            <strong>Stott Pilates</strong> en France depuis{" "}
            <strong>2008</strong>, vous propose une expérience unique pour
            devenir un <strong>instructeur Pilates certifié</strong> et
            accompli.
          </p>
        </div>
      </section>

      {/* pourquoi biopilates */}
      <PourquoiBiopilates />

      {/* formation biopliates */}
      <section className="mt-8" id="formation-prix">
        <div className="mb-8">
          <p className="text-marron text-3xl font-ebGaramond font-bold leading-snug mb-4">
            Formation Biopilates
          </p>
          <p className="leading-6">
            Devenez <strong>instructeur de Pilates</strong> : favorisez
            l'équilibre et le bien-être physique et mental, tout en vous
            transformant.{" "}
          </p>
          <p className="leading-6">
            Rejoignez notre formation et devenez un pilier d'harmonie.
          </p>
        </div>
        <FormationSwiper />
      </section>

      {/* Fianncer votre formation */}
      <FinancerVotreFormation />

      {/* workshop */}
      <WorkshopSlider />

      {/* Planning */}
      <section className="mb-14 mt-2">
        <p className="text-marron text-4xl leading-snug mb-10 font-ebGaramond font-bold">
          Planning
        </p>

        <Planning plans={plans} />
      </section>
    </div>
  );
}
