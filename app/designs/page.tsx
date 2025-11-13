"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from "@/context/useAuth";
import axios from "axios";
import DesignCard from "@/app/designs/_components/DesignCard";
import AppHeader from "@/components/AppHeader";
import { LoaderOne } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { FolderOpenIcon, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

const DesignsPage = () => {
    const [wireframes, setWireframes] = useState<any>([])
    const { user, loading: userLoading } = useAuth()
    const router = useRouter()

    // Все хуки должны быть в начале компонента
    useEffect(() => {
        if (!user && !userLoading) {
            router.replace("/sign-up")
        }
    }, [user, router, userLoading])

    useEffect(() => {
        const getAllUserWireframes = async () => {
            if (!user) return
            const result = await axios.get(`/api/wireframe?email=${user.email}`)
            setWireframes(result.data)
        }

        getAllUserWireframes()
    }, [user])

    if (userLoading || (!user && !wireframes)) {
        return <div className='w-screen h-screen flex items-center justify-center'>
            <LoaderOne />
        </div>
    }

    return wireframes.length !== 0 ? (
        <div>
            <AppHeader />
            <div className='flex flex-wrap gap-4 items-center justify-center'>
                {wireframes.map((item: any, index: number) => (
                    <DesignCard key={index} item={item} />
                ))}
            </div>
        </div>
    ) : (
        <div>
            <AppHeader />
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FolderOpenIcon />
                    </EmptyMedia>
                    <EmptyTitle>У вас пока что нету вайфрэймов</EmptyTitle>
                    <EmptyDescription>
                        Вы пока что не создали ни одного вайфрэйма, нажмите на кнопку чтобы начать с этим делом!
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Link href="/dashboard">
                            <Button>Создать вайфрэйм</Button>
                        </Link>
                        <Button variant="outline">Import Project</Button>
                    </div>
                </EmptyContent>
                <Button
                    variant="link"
                    asChild
                    className="text-muted-foreground"
                    size="sm"
                >
                    <a href="#">
                        Learn More <ArrowUpRightIcon />
                    </a>
                </Button>
            </Empty>
        </div>
    )
}

export default DesignsPage
