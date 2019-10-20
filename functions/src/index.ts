import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const gcs = require('@google-cloud/storage')();

import { tmpdir } from 'os';
import { join, dirname, extname, basename } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

const getResizeDimensions = (bucketDir) => {
    if (bucketDir === 'images/recipes') {
        return [
            [64, 64],
            [128,128],
            [256, 256]
        ]
    }

    return null;
}

export const generateThumbs = functions.storage
  .object()
  .onFinalize(async object => {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const bucketDir = dirname(filePath);

    const workingDir = join(tmpdir(), 'thumbs');
    const tmpFilePath = join(workingDir, 'source.png');

   

    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
      console.log('exiting function');
      return false;
    }

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir);

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

        // 3. Resize the images and define an array of upload promises
        const sizes = getResizeDimensions(bucketDir);

        if (!sizes) {
    
    
            console.log('No sizes for this folder, exiting');
    
            return null;
        }
 
    const uploadPromises = sizes.map(async size => {
        const fileExt = extname(fileName);
        const fileNameName = basename(fileName, fileExt);

        const sizeWidth = size[0];
        const sizeHeight = size[1];

        const thumbName = `thumb@${fileNameName}_${sizeWidth}x${sizeHeight}${fileExt}`;
        const thumbPath = join(workingDir, thumbName);

      // Resize source image
      await sharp(tmpFilePath)
        .resize(size[0], size[1])
        .toFile(thumbPath);

      // Upload to GCS
      return bucket.upload(thumbPath, {
        destination: join(bucketDir, thumbName)
      });
    });

    // 4. Run the upload operations
    await Promise.all(uploadPromises);

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.unlinkSync(workingDir);
  });