// actions/user-actions.ts
"use server";

import { db } from "@/db"; // You might need to adjust this alias to "../db" if @ isn't set
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await db.insert(users).values({
    name,
    email,
  });

  revalidatePath("/"); 
}