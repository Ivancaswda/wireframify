"use client"
import React, { useEffect, useState } from 'react'
import ImageUpload from "@/app/dashboard/_components/ImageUpload";
import { useAuth } from "@/context/useAuth";
import Serverr from "@/app/dashboard/_components/Serverr";

const DashboardPage = () => {
    const { user } = useAuth()
    const [displayText, setDisplayText] = useState('')
    const fullText = `Добро пожаловать, ${user?.userName || ''}!`

    // Эффект "печати" текста
    useEffect(() => {
        if (!user?.userName) return
        setDisplayText('')

        let index = 0
        const interval = setInterval(() => {
            setDisplayText(fullText.slice(0, index))
            index++
            if (index > fullText.length) clearInterval(interval)
        }, 80) // скорость печати

        return () => clearInterval(interval)
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">

            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent mb-8">
                {displayText}
                <span className="animate-pulse text-primary">▍</span>
            </h1>

            <div className="w-full max-w-3xl">
                <ImageUpload />
            </div>
        </div>
    )
}

export default DashboardPage
