app.post("/tv", async (req, res) => {
  try {
    // accept secret via header, body, or URL query
    const headerSecret = req.headers["x-secret"];
    const bodySecret   = req.body && req.body.secret;
    const querySecret  = req.query && req.query.t;

    const passed = (headerSecret === SECRET) || (bodySecret === SECRET) || (querySecret === SECRET);
    if (!passed) {
      return res.status(403).send("Forbidden");
    }

    const alert = req.body || {};
    await axios.post(DISCORD_WEBHOOK_URL, {
      content:
        "📈 **TradingView Alert**\n" +
        "```json\n" + JSON.stringify(alert, null, 2) + "\n```"
    });

    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});
