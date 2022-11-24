import {UserInterface} from './user';
import {ObjectiveInterface} from './objective';

/**
 * This interface is where the Artist schema is based
 */
export interface SessionInterface {
  id: string,
  user: UserInterface,
  time: Date,
  objetives: ObjectiveInterface[]
};
