import { useNavigate, useLocation } from "react-router";
import type { HistoryResponse } from "../types/apiResponse.types";

type Props = {
  user: HistoryResponse;
};

const UserCard = ({ user }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCompareSkills = () => {
    // Guardar el usuario en localStorage para pre-seleccionarlo en skill-gap
    localStorage.setItem("preselectedUser", JSON.stringify(user));
    navigate("/skill-gap");
  };

  // No mostrar el botón si ya estamos en la página de skill-gap
  const isInSkillGapPage = location.pathname === "/skill-gap";
  return (
    <div className="bg-background-1 text-text-primary rounded-xl shadow-lg p-4 flex items-center gap-4 border border-divider max-w-[900px]">
      <img
        src={user.imageUrl || "https://placehold.co/150x150?text=No+Image"}
        alt={user.name}
        className="w-20 h-20 object-cover rounded-full border-brand border-4"
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold">{user.name}</h2>
        {user.professionalHeadline && (
          <p className="text-text-accent text-sm">
            {user.professionalHeadline}
          </p>
        )}
        <div className="mt-2 text-sm flex flex-wrap gap-2 text-text-accent">
          {user.username && <span>@{user.username}</span>}
          {user.verified && (
            <span className="text-green-400">✔ Verificado</span>
          )}
          {user.pageRank > 1000 && <span>🌟 Influencia alta</span>}
          {!isInSkillGapPage && (
            <button
              onClick={handleCompareSkills}
              className="px-3 py-1 bg-button-enabled text-white text-xs rounded-lg hover:bg-button-enabled/80 transition-colors"
            >
              Comparar habilidades
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
