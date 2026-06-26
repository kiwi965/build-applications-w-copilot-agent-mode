const getCodespaceName = () => {
  const envValue = import.meta.env.VITE_CODESPACE_NAME;
  return typeof envValue === 'string' && envValue.trim() ? envValue.trim() : '';
};

export const buildApiUrl = (resource) => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    switch (resource) {
      case 'users':
        return `https://${codespaceName}-8000.app.github.dev/api/users/`;
      case 'teams':
        return `https://${codespaceName}-8000.app.github.dev/api/teams/`;
      case 'activities':
        return `https://${codespaceName}-8000.app.github.dev/api/activities/`;
      case 'leaderboard':
        return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
      case 'workouts':
        return `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
      default:
        return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
    }
  }

  return `http://localhost:8000/api/${resource}/`;
};
