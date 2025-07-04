import React from "react";

// Enhanced animated plant mascot with playful continuous animation
export default function PlantMascot({
  condition = "sunny",
  side = "left",
}: {
  condition?: string;
  side?: "left" | "right";
}) {
  // Weather overlays
  const overlays: Record<string, React.ReactNode> = {
    sunny: (
      <g className="animate-spin-slow origin-center">
        <circle cx="32" cy="12" r="8" fill="#FFD600" />
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <rect
            key={i}
            x={32 - 1}
            y={0}
            width={2}
            height={6}
            fill="#FFD600"
            transform={`rotate(${i * 45} 32 12)`}
            opacity={0.7}
          />
        ))}
      </g>
    ),
    rainy: (
      <g>
        <ellipse cx="32" cy="14" rx="10" ry="6" fill="#B3E5FC" />
        {/* Raindrops */}
        {[24, 32, 40].map((x, i) => (
          <ellipse
            key={i}
            cx={x}
            cy={26}
            rx={2}
            ry={5}
            fill="#4FC3F7"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </g>
    ),
    cloudy: (
      <g>
        <ellipse cx="32" cy="14" rx="10" ry="6" fill="#CFD8DC" />
        <ellipse cx="38" cy="16" rx="7" ry="5" fill="#B0BEC5" />
      </g>
    ),
    windy: (
      <g>
        {/* Wind lines */}
        <path
          d="M20 20 Q28 18 36 20 Q44 22 52 20"
          stroke="#81D4FA"
          strokeWidth="2"
          fill="none"
          className="animate-wiggle"
        />
        <path
          d="M24 24 Q32 22 40 24 Q48 26 56 24"
          stroke="#B3E5FC"
          strokeWidth="1.5"
          fill="none"
          className="animate-wiggle"
          style={{ animationDelay: "0.2s" }}
        />
      </g>
    ),
  };

  // Pick overlay based on condition
  let overlay: React.ReactNode = overlays.sunny;
  if (condition.includes("rain")) overlay = overlays.rainy;
  else if (condition.includes("cloud")) overlay = overlays.cloudy;
  else if (condition.includes("wind")) overlay = overlays.windy;
  else if (condition.includes("sun")) overlay = overlays.sunny;

  return (
    <div
      className={`fixed top-32 z-30 ${
        side === "left" ? "left-2" : "right-2"
      } pointer-events-none select-none`}
      style={{ width: 100, height: 130 }}
    >
      <svg
        width={80}
        height={120}
        viewBox="0 0 80 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pot with shake */}
        <g className="animate-pot-shake">
          <ellipse cx="40" cy="110" rx="22" ry="8" fill="#8D6E63" />
          <rect x="18" y="90" width="44" height="24" rx="10" fill="#A1887F" />
        </g>
        {/* Stem with bounce */}
        <g className="animate-bounce-plant">
          <rect x="37" y="60" width="6" height="35" rx="3" fill="#388E3C" />
          {/* Left leaf with wiggle */}
          <ellipse
            cx="28"
            cy="75"
            rx="12"
            ry="22"
            fill="#66BB6A"
            transform="rotate(-25 28 75)"
            className="animate-leaf-wiggle"
          />
          {/* Right leaf with wiggle */}
          <ellipse
            cx="52"
            cy="80"
            rx="12"
            ry="22"
            fill="#43A047"
            transform="rotate(20 52 80)"
            className="animate-leaf-wiggle"
            style={{ animationDelay: "0.5s" }}
          />
          {/* Top leaf with wiggle */}
          <ellipse
            cx="40"
            cy="60"
            rx="8"
            ry="16"
            fill="#81C784"
            className="animate-leaf-wiggle"
            style={{ animationDelay: "0.25s" }}
          />
          {/* Cute face with bounce */}
          <g className="animate-face-bounce">
            <ellipse cx="40" cy="90" rx="8" ry="6" fill="#fff" />
            <ellipse cx="37" cy="90" rx="1.5" ry="2" fill="#333" />
            <ellipse cx="43" cy="90" rx="1.5" ry="2" fill="#333" />
            <path
              d="M37 94 Q40 97 43 94"
              stroke="#333"
              strokeWidth="1"
              fill="none"
            />
            {/* Blush */}
            <ellipse cx="35" cy="92" rx="1.2" ry="0.6" fill="#FFB6B6" />
            <ellipse cx="45" cy="92" rx="1.2" ry="0.6" fill="#FFB6B6" />
          </g>
        </g>
        {/* Weather overlay */}
        {overlay}
      </svg>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        .animate-wiggle {
          animation: wiggle 1.5s infinite;
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(8px);
          }
        }
        .animate-leaf-wiggle {
          animation: leafwiggle 2.5s infinite;
          transform-origin: 50% 100%;
        }
        @keyframes leafwiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
          80% {
            transform: rotate(-8deg);
          }
        }
        .animate-pot-shake {
          animation: potshake 3s infinite;
        }
        @keyframes potshake {
          0%,
          100% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-2px);
          }
          20% {
            transform: translateX(2px);
          }
          30% {
            transform: translateX(-2px);
          }
          40% {
            transform: translateX(2px);
          }
          50% {
            transform: translateX(0);
          }
        }
        .animate-bounce-plant {
          animation: bounceplant 2.5s infinite;
        }
        @keyframes bounceplant {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-face-bounce {
          animation: facebounce 2.5s infinite;
        }
        @keyframes facebounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
}
