import {UserInterface} from './userInterface';
import {ObjectiveInterface} from './objectiveInterface';

/**
 * This interface is where the Artist schema is based
 */
export interface SessionInterface {
  name: string,
  user: UserInterface,
  time: Date,
  objectives: ObjectiveInterface[]
};
