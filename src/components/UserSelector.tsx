import React, { useState, useEffect } from "react";
import { FiSearch, FiUser, FiX } from "react-icons/fi";
import { useArdaTorre } from "../hooks/useArdaTorre";
import type { HistoryResponse } from "../types/apiResponse.types";
import { useCallback } from "react";

interface UserSelectorProps {
  onCompare: (userA: HistoryResponse, userB: HistoryResponse) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ onCompare }) => {
  const [searchTermA, setSearchTermA] = useState("");
  const [searchTermB, setSearchTermB] = useState("");
  const [searchResultsA, setSearchResultsA] = useState<HistoryResponse[]>([]);
  const [searchResultsB, setSearchResultsB] = useState<HistoryResponse[]>([]);
  const [selectedUserA, setSelectedUserA] = useState<HistoryResponse | null>(
    null
  );
  const [selectedUserB, setSelectedUserB] = useState<HistoryResponse | null>(
    null
  );
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const { getByName } = useArdaTorre();

  const searchUsers = useCallback(async (term: string, isUserA: boolean) => {
    if (term.length < 2) {
      if (isUserA) setSearchResultsA([]);
      else setSearchResultsB([]);
      return;
    }

    const setLoading = isUserA ? setLoadingA : setLoadingB;
    const setResults = isUserA ? setSearchResultsA : setSearchResultsB;

    setLoading(true);
    try {
      const results = await getByName(term);
      setResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers(searchTermA, true);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTermA, searchUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers(searchTermB, false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTermB, searchUsers]);

  const handleSelectUserA = (user: HistoryResponse) => {
    setSelectedUserA(user);
    setSearchTermA(user.name);
    setSearchResultsA([]);
  };

  const handleSelectUserB = (user: HistoryResponse) => {
    setSelectedUserB(user);
    setSearchTermB(user.name);
    setSearchResultsB([]);
  };

  const handleCompare = () => {
    if (!selectedUserA || !selectedUserB) return;
    onCompare(selectedUserA, selectedUserB);
  };

  const handleReset = () => {
    setSelectedUserA(null);
    setSelectedUserB(null);
    setSearchTermA("");
    setSearchTermB("");
    setSearchResultsA([]);
    setSearchResultsB([]);
  };

  const canCompare = selectedUserA && selectedUserB;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          Skill Gap Analysis
        </h2>
        <p className="text-text-primary">
          Compara tus habilidades con otro profesional
        </p>
      </div>

      {/* User A Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Selecciona un profesional
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-text-primary" />
          </div>
          <input
            type="text"
            value={searchTermA}
            onChange={(e) => setSearchTermA(e.target.value)}
            placeholder="Search for a user..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {selectedUserA && (
            <button
              onClick={() => {
                setSelectedUserA(null);
                setSearchTermA("");
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-text-primary hover:text-text-primary" />
            </button>
          )}
        </div>

        {/* User A Search Results */}
        {searchResultsA.length > 0 && !selectedUserA && (
          <div className="bg-background-1 mt-2  border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {loadingA && (
              <div className="p-4 text-center text-text-primary">
                Searching...
              </div>
            )}
            {searchResultsA.map((user) => (
              <button
                key={user.ggId}
                onClick={() => handleSelectUserA(user)}
                className="w-full text-left p-4 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-background-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <FiUser className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">
                      {user.name}
                    </div>
                    <div className="text-sm text-text-primary">
                      @{user.username}
                    </div>
                    {user.professionalHeadline && (
                      <div className="text-sm text-text-primary mt-1">
                        {user.professionalHeadline}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* User B Selection or Role Selection */}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Selecciona otro profesional (Contrastar habilidades)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-text-primary" />
          </div>
          <input
            type="text"
            value={searchTermB}
            onChange={(e) => setSearchTermB(e.target.value)}
            placeholder="Search for another user..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {selectedUserB && (
            <button
              onClick={() => {
                setSelectedUserB(null);
                setSearchTermB("");
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-text-primary hover:text-text-primary" />
            </button>
          )}
        </div>

        {/* User B Search Results */}
        {searchResultsB.length > 0 && !selectedUserB && (
          <div className="bg-background-1 mt-2  border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {loadingB && (
              <div className="p-4 text-center text-text-primary">
                Searching...
              </div>
            )}
            {searchResultsB.map((user) => (
              <button
                key={user.ggId}
                onClick={() => handleSelectUserB(user)}
                className="w-full text-left p-4 hover:bg-background-3 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <FiUser className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">
                      {user.name}
                    </div>
                    <div className="text-sm text-text-primary">
                      @{user.username}
                    </div>
                    {user.professionalHeadline && (
                      <div className="text-sm text-text-primary mt-1">
                        {user.professionalHeadline}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 justify-center">
        <button
          onClick={handleCompare}
          disabled={!canCompare}
          className={`cursor-pointer px-2 rounded-4xl! font-semibold transition-colors ${
            canCompare
              ? "bg-button-enabled hover:bg-cyan-500 text-text-accent-on-brand"
              : "bg-button-disabled text-text-disabled-on-brand cursor-not-allowed"
          }`}
        >
          Comenzar analisis
        </button>
        <button
          onClick={handleReset}
          className="cursor-pointer px-6 py-3 rounded-4xl! border border-gray-300 text-text-primary hover:text-text-accent-on-brand hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UserSelector;
