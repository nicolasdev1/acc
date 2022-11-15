export default {
  jwt: {
    secret: String(
      process.env.JWT_SECRET ||
        "065948d60e3bc51406e333d1c9be73188729dc719703ea858ee100d7cd84de60"
    ),
    expiresIn: String(process.env.JWT_EXPIRES_IN || "30d"),
  },
};
