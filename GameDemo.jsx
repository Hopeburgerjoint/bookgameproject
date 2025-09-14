import React, { useState } from "react";

export default function GameDemo() {
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState([]);
  const [message, setMessage] = useState("");

  const questions = [
    { id: 1, prompt: "The sky is _____.", answer: "blue", options: ["red", "green", "blue", "yellow"] },
    { id: 2, prompt: "2 + 2 = _____.", answer: "4", options: ["3", "4", "5", "6"] },
    { id: 3, prompt: "The opposite of hot is _____.", answer: "cold", options: ["warm", "freezing", "cold", "boiling"] }
  ];

  function playSound(file) {
    const audio = new Audio(file);
    audio.play();
  }

  function handleAnswer(q, chosen) {
    if (chosen === q.answer) {
      setScore(prev => prev + 1);
      playSound("/assets/correct.mp3");
      setMessage("Correct!");

      const newScore = score + 1;
      if (newScore === 2 && !badges.includes("Bronze")) {
        setBadges([...badges, "Bronze"]);
        playSound("/assets/levelup.mp3");
      }
      if (newScore === 3 && !badges.includes("Silver")) {
        setBadges([...badges, "Silver"]);
        playSound("/assets/levelup.mp3");
      }
    } else {
      playSound("/assets/incorrect.mp3");
      setMessage("Try again!");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mini Learning Game</h1>
      <div className="mb-2">Score: {score}</div>
      <div className="mb-2">Badges: {badges.join(", ") || "None"}</div>
      {message && <div className="mb-2 text-indigo-600">{message}</div>}
      <ul className="space-y-4">
        {questions.map(q => (
          <li key={q.id} className="p-3 border rounded">
            <div className="mb-2">{q.prompt}</div>
            <div className="flex gap-2 flex-wrap">
              {q.options.map(opt => (
                <button
                  key={opt}
                  className="px-3 py-1 border rounded"
                  onClick={() => handleAnswer(q, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
