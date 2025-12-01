"use client";

import { useState, useEffect } from "react";

const categories = [
  "Fruits",
  "Animals",
  "Countries",
  "Colors",
  "Sports",
  "Vehicles",
  "Planets",
  "Drinks",
  "Languages",
  "Desserts",
  "Clothing",
  "Ocean Animals",
  "Flowers",
];

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function getRandomSyllableCount() {
  return Math.floor(Math.random() * 3) + 1; // 1 to 3 syllables
}

function countSyllables(word: string) {
  const matches = word.toLowerCase().match(/[aeiouy]+/g);
  return matches ? matches.length : 0;
}

export default function Game() {
  const [round, setRound] = useState(1);
  const [category, setCategory] = useState(getRandomCategory());
  const [letter, setLetter] = useState(getRandomLetter());
  const [syllableCount, setSyllableCount] = useState(getRandomSyllableCount());
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [status, setStatus] = useState<"playing" | "won" | "exploded">("playing");

  useEffect(() => {
    if (status !== "playing") return;
    if (timeLeft === 0) {
      setStatus("exploded");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  const resetGame = () => {
    setRound(1);
    setCategory(getRandomCategory());
    setLetter(getRandomLetter());
    setSyllableCount(getRandomSyllableCount());
    setAnswer("");
    setTimeLeft(5);
    setStatus("playing");
  };

  const handleSubmit = () => {
    const trimmed = answer.trim();
    if (!trimmed) return;
    let correct = false;
    if (round === 1) {
      // Basic answer: any non-empty string is accepted
      correct = true;
    } else if (round === 2) {
      correct = trimmed[0].toUpperCase() === letter;
    } else if (round === 3) {
      correct = countSyllables(trimmed) === syllableCount;
    }

    if (correct) {
      if (round === 3) {
        setStatus("won");
      } else {
        setRound(round + 1);
        setCategory(getRandomCategory());
        setLetter(getRandomLetter());
        setSyllableCount(getRandomSyllableCount());
        setAnswer("");
        setTimeLeft(5);
      }
    } else {
      // Incorrect answer ends the game
      setStatus("exploded");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {status === "playing" && (
        <>
          <h2 className="text-xl font-semibold">Round {round}</h2>
          <p className="text-muted-foreground">
            Category: <span className="font-medium">{category}</span>
          </p>
          {round === 1 && <p>Rule: Give any correct example that fits the chosen category.</p>}
          {round === 2 && (
            <p>
              Rule: Answer something in the same category that starts with the letter <span className="font-medium">{letter}</span>.
            </p>
          )}
          {round === 3 && (
            <p>
              Rule: Answer something in the same category with exactly <span className="font-medium">{syllableCount}</span> syllable
              {syllableCount > 1 ? "s" : ""}.
            </p>
          )}
          <p className="text-muted-foreground">Time left: {timeLeft}s</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Your answer"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Submit
          </button>
        </>
      )}
      {status === "won" && (
        <>
          <h2 className="text-2xl font-bold">Congratulations! You win!</h2>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Play Again
          </button>
        </>
      )}
      {status === "exploded" && (
        <>
          <h2 className="text-2xl font-bold text-destructive">Boom! The bomb exploded.</h2>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
