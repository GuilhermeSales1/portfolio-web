export const isAdmin = (
  userId: string | null | undefined,
  adminUserId: string | undefined,
) => {
  return Boolean(userId && adminUserId && userId === adminUserId);
};
