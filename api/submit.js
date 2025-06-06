export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const data = req.body;

    console.log("Received data:", data); // 🔍 Check what data you received

    const response = await fetch("YOUR_GOOGLE_SCRIPT_URL_HERE", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.text();
    console.log("Google Apps Script response:", result);

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Server error:", error); // 🔥 This will show in Vercel Logs
    res.status(500).json({ status: "error", message: error.message });
  }
}
