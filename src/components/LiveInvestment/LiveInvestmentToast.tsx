"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// lib/dummyPurchases.ts
export const dummyPurchases = [
  {
    id: 1,
    name: "Alex Morgan",
    investment: 250,
    country: "USA",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Sarah Khan",
    investment: 500,
    country: "UAE",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 3,
    name: "John Carter",
    investment: 1000,
    country: "UK",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 4,
    name: "Ahmed Ali",
    investment: 750,
    country: "Pakistan",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

export default function LiveInvestmentToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % dummyPurchases.length);
        setVisible(true);
      }, 10000); // delay between hide → show
    }, 3000); // show duration (3 sec)

    return () => clearInterval(interval);
  }, []);

  const data = dummyPurchases[index];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-4 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 w-80 border border-gray-200"
          >
            {/* Avatar */}
            <img
              src={data.avatar}
              alt={data.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">{data.name}</span>{" "}
                <span className="text-gray-500">from {data.country}</span>
              </p>

              <p className="text-sm mt-0.5 text-gray-600">
                invested{" "}
                <span className="font-bold text-green-600">
                  ${data.investment} USD
                </span>
              </p>

              <p className="text-xs text-gray-400 mt-1">Just now</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
