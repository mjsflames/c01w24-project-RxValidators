import React from "react";
import "./style.css";

export const PrescriberGreen = ({ changeScreen }) => {
  return (
    <div className="prescriber-green">
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
              <div className="text-wrapper">
                <text className="Prescriber"
                  onClick={() => changeScreen('Prescriber')}
                  >
                  My Prescriptions
                </text>
              </div>
              <div className="div">Green Resources</div>
              <div className="text-wrapper-2">
                <text className="Account"
                  onClick={() => changeScreen('PrescriberAccount')}
                  >
                  Account
                </text>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-3">Log PaRx</div>
              </div>
              <img className="line" alt="Line" src="/img/line-1.svg" />
            </div>
          </div>
          <div className="rectangle" />
          <div className="content">
            <div className="text-wrapper-4">Home/ Green Resources</div>
            <div className="overlap-2">
              <div className="text-wrapper-5">nature photo</div>
              <div className="group">
                <div className="group-2">
                  <div className="text-wrapper-6">Green Resources</div>
                  <p className="p">
                    If you gave an address during sign up then it defaults to look at that address, else, you can enter
                    a new address.
                  </p>
                </div>
              </div>
            </div>
            <div className="rectangle-2" />
            <div className="text-wrapper-7">Please enter an address</div>
            <div className="overlap-3">
              <div className="text-wrapper-8">Map</div>
            </div>
            <div className="overlap-4">
              <div className="text-wrapper-9">List of Nearby Resources</div>
              <div className="element">
                1.
                <br />
                2.
                <br />
                3.
                <br />
                ..
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
