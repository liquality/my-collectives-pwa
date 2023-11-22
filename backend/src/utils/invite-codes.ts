
export const generateInviteCode = (length = 8) => Math.random()
.toString(36)
.replace(/[^a-z09]+/g, "")
.substring(0, length)
.toUpperCase();

