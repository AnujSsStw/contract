"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { api } from "@cvx/_generated/api";

export default function Dashboard({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.projects.get>;
}) {
  const data = usePreloadedQuery(preloaded);
  //   const addNumber = useMutation(api.myFunctions.addNumber);
  return <></>;
}
