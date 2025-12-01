"use client";
import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import { useState } from "react";
import Game from "@/components/game";


export default function Home() {
  // NEVER write anything here, only use this page to import components
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      {gameStarted ? (
        <Game />
      ) : (
        <>
          <span className="text-2xl">{title}</span>
          <span className="text-muted-foreground">{description}</span>
          <button
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => setGameStarted(true)}
          >
            Start
          </button>
        </>
      )}
    </main>
  );
}
