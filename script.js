function assessRisk(){
  const name = document.getElementById("name").value.trim() || "Unnamed AI System";

  const values = {
    Privacy: Number(document.getElementById("privacy").value),
    Security: Number(document.getElementById("security").value),
    Bias: Number(document.getElementById("bias").value),
    Reliability: Number(document.getElementById("reliability").value)
  };

  const total = Object.values(values).reduce((a,b) => a + b, 0);
  const percentage = Math.round((total / 8) * 100);

  let level = "LOW";
  if (percentage >= 67) level = "HIGH";
  else if (percentage >= 34) level = "MEDIUM";

  const actions = [];

  if (values.Privacy >= 1)
    actions.push("Minimize sensitive data collection and apply appropriate access controls.");

  if (values.Security >= 1)
    actions.push("Use strong authentication, authorization, logging and security testing.");

  if (values.Bias >= 1)
    actions.push("Test representative datasets and monitor outcomes for unfair patterns.");

  if (values.Reliability >= 1)
    actions.push("Add validation, human review, monitoring and a safe fallback process.");

  if (actions.length === 0)
    actions.push("Continue periodic monitoring and reassess risks when the system changes.");

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("score").textContent = percentage + "/100";

  document.getElementById("level").textContent =
    level + " RISK — " + name;

  document.getElementById("details").innerHTML =
    Object.entries(values)
      .map(([key, value]) =>
        `<div class="detail"><strong>${key}:</strong> ${
          value === 2 ? "High" : value === 1 ? "Medium" : "Low"
        }</div>`
      )
      .join("");

  document.getElementById("recommendations").innerHTML =
    actions.map(action => `<li>${action}</li>`).join("");

  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });
}
