"use client";

import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

export default function Spinner({ loading }: { loading: boolean }) {
  return (
    <ClipLoader
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}
