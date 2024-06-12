// src/routes/.../+page.ts
import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutLoad = ({ data }) => {
  const session = data?.session;
  return {
    session,
  };
};