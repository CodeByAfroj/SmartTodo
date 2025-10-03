import axios from "axios"
export const getAIMessage = async (todoText) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `The user wrote a todo: "${todoText}".
Your job is to create a short, friendly reminder that feels urgent and personal, like a close friend helping them avoid forgetting something important.

Always highlight one must-do item or action that they’re most likely to forget.

Add 2–3 related helpful suggestions.

Use a casual, engaging tone with small touches of humor or emojis.

Keep it under 20 words.

If unsure of the todo type, give a generic but witty helpful reminder.

Examples:

Grocery → "Milk’s a must! Also grab bread, eggs, and your favorite snack "

Study → "Focus on chapters 3 & 4 — test loves them! Review that tricky formula 📚"

Gym → "Water bottle, towel, and hype playlist — crush it tod`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI error:", err.message);
    return "";
  }
};
