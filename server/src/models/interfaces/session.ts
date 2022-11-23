import {UserInterface} from './user';
import {ObjetiveInterface} from './objetive';

/**
 * This interface is where the Artist schema is based
 */
export interface SessionInterface {
  id: string,
  user: UserInterface,
  time: Date,
  objetives: ObjetiveInterface[]
};
