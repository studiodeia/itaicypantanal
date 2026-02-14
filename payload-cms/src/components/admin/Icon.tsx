import React from "react";

/**
 * Admin Icon — small favicon-sized brand mark used in the browser tab
 * and collapsed sidebar. Uses the Itaicy logo scaled down.
 */
export default function Icon() {
  return (
    <>
      <img
        className="logo-light"
        src="/images/logo-light.svg"
        alt="Itaicy"
        width={100}
        height={30}
        style={{ display: "block" }}
      />
      <img
        className="logo-dark"
        src="/images/logo.svg"
        alt="Itaicy"
        width={100}
        height={30}
        style={{ display: "none" }}
      />
    </>
  );
}
