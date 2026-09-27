import { SearchParams } from "nuqs";
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
export type SearchParamsProps = { searchParams: Promise<SearchParams> };
export type Setter<T> = Dispatch<SetStateAction<T>>;
export type UnwrapAsync<T extends (...params: never[]) => unknown> =
  NonNullable<Awaited<ReturnType<T>>>;

export type OptionalZodObject<T extends z.ZodObject> = z.ZodObject<{
  [K in keyof T["shape"]]: ReturnType<T["shape"][K]["optional"]>;
}>;

export type KeysOfType<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never;
}[keyof T];
