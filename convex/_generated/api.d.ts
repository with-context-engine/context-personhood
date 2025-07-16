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
import type * as actions_exaWebsets from "../actions/exaWebsets.js";
import type * as actions_faceCheck from "../actions/faceCheck.js";
import type * as actions_moondream from "../actions/moondream.js";
import type * as actions_parseNames from "../actions/parseNames.js";
import type * as actions_processBlob from "../actions/processBlob.js";
import type * as actions_utils_extract from "../actions/utils/extract.js";
import type * as actions_utils_modal from "../actions/utils/modal.js";
import type * as actions_utils_search from "../actions/utils/search.js";
import type * as actions_utils_topName from "../actions/utils/topName.js";
import type * as actions_utils_upload from "../actions/utils/upload.js";
import type * as handlers from "../handlers.js";
import type * as http from "../http.js";
import type * as mutations_insertBlob from "../mutations/insertBlob.js";
import type * as mutations_insertExaSet from "../mutations/insertExaSet.js";
import type * as mutations_insertFaceCheck from "../mutations/insertFaceCheck.js";
import type * as mutations_insertFaceCheckUrls from "../mutations/insertFaceCheckUrls.js";
import type * as mutations_insertMoondreamBlob from "../mutations/insertMoondreamBlob.js";
import type * as mutations_insertTopName from "../mutations/insertTopName.js";
import type * as queries_getMoondreamStorageId from "../queries/getMoondreamStorageId.js";
import type * as queries_getStorageId from "../queries/getStorageId.js";
import type * as queries_getTopResults from "../queries/getTopResults.js";
import type * as queries_ranksearchUrls from "../queries/ranksearchUrls.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "actions/exaWebsets": typeof actions_exaWebsets;
  "actions/faceCheck": typeof actions_faceCheck;
  "actions/moondream": typeof actions_moondream;
  "actions/parseNames": typeof actions_parseNames;
  "actions/processBlob": typeof actions_processBlob;
  "actions/utils/extract": typeof actions_utils_extract;
  "actions/utils/modal": typeof actions_utils_modal;
  "actions/utils/search": typeof actions_utils_search;
  "actions/utils/topName": typeof actions_utils_topName;
  "actions/utils/upload": typeof actions_utils_upload;
  handlers: typeof handlers;
  http: typeof http;
  "mutations/insertBlob": typeof mutations_insertBlob;
  "mutations/insertExaSet": typeof mutations_insertExaSet;
  "mutations/insertFaceCheck": typeof mutations_insertFaceCheck;
  "mutations/insertFaceCheckUrls": typeof mutations_insertFaceCheckUrls;
  "mutations/insertMoondreamBlob": typeof mutations_insertMoondreamBlob;
  "mutations/insertTopName": typeof mutations_insertTopName;
  "queries/getMoondreamStorageId": typeof queries_getMoondreamStorageId;
  "queries/getStorageId": typeof queries_getStorageId;
  "queries/getTopResults": typeof queries_getTopResults;
  "queries/ranksearchUrls": typeof queries_ranksearchUrls;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
