import React from "react";
import type { Strength } from "../types/skillGap.types";

interface SkillsMatrixProps {
  skillGaps: Strength[];
  userAName: string;
  userBName: string;
}

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({
  skillGaps,
  userAName,
  userBName,
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="rounded-lg">
              <tr className="border-b bg-gray-500 rounded-lg ">
                <th className="text-left py-3 px-6 font-medium text-text-primary">
                  Skill
                </th>
                <th className="text-center py-3 px-4 font-medium text-text-primary min-w-[120px]">
                  {userAName}
                </th>
                <th className="text-center py-3 px-4 font-medium text-text-primary min-w-[120px]">
                  {userBName}
                </th>
                <th className="text-center py-3 px-4 font-medium text-text-primary min-w-[100px]">
                  Difference
                </th>
                <th className="text-center py-3 px-4 font-medium text-text-primary">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              {skillGaps.map((gap) => {
                return (
                  <tr
                    key={gap.id}
                    className={`group border-b hover:bg-gray-50 hover:text-text-accent-on-brand transition-colors`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-text-primary group-hover:text-text-accent-on-brand">
                        {gap.name}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center capitalize">
                      {"none"}
                    </td>
                    <td className="py-4 px-4 text-center  capitalize">
                      {gap.proficiency}
                    </td>
                    <td className="py-4 px-4 text-center capitalize">
                      {"high"}
                    </td>
                    <td className="py-4 px-4 text-center capitalize">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800`}
                      >
                        {"HIGH"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;
