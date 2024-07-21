import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

export default function FAQ() {
  const faqs = [
    {
      question: "How many travellers make a Group?",
      answer:
        "Groups can start at as low as 8 people depending on the travel provider. Plus, there is no size limit or maximum number of passengers. The more, the merrier!",
    },
    {
      question: "How much is a group discount?",
      answer:
        "Discounts vary depending on a number of factors, like the size of your group, duration of stay, special activities and more. Discuss your group travel requirements with your agent and they’ll be sure to find you all the discounts your group is eligible for.",
    },
    {
      question: "What kinds of groups can travel together?",
      answer:
        "You name it! We have booked all kinds of group travel. We’re happy to arrange friends and family trips, destination weddings, group golf getaways, anniversaries and vow renewals, as well as get-togethers for clubs and other special interest groups.",
    },
    {
      question:
        "Are there group travel benefits beyond discounted airfare and accommodation?",
      answer:
        "Yes! For starters, groups can take advantage of flexible payment options, often with lower deposits required to secure each booking. In addition to discounts up-front, your group may be eligible for complimentary passengers, and qualify for more flexible terms. Be sure to ask your agent for details! Ask your Travel Professional for details!",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-4 container mx-auto px-0 sm:px-24 md:px-32">
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
                <p className="question text-lg text-gray-600 m-0">
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
              <p className="answer text-base text-gray-600 p-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
