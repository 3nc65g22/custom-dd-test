import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const DropdownList = ({ dataList, selected, setSelected, handleOnClose }) => {
  const [list, setList] = useState([...dataList]);
  const searchInputRef = useRef();
  const listContainerRef = useRef();
  const listItemRef = useRef();

  useEffect(() => {
    listItemRef?.current && listItemRef.current.focus();
  }, []);

  useEffect(() => {
    if (!selected) {
      searchInputRef.current.focus();
    }
  }, []);

  const hangleOnSearch = ({ target }) => {
    const { value } = target;
    if (value) {
      const newList = [...dataList].filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      setList(newList);
    } else {
      setList(dataList);
    }
  };

  const handleOnSelect = (item) => {
    setSelected(item);
    handleOnClose();
  };

  return (
    <>
      <div
        className="dd-list"
        onBlur={({ currentTarget, relatedTarget }) => {
          if (!currentTarget.contains(relatedTarget)) {
            handleOnClose();
          }
        }}
      >
        <input
          className="dd-search"
          ref={searchInputRef}
          type="search"
          onChange={hangleOnSearch}
          placeholder="Type search here"
        ></input>
        {list.length > 0 ? (
          <div
            className="dd-list-item-wrapper"
            ref={listContainerRef}
            onKeyDown={(e) => {
              e.preventDefault();

              const active = document.activeElement;

              if (e.keyCode === 40 && active.nextSibling) {
                active.nextSibling.focus();
              }

              if (e.keyCode === 38 && active.previousSibling) {
                active.previousSibling.focus();
              }

              if (e.keyCode === 13) {
                const index = [...listContainerRef.current.children].indexOf(
                  active
                );
                setSelected(active.innerHTML);
                handleOnClose();
              }
            }}
          >
            {list.map((item, index) => {
              const classes = clsx({
                "dd-list-item": true,
                selected: selected == item,
              });

              return (
                <a
                  ref={selected == item ? listItemRef : null}
                  href=""
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    e.target.focus();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOnSelect(item);
                  }}
                  key={index}
                  className={classes}
                >
                  {item}
                </a>
              );
            })}
          </div>
        ) : (
          <div className="no-option">No options</div>
        )}
      </div>
    </>
  );
};

export default DropdownList;
