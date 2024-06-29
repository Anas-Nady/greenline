"use client";

import { closePopupIcon } from "@/components/Icons";
import { getDirectionClass } from "@/helpers/getDirectionClass";
import { PopupProps } from "@/types/Message";
import { HTMLContent } from "@/types/types";
import { MouseEventHandler } from "react";

export default function PopupMessage({
  message,
  onClose,
}: {
  message: PopupProps;
  onClose: MouseEventHandler;
}) {
  return (
    <div className="absolute mt-20 overflow-y-auto w-full h-full bg-gray-200 text-gray-900 z-50 top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] transition-all">
      <div>
        <div className="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t border-gray-300">
          <div>
            <h3 className="text-xl font-semibold capitalize text-gray-900 ">
              {message.name}
            </h3>
            <span className="py-1 font-english">{message.email}</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-white bg-red-500 px-2 py-4 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            {closePopupIcon}
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <div
            dir={getDirectionClass(message.message)}
            className="text-base leading-relaxed overflow-hidden w-full"
            dangerouslySetInnerHTML={{ __html: message.message } as HTMLContent}
          />
        </div>
      </div>
    </div>
  );
}
