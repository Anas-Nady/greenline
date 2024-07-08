"use client";

import { trashIcon } from "@/components/Icons";
import { userIcon } from "../_components/Icons";
import { MessageProps } from "@/types/Message";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { Pagination } from "flowbite-react";
import PopupMessage from "./_PopupMessage";
import NotFoundData from "@/components/NotFoundData";
import { HTMLContent } from "@/types/types";
import { NEXT, PREVIOUS } from "@/constants/Global";
import { MESSAGE_DELETED } from "@/constants/ToastArabicMessages";

export default function MessageCard() {
  const [loadingDeleteMessage, setLoadingDeleteMessage] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupData, setPopupData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleOpenPopup = (message: MessageProps) => {
    setPopupData({
      name: message.name,
      message: message.message,
      email: message.email,
    });
    setPopupStatus(true);
  };

  const handleClosePopup = () => {
    setPopupStatus(false);
  };

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalMessages: 0,
  });

  const getMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch(`/api/messages?page=${pagination.page}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setPagination({
          totalPages: data.totalPages,
          page: data.page,
          totalMessages: data.totalMessages,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleDeleteMessage = async (slug: string) => {
    try {
      setLoadingDeleteMessage(true);
      const res = await fetch(`/api/messages/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(MESSAGE_DELETED);
        await getMessages();
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingDeleteMessage(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [pagination.page]);

  if (loadingMessages) {
    return <Spinner loading={loadingMessages} />;
  } else {
    return (
      <>
        {popupStatus && (
          <PopupMessage message={popupData} onClose={handleClosePopup} />
        )}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 mb-8 rounded-lg lg:mb-12 gap-5 bg-white">
          {messages.length === 0 && <NotFoundData />}
          {messages.length > 0 &&
            messages.map((message) => (
              <figure
                key={message.slug}
                className={`relative border-2 border-slate-200 rounded ${
                  !message.read && "border-l-4 border-green-400"
                } px-12 py-8 h-[225px] overflow-y-auto no-overflow-style hover:scale-[1.02] duration-200 flex flex-col items-center justify-center p-8 text-center bg-white`}
              >
                <blockquote
                  onClick={() => handleOpenPopup(message)}
                  className="max-w-2xl  cursor-pointer mx-auto mb-4 text-gray-500 lg:mb-8"
                >
                  <div
                    onClick={() => handleOpenPopup(message)}
                    className="leading-7 line-clamp-2 text-start tracking-wide"
                    dangerouslySetInnerHTML={
                      { __html: message.message } as HTMLContent
                    }
                  />
                </blockquote>
                <figcaption
                  onClick={() => handleOpenPopup(message)}
                  className="flex cursor-pointer items-center justify-center"
                >
                  <span className="w-12 h-12 rounded-full text-gray-400 p-2 bg-gray-100">
                    {userIcon}
                  </span>
                  <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                    <div>{message.name}</div>
                    <div className="text-sm text-gray-500">{message.email}</div>
                  </div>
                </figcaption>
                <button
                  onClick={() => handleDeleteMessage(message.slug)}
                  disabled={loadingDeleteMessage}
                  className={`${
                    loadingDeleteMessage && "opacity-30 cursor-not-allowed"
                  } rounded-full w-6 h-6 sm:w-8 sm:h-8 text-3xl absolute top-1 right-1 hover:text-red-600`}
                >
                  {trashIcon}
                </button>
              </figure>
            ))}
        </div>
        {messages.length > 0 && (
          <div>
            <Pagination
              nextLabel={NEXT}
              previousLabel={PREVIOUS}
              currentPage={pagination.page || 1}
              totalPages={pagination.totalPages || 1}
              onPageChange={(next) =>
                setPagination({ ...pagination, page: next })
              }
            />
          </div>
        )}
      </>
    );
  }
}
