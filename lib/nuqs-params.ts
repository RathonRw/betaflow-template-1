import { useQueryStates } from "nuqs";
import {
  createLoader,
  type Options,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

const searchParams = {
  q: parseAsString.withDefault(""),
  category: parseAsString.withDefault("all"),
};

export const loadFilters = createLoader(searchParams);

export const useFilters = (options: Options = {}) =>
  useQueryStates(searchParams, {
    ...options,
    shallow: false,
  });
