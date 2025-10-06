function ImageSkeleton() {
  return (
    <div className="w-32 h-32 m-2 bg-gray-200 rounded animate-pulse">
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
    </div>
  );
}

export function Loader() {
  return (
    <div className="flex">
      {Array.from({ length: 4 }).map((_, index) => (
        <ImageSkeleton key={index} />
      ))}
    </div>
  );
}
