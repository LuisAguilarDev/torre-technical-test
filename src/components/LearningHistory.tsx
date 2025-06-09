import React from "react";
import { FiArrowUp, FiCalendar, FiClock } from "react-icons/fi";
import type { Genome, Strength } from "../types/skillGap.types";

interface LearningHistoryProps {
  userB: Strength[];
  userA: Genome;
}

const LearningHistory: React.FC<LearningHistoryProps> = ({ userA, userB }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className=" rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-brand to-blue-500 rounded-full flex items-center justify-center"></div>
          <div>
            <h2 className="text-xl font-bold text-text-primary capitalize">
              {userA.person.name.toLowerCase()}
            </h2>
            <p className="text-text-primary">
              Mejora tus habilidades con estos recursos.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {userB.map((item, index) => {
            return (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🎓</span>
                          <h3 className="font-semibold text-text-primary">
                            {item.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-text-primary">
                          <div className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" />
                            <span>{formatDate(new Date().toISOString())}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            <span>3 months</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-text-primary">
                            Method:
                          </span>
                          <span className=" px-3 py-1 rounded-full text-sm font-medium border">
                            Curso
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const query = encodeURIComponent(
                                `${item.name} Curso`
                              );
                              window.open(
                                `https://www.google.com/search?q=${query}`,
                                "_blank"
                              );
                            }}
                            className="cursor-pointer h-8 px-2 rounded-4xl! font-semibold transition-colors bg-button-enabled hover:bg-button-enabled/80 text-text-accent-on-brand"
                          >
                            Aprender ahora!
                          </button>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-text-primary">Level:</span>
                            <span className="font-medium">None</span>
                            <FiArrowUp className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-600">
                              {item.proficiency}
                            </span>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium text-text-primary`}
                          >
                            +4
                          </div>
                        </div>
                      </div>
                    </div>
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

export default LearningHistory;
