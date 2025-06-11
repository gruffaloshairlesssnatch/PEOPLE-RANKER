import React, { useState } from "react";

const groupStyles = {
  gang: { backgroundColor: "#000", color: "red" },
  "game friends": { backgroundColor: "#444", color: "white" },
  beel: { backgroundColor: "#39ff14", color: "white" },
  dotatrain: { backgroundColor: "#add8e6", color: "black" },
  default: { backgroundColor: "purple", color: "white" },
};

export default function PersonCard({ person, onVote }) {
  const [reason, setReason] = useState("");

  const groupKey = person.group.toLowerCase();
  const style = groupStyles[groupKey] || groupStyles.default;

  const score = (person.upvotes || 0) - (person.downvotes || 0);

  const handleUpvote = () => {
    if (groupKey === "gang") {
      alert("This person is in Gang and it is therefore not possible to vote positively on them");
      return;
    }
    onVote(person.id, true, reason, person.group);
    setReason("");
  };

  const handleDownvote = () => {
    onVote(person.id, false, reason, person.group);
    setReason("");
  };

  return (
    <div
      style={{
        ...style,
        width: 160,  // smaller width
        padding: 8,  // less padding
        borderRadius: 8,
        margin: 5,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 12, // smaller font
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
    >
      <img
        src={person.photo_url}
        alt={person.name}
        style={{
          width: 80,  // smaller square image
          height: 80,
          objectFit: "cover",
          borderRadius: 4,
          marginBottom: 6,
        }}
      />
      <div style={{ fontWeight: "bold", marginBottom: 3 }}>{person.name}</div>

      <div style={{ marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <button
          onClick={handleUpvote}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "none",
            fontSize: 18,
            color: style.color,
            userSelect: "none",
          }}
          aria-label="Upvote"
          title="Upvote"
        >
          👍
        </button>

        <div>
          <div style={{ marginBottom: 2 }}>{person.group}</div>
          <div style={{ fontWeight: "bold" }}>Score: {score}</div>
        </div>

        <button
          onClick={handleDownvote}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "none",
            fontSize: 18,
            color: style.color,
            userSelect: "none",
          }}
          aria-label="Downvote"
          title="Downvote"
        >
          👎
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        style={{
          width: "100%",
          height: 24,
          fontSize: 11,
          padding: "0 6px",
          marginBottom: 4,
          borderRadius: 4,
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <div style={{ fontSize: 10, fontStyle: "italic", textAlign: "center", minHeight: 24, color: style.color }}>
        Last Reason: {person.lastReason ? person.lastReason : "none entered"}
      </div>
    </div>
  );
}
