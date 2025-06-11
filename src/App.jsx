import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import PersonCard from "./components/PersonCard";
import LeaderboardModal from "./components/LeaderboardModal";

export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Fetch people from Supabase (no realtime)
  const fetchPeople = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("people")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    console.log("Fetched people:", data);
    setPeople(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // Handle vote updates (upvote/downvote)
  const handleVote = async (id, isUpvote, reason, group) => {
    if (group.toLowerCase() === "gang" && isUpvote) {
      alert("This person is from Gang and therefore cannot be voted positively on.");
      return;
    }
    const person = people.find((p) => p.id === id);
    if (!person) return;

    const updatedData = {
      upvotes: (person.upvotes ?? 0) + (isUpvote ? 1 : 0),
      downvotes: (person.downvotes ?? 0) + (isUpvote ? 0 : 1),
      lastReason: reason,
    };

    const { data, error } = await supabase
      .from("people")
      .update(updatedData)
      .eq("id", id);

    console.log("Vote update response:", data, error);

    if (error) {
      alert("Error updating vote: " + error.message);
      return;
    }

    await fetchPeople();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>PEOPLE RANKER</h1>

      <button
        onClick={() => setShowLeaderboard(true)}
        style={{ marginBottom: 20, padding: "8px 16px", cursor: "pointer" }}
      >
        Show Leaderboard
      </button>

      {loading && <p>Loading people...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {people.map((person) => (
          <PersonCard key={person.id} person={person} onVote={handleVote} />
        ))}
      </div>

      {showLeaderboard && (
        <LeaderboardModal people={people} onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
}
