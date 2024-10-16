import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";

import ImageSliderFormations from "@/biopilates/components/ImageSliderFormations";

import Planning from "./Planning";
import reformerGyrotonic from "@/assets/images/reformer-gyrotonic.jpg";
import reformer from "@/assets/images/reformer.jpg";
import reformerGyrotonicEvolis from "@/assets/images/reformer-gyrotonic-evolis.png";
import cours1 from "@/assets/images/cours-1.jpg";
import cours2 from "@/assets/images/cours-2.jpg";
import formation1 from "@/assets/images/formation-1.jpg";
import formation2 from "@/assets/images/formation-2.jpg";
import formation3 from "@/assets/images/formation-3.png";
import formation5 from "@/assets/images/formation-5.png";
import formation6 from "@/assets/images/formation-6.jpg";
import matworkAvance from "@/assets/images/matwork-avancé.jpg";

export default function Formations() {
  const images = [formation3, reformer, formation5, formation1, formation2];
  const formations = [
    {
      title: "Formation Anatomie",

      image: formation5,
      description:
        "Enseigne les principes anatomiques appliqués à la pratique et à l'enseignement des exercices de Pilates.",
      formation: "Anatomie",
    },
    {
      title: "Formation Matwork",
      image: formation6,
      description:
        "Enseigne les techniques et principes du Pilates pour renforcer les muscles, améliorer la posture, la flexibilité et l'équilibre.",
      formation: "Matwork",
    },
    {
      title: "Formation Reformer",
      image: reformer,
      description:
        "Enseigne l'utilisation du Reformer, un appareil spécifique, pour renforcer les muscles, améliorer la posture, la flexibilité et l'équilibre.",
      formation: "Reformer",
    },
    {
      title: "Formation Cadillac",
      image: reformerGyrotonic,
      description:
        "Enseigne l'utilisation de l'appareil Cadillac pour renforcer les muscles, améliorer la posture, la flexibilité et l'équilibre.",
      formation: "Cadillac",
    },
    {
      title: "Formation Barril",
      image: formation1,
      description:
        "Enseigne l'utilisation de l'appareil Barril pour renforcer les muscles, améliorer la posture, la flexibilité et l'équilibre.",
      formation: "Barril",
    },
    {
      title: "Formation Chaise",
      image: formation2,
      description:
        "Enseigne l'utilisation de la Chaise pour renforcer les muscles, améliorer la posture, la flexibilité et l'équilibre.",
      formation: "Chaise",
    },
    {
      title: "Formation ISP",
      image: formation3,
      description:
        "Enseigne une approche holistique du Pilates, combinant différentes techniques pour renforcer les muscles, améliorer la posture, la flexibilité et l'équilibre.",
      formation: "ISP",
    },
  ];
  const plans = [
    {
      title: "Intensive Matwork",
      niveau: "débutant et intermédiare",
      image: formation6,
      date: "Du 09/07 au 18/07/2024",
    },
    {
      title: "Matwork",
      niveau: "avancé",
      image: matworkAvance,
      date: "Le 19/07/2024",
    },
    {
      title: "Reformer",
      niveau: "débutant et intermédiare",
      image: reformer,
      date: "Du 19/07 au 29/08/2024",
    },
    {
      title: "Reformer",
      niveau: "avancé",
      image: reformer,
      date: "Du 30/08 au 01/09/2024",
    },
  ];
  const calendar = [
    {
      date: "Du 09/07/2024 au 18/07/2024",
      timeSlots: [
        "Mar. 09/07/2024 :  8h - 13.30h",
        "Mer. 10/07/2024 :  8h - 13.30h",
        "Jeu. 11/07/2024 :  8h - 13.30h",
        "Ven. 12/07/2024 :  8h - 13.30h",
        "Off",
        "Dim. 14/07/2024 : 14h - 19.30h",
        "Off",
        "Mar. 16/07/2024 :  8h - 13.30h",
        "Mer. 17/07/2024 :  8h - 13.30h",
        "Jeu. 18/07/2024 :  8h - 13.30h",
      ],
    },
    {
      date: "Le 19/07/2024",
      timeSlots: ["Ven. 19/07/2024  :  8h - 13.30h"],
    },
    {
      date: "Du 19/08/2024 au 29/08/2024",
      timeSlots: [
        "Lun. 19/08/2024 :  8h - 13.30h",
        "Mar. 20/08/2024 :  8h - 13.30h",
        "Mer. 21/08/2024 :  8h - 13.30h",
        "Jeu. 22/08/2024 :  8h - 13.30h",
        "Ven. 23/08/2024 :  8h - 13.30h",
        "Off",
        "Dim. 25/08/2024 :  14h - 19.30h",
        "Lun. 26/08/2024 :  8h - 13.30h",
        "Mar. 27/08/2024 :  8h - 13.30h",
        "Mer. 28/08/2024 :  8h - 13.30h",
        "Jeu. 29/08/2024 :  8h - 13.30h",
      ],
    },
    {
      date: "Le 19/07/2024",
      timeSlots: ["Ven. 19/07/2024  :  8h - 13.30h"],
    },
  ];

  return (
    <div className="flex flex-col mx-8 md:mx-12">
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

      {/* formation biopliates */}
      <section className="mt-4">
        <div className="mb-8">
          <p className="text-marron text-3xl font-ebGaramond font-bold leading-snug">
            Formation Biopilates
          </p>
          <p className="leading-7">
            Devenez <strong>instructeur de Pilates</strong> : favorisez
            l'équilibre et le bien-être physique et mental, tout en vous
            transformant. Rejoignez notre formation et devenez un pilier
            d'harmonie.
          </p>
        </div>
        <ImageSliderFormations list={formations} action={"Inscrivez-vous"} />
      </section>

      {/* Planning */}

      <section className="mb-14">
        <p className="text-marron text-4xl leading-snug mb-10 font-ebGaramond">
          Planning
        </p>

        <Planning plans={plans} calendar={calendar} />
      </section>
    </div>
  );
}
