import { User } from "../models/user";

export const getUserQResolvers = () => ({
  user: (_: any, __: any, context: { user: User }) => {
    return context.user;
  },
});
