import type { APIRoute } from "astro";
import { pinata } from "../../utils/pinata";

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const file = data.get("file") as File;
	if (!file) {
		return new Response(
			JSON.stringify({
				message: "Missing file",
			}),
			{ status: 400 },
		);
	}
	const { cid } = await pinata.upload.file(file);
	const url = await pinata.gateways.createSignedURL({
		cid: cid,
		expires: 360,
	});
	return new Response(
		JSON.stringify({
			data: url,
		}),
		{ status: 200 },
	);
};
