export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with DeepSeek API key and base URL
const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        // Extract chatID and prompt from the request body
        const { chatId, prompt } = await req.json();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            });
        }

        // Find the chat document in the database based on userId and the chatId
        await connectDB();
        const data = await Chat.findOne({ userId, _id: chatId });

        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now(),
        };

        data.messages.push(userPrompt);

        // Call the DeepSeek API to get a chat completion
        let completion
        try {
            completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "deepseek-chat",
                store: true,
            });
            console.log("Using DeepSeek");
        } catch (error) {
            console.log("DeepSeek failed, switching to Groq:", error.message);

            const groq = new OpenAI({
                baseURL: "https://api.groq.com/openai/v1",
                apiKey: process.env.GROQ_API_KEY,
            });

            completion = await groq.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.1-8b-instant",
            });

            console.log("Using Groq fallback");
        }

        const message = completion.choices[0].message;
        message.timestamp = Date.now();
        data.messages.push(message);
        await data.save();

        return NextResponse.json({
            success: true,
            data: message,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
}