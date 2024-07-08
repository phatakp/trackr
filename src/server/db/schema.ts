import { ACCT_TYPE, TXN_TYPE } from "@/lib/site-config";
import { sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  real,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `trackr_${name}`);

export const users = createTable("user", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  password: text("email", { length: 20 }),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
  isAdmin: int("is_admin", { mode: "boolean" }).default(false),
});

export const accountTypes = createTable("account_type", {
  type: text("type").primaryKey(),
});

export const invTypes = createTable("investment_type", {
  type: text("type").primaryKey(),
});

export const txnTypes = createTable("transaction_type", {
  type: text("type").primaryKey(),
});

export const categoryTypes = createTable("category_type", {
  type: text("type").primaryKey(),
});

export const frequencyTypes = createTable("frequency_type", {
  type: text("type").primaryKey(),
});

export const banks = createTable(
  "bank",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    type: text("type")
      .references(() => accountTypes.type, { onDelete: "cascade" })
      .notNull(),
  },
  (banks) => {
    return {
      bankUniqueIndex: uniqueIndex("bank_unique_idx").on(
        banks.name,
        banks.type
      ),
    };
  }
);

export const categories = createTable(
  "category",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    type: text("type")
      .references(() => categoryTypes.type, { onDelete: "cascade" })
      .notNull(),
  },
  (categories) => {
    return {
      categoryUniqueIndex: uniqueIndex("category_unique_idx").on(
        categories.name,
        categories.type
      ),
    };
  }
);

export const accounts = createTable(
  "account",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    number: text("name").notNull(),
    name: text("name").notNull(),
    type: text("type")
      .references(() => accountTypes.type, { onDelete: "cascade" })
      .notNull()
      .default(ACCT_TYPE.SAVINGS),
    invType: text("investment_type").references(() => invTypes.type, {
      onDelete: "cascade",
    }),
    balance: real("balance").notNull().default(0),
    currValue: real("curr_value").notNull().default(0),
    isDefaultAcct: int("is_default_acct", { mode: "boolean" }).default(false),
    asOfDate: int("as_of_date", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    bankId: int("bank_id")
      .references(() => banks.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
  },
  (accounts) => {
    return {
      accountUniqueIndex: uniqueIndex("account_unique_idx").on(
        accounts.number,
        accounts.bankId,
        accounts.userId
      ),
      accountTypeIndex: index("account_type_idx").on(accounts.type),
    };
  }
);

export const mfAccounts = createTable("mf_account", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  accountId: int("account_id")
    .references(() => accounts.id, { onDelete: "cascade" })
    .notNull(),
  isSIP: int("is_sip", { mode: "boolean" }).default(false),
  nav: real("nav").notNull(),
  units: real("units").notNull(),
});

export const equityAccounts = createTable("equity_account", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  accountId: int("account_id")
    .references(() => accounts.id, { onDelete: "cascade" })
    .notNull(),
  buyPrice: real("buy_price").notNull(),
  currPrice: real("curr_price").notNull(),
  quantity: int("quantity").notNull(),
  moneyControlPrefix: text("money_control_prefix").notNull(),
});

export const groups = createTable("group", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const groupUsers = createTable(
  "group_user",
  {
    groupId: int("group_id")
      .references(() => groups.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
  },
  (groupUsers) => {
    return {
      id: primaryKey({
        name: "id",
        columns: [groupUsers.groupId, groupUsers.userId],
      }),
    };
  }
);

export const transactions = createTable(
  "transaction",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    date: int("date", { mode: "timestamp" }).notNull(),
    description: text("description"),
    type: text("type")
      .references(() => txnTypes.type, { onDelete: "cascade" })
      .notNull()
      .default(TXN_TYPE.EXPENSE),
    amount: real("amount").notNull().default(0),
    categoryId: int("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    sourceId: int("source_id").references(() => accounts.id, {
      onDelete: "cascade",
    }),
    destinationId: int("destination_id").references(() => accounts.id, {
      onDelete: "cascade",
    }),
    groupId: int("group_id").references(() => groups.id, {
      onDelete: "cascade",
    }),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
  },
  (txns) => {
    return {
      txnTypeIndex: index("txn_type_idx").on(txns.type),
      txnCatIndex: index("txn_category_idx").on(txns.categoryId),
    };
  }
);

export const recurringTxns = createTable("recurring_txn", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  txnId: int("txn_id")
    .references(() => transactions.id, {
      onDelete: "cascade",
    })
    .notNull(),
  isRecurring: int("is_recurring", { mode: "boolean" }).default(false),
  frequency: text("frequency").references(() => frequencyTypes.type, {
    onDelete: "set null",
  }),
  startDate: int("start_date", { mode: "timestamp" }),
  endDate: int("end_date", { mode: "timestamp" }),
});
