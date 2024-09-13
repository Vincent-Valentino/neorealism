// Tampilan Modify, Delete 
// Input, Delete, Modify belum dites
// Tampilan dan fungsi User, Message
// Database User

import React from "react";
import Tabs from "../utilities/tabs.jsx";
import AdminDatabase from "../components/admin-database.jsx";
import User from "../components/admin-user.jsx";
import Cloud from "../components/admin-cloud.jsx";

function Admin(){
  const AdminMenu = ["Database","User","Message","Mega"];
  const RenderMenu = [<AdminDatabase/>,<User />,<></>,<Cloud />];
  
  return(
    <div className="w-full min-h-screen bg-stone-900 pb-10">
      <h1 className="py-8 text-4xl text-stone-100 text-center">Admin Page</h1>
      <div className="w-10/12 mx-auto my-5">
        <Tabs tabs={AdminMenu} content={RenderMenu}/>
      </div>
    </div>
  );
}

export default Admin;