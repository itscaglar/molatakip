import QRCode from 'qrcode';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const randomPayload = crypto.randomUUID();

	try {
		const qrDataUrl = await QRCode.toDataURL(randomPayload, {
			width: 300,
			margin: 2,
			color: {
				dark: '#000000',
				light: '#ffffff'
			}
		});

		return Response.json({
			payload: randomPayload,
			qrDataUrl
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return Response.json({ error: 'Failed to generate QR code' }, { status: 500 });
	}
};
