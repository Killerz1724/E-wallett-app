"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { closeSliderNav } from "store/sliderNavStore";
import NestedNavItems from "./NestedNavItems";

export default function MoreSliderModal() {
  const { navItems, isOpen } = useSelector(
    (state: RootState) => state.sliderNav
  );
  const dispatch = useDispatch();

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <section className="fixed z-20 top-0 right-0 w-full h-screen">
          {/* Overlay */}
          <div className="absolute z-30 w-full h-full bg-black/30"></div>

          <motion.article
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute z-40 min-h-[20rem] bottom-0 right-0 w-full bg-orange-500 dark:bg-gray-800 rounded-t-[2rem]"
          >
            <div
              className=" absolute flex  right-2 top-2"
              onClick={() => dispatch(closeSliderNav())}
            >
              <div className=" hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
                <X className="h-10 w-10 text-white dark:text-gray-400" />
              </div>
            </div>
            {/* content */}
            <div className="flex flex-col w-full gap-2 px-8 py-12 ">
              <h4 className="text-center font-semibold text-lg">
                More Options
              </h4>
              <NestedNavItems navItems={navItems} />
            </div>
          </motion.article>
        </section>
      )}
    </AnimatePresence>
  );
}
