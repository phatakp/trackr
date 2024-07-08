"use server";

import { createServerActionProcedure } from "zsa";

// create a procedure to validate if user is logged in
export const authProcedure = createServerActionProcedure().handler(
  async ({ request, input }) => {
    // do something like check if user is authenticated
    // if (input.name !== "Reetesh") throw new Error("Invalid user");
    return {
      isAuthenticated: true,
    };
  }
);
