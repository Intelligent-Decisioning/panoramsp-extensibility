/**
 * Formats a user from search results into just the display name
 * @param user A user value from search in the format: email | display | hash upn
 * @returns 
 */
export const formatUser = (user?: string): string => {
  if (!user) return '';

  const parts = user.split('|');
  return parts.length > 1 ? parts[1] : user;
}