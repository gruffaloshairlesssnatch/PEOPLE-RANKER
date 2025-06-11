import React, { useState } from "react";

export default function PersonCard({ person, onVote }) {
  const [reason, setReason] = useState("");

  const handleUpvote = () => {
    if (person.group.toLowerCase() === "gang") {
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

  // Determine background and text color based on group
  let bgColor = "#800080"; // default purple background
  let textColor = "white";

  switch (person.group.toLowerCase()) {
    case "gang":
      bgColor = "#000000";
      textColor = "red";
      break;
    case "game friends":
      bgColor = "#333333";
      textColor = "white";
      break;
    case "beel":
      bgColor = "#39FF14"; // neon green
      textColor = "white";
      break;
    case "dotatrain":
      bgColor = "#89CFF0"; // baby blue
      textColor = "black";
      break;
    case "nomad":
    case "exile":
      bgColor = "#800080"; // purple
      textColor = "white";
      break;
    default:
      bgColor = "#800080";
      textColor = "white";
  }

  const buttonStyle = {
    cursor: "pointer",
    fontSize: 18,
    backgroundColor: "transparent",
    border: "none",
    color: textColor,
    padding: "0 6px",
    userSelect: "none",
  };

  return (
    <div
      style={{
        width: 150,
        minHeight: 230,
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: 8,
        padding: 8,
        margin: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
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
          borderRadius: 8,
          marginBottom: 6,
          flexShrink: 0,
        }}
      />
      <h3 style={{ margin: "2px 0", fontSize: 16 }}>{person.name}</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
          fontSize: 12,
          width: "100%",
        }}
      >
        <button onClick={handleDownvote} style={buttonStyle} aria-label="Downvote">
          👎
        </button>
        <span style={{ margin: "0 6px", flexShrink: 0, flexGrow: 1, textAlign: "center" }}>
          <strong>{person.group}</strong>
        </span>
        <button onClick={handleUpvote} style={buttonStyle} aria-label="Upvote">
          👍
        </button>
      </div>

      <p style={{ margin: "2px 0", fontSize: 13 }}>
        Score: <strong>{person.upvotes - person.downvotes}</strong>
      </p>

      <input
        type="text"
        placeholder="Enter reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        style={{
          fontSize: 12,
          padding: "4px 6px",
          width: "100%",
          boxSizing: "border-box",
          marginBottom: 4,
          borderRadius: 4,
          border: `1px solid ${textColor}`,
          color: textColor,
          backgroundColor: "transparent",
        }}
      />

      <p
        style={{
          fontSize: 11,
          marginTop: 2,
          height: 18,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "100%",
          color: textColor,
        }}
        title={person.lastReason || "None entered"}
      >
        Last Reason: {person.lastReason ? person.lastReason : "none entered"}
      </p>
    </div>
  );
}
