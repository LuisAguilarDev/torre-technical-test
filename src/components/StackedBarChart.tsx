import React from "react";
import { Proficiency, type Strength } from "../types/skillGap.types";

interface StackedBarChartProps {
  skillGaps: Strength[];
  userAName: string;
  userBName: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  skillGaps,
  userAName,
  userBName,
}) => {
  const maxLevel = 4;

  const getLevel = (proficiency: Proficiency): number => {
    switch (proficiency) {
      case Proficiency.NoExperienceInterested:
        return 1;
      case Proficiency.Novice:
        return 2;
      case Proficiency.Proficient:
        return 3;
      case Proficiency.Expert:
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg shadow-sm border p-6">
        <div className="space-y-4">
          {skillGaps.map((gap) => {
            const userALevel = 0;
            const userBLevel = getLevel(gap.proficiency);
            const userAPercentage = (userALevel / maxLevel) * 100;
            const userBPercentage = (userBLevel / maxLevel) * 100;

            return (
              <div key={gap.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary text-sm">
                    {gap.name}
                  </span>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-600 rounded-full" />
                      <span className="capitalize">
                        {userAName.toLowerCase()}: {userALevel}/4
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-300 rounded-full" />
                      <span className="capitalize">
                        {userBName.toLowerCase()}: {userBLevel}/4
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Grid */}
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: maxLevel }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 border-r border-gray-200 last:border-r-0"
                      />
                    ))}
                  </div>

                  {/* Bar A */}
                  <div
                    className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-500 ease-out"
                    style={{ width: `${userAPercentage}%` }}
                  />

                  {/* Bar B (extra portion) */}
                  {userBLevel > userALevel && (
                    <div
                      className="absolute top-0 h-full bg-green-300 transition-all duration-500 ease-out"
                      style={{
                        left: `${userAPercentage}%`,
                        width: `${userBPercentage - userAPercentage}%`,
                      }}
                    />
                  )}

                  {/* Level numbers */}
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: maxLevel + 1 }, (_, i) => (
                      <div
                        key={i}
                        className="relative"
                        style={{ width: `${100 / maxLevel}%` }}
                      >
                        <span className="absolute -bottom-6 -translate-x-1/2 text-xs text-gray-500">
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StackedBarChart;
