import { Dispatch, SetStateAction } from "react";
import z from "zod";

export type NavLink = {
  label: string;
  href?: string;
  sublinks?: { label: string; href: string }[];
};

export type ParamsId<T extends string> = {
  params: Promise<Record<T, string>>;
};
// export type SearchParamsType = { searchParams: Promise<SearchParams> };
export type SetterType<T> = Dispatch<SetStateAction<T>>;
export type UnwrapAsync<T extends (...params: never[]) => unknown> =
  NonNullable<Awaited<ReturnType<T>>>;

export type OptionalZodObject<T extends z.ZodObject> = z.ZodObject<{
  [K in keyof T["shape"]]: ReturnType<T["shape"][K]["optional"]>;
}>;
