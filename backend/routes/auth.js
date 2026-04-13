// TEMPORARY — test email route
// DELETE THIS after testing
router.get("/test-email", async (req, res) => {
  const { sendLeadNotification } = require("../utils/emailService");

  const testLead = {
    name: "Test User",
    email: "test@example.com",
    phone: "9876543210",
    companyName: "Test Company",
    state: "Delhi",
    solution: "IVR",
    preferredDate: new Date(),
    preferredTime: "10:00 AM",
  };

  const result = await sendLeadNotification(testLead);

  res.json({
    success: result,
    message: result
      ? "✅ Email sent! Check your inbox."
      : "❌ Email failed. Check Render logs for details.",
  });
});