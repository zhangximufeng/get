module.exports = cookie => {
  cookie = String(cookie)
    .replace(/\n/g, "")
    .trim();
  if (
    (cookie[0] === '"' && cookie[cookie.length - 1] === '"') ||
    (cookie[0] === "'" && cookie[cookie.length - 1] === "'")
  ) {
    cookie = cookie.slice(1, -1);
  }
  return cookie;
};
