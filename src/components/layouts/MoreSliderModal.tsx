import { useAnimation, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import NestedNavItems from "./NestedNavItems";
import { NavItem } from "components/Sidebar";

export default function MoreSliderModal({
  setClose,
  navItems,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
}) {
  const sliderControl = useAnimation();

  useEffect(() => {
    sliderControl.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    });
  }, [sliderControl]);
  return (
    <section className="fixed top-0 right-0 w-full h-screen">
      {/* Overlay */}
      <div className="absolute z-10 w-full h-full bg-black/30"></div>
      <motion.article
        initial={{ y: "100%", opacity: 0 }}
        exit={{ y: "100%", opacity: 0 }}
        animate={sliderControl}
        className="absolute z-20 min-h-[20rem] bottom-0 right-0 w-full bg-orange-500 dark:bg-gray-800 rounded-t-[2rem]"
      >
        <div
          className=" absolute flex  right-2 top-2"
          onClick={() => setClose(true)}
        >
          <div className=" hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
            <X className="h-10 w-10 text-white dark:text-gray-400" />
          </div>
        </div>
        {/* content */}
        <div className="flex flex-col w-full gap-2 px-8 py-12">
          <h4 className="text-center font-semibold text-lg">More Options</h4>
          <NestedNavItems navItems={navItems} />
        </div>
      </motion.article>
    </section>
  );
}
