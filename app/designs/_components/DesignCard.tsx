import React from 'react'
import Image from "next/image";
import {aiGeminiVersions} from "@/app/constants";
import {Button} from "@/components/ui/button";
import {CodeIcon, FolderOpenIcon} from "lucide-react";
import Link from "next/link";

const DesignCard = ({item}:any) => {
    const ModelObj = item && aiGeminiVersions.find((it) => it.name === item.model);

    return  (
        <div className='p-5 border rounded-lg mt-10' >
            <Image className='w-full h-[200px] object-cover ' src={item?.imageUrl} alt='image' width={300} height={200}/>
            <div className='mt-2'>
                <h2 className='line-clamp-3'>{item?.description}</h2>
                <div className="flex justify-between items-center ">


                    <div className='flex mt-2  items-center gap-2 p-2  rounded-full '>
                        <FolderOpenIcon className='rounded-lg' width={30} height={30}  alt={ModelObj?.modelName ?? ''} />
                        <h2 className='text-sm'>{ModelObj?.name}</h2>
                    </div>
                    <Link href={`/view-code/${item?.uid}`}>
                        <Button>
                            <CodeIcon/>
                            Посмотреть код
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default DesignCard
