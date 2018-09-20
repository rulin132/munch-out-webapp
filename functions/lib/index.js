"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const gcs = require('@google-cloud/storage')();
const os_1 = require("os");
const path_1 = require("path");
const sharp = require("sharp");
const fs = require("fs-extra");
const getResizeDimensions = (bucketDir) => {
    if (bucketDir === 'images/recipes') {
        return [
            [64, 64],
            [128, 128],
            [256, 256]
        ];
    }
    return null;
};
exports.generateThumbs = functions.storage
    .object()
    .onFinalize((object) => __awaiter(this, void 0, void 0, function* () {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const bucketDir = path_1.dirname(filePath);
    const workingDir = path_1.join(os_1.tmpdir(), 'thumbs');
    const tmpFilePath = path_1.join(workingDir, 'source.png');
    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        console.log('exiting function');
        return false;
    }
    // 1. Ensure thumbnail dir exists
    yield fs.ensureDir(workingDir);
    // 2. Download Source File
    yield bucket.file(filePath).download({
        destination: tmpFilePath
    });
    // 3. Resize the images and define an array of upload promises
    const sizes = getResizeDimensions(bucketDir);
    if (!sizes) {
        console.log('No sizes for this folder, exiting');
        return null;
    }
    const uploadPromises = sizes.map((size) => __awaiter(this, void 0, void 0, function* () {
        const fileExt = path_1.extname(fileName);
        const fileNameName = path_1.basename(fileName, fileExt);
        const sizeWidth = size[0];
        const sizeHeight = size[1];
        const thumbName = `thumb@${fileNameName}_${sizeWidth}x${sizeHeight}${fileExt}`;
        const thumbPath = path_1.join(workingDir, thumbName);
        // Resize source image
        yield sharp(tmpFilePath)
            .resize(size[0], size[1])
            .toFile(thumbPath);
        // Upload to GCS
        return bucket.upload(thumbPath, {
            destination: path_1.join(bucketDir, thumbName)
        });
    }));
    // 4. Run the upload operations
    yield Promise.all(uploadPromises);
    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.unlinkSync(workingDir);
}));
//# sourceMappingURL=index.js.map