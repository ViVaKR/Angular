import { PsStatus } from "@enums/ps-status";

export interface IUploadProgress {
  progress: number;
  loaded: number;
  total: number;
  status: PsStatus
}
