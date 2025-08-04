import { PublicUser } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser; 
    }
  }
}
 export {}