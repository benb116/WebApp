// Configuration parameters for the site
export const CallbackURL: string = (process.env.CALLBACK_URL || '');
// How often to refresh websocket info
export const RefreshTime = 5; // seconds
// Email verification parameters
export const verificationTimeout = 5; // minutes
export const verificationTokenLength = 128;
