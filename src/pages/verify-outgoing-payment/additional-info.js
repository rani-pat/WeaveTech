import React from "react";
import { Tooltip } from "devextreme-react";
import { Button } from "devextreme-react";

const AdditionalInformation = ({
  productionData,
  isExpanded,
  handleToggleExpand,
}) => {
  return (
    <div className="content-block dx-card responsive-paddings">
      <div className="expandable-text" onClick={handleToggleExpand}>
        Additional Information, take a look
        {isExpanded ? (
          <Button icon="chevronup" />
        ) : (
          <Button icon="chevrondown" />
        )}
      </div>
      {isExpanded && (
        <>
          <div className="additional-information-text">
            <div className="additional-text1">
              <div className="add-head-text">Product Description</div>
              <div className="add-sub-text text-overflow" id="product1">
                {productionData.productName}
              </div>
              <Tooltip
                target="#product1"
                showEvent="mouseenter"
                hideEvent="mouseleave"
                hideOnOutsideClick={false}
              >
                <div> {productionData.productName}</div>
              </Tooltip>
            </div>
            <div className="additional-text1">
              <div className="add-head-text">Type</div>
              <div className="add-sub-text">{productionData.type}</div>
            </div>
            <div className="additional-text1">
              <div className="add-head-text">UOM</div>
              <div className="add-sub-text">{productionData.headerUoM}</div>
            </div>
            <div className="additional-text1">
              <div className="add-head-text">Start Date</div>
              <div className="add-sub-text">
                {new Date(productionData.startDate).toLocaleDateString()}
              </div>
            </div>
            <div className="additional-text1">
              <div className="add-head-text">Due Date</div>
              <div className="add-sub-text">
                {new Date(productionData.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div className="additional-text1">
              <div className="add-head-text">Order Date</div>
              <div className="add-sub-text">
                {new Date(productionData.postingDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdditionalInformation;
