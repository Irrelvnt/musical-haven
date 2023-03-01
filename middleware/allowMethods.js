export default function allowMethods(handler, methods) {
  return (req, res) => {
    if (!methods.includes(req.method)) {
      return res
        .status(405)
        .json({ message: `Method ${req.method} Not Allowed` });
    }
    return handler(req, res);
  };
}
