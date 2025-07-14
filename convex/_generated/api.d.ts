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
import type * as actions_parseTopName from "../actions/parseTopName.js";
import type * as actions_processBlob from "../actions/processBlob.js";
import type * as actions_utils_baml_client_async_client from "../actions/utils/baml_client/async_client.js";
import type * as actions_utils_baml_client_async_request from "../actions/utils/baml_client/async_request.js";
import type * as actions_utils_baml_client_config from "../actions/utils/baml_client/config.js";
import type * as actions_utils_baml_client_globals from "../actions/utils/baml_client/globals.js";
import type * as actions_utils_baml_client_index from "../actions/utils/baml_client/index.js";
import type * as actions_utils_baml_client_inlinedbaml from "../actions/utils/baml_client/inlinedbaml.js";
import type * as actions_utils_baml_client_parser from "../actions/utils/baml_client/parser.js";
import type * as actions_utils_baml_client_partial_types from "../actions/utils/baml_client/partial_types.js";
import type * as actions_utils_baml_client_sync_client from "../actions/utils/baml_client/sync_client.js";
import type * as actions_utils_baml_client_sync_request from "../actions/utils/baml_client/sync_request.js";
import type * as actions_utils_baml_client_tracing from "../actions/utils/baml_client/tracing.js";
import type * as actions_utils_baml_client_type_builder from "../actions/utils/baml_client/type_builder.js";
import type * as actions_utils_baml_client_types from "../actions/utils/baml_client/types.js";
import type * as actions_utils_extract from "../actions/utils/extract.js";
import type * as actions_utils_search from "../actions/utils/search.js";
import type * as actions_utils_upload from "../actions/utils/upload.js";
import type * as handlers from "../handlers.js";
import type * as http from "../http.js";
import type * as mutations_insertBlob from "../mutations/insertBlob.js";
import type * as mutations_insertFaceCheck from "../mutations/insertFaceCheck.js";
import type * as mutations_insertFaceCheckUrls from "../mutations/insertFaceCheckUrls.js";
import type * as queries_getStorageId from "../queries/getStorageId.js";
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
  "actions/parseTopName": typeof actions_parseTopName;
  "actions/processBlob": typeof actions_processBlob;
  "actions/utils/baml_client/async_client": typeof actions_utils_baml_client_async_client;
  "actions/utils/baml_client/async_request": typeof actions_utils_baml_client_async_request;
  "actions/utils/baml_client/config": typeof actions_utils_baml_client_config;
  "actions/utils/baml_client/globals": typeof actions_utils_baml_client_globals;
  "actions/utils/baml_client/index": typeof actions_utils_baml_client_index;
  "actions/utils/baml_client/inlinedbaml": typeof actions_utils_baml_client_inlinedbaml;
  "actions/utils/baml_client/parser": typeof actions_utils_baml_client_parser;
  "actions/utils/baml_client/partial_types": typeof actions_utils_baml_client_partial_types;
  "actions/utils/baml_client/sync_client": typeof actions_utils_baml_client_sync_client;
  "actions/utils/baml_client/sync_request": typeof actions_utils_baml_client_sync_request;
  "actions/utils/baml_client/tracing": typeof actions_utils_baml_client_tracing;
  "actions/utils/baml_client/type_builder": typeof actions_utils_baml_client_type_builder;
  "actions/utils/baml_client/types": typeof actions_utils_baml_client_types;
  "actions/utils/extract": typeof actions_utils_extract;
  "actions/utils/search": typeof actions_utils_search;
  "actions/utils/upload": typeof actions_utils_upload;
  handlers: typeof handlers;
  http: typeof http;
  "mutations/insertBlob": typeof mutations_insertBlob;
  "mutations/insertFaceCheck": typeof mutations_insertFaceCheck;
  "mutations/insertFaceCheckUrls": typeof mutations_insertFaceCheckUrls;
  "queries/getStorageId": typeof queries_getStorageId;
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
