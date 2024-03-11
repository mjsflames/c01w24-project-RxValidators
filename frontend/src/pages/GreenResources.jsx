import React from "react";
import * as ReactDOM from "react-dom";
import ArcGISMap from "../components/GreenResources/ArcGISMap";
import PageHeader from "../components/PageHeader";
import ContentContainer from "../components/ContentContainer";

const GreenResources = () => {
  return (
    <>
      <PageHeader
        title="Green Resources"
        desc="To look at resources near you, please enter an address or a city to start your search, or allow this site to access your current location."
      />
      <ContentContainer>
        <div className="w-1/2 h-[50vh]">
          <ArcGISMap />
        </div>
      </ContentContainer>
    </>
  );
};

export default GreenResources;
