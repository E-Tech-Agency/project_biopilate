import StartupAnimation from "./StartupAnimation";
import gyrotonic1 from "@/assets/images/gyrotonic-1.jpg";
import reformerGyrotonicEvolis from "@/assets/images/reformer-gyrotonic-evolis.png";
import gyrotonic3 from "@/assets/images/gyrotonic-3.png";
import gyrotonic4 from "@/assets/images/gyrotonic-4.png";
import gyrotonic5 from "@/assets/images/gyrotonic-5.png";
import gyrotonic from "@/assets/images/gyrotonic.jpg";
import gyrokinesis from "@/assets/images/gyrokinesis.jpg";
import gyrotonicEndurance from "@/assets/images/gyrotonic-endurance.png";
import gyrotonicFlexibilite from "@/assets/images/gyrotonic-flexibilite.jpg";
import gyrotonicCoordination from "@/assets/images/gyrotonic-coordination.jpg";

export default function Gyrotonic() {
  const images = [
    gyrotonic1,
    reformerGyrotonicEvolis,
    gyrotonic3,
    gyrotonic4,
    gyrotonic,
    gyrokinesis,
    gyrotonicEndurance,
    gyrotonicFlexibilite,
    gyrotonicCoordination,
    gyrotonic5,
  ];
  return (
    <div className="relative overflow-hidden">
      <StartupAnimation images={images} />

      {/* Page Content */}
      <div className="flex flex-col mt-8 mx-5 md:mx-12 mb-12 gap-6 font-lato">
        <div className="flex flex-col-reverse md:flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-ebGaramond text-marron font-bold">
              Formation et Cours GYROTONIC® à Paris - Studio Biopilates
            </h1>
            <h2 className="text-xl font-ebGaramond text-blueText font-medium">
              Découvrez les cours et formations GYROTONIC® à Paris. Méthode
              innovante pour améliorer la force, la souplesse et l'équilibre.
              Rejoignez nous au Studio Biopilates pour des séances adaptées à
              tous les niveaux.
            </h2>
          </div>
          <img
            loading="lazy"
            src={gyrotonic}
            alt="Stott Pilates"
            className="rounded-sm w-full max-h-[680px] object-cover shadow-lg my-6"
          />
        </div>

        <p className="text-justify leading-8">
          Bienvenue au Studio Biopilates à Paris, votre centre de référence pour
          la méthode <strong>GYROTONIC</strong>®. Créée par le danseur hongrois{" "}
          <strong>Julio Horvath</strong>, cette méthode unique combine les
          principes du yoga, de la gymnastique, de la natation et de la danse
          pour mobiliser le corps dans sa globalité.
        </p>

        <h1 className="text-3xl text-marron font-bold font-ebGaramond">
          Les Ateliers GYROTONIC® et GYROKINESIS® :
        </h1>
        {/* 2 cards */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex justify-start items-center gap-10 p-6 shadow-lg">
            <img
              loading="lazy"
              src={gyrokinesis}
              alt="stott posture"
              className="rounded-full w-[150px] h-[150px] sm:w-[280px] sm:h-[280px] object-cover shadow-lg"
            />
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl font-ebGaramond">
                GYROKINESIS®
              </h1>
              <p className="text-lg">
                Commencez sur un tabouret et évoluez vers des exercices au sol,
                visant l'éveil des sens et la mobilisation complète du corps.
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-10 p-6 shadow-lg">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl font-ebGaramond">GYROTONIC®</h1>
              <p className="text-lg">
                Utilisez des machines innovantes comme le Pulley Tower et
                l'Archway pour améliorer la force, la souplesse, la coordination
                et l'équilibre.
              </p>
            </div>
            <img
              loading="lazy"
              src={reformerGyrotonicEvolis}
              alt="stott posture"
              className="rounded-full w-[150px] h-[150px] sm:w-[280px] sm:h-[280px] object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Bénefices: */}
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-marron font-bold font-ebGaramond">
              Bénéfices :{" "}
            </h1>
            <p className="text-base">
              <strong>La méthode GYROTONIC®</strong> est accessible à tous et
              vise à améliorer le confort musculaire et articulaire. Elle est
              idéale pour ceux cherchant à augmenter leur :
            </p>
          </div>

          <div className="flex justify-evenly md:items-start max-md:flex-col gap-16 md:m-auto text-center">
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonicEndurance}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">
                {" "}
                Endurance musculaire
              </h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonicFlexibilite}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">Flexibilité</h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonicCoordination}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[165px] ">
                {" "}
                Coordination neuromusculaire
              </h2>
            </div>
          </div>
        </div>

        {/* Matériel Utilisé :  */}
        <div className="flex flex-col gap-10 mt-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-marron font-bold font-ebGaramond">
              Matériel Utilisé :{" "}
            </h1>
            <p className="text-base">
              Au Studio Biopilates, nous utilisons des équipements spécialisés
              tels que :
            </p>
          </div>

          <div className="flex justify-evenly md:items-start max-lg:flex-col gap-16 md:m-auto text-center">
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonic5}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[270px] sm:h-[270px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[270px] ">
                {" "}
                Le banc du Pulley Tower
              </h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonic3}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[270px] sm:h-[270px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[270px] ">L'Archway</h2>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <img
                loading="lazy"
                src={gyrotonic4}
                alt="stott posture"
                className="rounded-full w-[150px] h-[150px] sm:w-[270px] sm:h-[270px] object-cover shadow-lg"
              />
              <h2 className="w-[150px]  sm:w-[270px] ">
                {" "}
                Le Jumping Stretching Board
              </h2>
            </div>
          </div>
        </div>

        {/* Reserver */}
        <div className="flex max-md:flex-wrap justify-center xl:justify-between items-center gap-10 rounded-lg min-h-[300px] py-8 xl:py-4 px-6 xl:px-10 bg-marron text-white max-md:mx-[-26px] mt-8">
          <div className="flex flex-col gap-4 w-full">
            <p className="font-ebGaramond font-medium text-xl md:text-2xl text-bgColor">
              Réservez Votre Premier Atelier :
            </p>
            <p className="font-lato max-md:text-sm">
              N'attendez plus pour découvrir les secrets de la méthode
              GYROTONIC® et ses nombreux bienfaits. Réservez dès maintenant et
              commencez votre transformation.
            </p>

            <button
              className="button-hover flex mr-auto flex-col justify-center text-base rounded-lg px-8 py-3 bg-white text-marron font-lato font-bold"
              onClick={() => {
                window.open(
                  "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0 ",
                  "_blank"
                );
              }}
            >
              <div className="hover-circle-2 overflow-hidden" />
              Réserver
            </button>
          </div>
          <img
            src={gyrotonic5}
            alt="CTA"
            className="rounded-full object-cover min-w-[300px] min-h-[300px] max-w-[320px] max-h-[320px] w-full h-[320px] shadow-lg max-md:hidden"
          />
        </div>
      </div>
    </div>
  );
}
