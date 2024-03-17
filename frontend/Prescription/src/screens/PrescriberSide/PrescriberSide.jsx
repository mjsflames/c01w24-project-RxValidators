import React from "react";
import "./style.css";

export const PrescriberSide = ({ changeScreen }) => {
  return (
    <div className="prescriber-side">
      <div className="div">
        <div className="header-model">
          <div className="overlap-group">
            <img className="image" alt="Image" src="../../static/img/image-3.png" />
            
            <div className="text-wrapper">
              <text className="Account"
                onClick={() => changeScreen('PrescriberAccount')}
                >
                Account
              </text>
            </div>

            <div className="about">
              <text className="text-wrapper-1"
                onClick={() => changeScreen('Prescriber')}
                >
                My Prescriptions
              </text>
            </div>

            <div className="text-wrapper-3">
              <text className="Account"
                onClick={() => changeScreen('PrescriberGreen')}
                >
                Green Resources
              </text>
            </div>

            <div className="text-wrapper-2">Home</div>

            <div className="overlap">
              <div className="text-wrapper-4">Log PaRx</div>
            </div>
            <img className="line" alt="Line" src="/img/line-1.svg" />
          </div>
        </div>
        <div className="content">
          <div className="overlap-2">
            <div className="group">
              <div className="overlap-group-2">
                <div className="div-wrapper">
                  <div className="text-wrapper-5">Welcome Doctor PaRx!</div>
                </div>
                <div className="text-wrapper-6">CODE HERE</div>
                <div className="group-2">
                  <p className="text-wrapper-5">Your Unique Prescriber Code is:</p>
                </div>
              </div>
            </div>
            <div className="group-3">
              <div className="text-wrapper-5">Logging a Patient Prescription?</div>
              <div className="overlap-group-wrapper">
                <div className="asdf-wrapper">
                  <div className="asdf">Log it Here</div>
                </div>
              </div>
              <p className="p">Log a prescription for a patient ....</p>
            </div>
          </div>
          <div className="overlap-3">
            <div className="text-wrapper-7">Home/</div>
          </div>
          <div className="overlap-4">
            <div className="text-wrapper-8">Your Unique Prescription PDF</div>
          </div>
          <div className="overlap-5">
            <div className="text-wrapper-9">Access Your Prescriptions</div>
          </div>
        </div>
      </div>
    </div>
  );
};
