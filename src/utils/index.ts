import gravatar from 'gravatar';

/**
 * Generates a random default avatar for a user
 * using the user's email .
 * @param email
 * @returns {string}
 */
export const generateAvatar = (email: string): string => {
  const options = { s: '100', r: 'x', d: 'identicon' };
  const avatar = gravatar.url(email, options, true);
  return avatar;
};
