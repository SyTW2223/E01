import { SessionInterface } from "./session"
import { TaskInterface } from "./task"

/**
 * This interface is where the Artist schema is based
 */
export interface ObjectiveInterface {
  name: string,
  session: SessionInterface,
  tasks: TaskInterface[]
};