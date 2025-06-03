export default function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = error.message || 'Unexpected serverside error';

  res.status(status).json({
    success: false,
    message,
  });
}
