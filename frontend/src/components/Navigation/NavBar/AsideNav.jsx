import { LifeBuoy, Settings, Film, Plus } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useLocation } from "react-router-dom";

const AsideNav = ({ scenes, movieId }) => {
  // const location = useLocation();

  return (
    <div className="flex">
      <Sidebar movieName={scenes.story_name}>
        {/* Always show "Create New Scene" at the top */}
        <SidebarItem
          key="create-scene"
          icon={<Plus size={20} />}
          text={"Create New Scene"}
          location={`/movies/${movieId}/new-scene`}
        />
        {/* Render the list of scenes if available */}
        {scenes.length > 0 ? (
          scenes.map((scene, index) => (
            <SidebarItem
              key={index}
              icon={<Film size={20} />}
              text={scene.title}
              location={"/movies/" + scene.story_id + "/" + scene.id}
            />
          ))
        ) : (
          // Optionally, you can provide a message or alternative item if there are no scenes
          <SidebarItem
            key="no-scenes"
            icon={<Film size={20} />}
            text={"No Scenes Available"}
          />
        )}

        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          location="/settings"
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          location="/help"
        />
      </Sidebar>
    </div>
  );
};

export default AsideNav;
