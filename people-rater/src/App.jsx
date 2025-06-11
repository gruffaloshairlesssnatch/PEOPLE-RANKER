import { useState } from 'react';

const initialFriends = [
  { name: 'Jamal', group: 'Gang', upvotes: 0, downvotes: 0, lastReason: '' },
  { name: 'Ava', group: 'None', upvotes: 0, downvotes: 0, lastReason: '' },
  { name: 'Kai', group: 'None', upvotes: 0, downvotes: 0, lastReason: '' },
  { name: 'Maya', group: 'Gang', upvotes: 0, downvotes: 0, lastReason: '' },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  function handleVote(index, type) {
    const reason = prompt(`Why are you ${type === 'upvote' ? 'upvoting' : 'downvoting'} ${friends[index].name}?`);
    if (!reason) return;

    setFriends((prev) => {
      const updated = [...prev];

      if (type === 'upvote' && updated[index].group === 'Gang') {
        alert("This person is in Gang. Positive vote rejected.");
        return prev;
      }

      if (type === 'upvote') updated[index].upvotes++;
      if (type === 'downvote') updated[index].downvotes++;
      updated[index].lastReason = reason;

      return updated;
    });
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>People Rater</h1>

      <button onClick={() => setShowLeaderboard(!showLeaderboard)}>
        {showLeaderboard ? 'Back to Voting' : 'Show Leaderboard'}
      </button>

      {!showLeaderboard ? (
        <div>
          {friends.map((friend, index) => (
            <div key={index} style={{ marginTop: '1rem' }}>
              <strong>{friend.name}</strong> ({friend.group})
              <br />
              <button onClick={() => handleVote(index, 'upvote')}>⬆️ Upvote</button>
              <button onClick={() => handleVote(index, 'downvote')}>⬇️ Downvote</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <h2>Leaderboard</h2>
          {[...friends]
            .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
            .map((f, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <strong>{f.name}</strong>: {f.upvotes - f.downvotes} points
                <br />
                Last reason: <em>{f.lastReason || 'None yet'}</em>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
