"use client";
import { Session } from "@/lib/state/session";
// import toolbar from components
import { DiceRollerProps } from "@/Components/DiceRoller";
import { useEffect, useState } from "react";

import { GridCoordinate } from "@/lib/state/grid";
import ToolBar from "./ToolBar";
import GridBoard from "./grid/GridBoard";
import { saveLocalSession } from "@/lib/client/storage";

export interface ItemProps {
  session: string;
  userId: string;
}

const SessionClient: React.FC<ItemProps> = ({ session, userId }) => {
  const [localSession, setSession]: [Session, any] = useState(
    Session.fromJSON(JSON.parse(session)),
  );

  function updateSession(userId: string, session: Session) {
    saveLocalSession(userId, session);
    setSession(session);
  }

  useEffect(() => {
    saveLocalSession(userId, localSession);
  }, [localSession, setSession]);

  const { dice } = localSession;

  const diceProps: DiceRollerProps = {
    diceGroups: dice.groups,
    diceResults: dice.results,
    onGroupUpdate(dg) {
      localSession.dice.groups = dg;
      updateSession(userId, localSession);
    },
    onResultsUpdate(dgr) {
      localSession.dice.results = dgr;
      updateSession(userId, localSession);
    },
  };

  return (
    <main className="flex flex-col items-center h-screen w-screen bg-[#8A7863]">
      <GridBoard
        cellInfo={{ height: 10, width: 10 }}
        rowsCount={localSession.grid.gridSize[0]}
        colsCount={localSession.grid.gridSize[1]}
        onCellClick={([row, col]: GridCoordinate) => {}}
        fetchItem={(coord: GridCoordinate) => {
          let item = localSession.grid.getItem(coord);

          if (!item) {
            return undefined;
          }

          return {
            icon: item.icon,
            name: item.name,
            id: item.id(),
          };
        }}
      />
      <ToolBar
        dice={diceProps}
        diceWindowValue={dice.diceWindowIsOpen}
        tab={localSession.toolbarTabSelected}
        onSetDiceOpen={(isOpen) => {
          dice.diceWindowIsOpen = isOpen;
          updateSession(userId, localSession);
        }}
        onSetActiveTab={(tab) => {
          localSession.toolbarTabSelected = tab;
          updateSession(userId, localSession);
        }}
      />
    </main>
  );
};

export default SessionClient;
