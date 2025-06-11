import React, { useState } from "react";

export default function PersonCard({ person, onVote }) {
  const [reason, setReason] = useState("");

  const group = person.group?.toLowerCase() || "";
  let style = {
    backgroundColor: "purple",
    color: "white",
  };

  if (group === "gang") {
    style = { backgroundColor: "black", color: "red" };
  } else if (group === "game friends") {
    style = { backgroundColor: "#333333", color: "white" };
  } else if (group === "beel") {
    style = { backgroundColor: "#39ff14", color: "white" };
  } else if (group === "dotatrain") {
    style = { backgroundColor: "#add8e6", color: "black" };
  }

  const score = (person.upvotes || 0) - (person.downvotes || 0);
  const lastReason = person.lastReason && person.lastReason.trim() !== "" ? person.lastReason : "none entered";

  const handleUpvote = () => {
    if (group === "gang") {
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

  const buttonStyle = {
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: 26,
    color: style.color,
    userSelect: "none",
    padding: 0,
    margin: "0 6px",
    transition: "transform 0.15s ease, color 0.15s ease",
  };

  return (
    <div
      style={{
        ...style,
        width: 220,
        height: 350,
        borderRadius: 8,
        padding: 8,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        margin: 5,
        color: style.color,
      }}
    >
      <img
        src={person.photo_url}
        alt={person.name}
        style={{
          width: 180,
          height: 180,
          objectFit: "cover",
          borderRadius: 8,
          flexShrink: 0,
          marginBottom: 4,
        }}
      />
      <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 2 }}>
        {person.name}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontStyle: "italic",
          fontSize: 13,
          marginBottom: 2,  // reduced from 4
          color: style.color,
          width: "100%",
          userSelect: "none",
        }}
      >
        <button
          onClick={handleUpvote}
          style={buttonStyle}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          aria-label={`Upvote ${person.name}`}
          title="Upvote"
        >
          👍
        </button>

        <span style={{ flexGrow: 1, textAlign: "center" }}>Group: {person.group}</span>

        <button
          onClick={handleDownvote}
          style={buttonStyle}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          aria-label={`Downvote ${person.name}`}
          title="Downvote"
        >
          👎
        </button>
      </div>

      <div
        style={{
          fontWeight: "bold",
          fontSize: 14,
          marginBottom: 4,  // reduced from 6
          color: style.color,
          width: "100%",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        Score: {score}
      </div>


      <input
        type="text"
        placeholder="Enter reason for vote"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        style={{
          width: "100%",
          borderRadius: 4,
          border: `1px solid ${style.color}`,
          padding: "4px 6px",
          fontFamily: "Arial, sans-serif",
          color: style.color,
          backgroundColor: style.backgroundColor,
          boxSizing: "border-box",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 12,
          marginBottom: 4,
        }}
      />

      <div
        style={{
          fontSize: 11,
          fontStyle: "italic",
          color: style.color,
          width: "100%",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        Last Reason: {lastReason}
      </div>
    </div>
  );
}
