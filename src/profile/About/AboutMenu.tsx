import { Stack, MenuItem, MenuList } from "@mui/material";
import type { AboutMenuOptionType } from "../../types/aboutMenu.types";

type AboutMenuProps = {
  activeMenu: AboutMenuOptionType;
  setActiveMenu: (menu: AboutMenuOptionType) => void;
};
const AboutMenu = ({ activeMenu, setActiveMenu }: AboutMenuProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ py: 2, width: 300 }}
      gap={2}
    >
      <MenuList
        sx={{
          width: "100%",
          "& .MuiMenuItem-root": {
            py: 2,
          },
        }}
      >
        <MenuItem
          disableRipple
          selected={activeMenu === ("overview" as AboutMenuOptionType)}
          onClick={() => {
            return setActiveMenu("overview");
          }}
          sx={{ width: "100%", fontSize: 16 }}
        >
          Overview
        </MenuItem>
        <MenuItem
          disableRipple
          selected={
            activeMenu === ("work_and_education" as AboutMenuOptionType)
          }
          onClick={() => {
            return setActiveMenu("work_and_education");
          }}
          sx={{ width: "100%", fontSize: 16 }}
        >
          Work and Education
        </MenuItem>
        <MenuItem
          disableRipple
          selected={activeMenu === ("places" as AboutMenuOptionType)}
          onClick={() => {
            return setActiveMenu("places");
          }}
          sx={{ width: "100%", fontSize: 16 }}
        >
          Places Lived
        </MenuItem>
        <MenuItem
          disableRipple
          selected={activeMenu === ("basic_info" as AboutMenuOptionType)}
          onClick={() => {
            return setActiveMenu("basic_info");
          }}
          sx={{ width: "100%", fontSize: 16 }}
        >
          Basic Info
        </MenuItem>
        <MenuItem
          disableRipple
          selected={activeMenu === ("lifeEvents" as AboutMenuOptionType)}
          onClick={() => {
            return setActiveMenu("lifeEvents");
          }}
          sx={{ width: "100%", fontSize: 16 }}
        >
          Life Events
        </MenuItem>
      </MenuList>
    </Stack>
  );
};

export default AboutMenu;
