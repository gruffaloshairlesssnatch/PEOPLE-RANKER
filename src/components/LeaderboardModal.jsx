import React from "react";

export default function LeaderboardModal({ people, onClose }) {
  // Sort people by score descending
  const sortedPeople = [...people].sort(
    (a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 8,
          maxWidth: 500,
          width: "90%",
          color: "black",
          maxHeight: "80vh",
          overflowY: "auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 1,
          }}
          aria-label="Close leaderboard"
        >
          &times;
        </button>
        <h2 style={{ marginTop: 0, marginBottom: 16, color: "black" }}>
          Leaderboard
        </h2>
        {sortedPeople.length === 0 ? (
          <p>No people to display.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>#</th>
                <th style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>Name</th>
                <th style={{ borderBottom: "2px solid #ddd", padding: "8px" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedPeople.map((person, index) => {
                const score = (person.upvotes ?? 0) - (person.downvotes ?? 0);
                return (
                  <tr key={person.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px", width: 30 }}>{index + 1}</td>
                    <td style={{ padding: "8px" }}>{person.name}</td>
                    <td style={{ padding: "8px", width: 60 }}>{score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
