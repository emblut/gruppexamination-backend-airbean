export default function authoriseUser(_req, _res, next) {
  if (global.user) {
    next();
  } else {
    next({
      status: 401,
      message: "You need to log in to use this feature",
    });
  }
}
