import React from "react";
import type { Strength } from "../types/skillGap.types";
import { Proficiency } from "../types/skillGap.types";

interface SkillRadarChartProps {
  skillGaps: Strength[];
  userAName: string;
  userBName: string;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({
  skillGaps,
  userAName,
  userBName,
}) => {
  skillGaps = skillGaps.slice(0, 20);
  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const maxLevel = 3;
  const getLevel = (proficiency: Proficiency): number => {
    if (proficiency === Proficiency.NoExperienceInterested) {
      return 0;
    }
    if (proficiency === Proficiency.Novice) {
      return 1;
    }
    if (proficiency === Proficiency.Proficient) {
      return 2;
    }
    if (proficiency === Proficiency.Expert) {
      return 3;
    }
    return 0;
  };
  // Calculate points for polygon
  const calculatePoint = (
    proficiency: Proficiency,
    index: number,
    total: number
  ) => {
    const level = getLevel(proficiency);
    const angle = (2 * Math.PI * index) / total - Math.PI / 2; // Start from top
    const radius = (level / maxLevel) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate grid circles
  const gridCircles = Array.from({ length: maxLevel }, (_, i) => {
    const radius = ((i + 1) / maxLevel) * maxRadius;
    return (
      <circle
        key={i}
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  // Generate axis lines and labels
  const axes = skillGaps.map((gap, index) => {
    const angle = (2 * Math.PI * index) / skillGaps.length - Math.PI / 2;
    const endX = center + maxRadius * Math.cos(angle);
    const endY = center + maxRadius * Math.sin(angle);

    // Label position (slightly outside the chart)
    const labelRadius = maxRadius + 20;
    const labelX = center + labelRadius * Math.cos(angle);
    const labelY = center + labelRadius * Math.sin(angle);

    return (
      <g key={gap.id}>
        <line
          x1={center}
          y1={center}
          x2={endX}
          y2={endY}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-600"
          transform={`rotate(${(angle * 180) / Math.PI}, ${labelX}, ${labelY})`}
        >
          {gap.name}
        </text>
      </g>
    );
  });

  // Generate polygon paths
  const userAPoints = skillGaps.map((_, index) =>
    calculatePoint(Proficiency.NoExperienceInterested, index, skillGaps.length)
  );

  const userBPoints = skillGaps.map((gap, index) =>
    calculatePoint(gap.proficiency, index, skillGaps.length)
  );

  const pointsToPath = (points: { x: number; y: number }[]) =>
    points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid */}
          {gridCircles}
          {axes}

          {/* User B polygon (background) */}
          <polygon
            points={pointsToPath(userBPoints)}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* User A polygon (foreground) */}
          <polygon
            points={pointsToPath(userAPoints)}
            fill="rgba(16, 185, 129, 0.2)"
            stroke="#10b981"
            strokeWidth="2"
          />

          {/* Data points */}
          {userAPoints.map((point, index) => (
            <circle
              key={`a-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#10b981"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}

          {userBPoints.map((point, index) => (
            <circle
              key={`b-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm font-medium">{userAName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm font-medium">{userBName}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
