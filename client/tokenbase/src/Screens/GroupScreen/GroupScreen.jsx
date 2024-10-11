import { useContext, useEffect, useState } from "react";
import GSidebar from "./GSidebar";
import DesignFinder from "../../api/DesignFinder";
import { Route, Routes, useParams } from "react-router-dom";
import { DesignContext } from "../../context/DesignContext";
import GPage from "./GPage";
import GroupDetail from "./GroupDetail";

const GroupScreen = () => {
  const { groups, setGroup } = useContext(DesignContext);
  const [user, setUser] = useState("");

  const { design_id } = useParams();
  //console.log(design_id)

  useEffect(() => {
    const fetchData = async () => {
      const response = await DesignFinder.get(`/getdesign/${design_id}`);
      setGroup(response.data.data.group);
      setUser(response.data.data.user.design_title);
    };

    fetchData();
  });
  return (
    <div className="bg-white flex ">
      <div className="sidebar">
        <GSidebar group={groups} designId={design_id} />
      </div>
      <div className="homepage flex-1">
        <Routes>
          <Route path="/" element={<GPage user={user} id={design_id} />} />
          <Route path="/group/:design_id/:id" element={<GroupDetail user={user} id={design_id} /> } />
        </Routes>
      </div>
    </div>
  );
};

export default GroupScreen;
