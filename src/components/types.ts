interface MenuItemProps {
  value: string;
  label: string;
  access: string;
}
interface MenuProps {
  items: MenuItemProps[];
}

export type { MenuItemProps, MenuProps };
