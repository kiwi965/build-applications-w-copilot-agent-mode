const getCodespaceName = () => {
  const envValue = import.meta.env.VITE_CODESPACE_NAME;
  return typeof envValue === 'string' && envValue.trim() ? envValue.trim() : '';
};

export const buildApiUrl = (resource) => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
};
