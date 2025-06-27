/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as documents from "../documents.js";
import type * as download from "../download.js";
import type * as http from "../http.js";
import type * as myFunctions from "../myFunctions.js";
import type * as projects from "../projects.js";
import type * as serve from "../serve.js";
import type * as storage from "../storage.js";
import type * as subcontract from "../subcontract.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  documents: typeof documents;
  download: typeof download;
  http: typeof http;
  myFunctions: typeof myFunctions;
  projects: typeof projects;
  serve: typeof serve;
  storage: typeof storage;
  subcontract: typeof subcontract;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
