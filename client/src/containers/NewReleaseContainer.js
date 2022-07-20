import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_RELEASE, GET_RELEASES } from "../graphql/queries";
import Header from "../components/Header";
import ReleaseForm from "../components/Release/Form";

// update and renderButton as props
export default function NewReleaseContainer() {
  const [release, setRelease] = useState({});

  return (
    <div>
      <Header />
      <div className="release_container">
        <ReleaseForm></ReleaseForm>
      </div>
    </div>
  );
}
