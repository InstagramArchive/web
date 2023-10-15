import type { PostgrestError } from "@supabase/supabase-js";

/**
 * Handles errors and casts data to a specific type if it exists.
 *
 * @param data The data to be handled and cast.
 * @param error The error object, if an error occurred.
 * @returns An array of the specified type, or an empty array if there's no data or an error occurred.
 */
export function handleDataAndCast<T>(data: T[] | null, error: PostgrestError  | null): T[] {
    if (error) {
      throw error;
    }
  
    if (data) {
      return data;
    } else {
      return [];
    }
  }

/**
 * Handles errors and casts a single data object to a specific type if it exists.
 *
 * @param data The single data object to be handled and cast.
 * @param error The error object, if an error occurred.
 * @returns The specified type, or throws an error if there's no data or an error occurred.
 */
export function handleSingleDataAndCast<T>(data: T[] | null, error: PostgrestError | null): T {
    if (error) {
      throw error;
    }
  
    if (data && data.length ===1) {
      return data[0];
    } else {
      throw new Error("Data not found");
    }
  }