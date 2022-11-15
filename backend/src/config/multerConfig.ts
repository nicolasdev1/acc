import multer from "multer";

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.FILE_SIZE_LIMIT || 5 * 1024 * 1024),
  },
});

export { Multer };
