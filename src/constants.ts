import type { MenuItemProps } from "./components/types";

const constants = {
  menus: {
    profileSettings: {
      value: "Profile",
      label: "profileModal",
      access: "protected",
    },
    websiteSettings: {
      value: "Settings",
      label: "settingsModal",
      access: "public",
    },
  },
};

const menuItems: MenuItemProps[] = [];
Object.entries(constants.menus).forEach((entry) => menuItems.push(entry[1]));

export { constants, menuItems };
