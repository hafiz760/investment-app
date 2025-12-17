"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
      disable: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return null;
}

