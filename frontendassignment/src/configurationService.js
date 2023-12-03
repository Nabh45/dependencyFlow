export const BASE_URL = "http://localhost:2221";

export const getEnvironmentList = async () => {
  const response = await fetch(`${BASE_URL}/env`);
  const environmentList = await response.json();
  return environmentList;
};

export const getFeaturesForEnv = async (environmentId) => {
  const featuresJson = await fetch(`${BASE_URL}/feature/${environmentId}`);
  const features = await featuresJson.json();
  return features;
};

export const getSubfeaturesForEnv = async (featureId, environmentId) => {
  const response = await fetch(
    `${BASE_URL}/subfeature/${featureId}/${environmentId}`
  );
  const subfeature = await response.json();
  return subfeature;
};

export const getConfigWithCategory = async ({
  featureId,
  subfeatureId,
  envId,
}) => {
  const response = await fetch(
    `${BASE_URL}/category&subFeature/${envId}/${featureId}/${subfeatureId}`
  );
  const data = await response.json();
  return data;
};
