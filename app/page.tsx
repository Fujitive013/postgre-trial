import { createUser } from "@/actions/user-actions";
import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const allUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <div className="min-h-screen bg-zinc-50 py-16 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Drizzle + Postgres demo
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Users currently in the database
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            This server component fetches directly from the users table on
            every request so you can confirm reads are working end-to-end.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            All users
          </h2>
          {allUsers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40">
              No rows found yet. Use the form below to seed your first record.
            </div>
          ) : (
            <ul className="space-y-3">
              {allUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                      {user.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                  {user.createdAt && (
                    <p className="text-sm text-zinc-400">
                      {new Intl.DateTimeFormat("en", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(user.createdAt)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Add a user
          </h2>
          <form
            action={createUser}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <input
              name="name"
              placeholder="Jane Doe"
              required
              className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              required
              className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
            <button
              type="submit"
              className="h-11 rounded-xl bg-zinc-900 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
            >
              Save user & revalidate
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
