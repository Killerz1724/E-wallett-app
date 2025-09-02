import clsxm from "@riverfl0w/clsxm";

export default function Pagination({
  limit,
  page,
  total,
  next,
  previous,
}: {
  limit: number;
  page: number;
  total: number;
  next: () => void;
  previous: () => void;
}) {
  const isDisablePrev = page === 1;
  const isDisableNext = total < limit;
  return (
    <div className="w-full gap-3 flex items-center justify-end">
      <button
        className={clsxm(
          "px-4 py-2 border bg-orange-400 text-white hover:cursor-pointer hover:bg-orange-300 border-gray-300 rounded-md",
          "transition-all",
          isDisablePrev && "opacity-50 hover:cursor-not-allowed"
        )}
        onClick={previous}
        disabled={isDisablePrev}
      >
        Previous
      </button>
      <p className="text-lg font-semibold">{page}</p>
      <button
        className={clsxm(
          "px-4 py-2 border bg-orange-400 text-white hover:cursor-pointer hover:bg-orange-300 border-gray-300 rounded-md",
          "transition-all",
          isDisableNext && "opacity-50 hover:cursor-not-allowed"
        )}
        onClick={next}
        disabled={isDisableNext}
      >
        Next
      </button>
    </div>
  );
}
