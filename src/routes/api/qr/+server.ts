import QRCode from 'qrcode';
import type { RequestHandler } from './$types';
import { desc } from 'drizzle-orm';
import { qrPoints } from '#lib/server/db/schema.ts';
import { db } from '#lib/server/db/index.ts';

const qrOptions = {
	width: 300,
	margin: 2,
	color: {
		dark: '#000000',
		light: '#ffffff'
	}
};

export const GET: RequestHandler = async ({ url }) => {
	const payload = url.searchParams.get('code') || crypto.randomUUID();

	try {
		const [qrDataUrl, points] = await Promise.all([
			QRCode.toDataURL(payload, qrOptions),
			db.select().from(qrPoints).orderBy(desc(qrPoints.createdAt)).limit(10)
		]);

		return Response.json({
			payload,
			qrDataUrl,
			points
		});
	} catch (err) {
		console.error(err);
		return Response.json({ error: 'Failed to generate QR code or fetch points' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const name = body.name?.trim();
		const code = body.code?.trim() || crypto.randomUUID();

		if (!name) {
			return Response.json({ error: 'Name is required' }, { status: 400 });
		}

		const [newPoint] = await db
			.insert(qrPoints)
			.values({
				name,
				code
			})
			.returning();

		const qrDataUrl = await QRCode.toDataURL(newPoint.code, qrOptions);

		const points = await db.select().from(qrPoints).orderBy(desc(qrPoints.createdAt)).limit(10);

		return Response.json({
			point: newPoint,
			payload: newPoint.code,
			qrDataUrl,
			points
		});
	} catch (err) {
		console.error(err);
		return Response.json({ error: 'Failed to save and generate QR code' }, { status: 500 });
	}
};
