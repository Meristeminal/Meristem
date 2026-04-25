"use client";
// import grid from components
import {
  DiceState,
  GridState,
  Session,
  SessionCatolog,
  ToolBarTab,
} from "@/lib/session";
import GridBoard from "../../Components/grid/GridBoard";
// import toolbar from components
import ToolBar from "../../Components/ToolBar";
import { DiceRollerProps } from "@/Components/DiceRoller";
import { useEffect, useState } from "react";

export default function SessionPage() {
  // New Map page content here

  // from A to L
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  // to ten
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let sessionId = "test_session";

  const defaultSession = () =>
    new Session(
      sessionId,
      new DiceState(),
      new GridState([12, 10], []),
      new SessionCatolog(),
      ToolBarTab.NPCs,
    );

  const [session, setSession]: [Session, any] = useState(() => {
    if (typeof window === "undefined") {
      return defaultSession();
    }

    const json = window.localStorage.getItem(`meristem:session:${sessionId}`);

    if (json === null) {
      const ses = defaultSession();
      // TODO: Check if this is even necessary
      window.localStorage.setItem(
        `meristem:session:${ses.id}`,
        JSON.stringify(ses),
      );
      return ses;
    }

    // TODO: Handle parse error here
    return JSON.parse(json);
  });

  useEffect(() => {
    const json = JSON.stringify(session);
    window.localStorage.setItem(`meristem:session:${session.id}`, json);
  }, [session, setSession]);

  function updateSession(session: Session) {
    const json = JSON.stringify(session);
    window.localStorage.setItem(`meristem:session:${session.id}`, json);
    setSession(session);
  }

  const { dice } = session;

  const diceProps: DiceRollerProps = {
    diceGroups: dice.groups,
    diceResults: dice.results,
    onGroupUpdate(dg) {
      session.dice.groups = dg;
      updateSession(session);
    },
    onResultsUpdate(dgr) {
      session.dice.results = dgr;
      updateSession(session);
    },
  };

  return (
    <main className="flex flex-col items-center h-screen w-screen bg-[#8A7863]">
      <GridBoard
        cellInfo={{ height: 10, width: 10 }}
        rowsCount={session.grid.gridSize[0]}
        colsCount={session.grid.gridSize[1]}
        onCellClick={([row, col]) => {}}
      />
      <ToolBar
        dice={diceProps}
        diceWindowValue={dice.diceWindowIsOpen}
        tab={session.toolbarTabSelected}
        onSetDiceOpen={(isOpen) => {
          dice.diceWindowIsOpen = isOpen;
          updateSession(session);
        }}
        onSetActiveTab={(tab) => {
          session.toolbarTabSelected = tab;
          updateSession(session);
        }}
      />
    </main>
  );
}
