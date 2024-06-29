"use client";

import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

export default function Loading() {
  return (
    <section className={`h-screen`}>
      <ClipLoader
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </section>
  );
}
