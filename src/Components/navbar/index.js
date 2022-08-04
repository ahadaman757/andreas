import React from "react";
import logo from "../../assets/logos/Vector.png";
import Button from "@material-ui/core/Button";
import Wrapper from "../wapper";
import "./styles.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper bgInvisible>
      <div className="root">
        <div className="contre">
          <div className="logcon">
            <img className="logo" src={logo} />
            <h1 className="logconh1">ChatReply</h1>
          </div>
          <div className="sm_menu">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <IconButton> menu</IconButton>
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Home</MenuItem>
              <MenuItem onClick={handleClose}>Pricing</MenuItem>
              <MenuItem onClick={handleClose}>About Us</MenuItem>
              <MenuItem onClick={handleClose}>contact Us</MenuItem>
              <MenuItem onClick={handleClose}>FAQ's</MenuItem>
              <MenuItem onClick={handleClose}>Log in</MenuItem>
              <MenuItem onClick={handleClose}>sign up</MenuItem>
            </Menu>
          </div>
          <div className="pages">
            <ul className="pagcon">
              <li>
                <a className="pagcona">Home</a>
              </li>
              <li>
                <a className="pagcona">Pricing</a>
              </li>
              <li>
                <a className="pagcona">About Us</a>
              </li>
              <li>
                <a className="pagcona">contact Us</a>
              </li>
              <li>
                <a className="pagcona">FAQ's</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sincon">
          <a className="sincona">Log in</a>
          <Button className="sinconbtn">sign up</Button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
