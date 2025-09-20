import { Tables, TablesInsert, TablesUpdate } from "./supabase.types";

export type Payments = Tables<"payments">;
export type PaymentsInsert = TablesInsert<"payments">;
export type PaymentsUpdate = TablesUpdate<"payments">;
