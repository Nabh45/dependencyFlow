const ENVIRONMENT_JSON = require("./jsons/configurations.environment");
const CONFIGURATION_MAP = require("./jsons/configurations.configuration_map.json");
const FEATURES = require("./jsons/configurations.features.json");
const SUB_FEATURES = require("./jsons/configurations.sub_features.json");
const CATEGORIES = require("./jsons/configurations.category.json");

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 2221;

const getFilteredData = ({ source, key, q }) => {
  if (q.trim()) {
    return source.filter((item) => item[key].startsWith(q));
  }
  return source;
};

app.get("/env", (req, res) => {
  const q = req.query.q;
  const filteredValues = getFilteredData({
    source: ENVIRONMENT_JSON,
    key: "name",
    q,
  });
  res.send(filteredValues);
});

app.get("/feature/:environmentId", (req, res) => {
  const environmentId = req.params.environmentId;
  if (!environmentId.trim()) {
    return FEATURES;
  }
  const matchedFeatures = CONFIGURATION_MAP.filter((config) =>
    config.environments.includes(environmentId)
  ).flatMap((config) => config.features);
  const uniqueFeatureIds = [...new Set(matchedFeatures)];

  const result = uniqueFeatureIds.map((featureId) => {
    const feature = FEATURES.find((f) => f._id === featureId);
    return {
      _id: feature._id,
      name: feature.name,
    };
  });
  res.send(result);
});

app.get("/subfeature/:featureId/:environmentId", (req, res) => {
  const limit = +req.query.limit || 5;
  const lastIndex = +req.query.lastIndex || 0;

  const environmentId = req.params.environmentId;
  const featureId = req.params.featureId;

  const subFeatureIds = new Set();
  const matchedFeatures = CONFIGURATION_MAP.filter((config) =>
    config.environments.includes(environmentId)
  )
    .flatMap((config) => config.sub_features)
    .filter((subFeatureId) => {
      if (!subFeatureIds.has(subFeatureId)) {
        subFeatureIds.add(subFeatureId);
        return true;
      }
      return false;
    });

  const result = matchedFeatures.map((featureId) => {
    const subFeature = SUB_FEATURES.find((f) => f._id === featureId);
    return {
      _id: subFeature._id,
      name: subFeature.name,
    };
  });
  const finalResponse = {
    data: result.splice(lastIndex, limit),
    hasMore: result.length !== lastIndex + limit,
    lastIndex: lastIndex + limit,
  };
  res.send(finalResponse);
});

app.get("/category&subFeature/:envId/:featureId/:subFeatureId", (req, res) => {
  const environmentId = req.params.envId;
  const featureId = req.params.featureId;
  const subFeatureId = req.params.subFeatureId;

  let category;
  const uniqueNamesAndProperties = [];

  CONFIGURATION_MAP.forEach((item) => {
    if (
      item.environments.includes(environmentId) &&
      item.features.includes(featureId) &&
      item.sub_features.includes(subFeatureId)
    ) {
      category = item.category_id;
      uniqueNamesAndProperties.push({
        properties: item.properties,
        name: item.name,
      });
    }
  });
  const categoryInfo = CATEGORIES.filter((item) => item._id === category);
  res.send({ categoryInfo, uniqueNamesAndProperties });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
