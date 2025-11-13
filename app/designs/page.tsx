"use client"
import React, {useEffect, useState} from 'react'
import {useAuth} from "@/context/useAuth";
import axios from "axios";
import DesignCard from "@/app/designs/_components/DesignCard";
import AppHeader from "@/components/AppHeader";

const DesignsPage = () => {
    const [wireframes, setWireframes] = useState<any>()
    const {user} = useAuth()
    const [loading, setLoading ] = useState<boolean>()
    useEffect(() => {
        user && getAllUserWireframes()
    }, [user]);
    const getAllUserWireframes =  async () => {
        const result = await axios.get(`/api/wireframe?email=${user?.email}`)
        console.log(result.data)
        setWireframes(result.data)
    }

    return (
        <div>
            <AppHeader/>

            <div className='flex flex-wrap gap-4 items-center justify-center'>
                {wireframes?.map((item, index) => (
                    <DesignCard key={index} item={item}/>
                ))}
            </div>
        </div>
    )
}
export default DesignsPage
