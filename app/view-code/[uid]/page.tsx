"use client";
import React, { useEffect, useState } from "react";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import AppSidebar from "@/components/AppSidebar";
import SelectionDetails from "@/app/view-code/_components/SelectionDetails";
import CodeEditor from "@/app/view-code/_components/CodeEditor";
import {Loader2Icon, LogOut, StarIcon} from "lucide-react";
import ErrorDialog from "@/app/view-code/_components/ErrorDialog";
import {Progress} from "@/components/ui/progress";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/context/useAuth";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LoaderOne} from "@/components/ui/loader";

const ViewCodePage = () => {
    const { uid } = useParams();
    const [record, setRecord] = useState<any>();
    const [codeResponse, setCodeResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [errorDialog, setErrorDialog] = useState<{ open: boolean; title?: string; message?: string }>({
        open: false,
    });

    useEffect(() => {
        if (uid) getRecordInfo();
    }, [uid]);

    const getRecordInfo = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`/api/wireframe?uid=${uid}`);
            const data = result.data;

            if (!data) {
                toast.error("Не удалось загрузить запись из базы");
                setLoading(false);
                return;
            }

            setRecord(data);

            if (data?.code?.response) {
                setCodeResponse(data.code.response);
                setIsReady(true);
                setLoading(false);
            } else {
                await generateCode(data);
            }
        } catch (error) {
            toast.error("Ошибка при получении данных из БД");
            setLoading(false);
        }
    };
    console.log(isReady)
    const generateCode = async (updatedRecord: any) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/aimodel", {
                description: updatedRecord.description,
                model: updatedRecord.model,
                imageUrl: updatedRecord.imageUrl,
            });

            if (res.data.creditsLeft < 0) {
                setErrorDialog({
                    open: true,
                    title: "Недостаточно кредитов",
                    message: "У вас закончились кредиты. Пополните их на странице Pricing.",
                });
                setLoading(false);
                return;
            }

            setCodeResponse(res.data.code);
            await updateRecordInDb(updatedRecord, res.data.code);
        } catch (err: any) {
            const status = err?.response?.status;
            if (status === 403) {
                setErrorDialog({
                    open: true,
                    title: "Недостаточно кредитов",
                    message: err.response.data?.error || "Пополните баланс для использования AI.",
                });
            } else {
                setErrorDialog({
                    open: true,
                    title: "Ошибка генерации",
                    message: err?.response?.data?.error || "Произошла неизвестная ошибка.",
                });
            }
        } finally {
            setLoading(false);
            setIsReady(true);
        }
    };



    const updateRecordInDb = async (updatedRecord: any, code: string) => {
        try {
            await axios.put("/api/wireframe", {
                uid: updatedRecord.uid,
                description: updatedRecord.description,
                model: updatedRecord.model,
                codeResponse: { response: code },
            });
        } catch (error) {
            console.error("Ошибка при обновлении записи:", error);
        }
    };
    const {user, logout} = useAuth()
    const router = useRouter()
    return (
        <div>

            <ErrorDialog
                open={errorDialog.open}
                title={errorDialog.title}
                message={errorDialog.message}
                onClose={() => setErrorDialog({ open: false })}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
                <div>
                    <SelectionDetails
                        loading={loading}
                        isReady={isReady}
                        regenerateCode={(ur:any) => generateCode(ur)}
                        record={record}
                    />
                    <div   className='flex flex-col gap-2'  >
                        <div>
                            <Progress
                                value={user?.credits || 0}
                                max={21}
                                label="Оставшиеся звезды"
                            />
                        </div>             <div className="flex items-center justify-start gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger>

                                    <Avatar>
                                        <AvatarImage src={user?.avatarUrl}/>
                                        <AvatarFallback className='bg-primary text-white'>
                                            {user?.userName[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>


                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <div className='flex flex-col '>
                                    <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'>

                                        Мой вайфрэймы</p>
                                    <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer'>Купить звезды</p>
                                    <p className='py-2 px-2 hover:bg-gray-100 transition-all cursor-pointer' onClick={() => {
                                        logout()
                                        router.replace("/sign-up")
                                        toast.success("Logout!")
                                    }}>Выйти</p>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={() => {
                            logout()
                            router.replace("/sign-up")
                            toast.success("Logout!")
                        }} className="flex-1" variant='destructive'>
                            <LogOut/>
                            Выйти
                        </Button>

                    </div>
                    </div>
                </div>

                <div className="col-span-4">
                    {loading ? (
                        <div className="flex items-center text-primary font-semibold text-sm  justify-center p-20 flex-col gap-3">
                            <LoaderOne/>
                            Анализируем вайфрэйм...
                        </div>
                    ) : (
                        <CodeEditor isReady={isReady} codeResponse={codeResponse} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewCodePage;
