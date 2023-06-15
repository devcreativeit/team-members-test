import { useQuery } from "@tanstack/react-query";
import { Users } from "./../api";

export const useGetTeamMembersQuery = () =>
  useQuery({
    queryKey: ["teamMembers"],
    queryFn: Users.getUsers,
  });
