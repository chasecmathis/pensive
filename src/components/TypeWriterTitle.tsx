"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = { strings: Array<string> };

export default function TypeWriterTitle(props: Props) {
  return (
    <Typewriter
      options={{
        strings: props.strings,
        autoStart: true,
        loop: true,
      }}
    />
  );
}
