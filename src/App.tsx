import { useState } from "react";
import { useGetTeamMembersQuery, useGetInvitesQuery } from "./hooks";
import adminPic from "./assets/admin_pan.svg";
import chevronRightPic from "./assets/chevron_right.svg";
import standartPic from "./assets/standart_pan.svg";

import { isTeamMember, isInvite, TeamListItem } from "./types";
import Loading from "./components/Loading";
import clsx from "clsx";

const sortByRole = (array: TeamListItem[]) => {
  if (!array) return [[], []];
  const adminItems: TeamListItem[] = [];
  const standartItems: TeamListItem[] = [];
  array.forEach(
    (item) =>
      (item.role === "Administrator" && adminItems.push(item)) ||
      (item.role === "Standard" && standartItems.push(item))
  );
  return [adminItems, standartItems];
};

const ListItem = ({ itemData }: { itemData: TeamListItem }) => {
  const [isActive, toggleActive] = useState(false);
  return (
    <li
      onClick={() => toggleActive((prevState) => !prevState)}
      className={clsx(
        "team__list__item",
        isInvite(itemData) && "invite",
        isTeamMember(itemData) && "member",
        isActive && "active"
      )}
    >
      <span className="team__list__item__title">
        {isInvite(itemData) && itemData.phone}
        {isTeamMember(itemData) &&
          `${itemData.user.name} ${itemData.user.lastName}`}
      </span>
      {isInvite(itemData) && (
        <span className="team__list__item__invite-flag">Invited</span>
      )}
      <img
        src={chevronRightPic}
        alt="chevron"
        className={clsx("team__list__item__chevron", isActive && "active")}
      />
      <div className={clsx("team__list__item__content", isActive && "active")}>
        Content
      </div>
    </li>
  );
};

const List = ({ teamDataArr }: { teamDataArr: TeamListItem[] }) => {
  return (
    <ul className="team__list">
      {teamDataArr.map((item) => (
        <ListItem key={item.id} itemData={item} />
      ))}
    </ul>
  );
};

const App = () => {
  const { data: members = [], isLoading: loadingMembers } =
    useGetTeamMembersQuery();
  const { data: invites = [], isLoading: loadingInivtes } =
    useGetInvitesQuery();

  const [adminMembers, standartMembers] = sortByRole(members);
  const [adminInivtes, standartInvites] = sortByRole(invites);

  const adminsArr = adminMembers.concat(adminInivtes);
  const standartArr = standartMembers.concat(standartInvites);

  return (
    <div className="team">
      <section className="team__section">
        <div className="team__title">
          <img className="team__title__image" src={adminPic} alt="admin" />
          <span>Administrators</span>
        </div>
        {!(loadingMembers || loadingInivtes) ? (
          <List teamDataArr={adminsArr} />
        ) : (
          <Loading />
        )}
      </section>
      <section className="team__section">
        <div className="team__title">
          <img
            className="team__title__image"
            src={standartPic}
            alt="standart"
          />
          <span>Standard Users</span>
        </div>
        {!(loadingMembers || loadingInivtes) ? (
          <List teamDataArr={standartArr} />
        ) : (
          <Loading />
        )}
      </section>
    </div>
  );
};

export default App;
