import { SessionInterface } from "./sessionInterface"
import { TaskInterface } from "./taskInterface"

/**
 * This interface is where the Artist schema is based
 */
export interface ObjectiveInterface {
  name: string,
  session: SessionInterface,
  tasks: TaskInterface[]
};