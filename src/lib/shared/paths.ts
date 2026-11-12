/** Tam eşleşen yollar */
export const OPEN_ABSOLUTE_PATHS = ['/', '/sign-in', '/sign-up'];

/** Bu önekle başlayarak eşleşen yollar */
export const OPEN_PREFIX_PATHS = ['/sign-in/', '/sign-up/'];

export const isOpenPath = (path: string) =>
	OPEN_ABSOLUTE_PATHS.includes(path) || OPEN_PREFIX_PATHS.some((prefix) => path.startsWith(prefix));
