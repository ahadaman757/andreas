import logo from "../../assets/logos/Vector4.svg";
import "./styles.css";

const Footer = () => {
  return (
    <div className="footer_main">
      <div className="footer_divider">
        <div className="footer_outer">
          <div className="footer_inner_container">
            <img className="footerlogo" src={logo} />
            <h1>ChatReply</h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices
            nunc lobortis libero egestas lacus aliquet.
          </p>
        </div>
        <div className="links_home">
          <h1>Home</h1>
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a href="#Pricing">Pricing</a>
            </li>
            <li>
              <a>Contact Us </a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
          </ul>
        </div>
        <div className="links_privicy">
          <h1>Privicy</h1>
          <ul>
            <li>
              <a>Terms</a>
            </li>
            <li>
              <a>Notification</a>
            </li>
            <li>
              <a>Conditions</a>
            </li>
          </ul>
        </div>
      </div>
      <p>Copyright,2022@jataq all right reserved</p>
    </div>
  );
};
export default Footer;
