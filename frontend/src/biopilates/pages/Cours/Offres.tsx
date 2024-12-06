import tarifs from "@/assets/data/tarifs.json"; // Adjust the path as necessary
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "@/assets/styles/swiper.css";
import { Pagination, Navigation } from "swiper/modules";

export default function Offres() {
  return (
    <div className="relative">
      <p className="text-marron text-xl md:text-[34px] leading-snug mb-4 font-ebGaramond font-bold">
        Nos offres - tarifs
      </p>
      <p className="text-sm md:text-lg leading-snug mb-6 ">
        Les <strong>annulations</strong> sont à{" "}
        <strong>12h pour les cours collectifs</strong>, à{" "}
        <strong>24h pour les cours semi-privés</strong> et{" "}
        <strong>48h pour les cours privés</strong>, en avance sinon le cours est
        prélevé. Pas de changement possible. Un client ne peut pas s’inscrire
        via Classpass, s'il est déjà venu au préalable au studio biopilates en
        direct.
      </p>
      <Swiper
        className="centered-slide-carousel swiper-container relative max-sm:mx-[-4px]"
        // centeredSlides={true}
        grabCursor={true}
        loop={true}
        spaceBetween={40}
        slideToClickedSlide={true}
        autoplay={{
          delay: 3000, // 3 seconds delay between slides
          disableOnInteraction: false, // Continue autoplay after user interactions
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-but-next1",
          prevEl: ".swiper-but-prev1",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        breakpoints={{
          1920: {
            slidesPerView: 5.5,
            spaceBetween: 40,
          },
          1600: {
            slidesPerView: 4.5,
            spaceBetween: 40,
          },
          1380: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1230: {
            slidesPerView: 3.4,
            spaceBetween: 40,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          990: {
            slidesPerView: 2.4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },

          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
        }}
      >
        <div className="flex flex-nowrap justify-center items-center gap-8 overflow-hidden">
          {tarifs.map((offre, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative py-10 mt-10 m-auto flex flex-col justify-between items-center bg-bgColor px-4 rounded-lg shadow-md min-w-[280px] sm:min-w-[300px] max-w-[400px] h-[335px] md:h-[400px] font-lato ${
                  index == 0 || index == 1 ? "max-sm:mr-9 max-md:mr-28" : ""
                }`}
              >
                {offre.status == "Nouveau" && (
                  <div className="absolute top-0 right-0 mt-[-38px] mr-[-38px]">
                    <svg
                      width="160"
                      height="146"
                      viewBox="0 0 160 146"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="21.9781"
                        y="0.647101"
                        width="182.861"
                        height="31.5"
                        transform="rotate(41.513 21.9781 0.647101)"
                        fill="#756E66"
                        stroke="white"
                        stroke-width="0.5"
                      />
                      <path d="M1 24L7 29.5L16.5 38H1V24Z" fill="#756E66" />
                      <path
                        d="M122 132L128 137.5L137.5 146H122V132Z"
                        fill="#756E66"
                      />
                      <path
                        d="M52.7455 57.1757L60.4069 48.5191L61.5654 49.5444C61.3612 51.3312 61.0859 53.0702 60.7394 54.7613C60.409 56.4514 59.991 58.1549 59.4855 59.8718L62.2876 56.4493L65.3972 52.9357L66.4793 53.8934L58.8179 62.55L57.6594 61.5247C58.162 59.7598 58.6132 58.0101 59.0133 56.2756C59.4293 54.5401 59.7596 52.7817 60.0043 51.0005L56.9598 54.5944L53.8276 58.1334L52.7455 57.1757ZM69.4282 65.6294L68.7522 66.3932C67.956 67.2928 67.0954 67.7949 66.1704 67.8995C65.254 68.0116 64.3672 67.6883 63.51 66.9297C62.6613 66.1786 62.2327 65.3376 62.2241 64.4068C62.2155 63.476 62.6093 62.5608 63.4054 61.6612L64.0815 60.8973C64.8626 60.0147 65.7114 59.5173 66.6279 59.4052C67.5604 59.2922 68.4552 59.615 69.3124 60.3736C70.1695 61.1322 70.5944 61.9774 70.587 62.9092C70.5956 63.84 70.2093 64.7467 69.4282 65.6294ZM68.3461 64.6717C68.8794 64.0691 69.1605 63.4779 69.1893 62.8981C69.2257 62.3098 68.9851 61.7865 68.4674 61.3284C67.9581 60.8777 67.4095 60.7024 66.8215 60.8025C66.2495 60.9016 65.6968 61.2524 65.1635 61.855L64.4875 62.6188C63.9317 63.2469 63.6393 63.8508 63.6105 64.4306C63.5901 65.018 63.8345 65.537 64.3437 65.9876C64.8614 66.4458 65.4063 66.6254 65.9783 66.5262C66.5503 66.4271 67.1143 66.0635 67.6701 65.4355L68.3461 64.6717ZM72.0758 74.2837L72.8644 73.3926C72.0851 73.3839 71.4539 73.302 70.9707 73.1468C70.4951 72.9831 70.0833 72.7473 69.7353 72.4393C69.1752 71.9436 68.9081 71.3818 68.934 70.754C68.9675 70.1176 69.2809 69.4643 69.8743 68.7938L73.6937 64.4782L74.7376 65.4021L71.0533 69.5649C70.6628 70.0062 70.45 70.4006 70.4149 70.7479C70.3959 71.0943 70.5434 71.4065 70.8574 71.6844C71.0951 71.8947 71.415 72.0719 71.8172 72.216C72.2194 72.3601 72.7989 72.4492 73.5557 72.4833L77.5892 67.9259L78.633 68.8497L73.056 75.1512L72.0758 74.2837ZM85.4895 74.9179L77.6846 79.2478L76.7044 78.3802L80.0282 70.0845L81.1103 71.0422L79.4516 75.0453L78.3868 77.5309L80.7119 76.1607L84.4583 74.0053L85.4895 74.9179ZM86.0813 86.0207C85.5341 85.8694 85.0396 85.6587 84.5976 85.3886C84.148 85.127 83.762 84.8535 83.4395 84.5681C82.5314 83.7644 82.0816 82.9046 82.09 81.9888C82.1068 81.0806 82.5134 80.1766 83.3095 79.277L83.9855 78.5132C84.7592 77.639 85.5995 77.1342 86.5065 76.9986C87.422 76.8705 88.2872 77.167 89.1019 77.888C89.5347 78.2711 89.8505 78.7095 90.0492 79.2032C90.2639 79.6959 90.3196 80.2144 90.2163 80.7586C90.129 81.3018 89.8413 81.8493 89.353 82.4009C89.0376 82.7574 88.6261 83.1197 88.1187 83.4878L84.3632 80.1642L84.3407 80.1896C83.7698 80.8346 83.4695 81.439 83.4397 82.0029C83.4183 82.5742 83.7047 83.1228 84.2987 83.6486C84.5703 83.8889 84.8974 84.1179 85.28 84.3354C85.6711 84.5604 86.0875 84.7398 86.5292 84.8734L86.0813 86.0207ZM88.2907 78.8046C87.7984 78.369 87.2823 78.1997 86.7423 78.2969C86.2182 78.3931 85.6881 78.7185 85.1519 79.273L88.0035 81.7968C88.1641 81.6666 88.3046 81.5335 88.4247 81.3978C88.8454 80.9225 89.0175 80.4544 88.9413 79.9933C88.881 79.5313 88.6641 79.1351 88.2907 78.8046ZM92.1513 92.1648C91.7609 91.8192 91.5257 91.4522 91.4458 91.0637C91.3744 90.6827 91.4085 90.3193 91.548 89.9736C90.8091 89.9705 90.2024 89.8951 89.7277 89.7474C89.2605 89.5912 88.8572 89.3629 88.5177 89.0624C87.9661 88.5742 87.7164 88.0355 87.7688 87.4462C87.8212 86.8569 88.0765 86.3034 88.5347 85.7857C88.8426 85.4377 89.1804 85.1843 89.5481 85.0254C89.9158 84.8665 90.3199 84.8458 90.7607 84.9635C91.2089 85.0726 91.6919 85.3563 92.2096 85.8145C92.4387 86.0173 92.6741 86.2558 92.9156 86.5301C93.1646 86.7959 93.4104 87.074 93.6529 87.3643L94.4078 86.5114C94.8284 86.0361 95.0078 85.6197 94.9458 85.2622C94.8999 84.9037 94.6775 84.548 94.2786 84.1949C93.7354 83.7142 92.9972 83.3257 92.0638 83.0293L92.499 81.8707C93.0471 82.038 93.5407 82.2327 93.9798 82.4548C94.4188 82.677 94.8208 82.9495 95.1858 83.2725C95.7799 83.7983 96.1475 84.2977 96.2888 84.7708C96.43 85.2439 96.4174 85.6943 96.2507 86.122C96.0841 86.5496 95.8318 86.9544 95.4938 87.3363L93.0827 90.0606C92.91 90.2558 92.8017 90.4551 92.7579 90.6585C92.7216 90.8534 92.8181 91.0523 93.0472 91.2551L93.1872 91.379L92.3422 92.3338L92.1513 92.1648ZM89.5771 86.6856C89.3217 86.9741 89.183 87.2676 89.1611 87.566C89.1391 87.8644 89.2555 88.1263 89.5101 88.3516C89.7307 88.5469 90.0417 88.7086 90.4429 88.8366C90.8516 88.9562 91.4447 89.0044 92.2221 88.981L92.9319 88.179C92.4374 87.5749 91.9695 87.0776 91.5282 86.687C91.1378 86.3415 90.7863 86.1742 90.4739 86.1853C90.1614 86.1963 89.8625 86.3631 89.5771 86.6856ZM97.7601 97.0153L98.5488 96.1241C97.7695 96.1155 97.1382 96.0335 96.655 95.8783C96.1794 95.7147 95.7676 95.4788 95.4196 95.1709C94.8595 94.6751 94.5924 94.1134 94.6183 93.4855C94.6518 92.8492 94.9652 92.1958 95.5586 91.5254L99.378 87.2098L100.422 88.1337L96.7377 92.2965C96.3471 92.7378 96.1343 93.1321 96.0993 93.4795C96.0803 93.8259 96.2278 94.1381 96.5418 94.416C96.7794 94.6263 97.0993 94.8035 97.5015 94.9476C97.9037 95.0916 98.4832 95.1807 99.24 95.2149L103.273 90.6574L104.317 91.5813L98.7403 97.8828L97.7601 97.0153Z"
                        fill="#EBDCCD"
                      />
                    </svg>
                  </div>
                )}
                <h3 className="text-lg md:text-2xl text-center font-ebGaramond font-bold h-20 max-w-[240px] max-md:w-48">
                  {offre.title}
                </h3>
                <p className="text-2xl text-marron font-bold">{offre.price}</p>
                {offre.pack1 !== "" && (
                  <div className="flex flex-col justify-center items-center gap-2 text-sm md:text-base pt-4">
                    <p>{offre.pack1}</p>
                    <p>{offre.pack2}</p>
                    <p>{offre.pack3}</p>
                  </div>
                )}
                <div className="flex flex-col justify-center items-center gap-6">
                  <p className="text-sm text-blueText font-bold pt-2">
                    {offre.validity}
                  </p>
                  <button
                    className="button-offre-hover font-bold flex justify-center items-center gap-2 text-marron rounded-md px-16 sm:px-24 py-2 bg-white shadow-sm"
                    onClick={() => {
                      window.open(
                        "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0 ",
                        "_blank"
                      );
                    }}
                  >
                    {offre.action == "Envoyer" && (
                      <div className="text-[22px]">
                        {" "}
                        <CiMail />
                      </div>
                    )}
                    {offre.action}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        <div className="slider-controler flex justify-center gap-10 sm:mt-[-24px]">
          <div className="swiper-pagination m-auto z-[1] block sm:hidden"></div>
        </div>
      </Swiper>
      <div className="arrow-hover cursor-pointer swiper-but-prev1 slider-arrow hidden sm:flex justify-center items-center bg-marron rounded-full w-10 h-10 absolute left-[-15px] top-[60%] transform -translate-y-1/2 z-20">
        <FaArrowLeftLong className="text-bgColor b" />
      </div>
      <div className="arrow-hover cursor-pointer swiper-but-next1 slider-arrow hidden sm:flex justify-center items-center bg-marron rounded-full w-10 h-10 absolute right-[-15px] top-[60%] transform -translate-y-1/2 z-20">
        <FaArrowRightLong className="text-bgColor b" />
      </div>
    </div>
  );
}
