import Jimp from 'jimp';

export async function resizeAndCompressImage(file: File, fileName: String): Promise<File> {
	const buffer = Buffer.from(await file.arrayBuffer());
	const image = await Jimp.read(buffer);
	image.resize(300, Jimp.AUTO).quality(65);
	const { width, height } = image.bitmap;

	const x = width > 300 ? (width - 300) / 2 : 0;
	const y = height > 300 ? (height - 300) / 2 : 0;
	image.crop(x, y, 300, 300);

	const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
	return new File([outputBuffer], `${fileName}.jpeg`, { type: 'image/jpeg' });
}
