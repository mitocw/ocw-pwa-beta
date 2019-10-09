/* eslint-disable no-await-in-loop */
import gql from 'graphql-tag';
import client from '../apollo/client';

// DatoCMS can return a maximum of a 100 records
const recordsPerQuery = 100;
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

export const getCourseFeatureIds = async (courseFeatureRegex) => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const { data: { allCourseFeatures }, errors } = await client.query({
        query: gql`{
          allCourseFeatures(
            first: ${recordsPerQuery},
            skip: ${recordsToSkip},
            filter: {
              ocwFeature: {matches: {pattern: "${courseFeatureRegex}"}}
            }
          ) {
            id
          }
        }`,
      });

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

export const getCourseCollectionIds = async (courseCollectionRegex) => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const { data: { allCourseCollections }, errors } = await client.query({
        query: gql`{
          allCourseCollections(
            first: ${recordsPerQuery},
            skip: ${recordsToSkip},
            filter: {
              ocwFeature: {matches: {pattern: "${courseCollectionRegex}"}}
            }
          ) {
            id
          }
        }`,
      });

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

export const getCoursewares = async (
  courseSearch,
  courseTopic,
  courseFeature,
  courseLevel,
) => {
  const courseSearchRegex = `^.*${courseSearch}.*$`;
  // courseTopic is courseCollection in DatoCMS
  const courseCollectionRegex = courseTopic === 'All' ? '^.*$' : `^${courseTopic}$`;
  const courseCollectionIds = await getCourseCollectionIds(courseCollectionRegex);
  const courseFeatureRegex = courseFeature === 'Any' ? '^.*$' : `^${courseFeature}$`;
  const courseFeatureIds = await getCourseFeatureIds(courseFeatureRegex);
  const courseLevelRegex = courseLevel === 'All' ? '^.*$' : `^${courseLevel}$`;
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const { data: { allCoursewares }, errors } = await client.query({
        query: gql`{
          allCoursewares(
            first: ${recordsPerQuery},
            skip: ${recordsToSkip},
            filter: {
              title: {matches: {pattern: "${courseSearchRegex}"}},
              courseCollections: {anyIn: [${courseCollectionIds}]},
              courseFeatures: {anyIn: [${courseFeatureIds}]},
              courseLevel: {matches: {pattern: "${courseLevelRegex}"}},
              
            }
          ) {
            id
            title
            courseLevel
            trackingTitle
            imageSrc
            description
            departmentNumber
            masterCourseNumber
          }
        }`,
      });

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

  return result;
};

export const getLifelongLearnerCourseIds = async () => {
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let result = [];

  while (makeNewQuery) {
    try {
      const { data: { allCoursewares }, errors } = await client.query({
        query: gql`{
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
      });

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
  const courseFeatureIds = await getCourseFeatureIds('^Instructor Insights$');

  while (makeNewQuery) {
    try {
      const { data: { allCoursewares }, errors } = await client.query({
        query: gql`{
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
      });

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
      const { data: { allCoursewares }, errors } = await client.query({
        query: gql`{
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
      });

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
