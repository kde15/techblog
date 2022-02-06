import { useEffect, useLayoutEffect } from "react";

const myLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

export default myLayoutEffect;
