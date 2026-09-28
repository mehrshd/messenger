import { useLocation, useNavigate } from "react-router-dom";
import { ButtonSettingsMobile } from "../../../core/design/button";

const MobileTablet = ({ item, children }) => {
    const location = useLocation();

    const isSettingsPage =
        location.pathname === "/Dashboard/settings";

    return (
        <div className="h-full">
          {isSettingsPage && (
            <div className="h-full overflow-y-auto p-4">
              <h1 className="mb-6 px-2 text-xl font-semibold text-white">
                Settings
              </h1>

              {
                item.map((item) => (
                  <ButtonSettingsMobile
                    key={item.id}
                    path={item.path}
                    title={item.title}
                    icon={item.icon}
                    description={item.description}
                  />
                ))
              }

            </div>
          )}

            {!isSettingsPage && (
                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            )}
        </div>
    );
};

export default MobileTablet;