import * as functions from 'firebase-functions';
import request = require('request-promise');
const _ = require('lodash');

const gcs = require('@google-cloud/storage');

import { tmpdir } from 'os';
import { join, dirname, extname, basename } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';


const getResizeDimensions = (bucketDir: string) => {
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
   

    if (typeof filePath === 'undefined') {
      return;
    }

    const fileName = filePath.split('/').pop();

    if (typeof fileName === 'undefined') {
      return;
    }
    const bucketDir = dirname(filePath);

    const workingDir = join(tmpdir(), 'thumbs');
    const tmpFilePath = join(workingDir, 'source.png');

    if (typeof object === 'undefined') {
      return;
    }
    if (typeof object.contentType === 'undefined') {
      return;
    }  
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
    fs.removeSync(workingDir);
    return true
  });

exports.indexRecipesToElastic = functions.firestore.document('/recipes/{recipe_id}')
  .onWrite((change, context) => {
    const postData = change.after.data();
    const recipe_id = context.params.recipe_id; 

    console.log('Indexing post:', postData);

    const elasticSearchConfig = functions.config().elasticsearch;
    const elasticSearchUrl = elasticSearchConfig.url + 'recipes/_create/' + recipe_id;
    const elasticSearchMethod = postData ? 'POST' : 'DELETE';
    const elasticsearchFields = ['recipeName','notes'];

    const elasticSearchRequest = {
      method: elasticSearchMethod,
      url: elasticSearchUrl,
      auth: {
        username: elasticSearchConfig.username,
        password: elasticSearchConfig.password
      },
      body: _.pick(postData, elasticsearchFields),
      json: true
    };

    return request(elasticSearchRequest).then((response: any) => {
      console.log('ElasticSearch response', response);
  })
});

const express = require('express');
const app = express();
const cors = require('cors');
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/search/:query', (req: { params: { query: any; }; }, res: { send: (arg0: any) => void; }) => {
  const query = req.params.query;
  const elasticSearchConfig = functions.config().elasticsearch;
  const elasticSearchUrl = elasticSearchConfig.url + 'recipes/_search?q=*'+ query+'*';
  console.log('querying elasticsearch:', elasticSearchUrl);
  const elasticSearchRequest = {
    method: 'GET',
    url: elasticSearchUrl,
    auth: {
      username: elasticSearchConfig.username,
      password: elasticSearchConfig.password
    },
    json: true
  };

  return request(elasticSearchRequest).then((response: any) => {
    res.send(response);
})
});

exports.searchRecipes = functions.https.onRequest(app);