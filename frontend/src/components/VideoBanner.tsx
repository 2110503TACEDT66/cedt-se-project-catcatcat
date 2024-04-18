'use client'

import VideoPlayer from "./VideoPlayer"
import { useState } from "react"

export function VideoBanner(){

    const [playing, setPlaying] = useState(true)

    return (
        <div className="relative">
            <VideoPlayer vdoSrc='/vdo/cws.mp4' isPlaying={playing}/>
        </div>
    )
}