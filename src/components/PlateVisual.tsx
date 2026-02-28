interface PlateVisualProps {
  plate: string;
  size?: "sm" | "md" | "lg";
}

export default function PlateVisual({ plate, size = "md" }: PlateVisualProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-lg",
    md: "px-6 py-3 text-2xl",
    lg: "px-8 py-4 text-4xl",
  };

  return (
    <div className={`inline-flex items-center gap-2 bg-white border-2 border-gray-800 rounded-md shadow-md ${sizeClasses[size]}`}>
      <div className="flex flex-col items-center justify-center bg-blue-700 text-white rounded-sm px-1 py-0.5 text-[8px] leading-tight font-bold">
        <span>NZ</span>
      </div>
      <span className="font-black tracking-widest text-gray-900 font-mono">
        {plate.slice(0, 3)}<span className="text-gray-400">···</span>
      </span>
    </div>
  );
}
