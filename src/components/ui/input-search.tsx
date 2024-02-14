"use client";

import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/use-debounce";
import qs from "query-string";
import {useOrigin} from "@/hooks/use-origin";

export type InputSearchProps = {
  name: string;
  placeholder: string;
  className?: string;
};

const InputSearch = ({name, className, placeholder}: InputSearchProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue: string = useDebounce<string>(value, 500);
  const origin: string = useOrigin();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();

  useEffect((): void => {
    const current = qs.parse(searchParams.toString());

    const query: { search: string } = {
      ...current,
      ["search"]: debounceValue,
    };

    const url: { query: { search: string }; url: string } = {
      url: `${origin}${pathname}`,
      query
    };

    router.push(`${url.url}?search=${url.query.search}`);
  }, [debounceValue, router]);

  return (
    <Input
      id={name}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default InputSearch;