import React, { useState } from "react";
import DropdownSearch from "components/DropdownSearch";
import languagesData from "data/language";
import countriesData from "data/country";

export default () => {
  const [output, setOutput] = useState({ language: "", country: "" });

  const handleChange = (e) => {
    setOutput({ ...output, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          margin: "30px",
          textAlign: "center",
        }}
      >
        <div>
          Selected Language : <b>{output.language}</b>
        </div>
        <div>
          Selected Country : <b>{output.country}</b>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DropdownSearch
          label="Language"
          placeholder="- Select -"
          onChange={handleChange}
          name="language"
          list={languagesData}
        />
        <DropdownSearch
          onChange={handleChange}
          label="Country"
          placeholder="- Select -"
          name="country"
          list={countriesData}
          isArrayObj={true}
          dataLabel={"name"}
        />
      </div>
    </>
  );
};
