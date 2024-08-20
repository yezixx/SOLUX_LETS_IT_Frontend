import { setupWorker } from "msw/browser";
import { postHandlers } from "./postHandlers";

export const worker = setupWorker(...postHandlers);
