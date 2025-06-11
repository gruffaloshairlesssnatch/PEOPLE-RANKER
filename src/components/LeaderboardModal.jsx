import React from "react";

export default function LeaderboardModal({ people, onClose }) {
  // Calculate score and sort descending
  const sortedPeople = [...people].sort(
    (a, b) => (b.upvotes || 0) - (b.downvotes || 0) - ((a.upvotes || 0) - (a.downvotes || 0))
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 8,
          width: "90%",
          maxWidth: 400,
          maxHeight: "80vh",
          overflowY: "auto",
          color: "black",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            marginBottom: 15,
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: 4,
            border: "1px solid #ccc",
            backgroundColor: "#eee",
            float: "right"
          }}
          aria-label="Close Leaderboard"
        >
          Close Leaderboard
        </button>

        <h2 style={{ marginTop: 0, marginBottom: 10, clear: "both" }}>Leaderboard</h2>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>#</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople.map((person, idx) => {
              const score = (person.upvotes || 0) - (person.downvotes || 0);
              return (
                <tr key={person.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "6px 8px" }}>{idx + 1}</td>
                  <td style={{ padding: "6px 8px" }}>{person.name}</td>
                  <td style={{ padding: "6px 8px" }}>{score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
