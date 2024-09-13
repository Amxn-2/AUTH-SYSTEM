import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const TOKEN  ="c7d4eb2dc542926e1536ee00f83c6f2a";
const ENDPOINT = "https://send.api.mailtrap.io/"

console.log("Mailtrap Token:", TOKEN); // Debug: Check if the token is loaded correctly
console.log("Mailtrap Endpoint:", ENDPOINT); // Should output your endpoint

export const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Aman Mailtrap Test",
};
