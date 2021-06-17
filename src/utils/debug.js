import * as R from "ramda";

export const debug = (message) => R.tap((x) => console.log(message, x));
