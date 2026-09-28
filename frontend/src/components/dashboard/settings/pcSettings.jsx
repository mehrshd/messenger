import { useLocation } from "react-router-dom";
import { ButtonSettingsPc } from "../../../core/design/button";

const PCSettings = ({ item, children }) => {

    const location = useLocation();
    
  return (
    <div className="flex h-full">

      <aside className="w-80 shrink-0 border-r border-white/8">
        <div className="p-6">
          <h1 className="text-xl font-semibold">
            Settings
          </h1>
        </div>

        {
          item.map((item) => {

            const isActive = location.pathname === item.path;
            
            return (
            
            <ButtonSettingsPc
              key={item.id}
              path={item.path}
              title={item.title}
              icon={item.icon}
              description={item.description}
              active={isActive}
            />
          )})
        }

      </aside>


      <section className="min-w-0 flex-1 overflow-y-auto">
        {children}
      </section>
    </div>
  );
};

export default PCSettings;