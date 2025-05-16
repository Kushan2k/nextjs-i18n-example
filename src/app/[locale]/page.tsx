'use client'
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";


import { useTransition } from "react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { routing } from "@/i18n/routing";



export default function Home() {

  const t = useTranslations('home')
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });

    });
  };

  const local = useLocale()

  return (
    <div className="flex items-center justify-center flex-col">
      <main className=" sm:items-start flex items-center flex-col gap-y-10">
        <h2 className="text-2xl font-bold text-center">{t('title')}</h2>
        <p className="text-lg text-gray-600 text-center">{t('description')}</p>
      </main>

      <div className="flex items-center justify-center w-full mt-10 gap-5">
        <Select value={local} onValueChange={(val) => {
          handleLocaleChange(val)
        }}>
          <SelectTrigger className="">
            <SelectValue placeholder="Change Local" />
          </SelectTrigger>
          <SelectContent>
            {routing.locales.map((local) => (
              <SelectItem
                key={local}
                value={local}

              >
                {local}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

    </div>
  );
}
