const MERCHANT_KEY = "merchant" as const;
const USER_KEY = "users" as const;

export const merchantQueryKeys = {
	all: [MERCHANT_KEY] as const,
};

export const userQueryKeys = {
	/** Base key for all user queries */
	all: [USER_KEY] as const,

	/** Current authenticated user */
	current: [USER_KEY, "current"] as const,
};
