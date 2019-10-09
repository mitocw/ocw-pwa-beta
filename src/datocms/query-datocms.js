/* eslint-disable no-await-in-loop */
import fetch from 'isomorphic-fetch';
import { readOnlyAccessToken } from '../../.datocms';

// DatoCMS can return a maximum of a 100 records
const recordsPerQuery = 100;
const uri = 'https://graphql.datocms.com/';
const method = 'POST';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${readOnlyAccessToken}`,
};
const logErrors = (errors) => {
  if (errors) {
    errors.map((error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
      return undefined;
    });
    throw new Error('Aborting: DatoCMS errors');
  }
};

export const getCourseFeatureIds = async (ocwFeature) => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const dato = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify({
          query: `{
            allCourseFeatures(
              first: ${recordsPerQuery},
              skip: ${recordsToSkip},
              filter: {
                ocwFeature: {matches: {pattern: "^${ocwFeature}$"}}
              }
            ) {
              id
            }
          }`,
        }),
      });

      const { data: { allCourseFeatures }, errors } = await dato.json();
      logErrors(errors);

      result = result.concat(allCourseFeatures);
      recordsToSkip += recordsPerQuery;
      if (allCourseFeatures.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return result.map(item => item.id);
};

export const getCourseCollectionsIds = async () => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const dato = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify({
          query: `{
            allCourseCollections(
              first: ${recordsPerQuery},
              skip: ${recordsToSkip},
            ) {
              id
            }
          }`,
        }),
      });

      const { data: { allCourseCollections }, errors } = await dato.json();
      logErrors(errors);

      result = result.concat(allCourseCollections);
      recordsToSkip += recordsPerQuery;
      if (allCourseCollections.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return result.map(item => item.id);
};

export const getLifelongLearnerCourseIds = async () => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const dato = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify({
          query: `{
            allCoursewares(
              first: ${recordsPerQuery},
              skip: ${recordsToSkip},
              filter: {
                courseLevel: {matches: {pattern: "^Graduate$"}}
              }
            ) {
              id
            }
          }`,
        }),
      });

      const { data: { allCoursewares }, errors } = await dato.json();
      logErrors(errors);

      result = result.concat(allCoursewares);
      recordsToSkip += recordsPerQuery;
      if (allCoursewares.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return result.map(item => item.id);
};

export const getEducatorCourseIds = async () => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];
  const courseFeatureIds = await getCourseFeatureIds('Instructor Insights');

  while (makeNewQuery) {
    try {
      const dato = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify({
          query: `{
            allCoursewares(
              first: ${recordsPerQuery},
              skip: ${recordsToSkip},
              filter: {
                courseFeatures: {anyIn: [${courseFeatureIds}]}
              }
            ) {
              id
            }
          }`,
        }),
      });

      const { data: { allCoursewares }, errors } = await dato.json();
      logErrors(errors);

      result = result.concat(allCoursewares);
      recordsToSkip += recordsPerQuery;
      if (allCoursewares.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return result.map(item => item.id);
};

export const getStudentCourseIds = async () => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const dato = await fetch(uri, {
        method,
        headers,
        body: JSON.stringify({
          query: `{
            allCoursewares(
              first: ${recordsPerQuery},
              skip: ${recordsToSkip},
              filter: {
                courseLevel: {matches: {pattern: "^Undergraduate$"}}
              }
            ) {
              id
            }
          }`,
        }),
      });

      const { data: { allCoursewares }, errors } = await dato.json();
      logErrors(errors);

      result = result.concat(allCoursewares);
      recordsToSkip += recordsPerQuery;
      if (allCoursewares.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return result.map(item => item.id);
};
