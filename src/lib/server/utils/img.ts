import Jimp from 'jimp';

export async function resizeAndCompressImage(file: File, fileName: String): Promise<File> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = await Jimp.read(buffer);

    image.background(0xffffffff);

    const aspectRatio = image.bitmap.width / image.bitmap.height;

    let newWidth, newHeight;

    if (aspectRatio >= 1) {
        newWidth = 300;
        newHeight = 300 / aspectRatio;
    } else {
        newHeight = 300;
        newWidth = 300 * aspectRatio;
    }

    image.resize(newWidth, newHeight);
    image.quality(65);

    const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    return new File([outputBuffer], `${fileName}.jpeg`, { type: 'image/jpeg' });
}
