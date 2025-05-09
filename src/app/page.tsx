"use client";
import Mobile from "@/components/Mobile";
import MobileShare from "@/components/share/MobileShare";
import TabShare from "@/components/share/TabShare";
import Tab from "@/components/Tab";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceType, setDeviceType] = useState<"big" | "small">("big");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <Mobile /> : <Tab />}
      {deviceType === "small" ? <MobileShare /> : <TabShare />}
    </div>
  );
}
