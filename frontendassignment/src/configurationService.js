export const BASE_URL = "http://localhost:2221";

const handleErrors = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
    );
  }
  return response.json();
};

export const getEnvironmentList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/env`);
    return handleErrors(response);
  } catch (error) {
    console.error("Error in getEnvironmentList:", error);
    throw error;
  }
};

export const getFeaturesForEnv = async (environmentId) => {
  try {
    const response = await fetch(`${BASE_URL}/feature/${environmentId}`);
    return handleErrors(response);
  } catch (error) {
    console.error("Error in getFeaturesForEnv:", error);
    throw error;
  }
};

export const getSubfeaturesForEnv = async (
  featureId,
  environmentId,
  limit,
  lastIndex
) => {
  try {
    const queryParams = new URLSearchParams({
      limit: limit,
      lastIndex: lastIndex,
    });
    const response = await fetch(
      `${BASE_URL}/subfeature/${featureId}/${environmentId}?${queryParams}`
    );
    return handleErrors(response);
  } catch (error) {
    console.error("Error in getSubfeaturesForEnv:", error);
    throw error;
  }
};

export const getConfigWithCategory = async ({
  featureId,
  subfeatureId,
  envId,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/category&subFeature/${envId}/${featureId}/${subfeatureId}`
    );
    return handleErrors(response);
  } catch (error) {
    console.error("Error in getConfigWithCategory:", error);
    throw error;
  }
};
