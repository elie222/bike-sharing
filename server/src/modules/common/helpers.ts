// see here for an explanation of this:
// https://medium.com/articode/some-lesser-known-typescript-features-d067e29797d0
export function unreachable(x: never) {
  throw new Error(`This should be unreachable! but got ${x}`)
}

export const ONE_DAY_MINS = 24 * 60
export const ONE_DAY_MS = 24 * 60 * 60 * 1000
