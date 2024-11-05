import React from 'react';

export function useMusic () {
    let audio  = new Audio('heart.mp3')
    console.log(audio);
    return audio
}