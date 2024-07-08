"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { topArrowIcon } from "./Icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const condition =
    pathname.includes("dashboard") || pathname.includes("login");

  useEffect(() => {
    // Show the button when the user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && !condition && (
        <button
          onClick={scrollToTop}
          className="fixed animate-bounce bottom-8 sm:bottom-6 z-50 w-8 h-8 sm:w-10 sm:h-10 text-center right-1 sm:right-4 bg-green-500 hover:bg-green-600 p-2 rounded-full focus:outline-none"
        >
          {topArrowIcon}
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
