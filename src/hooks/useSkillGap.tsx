import { useState, useCallback } from "react";
import type {
  SkillComparison,
  Genome,
  Strength,
} from "../types/skillGap.types";
import type { HistoryResponse } from "../types/apiResponse.types";
import { useTorreAi } from "./useTorreAi";

export const useSkillGap = () => {
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState<SkillComparison | null>(null);
  const { getByUserName } = useTorreAi();

  const compareGenomeSkills = (genomeA: Genome, genomeB: Genome) => {
    const mapA = new Map(genomeA.strengths.map((s) => [s.id, s]));
    const mapB = new Map(genomeB.strengths.map((s) => [s.id, s]));

    const similarities: Strength[] = [];
    const onlyInA: Strength[] = [];
    const onlyInB: Strength[] = [];

    for (const [id, strength] of mapA.entries()) {
      if (mapB.has(id)) {
        similarities.push(strength);
      } else {
        onlyInA.push(strength);
      }
    }

    for (const [id, strength] of mapB.entries()) {
      if (!mapA.has(id)) {
        onlyInB.push(strength);
      }
    }

    return {
      similarities,
      onlyInA,
      onlyInB,
    };
  };

  const compareUsers = useCallback(
    async (userA: HistoryResponse, userB: HistoryResponse) => {
      setLoading(true);

      try {
        const [GenomeA, GenomeB] = await Promise.all([
          getByUserName(userA.username),
          getByUserName(userB.username),
        ]);

        const { onlyInA, onlyInB, similarities } = compareGenomeSkills(
          GenomeA,
          GenomeB
        );
        // Calculate skill gaps
        // const trainingRecommendations =
        //   generateTrainingRecommendations(skillGaps);

        const comparisonResult: SkillComparison = {
          userA: GenomeA,
          userB: GenomeB,
          skillGaps: onlyInB,
          skillsUnique: onlyInA,
          skillsShared: similarities,
          trainingRecommendations: [],
        };

        setComparison(comparisonResult);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const resetComparison = useCallback(() => {
    setComparison(null);
  }, []);

  return {
    loading,
    comparison,
    compareUsers,
    resetComparison,
  };
};
