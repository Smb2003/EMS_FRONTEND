import { useRef, useState } from "react";

export default function ResizableContainers() {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50); // % width of left panel

  const handleMouseDown = (e) => {
    e.preventDefault();

    const container = containerRef.current;

    const startX = e.clientX;
    const startLeftWidth = leftWidth;

    const onMouseMove = (e) => {
      if (!container) return;

      const deltaX = e.clientX - startX;
      const containerWidth = container.getBoundingClientRect().width;
      let newLeftWidth = ((containerWidth * startLeftWidth) / 100 + deltaX) / containerWidth * 100;

      // Clamp values between 10% and 90%
      newLeftWidth = Math.max(10, Math.min(90, newLeftWidth));
      setLeftWidth(newLeftWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="w-full h-screen p-4">
      <div
        ref={containerRef}
        className="h-full w-full flex flex-col md:flex-row bg-gray-100 rounded shadow overflow-hidden"
      >
        {/* Left Panel */}
        <div
          className="bg-blue-200 p-4 overflow-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <h2 className="text-lg font-bold">Left Panel</h2>
          <p>Drag the divider to resize</p>
        </div>

        {/* Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:block cursor-col-resize w-1 bg-gray-500 hover:bg-gray-700 transition-all"
        />

        {/* Right Panel */}
        <div
          className="bg-green-200 p-4 flex-1 overflow-auto"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <h2 className="text-lg font-bold">Right Panel</h2>
          <p>This panel resizes as you move the divider</p>
        </div>
      </div>
    </div>
  );
}
