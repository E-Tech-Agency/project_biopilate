import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";

export default function FAQ() {
  const faqs = [
    {
      question: "Quels sont les bienfaits du Pilates Prénatal ?",
      answer:
        "Le Pilates prénatal est spécialement conçu pour soutenir le corps en mutation de la future maman. Il cible le transverse abdominal, muscle profond qui agit comme un corset naturel, afin de renforcer le soutien central sans solliciter excessivement les muscles abdominaux. Cette approche douce mais efficace favorise une respiration profonde et une harmonie entre le corps et l’esprit, préparant ainsi physiquement et mentalement les femmes à l’accouchement. En outre, le Pilates prénatal aide à gérer les fluctuations émotionnelles fréquentes durant cette période, renforçant la résilience et le bien-être global.",
    },
    {
      question: "Quels sont les bienfaits du Pilates Postnatal ?",
      answer:
        "Après l’accouchement, le Pilates postnatal offre de nombreux avantages pour les jeunes mamans. Cette méthode douce et adaptée :<ul><li>·       Cible les muscles sollicités pendant la grossesse.</li><li>·       Renforce le plancher pelvien et les muscles abdominaux profonds.</li><li>·       Améliore la circulation sanguine.</li><li>·       Favorise la relaxation et les étirements profonds.En somme, le Pilates postnatal est un allié précieux pour retrouver forme, équilibre et vitalité après la naissance de bébé</li></ul>",
    },
    {
      question: "Qu’est-ce que le Gyrotonic ?",
      answer:
        "Le Gyrotonic est une méthode d’entraînement physique qui s’inspire du Pilates, du yoga, de la danse, du tai-chi et de la natation. Elle se distingue par ses mouvements fluides, circulaires et en spirale, qui étirent et renforcent les muscles tout en améliorant la flexibilité et la mobilité articulaire. Cette pratique se réalise à l’aide d’appareils spécifiques équipés de poulies et de manivelles pour une résistance adaptée, permettant une intégration harmonieuse du corps et de l’esprit. Le Gyrotonic offre ainsi une expérience complète qui favorise un bien-être physique global.",
    },
    {
      question: "Qu’est-ce-que la méthode STOTT PILATES ?",
      answer:
        "La méthode STOTT PILATES est une approche moderne et complète du Pilates, axée sur la sécurité, l’efficacité et la conscience corporelle.  Elle est bien plus qu’un simple entraînement physique ; c’est une approche holistique qui prend en compte l’anatomie, la respiration et la qualité du mouvement pour un bien-être global.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-16 flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-3xl text-marron font-ebGaramond font-bold">FAQ</p>
        <p className="text-2xl font-ebGaramond">
          Trouvez ici les réponses aux questions fréquemment posées concernant
          les cours de Pilates, les horaires et les modalités d'inscription.
        </p>
      </div>

      <div className="py-4 container mx-auto px-0 sm:px-24 md:px-32">
        <div className="faqs-section">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq accordion border border-marron mb-4 p-4 rounded-lg shadow "
            >
              <div
                className="question-wrapper flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center">
                  <span className="q-mark font-bold text-marron mr-4">Q.</span>
                  <p className="question text-lg font-semibold m-0 font-ebGaramond">
                    {faq.question}
                  </p>
                </div>
                <div
                  className={`rounded-full w-[50px] h-[50px] shadow-lg flex justify-center items-center text-marron ml-2 ${
                    openIndex === index ? "bg-marron text-white" : ""
                  }`}
                >
                  <MdExpandMore
                    className={`transition-transform duration-500 text-3xl ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              <div
                className={`answer-wrapper overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p
                  className="answer text-base text-gray-600 p-4"
                  dangerouslySetInnerHTML={{
                    __html: faq.answer,
                  }}
                ></p>
                <button className="text-lg text-blueText p-4 font-ebGaramond font-bold flex items-center gap-2">
                  <p>Découvrir plus de détails</p>
                  <BsArrowUpRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
