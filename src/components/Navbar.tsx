import { signOut, useSession } from "next-auth/react";
import { SettingsModal } from "./SettingsModal";
import { ProfileModal } from "./ProfileModal";
import { menuItems } from "../constants";
import type { MenuItemProps, MenuProps } from "./types";
import Image from "next/image";
import { popupCenter } from "~/utils/popupWindow";

const MenuItem = (props: MenuItemProps) => {
  const { data: session } = useSession();
  return (
    <>
      {session && props.access === "protected" ? (
        <li>
          <label htmlFor={props.label}>
            <a>{props.value}</a>
          </label>
        </li>
      ) : (
        <></>
      )}
      {props.access === "public" ? (
        <>
          <li>
            <label htmlFor={props.label}>
              <a>{props.value}</a>
            </label>
          </li>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Menu = (props: MenuProps) => {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 bg-base-200 p-2 shadow"
    >
      {props.items.map((item) => (
        <MenuItem
          key={item.value}
          value={item.value}
          label={item.label}
          access={item.access}
        />
      ))}
      <LoginButton />
    </ul>
  );
};

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <li>
      <button
        onClick={
          session
            ? () => void signOut()
            : () => popupCenter("/signin", "xtf", window, 900, 1000)
        }
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </li>
  );
};

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="base-content navbar justify-self-start bg-base-300">
      <SettingsModal />
      <ProfileModal />

      <div className="flex-1">
        <a className="pl-2 text-xl normal-case">Rogue T3</a>
      </div>

      <div className="flex-none">
        <div className="mr-2">
          {session ? session.user?.name : "Not signed in"}
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="align-center flex w-10 content-center items-center justify-center justify-items-center self-center rounded-full">
              {session?.user.image ? (
                <Image
                  src={session.user.image}
                  alt="User picture"
                  width="100"
                  height="100"
                />
              ) : (
                <span className="material-symbols-outlined md-48 p-2">
                  account_circle
                </span>
              )}
            </div>
          </label>
          <Menu items={menuItems} />
        </div>
      </div>
    </div>
  );
};
