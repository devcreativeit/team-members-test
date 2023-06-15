import { useQuery } from "@tanstack/react-query";
import { Users } from "./../api";

export const useGetTeamMembers = () =>
  useQuery({
    queryKey: ["teamMembers"],
    queryFn: Users.getUsers,
  });
