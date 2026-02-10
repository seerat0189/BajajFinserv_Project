const { fibonacci, prime, hcf, lcm } = require("../utils/math.utils");

const { askGemini } = require("../services/gemini.service");

const bfhlController = async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Request must contain exactly one key"
      });
    }

    const key = keys[0];
    const value = body[key];
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(value);
        if (!data) throw new Error("Invalid fibonacci input");
        break;

      case "prime":
        if (!Array.isArray(value))
          throw new Error("Prime input must be an array");
        data = value.filter(
          (n) => Number.isInteger(n) && prime(n)
        );
        break;

      case "lcm":
        if (!Array.isArray(value) || value.length === 0)
          throw new Error("LCM input must be a non-empty array");
        data = value.reduce((a, b) => lcm(a, b));
        break;

      case "hcf":
        if (!Array.isArray(value) || value.length === 0)
          throw new Error("HCF input must be a non-empty array");
        data = value.reduce((a, b) => hcf(a, b));
        break;

      case "AI":
        if (typeof value !== "string" || !value.trim())
          throw new Error("AI input must be a valid string");
        data = await askGemini(value);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          error: "Invalid request key"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: err.message
    });
  }
};

module.exports = { bfhlController };