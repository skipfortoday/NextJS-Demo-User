export default async function handler(req, res) {
  res.status(404).json({
    success: false,
    message: "Anda Kehilangan Arah",
    data: false,
  });
}
