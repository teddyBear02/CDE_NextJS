"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Button, Dropdown } from "react-bootstrap";

type Props = {
  label: string;
  children: ReactNode;
};

const CustomDropdown = ({ children, label }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <Button
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "black",
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {label}
        <i className="bi bi-caret-down-fill"></i>
      </Button>
      {showDropdown && (
        <Dropdown
          className="p-2"
          style={{
            position: "absolute",
            backgroundColor: "white",
            minWidth: "150px",
            borderRadius: "3px",
          }}
          show={showDropdown}
        >
          {children}
        </Dropdown>
      )}
    </div>
  );
};

export default CustomDropdown;
