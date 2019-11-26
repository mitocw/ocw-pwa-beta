import React, { useState, useEffect, useContext } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { query as q } from 'faunadb';
import {
  Store,
  get,
  set,
  del,
} from 'idb-keyval';
import { FaunaContext } from '../faunadb/client';
import useSiteMetadata from '../hooks/use-site-metadata';
import useIndividualCoursewareQuery from '../hooks/use-individual-courseware-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import CoursewareHeader from '../components/courseware-header';
import CoursewareImage from '../components/courseware-image';
import CoursewareMetadata from '../components/courseware-metadata';
import CoursewareDescription from '../components/courseware-description';
import CoursewarePages from '../components/courseware-pages';
import validate from '../scripts/validate';
import styles from './courseware.module.scss';
import '../components/courseware-filters.scss';

const CoursewarePage = ({ location }) => {
  const client = useContext(FaunaContext);
  const { siteMetadata } = useSiteMetadata();
  const [visits, setVisits] = useState(0);
  const [visitsLoading, setVisitsLoading] = useState(true);
  const [syncedLoading, setSyncedLoading] = useState(true);
  const [syncedCourseware, setSyncedCourseware] = useState(null);
  const coursewareStore = new Store('ocw-store', 'courseware');
  const online = window.navigator.onLine;
  // During build, location.search is an empty string
  const hasParams = (location.search !== '');
  const coursewareUid = hasParams ? (new URL(location.href)).searchParams.get('courseware_uid') : null;
  let result;

  useEffect(() => {
    const getData = async () => {
      setVisitsLoading(true);
      if (coursewareUid) {
        // Check if courseware already exists in FaunaDb
        const initResult = await client.query(
          q.Map(
            q.Paginate(
              q.Match(q.Index('all_coursewares')),
            ),
            q.Lambda('X', q.Get(q.Var('X'))),
          ),
        );
        const coursewares = initResult.data;
        // Courseware does not exist in FaunaDB, create one
        // and set visits to 1
        if (coursewares && !coursewares.find(el => el.data.uid === coursewareUid)) {
          // Create
          await client.query(
            q.Create(
              q.Collection('coursewares'), {
                data: {
                  uid: coursewareUid,
                  visits: 1,
                },
              },
            ),
          );
          setVisits(1);
        // Courseware exists, increment visits by 1
        } else {
          const readResult = await client.query(
            q.Get(
              q.Match(q.Index('coursewares_by_uid'), coursewareUid),
            ),
          );
          const newVisits = readResult.data.visits + 1;
          // Update visits on FaunaDB
          await client.query(
            q.Update(readResult.ref, {
              data: {
                visits: newVisits,
              },
            }),
          );
          setVisits(newVisits);
        }
      }
      setVisitsLoading(false);
    };
    if (online) {
      getData();
    }
  }, [location]);

  useEffect(() => {
    const getSyncedData = async () => {
      const data = await get(coursewareUid, coursewareStore);
      setSyncedCourseware(data || null);
      setSyncedLoading(false);
    };
    getSyncedData();
  }, []);

  if (coursewareUid) {
    let coursewareResult;
    let data;
    if (online) {
      coursewareResult = useIndividualCoursewareQuery(coursewareUid);
      if (coursewareResult.loading || visitsLoading) {
        return (
          <div className="spinner-container">
            <FaCircleNotch className="spinner" />
          </div>
        );
      }
      data = coursewareResult.data;
    } else if (!syncedLoading) {
      if (syncedCourseware) {
        data = JSON.parse(syncedCourseware);
      } else {
        return (
          <p>
            This course has not been synced
          </p>
        );
      }
    } else {
      return (
        <div className="spinner-container">
          <FaCircleNotch className="spinner" />
        </div>
      );
    }
    const { allCoursewares } = data;
    if (allCoursewares.length === 0) {
      return (<div className="spinner-container">Not a valid course identificator</div>);
    }
    const syncCourseware = async (sync) => {
      if (sync) {
        const dataStr = JSON.stringify(data);
        await set(coursewareUid, dataStr, coursewareStore);
        setSyncedCourseware(dataStr);
      } else {
        await del(coursewareUid, coursewareStore);
        setSyncedCourseware(null);
      }
    };
    // Get the fields of interest from valid courseware
    const {
      title,
      imageSrc,
      imageDescription,
      instructors,
      departmentNumber,
      masterCourseNumber,
      fromSemester,
      fromYear,
      courseLevel,
      description,
      url,
      coursePages,
      courseVideos,
    } = allCoursewares[0];
    result = (
      <Layout>
        <SEO
          siteTitle={siteMetadata.title}
          siteDescription={siteMetadata.description}
        />
        <div className={styles.courseware}>
          <CoursewareHeader
            className={styles.header}
            url={url}
            title={title}
            visits={visits}
            synced={syncedCourseware !== null}
            syncCourseware={syncCourseware}
          />
          <CoursewareImage
            imageSrc={imageSrc}
            imageDescription={validate('imageDescription', imageDescription)}
          />
          <CoursewareMetadata
            className={styles.metadata}
            instructors={instructors}
            departmentNumber={departmentNumber}
            masterCourseNumber={masterCourseNumber}
            fromSemester={fromSemester}
            fromYear={fromYear}
            courseLevel={courseLevel}
          />
          <CoursewareDescription
            className={styles.description}
            description={description}
            url={url}
          />
          <CoursewarePages
            className={styles.pages}
            coursePages={coursePages}
            courseVideos={courseVideos}
          />
        </div>
      </Layout>
    );
  } else {
    // Error message for erroneous courseUid param
    result = location.href
      ? (<div className="spinner-container">Not a valid course identificator</div>)
      : null;
  }

  return result;
};

export default CoursewarePage;
