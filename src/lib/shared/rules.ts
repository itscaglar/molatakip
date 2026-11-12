import type { breakType } from '#lib/server/db/schema.ts';

export type BreakType = (typeof breakType.enumValues)[number];
