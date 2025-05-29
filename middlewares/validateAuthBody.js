export default function validateAuthBody(req, res, next) {
  if (req.body) {
    const { username, password } = req.body;
    if (username && password) {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "Both username and password required",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "No body found in request",
    });
  }
}
