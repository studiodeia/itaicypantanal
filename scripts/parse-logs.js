const d = JSON.parse(require("fs").readFileSync("/tmp/vercel-logs.json", "utf-8"));
const logs = d.filter(e => e.type !== "command");
logs.slice(-30).forEach(e => {
  console.log("[" + e.type + "] " + (e.text || "").slice(0, 300));
});
if (logs.length === 0) console.log("No non-command logs. Total:", d.length);
