import { useQuery } from "@tanstack/react-query";
import { Users } from "./../api";

export const useGetInvites = () =>
  useQuery({
    queryKey: ["invites"],
    queryFn: Users.getInvites,
  });
