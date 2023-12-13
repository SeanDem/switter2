import Jimp from 'jimp';

async function resizeAndCompressImage(inputPath: string, outputPath: string): Promise<void> {
	const image = await Jimp.read(inputPath);
	await image.resize(500, Jimp.AUTO);
	await image.quality(80);
	await image.writeAsync(outputPath);
}

// Usage example
resizeAndCompressImage('path/to/input/image.jpg', 'path/to/output/resized-image.jpg');
