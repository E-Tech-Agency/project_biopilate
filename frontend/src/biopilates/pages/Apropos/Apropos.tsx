import CircleSwiperCarousel from "@/biopilates/components/CircleSwiperCarousel";
import ImageSliderApropos from "@/biopilates/components/ImageSliderApropos";
import caroline3 from "@/assets/images/caroline-3.jpg";
import caroline4 from "@/assets/images/caroline-4.jpg";
import caroline5 from "@/assets/images/caroline-5.jpg";
import caroline1 from "@/assets/images/caroline-1.jpg";
import caroline2 from "@/assets/images/caroline-2.jpg";
import stott from "@/assets/images/stott.jpg";
import gyrotonic from "@/assets/images/gyrotonic.jpg";
import evolis from "@/assets/images/evolis.jpg";
import NosInstructeurs from "./NosInstructeurs";
import blogBg from "@/assets/images/blog-bg.jpg";

export default function Apropos() {
  const images = [caroline3, caroline4, caroline5, caroline1, caroline2];

  const list = [
    {
      title: "STOTT PILATES",
      image: stott,
      description:
        "Est une méthode d'entraînement précise et efficace pour renforcer le corps et améliorer la posture.",
    },
    {
      title: "Gyrotonic",
      image: gyrotonic,
      description:
        "Combine la force du Pilates et la fluidité du Gyrotonic pour améliorer la posture, la flexibilité et le bien-être.",
    },
    {
      title: "Evolis",
      image: evolis,
      description:
        "Est une méthode innovante alliant Pilates et équipements évolutifs pour améliorer force, flexibilité et posture.",
    },
    {
      title: "STOTT PILATES",
      image: stott,
      description:
        "Est une méthode d'entraînement précise et efficace pour renforcer le corps et améliorer la posture.",
    },
    {
      title: "Gyrotonic",
      image: gyrotonic,
      description:
        "Combine la force du Pilates et la fluidité du Gyrotonic pour améliorer la posture, la flexibilité et le bien-être.",
    },
    {
      title: "Evolis",
      image: evolis,
      description:
        "Est une méthode innovante alliant Pilates et équipements évolutifs pour améliorer force, flexibilité et posture.",
    },
  ];

  return (
    <div className="flex flex-col mx-5 md:mx-12 my-4">
      {/* Bio */}

      {/* desktop */}
      <section className="mb-0 sm:mb-12 hidden lg:flex flex-col-reverse xl:flex-row justify-center lg:justify-between items-center">
        {/* carousel */}

        <CircleSwiperCarousel images={images} />

        {/* text bio */}
        <div className="flex flex-col items-center md:items-baseline py-6 md:px-5 gap-4 sm:gap-5 font-lato xl:w-[85%] text-justify">
          <p className="text-marron text-xl sm:text-[34px] leading-snug text-start font-ebGaramond font-bold w-full">
            Caroline,
          </p>
          <p className="sm:leading-normal tex-xl sm:text-[28px] text-blueText  font-ebGaramond">
            Fondatrice du studio Biopilates : passionnée de mouvement et experte
            en Pilates
          </p>
          <div className="text-sm sm:text-lg font-lato leading-7">
            <p>
              Caroline est une <strong>experte en Pilates</strong> et en
              mouvement avec <strong>plus de 15 ans d’expérience.</strong>
            </p>
            <p>
              <strong>Fondatrice du Studio Biopilates</strong>, elle est{" "}
              <strong>spécialisée dans la méthode STOTT PILATES</strong> et
              propose des entraînements personnalisés pour tous niveaux.
            </p>
            <p>
              Formée en <strong>Gyrotonic, Evolis</strong> et{" "}
              <strong>Etiopathie</strong>, Caroline s'est également
              perfectionnée en <strong>biomécanique</strong> pour proposer une
              approche holistique du mouvement.
            </p>
            <p>
              Animée par la passion de la danse, Caroline se consacre aux
              danseurs et aide les gens à trouver un moyen{" "}
              <strong>sans douleur</strong> de rester en{" "}
              <strong>bonne santé</strong> et <strong>actif</strong>.
            </p>
            <p>
              <strong>
                Son label de qualité Biopilates - Bio de La Biomécanique
              </strong>{" "}
              est un gage de l'excellence de ses cours et de son engagement à
              offrir une expérience unique à ses clients.
            </p>
          </div>
        </div>
      </section>

      {/* mobile */}
      <section className="mb-12 lg:hidden flex flex-col justify-between items-center">
        {/* carousel */}
        <p className="text-marron text-xl sm:text-[34px] leading-snug text-start font-ebGaramond font-bold w-full max-sm:mb-4">
          Caroline,
        </p>
        <p className="sm:leading-normal tex-xl sm:text-[28px] text-blueText font-ebGaramond">
            Fondatrice du studio Biopilates : passionnée de mouvement et experte
            en Pilates
          </p>
        <CircleSwiperCarousel images={images} />

        {/* text bio */}
        <div className="flex flex-col items-baseline md:px-5 gap-4 sm:gap-5 font-lato text-justify">
          
          <div className="text-sm sm:text-lg font-lato sm:leading-7">
            <p>
              Caroline est une <strong>experte en Pilates</strong> et en
              mouvement avec <strong>plus de 15 ans d’expérience.</strong>
            </p>
            <p>
              <strong>Fondatrice du Studio Biopilates</strong>, elle est{" "}
              <strong>spécialisée dans la méthode STOTT PILATES</strong> et
              propose des entraînements personnalisés pour tous niveaux.
            </p>
            <p>
              Formée en <strong>Gyrotonic, Evolis</strong> et{" "}
              <strong>Etiopathie</strong>, Caroline s'est également
              perfectionnée en <strong>biomécanique</strong> pour proposer une
              approche holistique du mouvement.
            </p>
            <p>
              Animée par la passion de la danse, Caroline se consacre aux
              danseurs et aide les gens à trouver un moyen{" "}
              <strong>sans douleur</strong> de rester en{" "}
              <strong>bonne santé</strong> et <strong>actif</strong>.
            </p>
            <p>
              <strong>
                Son label de qualité Biopilates - Bio de La Biomécanique
              </strong>{" "}
              est un gage de l'excellence de ses cours et de son engagement à
              offrir une expérience unique à ses clients.
            </p>
          </div>
        </div>
      </section>

      {/* Approches */}
      <div className="mb-8">
        <p className="text-marron text-xl sm:text-[34px] leading-snug font-ebGaramond font-bold mb-4">
          Des approches uniques : Stott Pilates®, Gyrotonic, Evolis
        </p>
        <p className="text-sm sm:text-lg sm:leading-7">
          Biopilates se distingue par son approche unique et personnalisée,
          combinant différentes techniques pour un bien-être optimal. Découvrez
          nos trois disciplines phares :
        </p>
      </div>

      <ImageSliderApropos list={list} action={"Réserver"} />

      {/* nos instructeurs */}
      <NosInstructeurs />

      {/* Biopilates */}

      <section className="relative mb-20">
        <div className="absolute inset-0">
          <img
            src={blogBg}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-65"
          />
        </div>
        <div className="relative mb-12">
          <p className="text-marron text-xl md:text-[34px] leading-snug font-ebGaramond font-bold mb-2">
            Biopilates : Un Label de Qualité Unique - Bio de La Biomécanique
          </p>
          <p className="leading-7 text-sm md:text-lg">
            Biopilates se distingue par son label de qualité unique,{" "}
            <strong>Bio de La Biomécanique</strong>, qui garantit une pratique
            du Pilates et du Gyrotonic sûre, efficace et sans douleur. Ce label
            repose sur trois piliers fondamentaux :
          </p>
        </div>
        <div className="relative flex flex-wrap gap-10 sm:gap-20 justify-center text-center">
          <div className="flex flex-col justify-center items-center gap-5 w-[170px]">
            <svg
              width="66"
              height="68"
              viewBox="0 0 66 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.2871 0.695312C33.1914 0.804688 32.7539 1.98047 32.3164 3.32031C31.8652 4.66016 31.4277 5.79492 31.332 5.86328C31.2363 5.91797 30.0195 5.97266 28.625 5.97266C25.7949 5.97266 25.4258 6.06836 25.5078 6.76562C25.5352 7.05273 25.9043 7.39453 27.2578 8.40625C29.7734 10.2656 29.8555 10.334 29.8555 10.6211C29.8555 10.7578 29.5137 11.9199 29.1035 13.1914C28.6934 14.4629 28.3516 15.5977 28.3516 15.707C28.3516 15.9668 28.7891 16.3633 29.0762 16.3633C29.1855 16.3633 30.2246 15.6934 31.3867 14.8594C32.5352 14.0391 33.6016 13.3555 33.7656 13.3555C33.9297 13.3555 34.9414 13.998 36.0215 14.791C37.1016 15.584 38.127 16.2676 38.3047 16.3086C38.6465 16.4043 39.1523 16.0488 39.1523 15.707C39.1523 15.5977 38.8105 14.4629 38.4004 13.1777C37.9902 11.9062 37.6484 10.7441 37.6484 10.6211C37.6484 10.334 37.9355 10.0879 39.7676 8.77539C41.6543 7.43555 42.0234 7.09375 42.0234 6.71094C42.0234 6.06836 41.627 5.97266 38.8789 5.97266C37.4844 5.97266 36.2676 5.91797 36.1719 5.86328C36.0762 5.79492 35.6387 4.66016 35.1875 3.32031C34.75 1.98047 34.3125 0.804688 34.2168 0.695312C34.1348 0.585938 33.916 0.503906 33.752 0.503906C33.5879 0.503906 33.3691 0.585938 33.2871 0.695312Z"
                fill="#756E66"
              />
              <path
                d="M8.69142 9.77344C8.59571 9.8418 8.15821 10.9766 7.70704 12.3164C7.26954 13.6563 6.83204 14.832 6.73634 14.9414C6.61329 15.0918 6.03907 15.1328 3.98829 15.1328C2.47071 15.1328 1.29493 15.1875 1.13087 15.2695C0.966809 15.3652 0.871105 15.5566 0.871105 15.8164C0.871105 16.2676 0.843762 16.2402 3.44142 18.1406C4.35743 18.8242 5.16407 19.4805 5.20509 19.6035C5.25978 19.7266 4.94532 20.875 4.5215 22.1738C4.09767 23.459 3.7422 24.6348 3.7422 24.7852C3.7422 25.1543 4.20704 25.5781 4.5215 25.4961C4.65821 25.4551 5.68361 24.7715 6.79103 23.9512C7.91212 23.1445 8.96486 22.4746 9.12892 22.4746C9.29298 22.4746 10.3594 23.1719 11.5215 24.0059C12.6699 24.8398 13.6953 25.5234 13.8047 25.5234C14.0371 25.5234 14.543 25.0313 14.543 24.8125C14.543 24.7168 14.2012 23.5957 13.7637 22.3105C13.2442 20.7109 13.0254 19.8633 13.0801 19.6445C13.1484 19.4121 13.832 18.8242 15.2539 17.7988C17.4551 16.2129 17.6738 15.9258 17.1953 15.3926C16.9766 15.1602 16.7442 15.1328 14.3379 15.1328C12.0137 15.1328 11.6856 15.1055 11.5078 14.8867C11.3848 14.7637 10.9746 13.6699 10.5781 12.4668C10.1817 11.2637 9.7715 10.1426 9.67579 9.96484C9.47071 9.66406 9.01954 9.56836 8.69142 9.77344Z"
                fill="#756E66"
              />
              <path
                d="M56.3242 9.96484C56.2285 10.1426 55.8184 11.2637 55.4219 12.4668C55.0254 13.6699 54.6153 14.7637 54.4922 14.8867C54.3145 15.1055 53.9863 15.1328 51.6621 15.1328C49.2559 15.1328 49.0235 15.1602 48.8047 15.3926C48.3262 15.9258 48.5449 16.2129 50.7461 17.7988C52.168 18.8242 52.8516 19.4121 52.9199 19.6445C52.9746 19.8633 52.7559 20.7109 52.2363 22.3105C51.7988 23.5957 51.4571 24.7168 51.4571 24.8125C51.4571 25.0313 51.9629 25.5234 52.1953 25.5234C52.3047 25.5234 53.3301 24.8398 54.4785 24.0059C55.6543 23.1445 56.7071 22.4746 56.8848 22.4746C57.0488 22.4746 58.0742 23.1309 59.209 23.9512C60.3164 24.7715 61.3418 25.4551 61.4785 25.4961C61.793 25.5781 62.2578 25.1543 62.2578 24.7852C62.2578 24.6348 61.9024 23.459 61.4785 22.1738C61.0547 20.875 60.7403 19.7266 60.7949 19.6035C60.836 19.4805 61.5196 18.9063 62.2852 18.3457C65.0879 16.3086 65.1289 16.2676 65.1289 15.8164C65.1289 15.5566 65.0332 15.3652 64.8692 15.2695C64.7051 15.1875 63.5293 15.1328 62.0117 15.1328C59.961 15.1328 59.3867 15.0918 59.2637 14.9414C59.168 14.832 58.7305 13.6563 58.293 12.3164C57.8418 10.9766 57.4043 9.8418 57.3086 9.77344C56.9805 9.56836 56.5293 9.66406 56.3242 9.96484Z"
                fill="#756E66"
              />
              <path
                d="M32.5625 18.2773C29.418 18.6465 26.4238 20.7656 25.0156 23.6094C24.2637 25.1406 23.9766 26.3574 23.9766 28.0664C23.9629 35.2441 31.6875 40.0156 38.0996 36.7891C41.4903 35.0937 43.5274 31.7715 43.5274 27.9844C43.5274 23.0215 39.7813 18.8516 34.8184 18.2773C34.1485 18.209 33.5879 18.1543 33.5469 18.1543C33.5059 18.168 33.0684 18.2227 32.5625 18.2773Z"
                fill="#756E66"
              />
              <path
                d="M31.9063 39.2773C28.6113 39.7012 25.5625 40.7676 23.1836 42.3398L22.459 42.8184L28.1465 42.8594C31.2773 42.873 36.377 42.873 39.4668 42.8594L45.0996 42.8184L44.2793 42.2988C42.2422 41 39.5762 39.9473 37.2793 39.5371C36.0762 39.3184 32.8223 39.168 31.9063 39.2773Z"
                fill="#756E66"
              />
              <path
                d="M19.3965 45.3887C19.0137 45.5938 18.7539 45.8945 18.5215 46.3594L18.1797 47.0293L18.8359 53.4004C19.1914 56.9004 19.5195 59.9082 19.5605 60.0723L19.6289 60.3867H33.7656H47.9023L47.957 60.0723C47.998 59.9082 48.3125 56.9004 48.668 53.4004L49.3242 47.0293L48.9824 46.3594C48.75 45.8945 48.4902 45.5938 48.1074 45.3887L47.5605 45.0742H33.752H19.9434L19.3965 45.3887ZM35.3516 51.1719C36.7187 51.8555 37.3203 53.1543 36.7734 54.2207C36.3086 55.1094 34.9141 55.875 33.752 55.875C32.5898 55.875 31.1953 55.1094 30.7305 54.2207C30.498 53.7695 30.4844 52.9629 30.6895 52.5527C31.0723 51.8145 31.9062 51.1719 32.7949 50.9395C33.3965 50.7754 34.832 50.9121 35.3516 51.1719Z"
                fill="#756E66"
              />
              <path
                d="M15.8009 51.2539C15.295 52.4707 14.8848 53.8652 14.6661 55.082C14.5157 55.9297 14.5157 56.0254 14.7481 56.2852C14.9532 56.5176 15.1719 56.5586 15.9923 56.5586H16.9903L16.9219 56.1074C16.8946 55.875 16.7442 54.4668 16.5802 53.0039C16.4298 51.541 16.2794 50.3242 16.2657 50.2969C16.2384 50.2695 16.0333 50.707 15.8009 51.2539Z"
                fill="#756E66"
              />
              <path
                d="M51.1836 50.3242C51.1699 50.707 50.623 55.8613 50.5684 56.1758L50.5137 56.5586H51.5117C52.332 56.5586 52.5508 56.5176 52.7559 56.2852C52.9883 56.0391 52.9883 55.9297 52.8242 55.0137C52.6328 53.8652 51.8809 51.4863 51.4707 50.7207C51.3203 50.4336 51.1973 50.2559 51.1836 50.3242Z"
                fill="#756E66"
              />
              <path
                d="M16.0058 62.8203C15.6777 63.1894 15.664 66.9629 15.9922 67.2773C16.1836 67.4687 17.9746 67.4961 33.7519 67.4961C49.5293 67.4961 51.3203 67.4687 51.5117 67.2773C51.6894 67.0996 51.7305 66.7031 51.7305 65.0488C51.7305 63.2578 51.7031 62.998 51.4844 62.8066C51.2519 62.5879 49.8164 62.5742 33.7246 62.5742C16.9492 62.5742 16.2109 62.5879 16.0058 62.8203Z"
                fill="#756E66"
              />
            </svg>
            <p>Expertise et expérience</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5 w-[170px]">
            <svg
              width="70"
              height="69"
              viewBox="0 0 70 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.1515 2.58814C37.2119 4.88347 36.2741 5.22238 35.7583 5.69993C34.758 6.63962 34.758 8.11849 35.7739 9.07359C36.3053 9.56655 37.1337 9.87465 44.2452 12.1854C48.5747 13.618 52.2946 14.7734 52.5134 14.7734C52.7322 14.7734 55.6237 13.8799 58.9528 12.7862L65.0016 10.7989L65.0484 14.4653C65.0953 17.9006 65.111 18.1625 65.4236 18.563C66.0331 19.3795 66.5333 19.6259 67.5179 19.6259C68.5026 19.6259 69.0028 19.3795 69.6123 18.563C69.9249 18.1625 69.9406 17.916 69.9874 12.7245C70.0187 9.736 69.9874 7.07096 69.9406 6.79367C69.8937 6.51639 69.6436 6.05424 69.3779 5.76155C68.9403 5.284 68.3463 5.05292 60.9066 2.61895C56.499 1.17089 52.6853 -0.0152798 52.4352 0.000123978C52.1695 0.000123978 48.4497 1.17089 44.1515 2.58814Z"
                fill="#756E66"
              />
              <path
                d="M42.5104 16.0057C42.5104 17.9622 42.6979 18.5475 43.4638 19.1175C44.089 19.5797 51.8882 22.1677 52.5916 22.1523C52.8573 22.1523 54.9517 21.5053 57.2649 20.735C61.2817 19.3794 61.5005 19.287 61.9538 18.7324C62.4227 18.147 62.4383 18.0854 62.4852 16.2214C62.5165 15.1739 62.4852 14.3112 62.4227 14.3112C62.3445 14.3112 60.2814 14.9736 57.8119 15.7747C54.4202 16.8838 53.1386 17.2381 52.5134 17.2381C51.8882 17.2381 50.6066 16.8838 47.2149 15.7747C44.7454 14.9736 42.6823 14.3112 42.6198 14.3112C42.5573 14.3112 42.5104 15.0815 42.5104 16.0057Z"
                fill="#756E66"
              />
              <path
                d="M33.1481 17.4846C30.5067 18.1779 28.4435 20.2575 27.7402 22.8917C26.7399 26.6968 29.1938 30.7328 33.1794 31.7958C33.9765 31.996 33.9452 32.0114 31.5695 32.0114C28.9281 32.0268 27.9121 32.1963 26.5367 32.8895C25.3332 33.4903 24.0047 34.8305 23.3795 36.0629C22.6449 37.4956 22.473 38.4661 22.5355 40.8076C22.5824 42.9643 22.6918 43.2416 23.6608 43.9502C24.0828 44.2737 24.2235 44.2737 35.008 44.2737C45.7926 44.2737 45.9332 44.2737 46.3552 43.9502C47.3243 43.2416 47.4337 42.9643 47.4806 40.8076C47.5431 38.4661 47.3712 37.4956 46.6366 36.0629C46.0114 34.8305 44.6829 33.4903 43.4794 32.8895C42.1039 32.1963 41.088 32.0268 38.4466 32.0114C36.0396 32.0114 36.024 32.0114 36.868 31.7804C40.8223 30.7328 43.2762 26.6813 42.2759 22.8917C41.2287 18.9019 37.0712 16.4371 33.1481 17.4846Z"
                fill="#756E66"
              />
              <path
                d="M18.9876 47.0312C18.7375 47.1545 16.7681 48.9722 14.6269 51.0981L10.7507 54.9493L9.85978 54.6412C4.42063 52.7156 -1.22171 57.8455 0.231855 63.3758C1.27905 67.3194 5.37404 69.7688 9.29711 68.7675C13.5171 67.6738 16.0023 63.2218 14.5643 59.2935L14.2674 58.4462L18.2998 54.441C21.754 51.0057 22.3323 50.3587 22.4261 49.8503C22.8168 47.8169 20.8475 46.1994 18.9876 47.0312Z"
                fill="#756E66"
              />
              <path
                d="M33.9921 47.0312C33.4138 47.2931 32.898 47.8322 32.6792 48.4022C32.5698 48.6487 32.5073 50.0505 32.5073 51.7297V54.6412L31.6164 55.0725C30.4911 55.5963 28.9281 57.106 28.381 58.1843C26.1616 62.4977 28.4904 67.5505 33.2419 68.7675C38.2903 70.0615 43.2762 65.517 42.4009 60.4488C42.0102 58.2151 40.3691 56.0122 38.4153 55.0725L37.5244 54.6412L37.4775 51.514C37.4307 48.0941 37.3994 47.9709 36.3835 47.2314C35.8521 46.8463 34.6173 46.7385 33.9921 47.0312Z"
                fill="#756E66"
              />
              <path
                d="M48.9966 47.0312C48.3558 47.3085 47.6994 48.0941 47.5743 48.7411C47.3243 50.0505 47.3868 50.143 51.7162 54.4409L55.7487 58.4462L55.4517 59.2935C53.9982 63.2371 56.4833 67.6737 60.7502 68.7675C64.939 69.8458 69.2841 66.9189 69.9092 62.5901C70.5813 58.0611 66.6583 53.9017 62.0475 54.2561C61.4848 54.2869 60.6408 54.4717 60.1563 54.6412L59.2654 54.9493L55.3892 51.0981C53.2479 48.9722 51.2786 47.1544 50.9972 47.0312C50.3721 46.7693 49.6062 46.7693 48.9966 47.0312Z"
                fill="#756E66"
              />
            </svg>
            <p>Pédagogie innovante</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5 w-[170px]">
            <svg
              width="70"
              height="69"
              viewBox="0 0 70 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.8758 0.35255L30.42 0.718156L30.4747 3.93549C30.5294 7.53306 30.5841 7.65005 31.8056 7.65005C33.0453 7.65005 33.0817 7.54769 33.0817 3.84775C33.0817 0.55729 33.0817 0.542665 32.6442 0.264804C32.0608 -0.115427 31.4227 -0.0861778 30.8758 0.35255Z"
                fill="#756E66"
              />
              <path
                d="M18.2237 3.05805C18.0232 3.21892 17.8591 3.52603 17.8591 3.73077C17.8591 4.111 21.0495 8.70301 21.7423 9.30261C22.1798 9.69746 22.8908 9.74134 23.4742 9.40498C24.2399 8.98088 24.0212 8.41053 22.1252 5.73429C21.1589 4.38886 20.1927 3.16042 20.0104 3.01418C19.5181 2.67782 18.6795 2.69245 18.2237 3.05805Z"
                fill="#756E66"
              />
              <path
                d="M43.6012 3.01421C42.9813 3.45293 39.6815 8.20582 39.6815 8.67379C39.6815 9.53663 41.14 9.96073 41.8692 9.30264C42.5255 8.73229 45.7524 4.11103 45.7524 3.74542C45.7524 2.92646 44.3851 2.47311 43.6012 3.01421Z"
                fill="#756E66"
              />
              <path
                d="M9.45452 10.2532C8.76174 10.4433 8.41536 11.1599 8.76174 11.6571C9.05344 12.0812 15.3613 15.0499 15.9629 15.0499C16.9656 15.0499 17.5855 14.0409 16.9656 13.4266C16.6739 13.1195 10.9859 10.3994 10.202 10.1947C10.0561 10.1508 9.70975 10.18 9.45452 10.2532Z"
                fill="#756E66"
              />
              <path
                d="M53.4092 10.1947C52.7529 10.3555 47.2472 12.9587 46.8097 13.3096C46.518 13.529 46.2992 13.8507 46.2992 14.0262C46.2992 14.4357 47.0831 15.0499 47.6118 15.0499C48.2317 15.0499 54.5395 12.0958 54.8495 11.6571C55.3599 10.9551 54.3572 9.94606 53.4092 10.1947Z"
                fill="#756E66"
              />
              <path
                d="M29.3262 12.7539C28.0865 13.178 27.3755 13.5582 26.628 14.2456C24.8049 15.9127 24.4038 18.3842 25.6253 20.417C26.2451 21.4407 27.9406 22.6838 29.2897 23.1079C30.7482 23.5466 32.8629 23.5466 34.3214 23.1079C35.6887 22.6838 37.3113 21.4846 37.9676 20.4024C39.6813 17.6092 38.1864 14.2017 34.6678 12.8855C33.1729 12.3152 30.7846 12.2713 29.3262 12.7539Z"
                fill="#756E66"
              />
              <path
                d="M28.7064 25.7987C26.9016 26.0181 25.516 26.3106 22.6903 27.0418C18.9529 28.0216 17.458 28.2556 15.1245 28.2556C12.9914 28.2556 11.5694 28.0655 9.52758 27.4805C8.08734 27.071 6.61064 27.0857 5.80849 27.5244C3.93071 28.5335 3.85778 30.3615 5.68087 31.4729C7.1758 32.3943 11.5512 33.184 15.1609 33.184C17.2028 33.184 17.8591 33.1109 21.6693 32.4674C24.1487 32.0433 24.0576 31.9702 24.0576 34.6903C24.0576 35.9187 24.1123 39.2238 24.1852 42.0609L24.2946 47.2086L25.7895 48.013C27.9954 49.2122 29.9461 50.4845 31.751 51.8738C33.3006 53.073 33.3553 53.1022 33.5194 52.7659C33.6288 52.5758 34.0481 51.7568 34.4674 50.9525C35.6159 48.7149 36.5092 47.3695 38.0042 45.6L39.3715 43.9767L39.4991 38.2001C39.6085 33.0085 39.645 32.4235 39.9184 32.3065C40.119 32.2188 40.83 32.2773 41.942 32.4674C45.7523 33.1109 46.4086 33.184 48.4505 33.184C53.4639 33.184 58.0034 32.0433 58.9697 30.5516C59.6077 29.5718 59.152 28.2995 57.9305 27.5829C57.1648 27.1295 55.5423 27.0857 54.1385 27.4659C50.2918 28.5335 47.3384 28.5627 43.1453 27.5683C42.0332 27.305 40.0825 26.8371 38.8246 26.5446C34.9049 25.6086 31.8786 25.3893 28.7064 25.7987Z"
                fill="#756E66"
              />
              <path
                d="M63.4362 32.8477C52.3153 37.9369 49.9818 39.18 46.5908 41.7977C43.4734 44.2253 40.4835 47.3549 38.9157 49.8557C37.6213 51.9469 35.6341 56.3196 34.8137 58.9081L34.5949 59.5516L33.7928 58.4255C32.3708 56.4073 30.5477 54.6963 27.7948 52.8098C22.0157 48.8466 12.3168 44.7957 3.45665 42.6459C2.3081 42.3681 1.30541 42.1633 1.25071 42.1926C1.08663 42.2657 0.412093 44.5471 0.175092 45.7609C-0.0983706 47.1941 -0.043678 50.4845 0.284477 51.9762C1.32364 56.8607 5.69904 62.7981 10.2568 65.5475C14.4499 68.0775 19.8826 69.2621 25.7712 68.9403L27.6854 68.838L27.2114 68.0921C26.2634 66.5566 24.331 63.9096 22.8178 62.0669C19.6092 58.1184 16.4188 54.9742 12.2986 51.6983L9.74629 49.6656L11.2959 50.4406C20.5025 55.0327 27.4849 59.6832 32.8083 64.7724C33.7381 65.6499 34.5585 66.3518 34.6132 66.308C34.6861 66.2787 41.0851 60.3266 48.8515 53.0876C56.6178 45.8486 62.9986 39.955 63.0168 39.9697C63.0533 39.9843 58.4774 46.3166 52.844 54.0382C47.2289 61.7452 42.5071 68.2384 42.3613 68.4577L42.1061 68.838L43.5281 68.487C51.9325 66.425 58.6961 63.0029 62.4152 58.9227C64.8035 56.3196 66.9729 51.5813 68.559 45.483C69.5435 41.6661 69.8352 39.3555 69.9446 34.7196C69.9993 32.3797 70.0175 30.3469 69.981 30.186C69.9081 29.9374 69.0877 30.2738 63.4362 32.8477Z"
                fill="#756E66"
              />
            </svg>
            <p>Bien-être et santé</p>
          </div>
        </div>
      </section>
    </div>
  );
}
