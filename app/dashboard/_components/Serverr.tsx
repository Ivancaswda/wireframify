"use server"
import React from 'react'
import getServerUser from "@/lib/auth-server";

const Serverr =  async () => {
    const user = await getServerUser()
    console.log(user)
    return (
        <div>Serverr</div>
    )
}
export default Serverr
