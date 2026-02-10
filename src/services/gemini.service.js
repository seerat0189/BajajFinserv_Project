const axios = require("axios");

exports.askGemini = async (question) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `Answer the following question in ONE WORD only.\n${question}`
            }
          ]
        }
      ]
    }
  );

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text.trim();
};
