import React from "react";
import { Outlet } from "react-router-dom";
import MobileTablet from "./mobileAndTablet";
import PCSettings from "./pcSettings";
import { UserRound, Shield, Bell, Palette, UserPen } from "lucide-react";

const settingsItems = [
    {
        id: "accounts",
        title: "Accounts",
        description: "Manage and switch accounts",
        icon: UserRound,
        path: "/Dashboard/settings/accounts",
    },
    {
        id: "updateProfile",
        title: "updateProfile",
        description: "Manage and UpdateProfile",
        icon: UserPen,
        path: "/Dashboard/settings/updateProfile",
    },
    {
        id: "security",
        title: "Security",
        description: "Password and account security",
        icon: Shield,
        path: "/Dashboard/settings/security",
    },
    // {
    //     id: "notifications",
    //     title: "Notifications",
    //     description: "Manage your notifications",
    //     icon: Bell,
    //     path: "/Dashboard/settings/notifications",
    // },
    // {
    //     id: "appearance",
    //     title: "Appearance",
    //     description: "Customize your experience",
    //     icon: Palette,
    //     path: "/Dashboard/settings/appearance",
    // },
];

const Settings = () => {
  return (
    <main className="h-screen overflow-hidden bg-[#060b14] text-white">

      <div className="block h-full lg:hidden">
        <MobileTablet item={settingsItems}>
          <Outlet />
        </MobileTablet>
      </div>


      <div className="hidden h-full lg:block">
        <PCSettings item={settingsItems}>
          <Outlet />
        </PCSettings>
      </div>
    </main>
  );
};

export default Settings;