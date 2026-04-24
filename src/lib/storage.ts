"use client";
import { json } from "stream/consumers";
import {useEffect} from 'react';
import ToolBar from "@/Components/ToolBar";

export default function Load(){
    if(localStorage){
        const savedDice = localStorage.getItem('dice')
        console.log(savedDice)
    }
}

export function Save(){
    const gameData = useEffect (() => {
    if(localStorage){
        const savedToolbar = localStorage.setItem('toolbar', JSON.stringify(toolbar))
        console.log(savedToolbar)
    }
    else{
        console.log("Local Storage unavailable.")
    }
})
}
export function LoadToolbar(key : string){
        console.log('attempted LoadToolbar')

    if(localStorage){
        const loadedToolbar = localStorage.getItem(key)

        if(loadedToolbar){
            console.log('Toolbar loaded:' + JSON.parse(loadedToolbar))
            return(JSON.parse(loadedToolbar))
        }
        else{
            console.log("Couldn't find what we looked for" + loadedToolbar)
        }
    }
    else{
        console.log('Local Storage unavailable.')
        return('undefined')
    }
}