import React, { useState } from "react";
import {
  FiArrowLeft,
  FiBarChart2,
  FiTarget,
  FiBookOpen,
  FiTrendingUp,
  FiBarChart,
} from "react-icons/fi";
import UserSelector from "../components/UserSelector";
import TrainingRecommendations from "../components/TrainingRecommendations";
import { useSkillGap } from "../hooks/useSkillGap";
import type { HistoryResponse } from "../types/apiResponse.types";
import SkillsMatrix from "../components/SkillsMatrix";
import LearningHistory from "../components/LearningHistory";
import SkillRadarChart from "../components/SkillRadarChart";
import StackedBarChart from "../components/StackedBarChart";

const SkillGap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "matrix" | "radar" | "bars" | "recommendations" | "history"
  >("matrix");
  const { loading, comparison, compareUsers, resetComparison } = useSkillGap();
  console.log(comparison);
  const handleCompare = async (
    userA: HistoryResponse,
    userB: HistoryResponse
  ) => {
    await compareUsers(userA, userB);
  };

  const handleReset = () => {
    resetComparison();
    setActiveTab("matrix");
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-text-primary">Analyzing skill gaps...</p>
        </div>
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="h-full py-8">
        <div className="max-w-4xl mx-auto px-4">
          <UserSelector onCompare={handleCompare} />
        </div>
      </div>
    );
  }

  const userAName = comparison.userA?.person.name || "User A";
  const userBName = comparison.userB?.person.name || "User B";

  const tabs = [
    { id: "matrix" as const, label: "Skills Matrix", icon: FiBarChart2 },
    { id: "radar" as const, label: "Radar Chart", icon: FiTarget },
    { id: "bars" as const, label: "Bar Chart", icon: FiBarChart },
    {
      id: "recommendations" as const,
      label: "Training Plan",
      icon: FiBookOpen,
    },
    { id: "history" as const, label: "Learning Journey", icon: FiTrendingUp },
  ];

  return (
    <div className="h-full">
      {/* Header */}
      <div className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleReset}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Skill Gap Analysis
                </h1>
                <p className="text-text-primary capitalize">
                  {userAName.toLowerCase()} vs {userBName.toLowerCase()}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="cursor-pointer px-6 py-3 rounded-4xl! border border-gray-300 text-text-primary hover:text-text-accent-on-brand hover:bg-gray-50 transition-colors"
            >
              New Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <FiBarChart2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {comparison.skillGaps.length +
                    comparison.skillsUnique.length +
                    comparison.skillsShared.length}
                </div>
                <div className="text-sm text-text-primary">Skills Compared</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <FiTarget className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {comparison.skillGaps.length}
                </div>
                <div className="text-sm text-text-primary">
                  Skills to Improve
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {comparison.skillsUnique.length}
                </div>
                <div className="text-sm text-text-primary">Strengths</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <FiBookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {comparison.skillGaps.length}
                </div>
                <div className="text-sm text-text-primary">
                  Learning Resources
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer group flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-text-primary hover:text-text-accent-on-brand hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span
                  className={` ${
                    activeTab === tab.id
                      ? ""
                      : "group-hover:text-text-accent-on-brand"
                  } `}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "matrix" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Skills Comparison Matrix
                  </h2>
                  <p className="text-text-primary">
                    Vista detallada de las habilidades necesarias.
                  </p>
                </div>
                <SkillsMatrix
                  skillGaps={comparison.skillGaps}
                  userAName={userAName}
                  userBName={userBName}
                />
              </div>
            )}

            {activeTab === "radar" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Skill Radar Visualization
                  </h2>
                  <p className="text-text-primary">
                    Representación visual de tu perfil de habilidades
                    superpuesta con tu objetivo de comparación.
                  </p>
                </div>
                <div className="flex justify-center">
                  <SkillRadarChart
                    skillGaps={comparison.skillGaps}
                    userAName={userAName}
                    userBName={userBName}
                  />
                </div>
              </div>
            )}

            {activeTab === "bars" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Stacked Bar Visualization
                  </h2>
                  <p className="text-text-primary">
                    Mira lo lejos que puedes llegar.
                  </p>
                </div>
                <StackedBarChart
                  skillGaps={comparison.skillGaps}
                  userAName={userAName}
                  userBName={userBName}
                />
              </div>
            )}

            {activeTab === "recommendations" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Personalized Learning Path
                  </h2>
                  <p className="text-text-primary">
                    Recomendaciones de formación seleccionadas para ayudarte a
                    cerrar tus mayores brechas de habilidades.
                  </p>
                </div>
                <TrainingRecommendations />
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold! text-text-primary mb-2">
                    Learning Journey Insights
                  </h2>
                </div>
                <LearningHistory
                  userA={comparison.userA!}
                  userB={comparison.skillGaps}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGap;
