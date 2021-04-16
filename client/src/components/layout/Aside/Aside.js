import React, { Fragment, useContext } from 'react';
// import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { Link, useHistory } from "react-router-dom";

import { FaTachometerAlt, FaGem, FaSignOutAlt } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.png';
import UserContext from "../../../context/UserContext";

const Aside = ({ collapsed, toggled, handleToggleSidebar }) => {
  const { setUserData } = useContext(UserContext);
  const history = useHistory(); //history is all events that had happened in the url bar
  const logout = () => {
    setUserData({
      token:undefined,
      user:undefined
    });
    localStorage.setItem("auth-token","");
    history.push("/login");
  }

  // const intl = useIntl();
  return (
    <Fragment>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Main Menu
        </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">

            <MenuItem

              icon={<FaTachometerAlt />}
              // suffix={<span className="badge red">Dashboard</span>}
            >
              <Link className="nav-link" to={`/`}>
                Dashboard
              </Link>
            </MenuItem>


            <MenuItem
              icon={<FaGem />}>
              <Link className="nav-link" to={`/settings`}>
                API Setting
              </Link>
            </MenuItem>


          </Menu>

        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a href="#" className="sidebar-btn" rel="noopener noreferrer" onClick={logout} >
              <FaSignOutAlt />
              <span> Logout</span>
            </a>
          </div>
          
        </SidebarFooter>
      </ProSidebar>
    </Fragment>
  );
};

export default Aside;