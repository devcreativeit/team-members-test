import { useQuery } from "@tanstack/react-query";
import { Users } from "./../api";

export const useGetInvitesQuery = () =>
  useQuery({
    queryKey: ["invites"],
    queryFn: Users.getInvites,
  });
