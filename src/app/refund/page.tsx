import { checkedIcon } from "@/components/Icons";
import {
  REFUND,
  REFUND_AND_RETURN_PAGE_TITLE,
  REFUND_POLICY_DOCUMENT,
  REFUND_POLICY_PAGE_TITLE,
  RETURN_POLICY_DOCUMENT,
  RETURN_POLICY_PAGE_TITLE,
} from "@/constants/arabic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: REFUND,
};

export default function Refund() {
  return (
    <main className={`my-14 container`}>
      <div className="bg-white shadow-lg rounded border border-gray-100 py-8 px-6 mx-5">
        <h1 className="text-xl pb-2 border-b-2 border-green-300 w-fit mx-auto sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          {REFUND_AND_RETURN_PAGE_TITLE}
        </h1>
        <div className="max-w-screen-lg my-9">
          <h2 className="text-md sm:text-lg lg:text-2xl font-semibold my-5">
            {REFUND_POLICY_PAGE_TITLE}
          </h2>
          {REFUND_POLICY_DOCUMENT.map((document) => (
            <p
              className="text-sm sm:text-md lg:text-lg mb-5 pb-2 border-b-2 border-gray-100 flex items-start gap-2"
              key={document.id}
            >
              <span className="text-green-500">{checkedIcon}</span>
              <span>{document.title}</span>
            </p>
          ))}
          <h2 className="text-md sm:text-lg lg:text-2xl font-semibold my-5">
            {RETURN_POLICY_PAGE_TITLE}
          </h2>
          {RETURN_POLICY_DOCUMENT.map((document) => (
            <p
              className="text-sm sm:text-md lg:text-lg mb-5 pb-2 border-b-2 border-gray-100 flex items-start gap-2"
              key={document.id}
            >
              <span className="text-green-500">{checkedIcon}</span>
              <span>{document.title}</span>
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
