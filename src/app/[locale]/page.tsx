'use client'
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";


export default function Home() {

  const t = useTranslations('home')
  const local = useLocale()

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      router.refresh()
    });
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <main className=" sm:items-start flex items-center flex-col gap-y-10">
        <h2 className="text-2xl font-bold text-center">{t('title')}</h2>
        <p className="text-lg text-gray-600 text-center">{t('description')}</p>
      </main>

      <div className="flex items-center justify-center w-full mt-10 gap-5">
        <Button onClick={() => handleLocaleChange('en')} className={cn("border-1 p-2 ",
          local === 'en' ? "bg-black text-white" : "bg-white text-black"
        )}>English</Button>
        <Button onClick={() => handleLocaleChange('si')} className={cn("border-1 p-2 ",
          local === 'si' ? "bg-black text-white" : "bg-white text-black"
        )}>Sinhala</Button>
        <Button onClick={() => handleLocaleChange('ja')} className={cn("border-1 p-2 ",
          local === 'ja' ? "bg-black text-white" : "bg-white text-black"
        )}>Japanise</Button>
      </div>

    </div>
  );
}
