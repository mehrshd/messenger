import Mobile from "./mobile";
import Tablet from "./tablet";
import PC from "./pc";
import { useQuery } from "@tanstack/react-query";
import GetProfile from "../../../core/services/api/dashboard/profile";
import { useNavigate } from "react-router-dom";
import Loading from "../../../core/design/loading";
import Notification from "../../../core/design/notification";

// const user = {
//   name: "Aloki",
//   username: "@aloki",
//   email: "aloki@example.com",
//   age: "2019 / 09 / 09",
//   account: "Personal",
//   imageProfile: "../../../../public/screenshot-2026-09-15_00-57-22.png",
//   banner: "../../../../public/screenshot-2026-09-15_00-57-22.png",
// };



export default function Profile() {

  const {        
    data,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey:['profile'],
    queryFn: GetProfile,
    select: (response) => response.data
  });

  const navigate = useNavigate()

  if (isPending) {
    return Loading();
  }

  if (isError) {
    return navigate("/login");
  }

  
  return (
    <main className="h-screen bg-[#060b14] text-white">

      {
        error ? 
          <Notification 
            message={error?.message}
            type="error" 
          />
          :
          ""
      }
      
      {/* Mobile */}
      <div className="block md:hidden">
        <Mobile user={data} />
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <Tablet user={data} />
      </div>

      {/* PC */}
      <div className="hidden lg:block h-screen">
        <PC user={data} />
      </div>
    </main>
  );
}