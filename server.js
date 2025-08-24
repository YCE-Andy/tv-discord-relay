// quick health check
app.get("/", (req, res) => res.status(200).send("OK"));

// browser-friendly ping
app.get("/ping", async (req, res) => {
  try {
    const secret = req.query.secret || req.query.t;
    if (secret !== SECRET) return res.status(403).send("Forbidden");
    const msg = req.query.msg || "Ping";
    await axios.post(DISCORD_WEBHOOK_URL, { content: `🔔 Ping: ${msg}` });
    res.status(200).send("sent");
  } catch (e) {
    console.error(e);
    res.status(500).send("error");
  }
});
