import LogRocket from 'logrocket';

export function initializeLogRocket() {
  if (import.meta.env.VITE_ENVIRONMENT === 'staging')
    LogRocket.init(import.meta.env.VITE_LOG_ROCKET_ID);
}
