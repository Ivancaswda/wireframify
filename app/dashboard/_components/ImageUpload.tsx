"use client"
import React, { useRef, useState } from 'react'
import { CloudUpload, Loader2Icon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { FaMagic } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";

const adjectives = [
    "Creative", "Dynamic", "Modern", "Elegant", "Smart",
    "Bold", "Bright", "Silent", "Neon", "Digital", "Rapid", "Blue"
]

const nouns = [
    "Dashboard", "Panel", "Interface", "Prototype", "Layout",
    "Concept", "Design", "Widget", "Project", "Frame", "Idea"
]

const generateRandomTitle = () => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${adjective} ${noun}`
}

const ImageUpload = () => {
    const [description, setDescription] = useState<string>("")
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { user } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const uploadImageToServer = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return data.url;
    };

    const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewUrl(localPreview);

            try {
                const uploadedUrl = await uploadImageToServer(file);
                setPreviewUrl(uploadedUrl);
                toast.success("✅ Изображение успешно загружено!");
            } catch (err) {
                toast.error("Ошибка при загрузке изображения");
            }
        }
    };

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const onConvertToCode = async () => {
        try {
            setLoading(true)

            const uid = uuidv4()
            const title = generateRandomTitle() // ✅ создаем название

            await axios.post("/api/wireframe", {
                uid,
                title,
                description,
                imageUrl: previewUrl,
                model: 'gemini-2.5-flash',
                email: user?.email
            })

            router.push(`/view-code/${uid}`)
            toast.success(`Проект "${title}" добавлен!`)
        } catch (error) {
            toast.error('Не удалось создать проект')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='p-7 border border-dashed rounded-md'>
                    {!previewUrl ? (
                        <div className='flex items-center gap-4 flex-col'>
                            <CloudUpload className='h-10 w-10 text-indigo-600' />
                            <h2 className='font-semibold text-lg'>Загрузить изображение</h2>
                            <p>Нажмите, чтобы загрузить макет интерфейса</p>

                            <input
                                ref={inputRef}
                                onChange={onImageSelect}
                                multiple={false}
                                type="file"
                                id='imageSelect'
                                className='hidden'
                            />

                            <Button type="button" onClick={handleButtonClick}>
                                Выбрать изображение
                            </Button>
                        </div>
                    ) : (
                        <div className='p-5 border border-dashed relative'>
                            <XIcon
                                onClick={() => setPreviewUrl(null)}
                                className='absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-500'
                            />
                            <Image
                                width={300}
                                height={300}
                                src={previewUrl}
                                alt='preview'
                                className='w-full h-[300px] object-cover rounded-md'
                            />
                        </div>
                    )}
                </div>

                <div className='p-7 border shadow-md rounded-lg'>
                    <h2 className='font-bold text-lg'>Введите описание проекта</h2>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='mt-3'
                        placeholder='Опишите назначение вашего интерфейса...'
                    />
                </div>
            </div>

            <div className='mt-10 flex items-center justify-center'>
                <Button className="py-6 px-8! text-lg" onClick={onConvertToCode} disabled={loading || !previewUrl}>
                    {loading ? <Loader2Icon className='animate-spin' /> : <FaMagic />}
                    <span className="ml-2">{loading ? 'Генерация...' : 'Создать проект'}</span>
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
