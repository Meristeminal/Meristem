"use client";

import { DiceGroup, DiceGroupResult } from "@/lib/state/dice";
import React, { useEffect, useState } from "react";

/* Die Sides added 2 for coin flip and 100 for percentage */
const PRESET_SIDES = [2, 4, 6, 8, 10, 12, 20, 100];

/** limit dice number **/
function limitDice(val: number) {
  return Math.max(1, Math.min(20, val));
}

/** limit dice sides **/
function limitSide(val: number) {
  return Math.max(2, Math.min(100, val));
}

export interface DiceRollerProps {
  onResultsUpdate?: (rolled: DiceGroupResult[]) => void;
  onGroupUpdate?: (groups: DiceGroup[]) => void;
  diceGroups?: DiceGroup[];
  diceResults?: DiceGroupResult[];
}

/** Pop-up UI grouping **/
/**  use react component for tracking **/
const DiceRoller: React.FC<DiceRollerProps> = ({
  onResultsUpdate,
  onGroupUpdate,
  diceGroups,
  diceResults,
}) => {
  /* groups is a list of dice groups, defaults group 1 to one 6 sided die  */
  const [groups, setGroups] = useState<DiceGroup[]>(diceGroups ?? []);

  // This is not the best way this state could have been implemented but it could be better

  // Create a read hook
  if (onGroupUpdate) {
    useEffect(() => {
      onGroupUpdate(groups);
    }, [groups, onGroupUpdate]);
  }

  /* Results keep list of past results */
  const [results, setResults] = useState<DiceGroupResult[]>(diceResults ?? []);

  if (onResultsUpdate) {
    useEffect(() => {
      onResultsUpdate(results);
    }, [results, onResultsUpdate]);
  }

  /** Updates groups on change **/
  function updateGroup(id: number, patch: Partial<DiceGroup>) {
    setGroups((prevGroups) =>
      prevGroups.map((diceGroup) =>
        diceGroup.id === id ? { ...diceGroup, ...patch } : diceGroup,
      ),
    );
  }

  /** Button function to add a group **/
  function addGroup() {
    setGroups((prevGroups: DiceGroup[]) => [
      ...prevGroups,
      {
        // This could find an empty id, but this is a better solution.
        // as there wont be any more than 20 groups, which is far below the integer limit
        id: prevGroups.length + 1,
        count: 1,
        sides: 6,
      },
    ]);
  }

  /** Button function to remove group **/
  function removeGroup(id: number) {
    setGroups((prevGroups) =>
      prevGroups.filter((diceGroup) => diceGroup.id !== id),
    );
  }

  /** A function to roll all dice for button **/
  function roll() {
    const rolled = groups.map((diceGroup) => {
      const rolls = Array.from(
        { length: diceGroup.count },
        () => Math.floor(Math.random() * diceGroup.sides) + 1,
      );
      return {
        notation: `${diceGroup.count}d${diceGroup.sides}`,
        rolls,
        subtotal: rolls.reduce(
          (runningTotal, dieValue) => runningTotal + dieValue,
          0,
        ),
      };
    });
    setResults(rolled);
  }

  /* Track running total */
  const total =
    results?.reduce(
      (runningTotal, groupResult) => runningTotal + groupResult.subtotal,
      0,
    ) ?? 0;
  /* Create notation for roll function */
  const notation = groups
    .map((diceGroup) => `${diceGroup.count}d${diceGroup.sides}`)
    .join(" + ");

  return (
    <div className="bg-[#9c9081] border-2 border-[#5a5043] rounded-lg p-4 w-72 shadow-xl flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
      {/* Dice groups */}
      {groups.map((diceGroup, groupIndex) => (
        <div
          key={diceGroup.id}
          className="flex flex-col gap-2 bg-[#8e8271] rounded p-2 border border-[#5a5043]"
        >
          <div className="flex items-center justify-between">
            <span className="text-white text-[10px] font-bold uppercase">
              Group {groupIndex + 1}
            </span>
            {groups.length > 1 && (
              <button
                onClick={() => removeGroup(diceGroup.id)}
                className="text-white/50 hover:text-red-300 text-[11px] font-bold transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Count row */}
          <div className="flex items-center justify-between">
            <span className="text-white text-[11px] font-bold uppercase w-12">
              Dice
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateGroup(diceGroup.id, {
                    count: limitDice(diceGroup.count - 1),
                  })
                }
                className="w-7 h-7 rounded bg-[#2d2d2d] hover:bg-black text-white font-bold text-lg leading-none flex items-center justify-center active:scale-95 border border-black/20"
              >
                −
              </button>
              <span className="text-white font-bold w-6 text-center">
                {diceGroup.count}
              </span>
              <button
                onClick={() =>
                  updateGroup(diceGroup.id, {
                    count: limitDice(diceGroup.count + 1),
                  })
                }
                className="w-7 h-7 rounded bg-[#2d2d2d] hover:bg-black text-white font-bold text-lg leading-none flex items-center justify-center active:scale-95 border border-black/20"
              >
                +
              </button>
            </div>
          </div>

          {/* Sides row */}
          <div className="flex items-center justify-between">
            <span className="text-white text-[11px] font-bold uppercase w-12">
              Sides
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateGroup(diceGroup.id, {
                    sides: limitSide(diceGroup.sides - 1),
                  })
                }
                className="w-7 h-7 rounded bg-[#2d2d2d] hover:bg-black text-white font-bold text-lg leading-none flex items-center justify-center active:scale-95 border border-black/20"
              >
                −
              </button>
              <span className="text-white font-bold w-6 text-center">
                {diceGroup.sides}
              </span>
              <button
                onClick={() =>
                  updateGroup(diceGroup.id, {
                    sides: limitSide(diceGroup.sides + 1),
                  })
                }
                className="w-7 h-7 rounded bg-[#2d2d2d] hover:bg-black text-white font-bold text-lg leading-none flex items-center justify-center active:scale-95 border border-black/20"
              >
                +
              </button>
            </div>
          </div>

          {/* Preset side buttons */}
          <div className="flex gap-1 flex-wrap">
            {PRESET_SIDES.map((presetSide) => (
              <button
                key={presetSide}
                onClick={() => updateGroup(diceGroup.id, { sides: presetSide })}
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors active:scale-95
                  ${
                    diceGroup.sides === presetSide
                      ? "bg-[#6d5dfc] text-white"
                      : "bg-[#2d2d2d] hover:bg-black text-white border border-black/20"
                  }`}
              >
                {presetSide}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Add group button */}
      <button
        onClick={addGroup}
        className="w-full py-1.5 rounded border border-dashed border-[#5a5043] hover:border-black text-white/70 hover:text-white text-[11px] font-bold uppercase transition-colors active:scale-95"
      >
        + Add Dice Group
      </button>

      {/* Roll button */}
      <button
        onClick={roll}
        className="w-full py-2 rounded bg-[#6d5dfc] hover:bg-[#8070ff] text-white text-[12px] font-bold uppercase tracking-wider transition-colors active:scale-95 shadow-md"
      >
        Roll {notation}
      </button>

      {/* Results */}
      {results && (
        <div className="bg-[#AD987D] rounded p-3 flex flex-col gap-2 border border-[#5a5043]">
          {results.map((groupResult, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-0.5">
              <div className="text-[#5a5043] text-[10px] font-bold uppercase">
                {groupResult.notation}
              </div>
              <div className="text-[#2d2d2d] text-[11px] flex flex-wrap gap-1">
                {groupResult.rolls.map((dieValue, rollIndex) => (
                  <span
                    key={rollIndex}
                    className="bg-[#9c9081] text-white rounded px-1"
                  >
                    {dieValue}
                  </span>
                ))}
                <span className="text-[#5a5043]">= {groupResult.subtotal}</span>
              </div>
            </div>
          ))}
          {results.length > 1 && (
            <div className="border-t border-[#5a5043] pt-1 text-[#2d2d2d] text-lg font-bold">
              Total = {total}
            </div>
          )}
          {results.length === 1 && (
            <div className="text-[#2d2d2d] text-lg font-bold">= {total}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
