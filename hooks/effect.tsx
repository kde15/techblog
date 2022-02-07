import { useEffect, useLayoutEffect } from "react";
import { isBrowser } from "~/lib/utils";

const myLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;

export default myLayoutEffect;
