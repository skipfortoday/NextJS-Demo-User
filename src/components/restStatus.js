import React from "react";
import Image from "next/image";
import Card from "@material-ui/core/Card";
import rocketUp from "../../public/RocketUp.svg";

export default function RestStatus() {
  return (
    <>
      <Card>
        <Image src={rocketUp} alt="Server On" layout="fill" />
      </Card>
    </>
  );
}
