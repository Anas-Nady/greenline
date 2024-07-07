"use client";
import { questionMarkIcon } from "@/components/Icons";
import { FAQS_QUESTIONS } from "@/constants/Faqs";
import { useState } from "react";

export default function Accordion() {
  const [openItem, setOpenItem] = useState(0);

  const handleToggle = (id: number) => {
    setOpenItem(openItem === id ? 0 : id);
  };

  return (
    <div className="max-w-screen-lg mx-auto my-9">
      {FAQS_QUESTIONS.map((question) => (
        <div
          key={question.id}
          className={`${
            question.id == openItem ? "bg-gray-100" : "bg-white"
          }  hover:bg-gray-100`}
        >
          <h2>
            <button
              type="button"
              onClick={() => handleToggle(question.id)}
              className="flex items-center justify-between w-full p-5 font-medium border border-b-0 border-gray-200 rounded-t-xl hover:bg-gray-100 gap-3"
            >
              <span className="flex items-center gap-2 text-lg sm:text-xl text-gray-700">
                <span>{questionMarkIcon}</span>
                <span>{question.question}</span>
              </span>
              <svg
                className={`w-3 h-3 shrink-0 ${
                  openItem === question.id ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            className={`accordion-content ${
              openItem === question.id ? "open" : ""
            }`}
          >
            <div className="p-5 border border-b-0 border-gray-200 bg-white">
              <p className="mb-2 text-gray-700">{question.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
