import React, { useState } from "react";

export default function PersonCard({ person, onVote }) {
  const [reason, setReason] = useState("");

  const {
    id,
    name,
    group,
    upvotes = 0,
    downvotes = 0,
    lastReason,
    photo_url,
  } = person;

  const score = upvotes - downvotes;

  // Determine colors based on group
  const groupLower = group ? group.toLowerCase() : "";
  let bgColor = "purple";
  let textColor = "white";

  if (groupLower === "gang") {
    bgColor = "black";
    textColor = "red";
  } else if (groupLower === "game friends") {
    bgColor = "#333";
    textColor = "white";
  } else if (groupLower === "beel") {
    bgColor = "#39ff14"; // neon green
    textColor = "white";
  } else if (groupLower === "dotatrain") {
    bgColor = "#89CFF0"; // baby blue
    textColor = "black";
  }

  const handleUpvote = () => {
    if (groupLower === "gang") {
      alert("This person is in Gang and it is therefore not possible to vote positively on them.");
      return;
    }
    if (reason.trim() === "") {
      alert("Please enter a reason for your vote.");
      return;
    }
    onVote(id, true, reason, group);
    setReason("");
  };

  const handleDownvote = () => {
    if (reason.trim() === "") {
      alert("Please enter a reason for your vote.");
      return;
    }
    onVote(id, false, reason, group);
    setReason("");
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: 8,
        padding: 8,
        width: 140,
        margin: 5,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
    >
      <img
        src={photo_url}
        alt={`${name}'s photo`}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: 8,
          marginBottom: 6,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 12,
          marginBottom: 6,
          textAlign: "center",
          fontWeight: "bold",
          userSelect: "none",
          width: "100%",
        }}
      >
        Group: {group}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontWeight: "bold",
          fontSize: 14,
          marginBottom: 8,
          userSelect: "none",
          justifyContent: "center",
          width: "100%",
          flexWrap: "nowrap",
        }}
      >
        <button
          onClick={handleUpvote}
          style={{
            cursor: "pointer",
            fontSize: 18,
            background: "transparent",
            border: "none",
            color: textColor,
            userSelect: "none",
            padding: 0,
            marginRight: 2,
          }}
          aria-label="Upvote"
          title="Upvote"
        >
          👍
        </button>
        <div>Score: {score}</div>
        <button
          onClick={handleDownvote}
          style={{
            cursor: "pointer",
            fontSize: 18,
            background: "transparent",
            border: "none",
            color: textColor,
            userSelect: "none",
            padding: 0,
            marginLeft: 2,
          }}
          aria-label="Downvote"
          title="Downvote"
        >
          👎
        </button>
      </div>
      <div
        style={{
          fontSize: 13,
          width: "100%",
          marginBottom: 6,
        }}
      >
        <input
          type="text"
          placeholder="Enter reason for vote"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "4px 6px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
            color: "black",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 11,
          width: "100%",
          whiteSpace: "normal",
          wordWrap: "break-word",
          lineHeight: 1.2,
          minHeight: 30,
          textAlign: "center",
        }}
      >
        Last Reason: {lastReason ? lastReason : "none entered"}
      </div>
    </div>
  );
}
