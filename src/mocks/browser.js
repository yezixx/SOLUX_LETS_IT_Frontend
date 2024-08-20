import { setupWorker } from "msw/browser";
import { postHandlers } from "./postHandlers";
import { teamboardHandlers } from "./teamboardHandlers";

export const worker = setupWorker(...postHandlers, ...teamboardHandlers);
