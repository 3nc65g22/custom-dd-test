import React, { useState, useEffect } from "react";
import DropdownList from "./DropdownList";
import PropTypes from "prop-types";
import "assets/scss/style.scss";

const Dropdown = ({
  list,
  placeholder = "",
  label,
  onChange,
  name,
  isArrayObj,
  dataLabel,
}) => {
  const [showDropdownList, setShowDropdownList] = useState(false);
  const [selected, setSelected] = useState();
  const [dataList, setDataList] = useState([...list]);

  const handleToggle = () => {
    setShowDropdownList((state) => !state);
  };

  useEffect(() => {
    selected &&
      typeof onChange == "function" &&
      onChange({ target: { value: selected, name } });
  }, [selected]);

  useEffect(() => {
    isArrayObj && dataLabel && normalizedArray();
  }, []);

  const normalizedArray = () => {
    const newArrList = list.map((item) => item[dataLabel]);
    setDataList(newArrList);
  };

  return (
    <div className="dd-main-container">
      <span>{label}</span>
      <div
        className="dd-wrapper"
        style={{ borderRadius: showDropdownList ? "5px 5px 0px 0px" : "" }}
      >
        <div className="dd-header">
          <div
            onClick={handleToggle}
            className={"dd-header-title"}
            style={{ color: !!selected ? "unset" : "#757575" }}
          >
            {selected ? selected : placeholder}
          </div>
          <i
            onClick={handleToggle}
            className="fa fa-caret-down"
            aria-hidden="true"
            style={{ paddingRight: "10px" }}
          ></i>
        </div>
        {showDropdownList && (
          <DropdownList
            dataList={dataList}
            selected={selected}
            setSelected={setSelected}
            handleOnClose={() => setShowDropdownList(false)}
          />
        )}
      </div>
    </div>
  );
};

const { string, array, func } = PropTypes;

Dropdown.propTypes = {
  list: array.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string,
  onChange: func,
  isArrayObj: (props, propName, componentName) => {
    if (props["dataLabel"] && typeof props[propName] != "boolean") {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed."
      );
    }
  },
  dataLabel: (props, propName, componentName) => {
    if (props["isArrayObj"] && typeof props[propName] != "string") {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed."
      );
    }
  },
};

Dropdown.defaultProps = {
  placeholder: "",
};

export default Dropdown;
