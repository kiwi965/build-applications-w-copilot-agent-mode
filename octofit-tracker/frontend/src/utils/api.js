const getCodespaceName = () => {
  const envValue = import.meta.env.VITE_CODESPACE_NAME;
  return typeof envValue === 'string' && envValue.trim() ? envValue.trim() : '';
};

const codespaceApiPaths = {
  users: '-8000.app.github.dev/api/users',
  teams: '-8000.app.github.dev/api/teams',
  activities: '-8000.app.github.dev/api/activities',
  leaderboard: '-8000.app.github.dev/api/leaderboard',
  workouts: '-8000.app.github.dev/api/workouts',
};

export const buildApiUrl = (resource) => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    const path = codespaceApiPaths[resource] ?? `-8000.app.github.dev/api/${resource}`;
    return `https://${codespaceName}${path}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
};
