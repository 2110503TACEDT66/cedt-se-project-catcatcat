'use client'

import { styled } from "@mui/material"
import VideoPlayer from "./VideoPlayer"
import { useState } from "react"

export function VideoBanner(){

    const [playing, setPlaying] = useState(true)

    return (
        <div className="relation">
            <VideoPlayer vdoSrc='/vdo/cws.mp4' isPlaying={playing}/>
        </div>
    )
}