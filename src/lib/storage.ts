'use client';
import { json } from "stream/consumers";
import {useState, useEffect} from 'react';
import ToolBar from "@/Components/ToolBar";


export default function Load(){
    if(window !== undefined){
        const savedDice = localStorage.getItem('dice')
        console.log(savedDice)
    }
}

export function Save(key : string, value : string){
    
    console.log('value ' + value)
    if(window !== undefined){
        const savedToolbar = localStorage.setItem(key, JSON.stringify(value))
        console.log('activeTab:' + value)
    }
    else{
        console.log("Local Storage unavailable.")
    }
}
export function LoadToolbar(key : string){
        console.log('attempted LoadToolbar')

    if(window !== undefined){
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