import React, { useState } from "react";

export default function PersonCard({ person, onVote }) {
  const [reason, setReason] = useState("");

  // Determine styling based on group
  const group = person.group.toLowerCase();
  let style = {};
  switch (group) {
    case "gang":
      style = { backgroundColor: "#000000", color: "#ff0000" }; // black bg, red text
      break;
    case "game friends":
      style = { backgroundColor: "#2f2f2f", color: "#ffffff" }; // dark grey bg, white text
      break;
    case "beel":
      style = { backgroundColor: "#39ff14", color: "#ffffff" }; // neon green bg, white text
      break;
    case "dotatrain":
      style = { backgroundColor: "#89CFF0", color: "#000000" }; // baby blue bg, black text
      break;
    default:
      style = { backgroundColor: "#6a0dad", color: "#ffffff" }; // purple bg, white text
  }

  // Calculate score
  const score = (person.upvotes || 0) - (person.downvotes || 0);

  // Handle vote button clicks
  const handleVoteClick = (isUpvote) => {
    if (group === "gang" && isUpvote) {
      alert("This person is in Gang and it is therefore not possible to vote positively on them");
      return;
    }
    onVote(person.id, isUpvote, reason, person.group);
    setReason("");
  };

  return (
    <>
      <style>
        {`
          .reason-input::placeholder {
            color: black !important;
            opacity: 1;
          }
        `}
      </style>

      <div
        style={{
          width: 170,
          minHeight: 260,
          padding: 8,
          borderRadius: 8,
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...style,
          margin: 5,
          color: style.color,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={person.photo_url}
          alt={person.name}
          style={{
            width: 130,
            height: 130,
            objectFit: "cover",
            borderRadius: 6,
            marginBottom: 6,
            border: `2px solid ${style.color}`,
          }}
        />
        <div
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 2,
            color: style.color,
            textAlign: "center",
          }}
        >
          {person.name}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            marginBottom: 4,
            color: style.color,
            width: "100%",
            fontWeight: "bold",
          }}
        >
          <button
            onClick={() => handleVoteClick(true)}
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
              fontSize: 20,
              color: style.color,
              userSelect: "none",
            }}
            aria-label="Upvote"
            title={
              group === "gang"
                ? "Cannot upvote Gang members"
                : "Upvote"
            }
          >
            👍
          </button>

          <span>{person.group}</span>

          <button
            onClick={() => handleVoteClick(false)}
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
              fontSize: 20,
              color: style.color,
              userSelect: "none",
            }}
            aria-label="Downvote"
            title="Downvote"
          >
            👎
          </button>
        </div>

        <div
          style={{
            fontWeight: "bold",
            fontSize: 14,
            marginBottom: 4,
            color: style.color,
          }}
        >
          Score: {score}
        </div>

        <input
          className="reason-input"
          type="text"
          placeholder="Enter reason for vote"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{
            width: "100%",
            padding: "4px",
            fontSize: 12,
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 4,
          }}
        />

        <div
          style={{
            fontSize: 11,
            fontStyle: "italic",
            userSelect: "none",
            width: "100%",
            textAlign: "center",
            minHeight: 18,
            color: style.color,
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordWrap: "break-word",
          }}
          title={person.lastReason || "None entered"}
        >
          Last Reason: {person.lastReason?.trim() || "none entered"}
        </div>
      </div>
    </>
  );
}
