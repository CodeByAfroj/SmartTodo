
import Todo from "./models/todoModels.js";
import { sendEmail } from "./nodemailer.js";
import { getAIMessage } from "./aiService.js";


const extractFirstNameFromEmail = (email) => {
  if (!email) return "User";

  const localPart = email.split("@")[0]; // take before @
  const firstPart = localPart.split(/[._]/)[0]; // take first word before dot/underscore

  return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
};


export const scheduleReminder = (todo) => {
  
  if (!todo.reminderDate) return;

   const firstName = extractFirstNameFromEmail(todo.email); 

  const reminderTime = new Date(todo.reminderDate);
  const diffMs = reminderTime - new Date();

 
  const sendReminder = async () => {
  try {
    const aiMessage = await getAIMessage(todo.data);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="20" cellspacing="0" border="0" 
                       style="background:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                  
                  <tr>
                    <td align="center">
                      <h1 style="color:#2C3E50; margin:0;">✅ Task Reminder</h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="color:#555555; font-size:16px; line-height:1.6;">
                      <p>Hello <b style="color:#2980B9;">${firstName|| "User"}</b>,</p>
                      <p>Here’s your reminder:</p>

                      <p style="background:#f4f4f4; padding:12px; border-left:4px solid #27AE60; border-radius:4px;">
                        <b style="color:#27AE60;">📌 ${todo.data}</b><br>
                        ${aiMessage}
                      </p>

                      <p><b style="color:#E74C3C;">Due:</b> ${new Date(todo.reminderDate).toLocaleString()}</p>
                    </td>
                  </tr>

                 

                  <tr>
                    <td align="center" style="color:#888; font-size:12px; padding-top:10px;">
                      <p>© 2025 Todo App — Stay productive 🚀</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>


    `;


 //emaill
    await sendEmail(todo.email,` "Todo Reminder"`, htmlContent);
    console.log(`🔔 Reminder sent for "${todo.data} to ${todo.email}"`);
  } catch (err) {
    console.error("❌ Failed to send reminder:", err);
  }
};


  if (diffMs <= 0) {
    // Missed reminder → fire immediately
    sendReminder();
  } else {
    // Schedule future reminder
    setTimeout(sendReminder, diffMs);
    console.log(`✅ Scheduled reminder for "${todo.data}" at ${reminderTime}`);
  }
};

export const loadAllReminders = async () => {
  try {
    const todosWithReminders = await Todo.find({ reminderDate: { $gte: new Date() } });
    todosWithReminders.forEach(scheduleReminder);
    console.log(`📅 Reloaded ${todosWithReminders.length} reminders from DB`);
  } catch (err) {
    console.error("❌ Error loading reminders:", err);
  }
};
