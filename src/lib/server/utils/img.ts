import Jimp from 'jimp';

export async function resizeAndCompressImage(file: File, fileName: String): Promise<File> {
	const buffer = Buffer.from(await file.arrayBuffer());
	const image = await Jimp.read(buffer);
	image.resize(500, Jimp.AUTO).quality(75);
	const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
	return new File([outputBuffer], `${fileName}.jpeg`, { type: 'image/jpeg' });
}
