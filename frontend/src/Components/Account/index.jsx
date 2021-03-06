import React from "react";
import Styles from "./styles.module.css";
import { Link, Switch, Route } from "react-router-dom";
import MyAddresses from "./MyAddresses";
import MyOrders from "./MyOrders";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/auth/actions";
import { useHistory } from "react-router-dom";

const OrdersPage = () => {
  const { phoneNumber } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className={Styles.root}>
        <div className={Styles.leftTabs}>
          <div className={Styles.accountLogo}>
            <img
              src="https://grofers.com/images/header/user-profile-667209e.png"
              alt="accountLogo"
            />
            <div>
              <small>+91 {phoneNumber}</small>
            </div>
          </div>
          <div className={Styles.tabs}>
            <Link to="/account/addresses" className={Styles.link}>
              <div className={Styles.tabPanel}>
                <i className="fal fa-map-marked-alt"></i> My Addresses
              </div>
            </Link>
            <Link to="/account/orders" className={Styles.link}>
              <div className={Styles.tabPanel}>
                <i className="fal fa-business-time"></i> My Orders
              </div>
            </Link>
            <div className={Styles.tabPanel}>
              <i
                className="fal fa-rupee-sign"
                style={{
                  border: "1px solid grey",
                  padding: "2px 5px",
                  borderRadius: "50%",
                }}
              ></i>{" "}
              My Wallet
            </div>
            <div
              className={Styles.tabPanel}
              onClick={() => `${(dispatch(logout()), history.push("/"))}}`}
            >
              {" "}
              <i className="fal fa-user"></i> Logout
            </div>
          </div>
        </div>

        <Switch>
          <Route path="/account/addresses" component={MyAddresses} />
          <Route path="/account/orders" component={MyOrders} />
        </Switch>
      </div>
    </>
  );
};

export default OrdersPage;
