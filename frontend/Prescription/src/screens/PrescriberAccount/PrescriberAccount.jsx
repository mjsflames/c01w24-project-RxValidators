import React from "react";
import "./style.css";

export const PrescriberAccount = ({ changeScreen }) => {
  return (
    <div className="prescriber-account">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="header-model">
            <div className="overlap-group">
              <img className="image" alt="Image" src="/img/image-3.png" />

              <div className="about">
                <text className="PrescriberSide"
                  onClick={() => changeScreen('PrescriberSide')}
                  >
                  Home
                </text>
              </div>

              <div className="div">
                <text className="Green-Resources"
                  onClick={() => changeScreen('PrescriberGreen')}
                  >
                  Green Resources
                </text>
              </div>

              <div className="text-wrapper">
                <text className="Prescriber"
                  onClick={() => changeScreen('Prescriber')}
                  >
                  My Prescriptions
                </text>
              </div>
              
              <div className="text-wrapper-2">Account</div>
              <div className="div-wrapper">
                <div className="text-wrapper-3">Log PaRx</div>
              </div>
              <img className="line" alt="Line" src="/img/line-1.svg" />
              {/* <div className="details-sign-out-wrapper">
                <div className="details-sign-out">
                  Details
                  <br />
                  Sign Out
                </div>
              </div> */}
            </div>
          </div>
          <div className="rectangle" />
          <div className="content">
            <div className="text-wrapper-4">Home/ Account</div>
            <div className="group">
              <div className="group-2">
                <div className="text-wrapper-5">Your Account</div>
              </div>
            </div>
            <div className="name-last-name-wrapper">
              <p className="name-last-name">
                Name:
                <br />
                <br />
                Last Name:
                <br />
                <br />
                Prescriber Code:
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                For any help, please contact us through:
                <br />
                <br />
                Email:
                <br />
                Phone:
              </p>
            </div>
            <div className="overlap-group-wrapper">
              <div className="asdf-wrapper">
                <div className="asdf">Sign Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
