import firebaseAdmin from "firebase-admin";

import serviceAccount from "./firebase-key.json";

const BUCKET = "gs://animal-care-center-c9dbb.appspot.com";

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadArray = async (req: any, _: any, next: any) => {
  try {
    if (!req.files) {
      return next();
    }

    const { files } = req;

    const promises = [];

    for await (const file of files) {
      const { originalname, buffer } = file;

      const name = Date.now() + originalname.replace(/ /g, "_");

      const blob = bucket.file("pets/" + name);

      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on("error", (error: any) => {
        next(error);
        console.log(error);
      });

      const filePromise = new Promise((resolve, _) => {
        blobStream.on("finish", async () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          blob.makePublic().then(() => {
            resolve(publicUrl);
          });
        });
      });

      promises.push(filePromise);
      blobStream.end(buffer);
    }

    Promise.all(promises).then((publicUrls) => {
      req.body.images = publicUrls;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadSingle = async (req: any, _: any, next: any) => {
  try {
    if (!req.file) {
      return next();
    }

    const { originalname, buffer } = req.file;

    const name = Date.now() + originalname.replace(/ /g, "_");

    const blob = bucket.file("users/" + name);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (error: any) => {
      next(error);
      console.log(error);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      blob.makePublic().then(() => {
        req.body.avatar = publicUrl;
        next();
      });
    });

    blobStream.end(buffer);
  } catch (error) {
    console.log(error);
  }
};

export { uploadArray, uploadSingle };
