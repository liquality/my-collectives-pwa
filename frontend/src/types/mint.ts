import { Group } from "./general-types";

export interface MintResult {
  success: boolean;
  error?: any;
  group: Group;
}