"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";

const Features = () => {
    const t = useTranslations('Features');

    return (
        <section className="bg-white dark:bg-gray-800">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"><span className="underlined underline-clip">{t("explore")}</span> {t("text_1")}</h2>
                    <p className="mb-4">
                        {t('text_2')}</p>
                    <p>{t('text_3')}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <Image className="w-full rounded-lg h-[30rem] object-cover" src="/images/travnik-1.png" alt="Travnik" width={1000} height={800} />
                    <Image className="mt-4 w-full lg:mt-10 rounded-lg h-[30rem] object-cover" src="/images/travnik-2.png" alt="Travnik" width={1000} height={800} />
                </div>
            </div>
        </section >
    );
}

export default Features;