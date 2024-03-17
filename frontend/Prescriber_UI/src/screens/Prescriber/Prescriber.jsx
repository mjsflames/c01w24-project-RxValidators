import React from "react";
import "./style.css";

export const Prescriber = ({ changeScreen }) => {
  return (
    <div className="prescriber">
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
              <div className="text-wrapper">My Prescriptions</div>
              <div className="div">
                <text className="Green-Resources"
                  onClick={() => changeScreen('PrescriberGreen')}
                  >
                  Green Resources
                </text>
              </div>
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
            <div className="text-wrapper-4">Home/ My Prescriptions</div>
            <div className="overlap-2">
              <div className="text-wrapper-5">nature photo</div>
              <div className="group">
                <div className="group-2">
                  <div className="text-wrapper-6">My Prescriptions</div>
                  <p className="p">Check the statuses of your prescribed prescriptions and log more.</p>
                </div>
              </div>
            </div>
            <div className="overlap-3">
              <div className="text-wrapper-7">Details</div>
              <div className="text-wrapper-8">Discovery Pass</div>
              <div className="text-wrapper-9">Initials</div>
              <div className="text-wrapper-10">Status</div>
              <div className="text-wrapper-11">Date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
