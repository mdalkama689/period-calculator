'use client'
import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import Link from "next/link";

const MobileShare = () => {
  const [isClicked, setIsClicked] = useState(false);
   const whatsappMessage = encodeURIComponent(
    "I found this useful period calculator tool, check it out: https://seosaurus.in/tools/period-calculator/"
  );

  const toolUrl = "https://seosaurus.in/tools/period-calculator/";


  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="fixed bottom-20 right-4 z-10">
      <div className="relative group">
        <div
          className={`absolute bottom-0 right-0 w-[290px] px-4 pb-1 shadow-lg transition-opacity duration-300 ease-in-out ${
            isClicked ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Link
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-600 text-white hover:bg-green-700 rounded-md p-2 transition-colors duration-300"
          >
            <IoLogoWhatsapp size={20} className="mr-2" />
            Share this on WhatsApp
          </Link>

          <Link
            href={toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-600 text-white hover:bg-blue-700 rounded-md p-2 mt-1 transition-colors duration-300"
          >
            <FaPlusCircle size={20} className="mr-2" />
            Add this tool to your website
          </Link>
        </div>

        <IoInformationCircle
          size={48}
          onClick={handleClick}
          className="cursor-pointer absolute right-0 transition-transform duration-300 transform hover:scale-110 text-white"
        />
      </div>
    </div>
  );
};

export default MobileShare;
