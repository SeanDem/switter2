import sharp from 'sharp';

export async function resizeAndCompressImage(file: ArrayBuffer, fileName: String): Promise<File> {
	const buffer = await sharp(file).resize(500).jpeg({ quality: 75 }).toBuffer();
	return new File([buffer], `${fileName}.jpeg`, { type: 'image/jpeg' });
}
