
// import Todo from "./models/todoModels.js";
// import { sendEmail } from "./nodemailer.js";
// import { getAIMessage } from "./aiService.js";


// const extractFirstNameFromEmail = (email) => {
//   if (!email) return "User";

//   const localPart = email.split("@")[0]; // take before @
//   const firstPart = localPart.split(/[._]/)[0]; // take first word before dot/underscore

//   return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
// };


// export const scheduleReminder = (todo) => {
  
//   if (!todo.reminderDate) return;

//    const firstName = extractFirstNameFromEmail(todo.email); 

//   const reminderTime = new Date(todo.reminderDate);
//   const diffMs = reminderTime - new Date();

 
//   const sendReminder = async () => {
//   try {
//     const aiMessage = await getAIMessage(todo.data);

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
//           <table width="100%" cellpadding="0" cellspacing="0" border="0">
//             <tr>
//               <td align="center">
//                 <table width="600" cellpadding="20" cellspacing="0" border="0" 
//                        style="background:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                  
//                   <tr>
//                     <td align="center">
//                       <h1 style="color:#2C3E50; margin:0;">✅ Task Reminder</h1>
//                     </td>
//                   </tr>

//                   <tr>
//                     <td style="color:#555555; font-size:16px; line-height:1.6;">
//                       <p>Hello <b style="color:#2980B9;">${firstName|| "User"}</b>,</p>
//                       <p>Here’s your reminder:</p>

//                       <p style="background:#f4f4f4; padding:12px; border-left:4px solid #27AE60; border-radius:4px;">
//                         <b style="color:#27AE60;">📌 ${todo.data}</b><br>
//                         ${aiMessage}
//                       </p>

//                       <p><b style="color:#E74C3C;">Due:</b> ${new Date(todo.reminderDate).toLocaleString()}</p>
//                     </td>
//                   </tr>

                 

//                   <tr>
//                     <td align="center" style="color:#888; font-size:12px; padding-top:10px;">
//                       <p>© 2025 Todo App — Stay productive 🚀</p>
//                     </td>
//                   </tr>

//                 </table>
//               </td>
//             </tr>
//           </table>
//         </body>
//       </html>


//     `;


//  //emaill
//     await sendEmail(todo.email,` "Todo Reminder"`, htmlContent);
//     console.log(`🔔 Reminder sent for "${todo.data} to ${todo.email}"`);
//   } catch (err) {
//     console.error("❌ Failed to send reminder:", err);
//   }
// };


//   if (diffMs <= 0) {
//     // Missed reminder → fire immediately
//     sendReminder();
//   } else {
//     // Schedule future reminder
//     setTimeout(sendReminder, diffMs);
//     console.log(`✅ Scheduled reminder for "${todo.data}" at ${reminderTime}`);
//   }
// };

// export const loadAllReminders = async () => {
//   try {
//     const todosWithReminders = await Todo.find({ reminderDate: { $gte: new Date() } });
//     todosWithReminders.forEach(scheduleReminder);
//     console.log(`📅 Reloaded ${todosWithReminders.length} reminders from DB`);
//   } catch (err) {
//     console.error("❌ Error loading reminders:", err);
//   }
// };


// import cron from "node-cron";
// import Todo from "./models/todoModels.js";
// import { sendEmail } from "./nodemailer.js";
// import { getAIMessage } from "./aiService.js";

// // Extract first name from email
// const extractFirstNameFromEmail = (email) => {
//   if (!email) return "User";
//   const localPart = email.split("@")[0];
//   const firstPart = localPart.split(/[._]/)[0];
//   return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
// };

// // Helper to send reminder for a single todo
// export const scheduleReminder = async (todo) => {
//   if (!todo.reminderDate) return;

//   try {
//     const aiMessage = await getAIMessage(todo.data);
//     const firstName = extractFirstNameFromEmail(todo.email);

//     const htmlContent = `
//       <p>Hello <b>${firstName}</b>,</p>
//       <p>Here’s your reminder:</p>
//       <p><b>${todo.data}</b></p>
//       <p>${aiMessage}</p>
//       <p>Due: ${new Date(todo.reminderDate).toLocaleString()}</p>
//     `;

//     await sendEmail(todo.email, "Todo Reminder", htmlContent);
//     console.log(`🔔 Reminder sent to ${todo.email} for task "${todo.data}"`);
//   } catch (err) {
//     console.error("❌ Failed to send reminder:", err);
//   }
// };

// // Cron job: runs every minute
// export const startCronScheduler = () => {
//   cron.schedule("* * * * *", async () => {
//     const now = new Date();
//     const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

//     const todos = await Todo.find({
//       reminderDate: { $gte: oneMinuteAgo, $lte: now },
//     });

//     todos.forEach(scheduleReminder);
//     if (todos.length) {
//       console.log(`📅 Sent ${todos.length} reminders at ${now.toLocaleTimeString()}`);
//     }
//   });

//   console.log("⏱️ Cron scheduler started: checking reminders every minute.");
// };


import Agenda from "agenda";
import mongoose from "mongoose";
import Todo from "./models/todoModels.js";
import { sendEmail } from "./nodemailer.js";
import { getAIMessage } from "./aiService.js";

const mongoConnectionString = process.env.MONGO_URL;

// Connect to MongoDB first
await mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("✅ MongoDB connected");

// Create agenda instance
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: "todo" } });

// Define job
agenda.define("send reminder", async (job) => {
  const { todoId } = job.attrs.data;
  const todo = await Todo.findById(todoId);
  if (!todo) return;

  const aiMessage = await getAIMessage(todo.data);
  const firstName = todo.email.split("@")[0].split(/[._]/)[0];

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





  await sendEmail(todo.email, "Todo Reminder", htmlContent);
  console.log(`🔔 Reminder sent to ${todo.email} for "${todo.data}"`);
});

// Start Agenda
await agenda.start();
console.log("⏱️ Agenda started");

// Schedule function
export const scheduleReminder = async (todo) => {
  if (!todo.reminderDate) return;

  const reminderDate = new Date(todo.reminderDate);
  if (isNaN(reminderDate.getTime())) {
    console.error("❌ Invalid reminder date:", todo.reminderDate);
    return;
  }

  await agenda.schedule(reminderDate, "send reminder", { todoId: todo._id });
  console.log(`✅ Scheduled reminder for "${todo.data}" at ${reminderDate}`);
};

// Optional: debug listeners
agenda.on("start", (job) => console.log("Job started:", job.attrs.name));
agenda.on("complete", (job) => console.log("Job completed:", job.attrs.name));
agenda.on("fail", (err, job) => console.error("Job failed:", job.attrs.name, err));
