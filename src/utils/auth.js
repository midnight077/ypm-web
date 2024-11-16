import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import db from "@utils/db";
import authConfig from "@utils/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(db.getClient()),
    session: { strategy: "jwt" },
    ...authConfig,
});
