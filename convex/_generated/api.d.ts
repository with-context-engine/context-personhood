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
import type * as actions_faceCheck from "../actions/faceCheck.js";
import type * as actions_processBlob from "../actions/processBlob.js";
import type * as handlers from "../handlers.js";
import type * as http from "../http.js";
import type * as mutations_faceCheckId from "../mutations/faceCheckId.js";
import type * as mutations_insertBlob from "../mutations/insertBlob.js";
import type * as queries_getStorageId from "../queries/getStorageId.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "actions/faceCheck": typeof actions_faceCheck;
  "actions/processBlob": typeof actions_processBlob;
  handlers: typeof handlers;
  http: typeof http;
  "mutations/faceCheckId": typeof mutations_faceCheckId;
  "mutations/insertBlob": typeof mutations_insertBlob;
  "queries/getStorageId": typeof queries_getStorageId;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
