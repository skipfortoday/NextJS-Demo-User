import React from "react";
import Image from "next/image";
import Card from "@material-ui/core/Card";
import UnderC from "../../public/UnderC.svg";

export default function UnderConstruct() {
  return (
    <>
      <Card>
        <Image src={UnderC} alt="Server On" layout="fill" />
      </Card>
    </>
  );
}
