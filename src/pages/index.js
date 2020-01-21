/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { query as q } from 'faunadb';
import { navigate } from 'gatsby';
import {
  Store,
  get,
  del,
  keys,
} from 'idb-keyval';
import { FaCircleNotch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { FaunaContext } from '../faunadb/client';
import useSiteMetadata from '../hooks/use-site-metadata';
import useHomeQuery from '../hooks/use-home-query';
import SEO from '../components/seo';
import Layout from '../components/layout';
import OcwSplashSection from '../components/ocw-splash-section';
import OcwSupportSection from '../components/ocw-support-section';
import OcwFeaturedSection from '../components/ocw-featured-section';
import OcwStoriesSection from '../components/ocw-stories-section';
import { isAuthenticated } from '../scripts/auth';
import shortid from '../scripts/shortid';
import '../styles/global.scss';
import styles from './index.module.scss';
import '../components/courseware-card.scss';

const IndexPage = () => {
  const [syncedCoursewares, setSyncedCoursewares] = useState([]);
  const [favoriteCoursewares, setFavoriteCoursewares] = useState([]);
  const client = useContext(FaunaContext);
  const coursewareStore = new Store('ocw-store', 'courseware');
  const online = window.navigator.onLine;

  const { siteMetadata } = useSiteMetadata();
  const { data, loading } = useHomeQuery();

  const getSyncedData = async () => {
    const indices = await keys(coursewareStore);
    const newSyncedCoursewares = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const index of indices) {
      // eslint-disable-next-line no-await-in-loop
      const value = await get(index, coursewareStore);
      newSyncedCoursewares.push({
        uid: index,
        data: JSON.parse(value),
      });
    }
    setSyncedCoursewares(newSyncedCoursewares);
  };

  useEffect(() => {
    if (!online) {
      getSyncedData();
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFavoriteCoursewares([]);
      if (isAuthenticated()) {
        // Get user name from local storage
        const user = window.localStorage.getItem('userName') || '';
        // Check if user already exists in FaunaDb
        const initResult = await client.query(
          q.Map(
            q.Paginate(
              q.Match(q.Index('all_users')),
            ),
            q.Lambda('X', q.Get(q.Var('X'))),
          ),
        );
        const users = initResult.data;
        // User does not exist in FaunaDB, create one
        // and populate favoriteCoursewares with empty array
        if (users && !users.find(el => el.data.name === user)) {
          // Create
          await client.query(
            q.Create(
              q.Collection('users'), {
                data: {
                  name: user,
                  favoriteCoursewares: [],
                },
              },
            ),
          );
        // User exists, fetch favoriteCoursewares
        } else {
          const readResult = await client.query(
            q.Get(
              q.Match(q.Index('users_by_name'), user),
            ),
          );
          setFavoriteCoursewares(readResult.data.favoriteCoursewares);
        }
      }
    };
    if (online) {
      getData();
    }
  }, []);

  const navigateToCourseware = useCallback(
    (event) => {
      const uid = event.currentTarget.getAttribute('data-courseware-uid');
      navigate(`courseware/?courseware_uid=${uid}`);
      event.preventDefault();
    },
  );

  const closeHandleClick = useCallback(
    (event) => {
      const uid = event.currentTarget.getAttribute('data-courseware-uid');
      del(uid, coursewareStore);
      getSyncedData();
    },
  );

  if (loading) {
    return (
      <div className="spinner-container">
        <FaCircleNotch className="spinner" />
      </div>
    );
  }
  const { home } = data;
  const {
    splashImage,
    splashImageLede,
    splashVideos,
    featuredTitle,
    featuredDescription,
    featuredCourses,
    storiesTitle,
    storiesDescription,
    stories,
  } = home;

  let content;

  if (online) {
    content = (
      <>
        <OcwSplashSection
          image={splashImage}
          imageLede={splashImageLede}
          videos={splashVideos}
        />
        <OcwSupportSection />
        <OcwFeaturedSection
          title={featuredTitle}
          description={featuredDescription}
          courses={featuredCourses}
          favoriteCoursewares={favoriteCoursewares}
        />
        <OcwStoriesSection
          title={storiesTitle}
          description={storiesDescription}
          stories={stories}
        />
      </>
    );
  } else {
    const syncedCoursewaresEl = syncedCoursewares.map(syncedCourseware => {
      const coursewareUid = syncedCourseware.uid;
      const coursewareContent = syncedCourseware.data.allCoursewares[0];
      return (
        <div key={shortid()}>
          <p>
            <a
              href="#"
              data-courseware-uid={coursewareUid}
              className="courseware-card-title"
              onClick={navigateToCourseware}
            >
              {coursewareContent.title}
            </a>
            <span
              data-courseware-uid={coursewareUid}
              className={styles.icon}
              onClick={closeHandleClick}
            >
              <MdClose />
            </span>
          </p>
          <p className="courseware-card-subtitle">
            {`${coursewareContent.departmentNumber}.${coursewareContent.masterCourseNumber}, ${coursewareContent.courseLevel} Level`}
          </p>
        </div>
      );
    });
    content = (
      <>
        <h3>Synchronized coursewares</h3>
        {syncedCoursewaresEl}
      </>
    );
  }

  return (
    <Layout>
      <SEO
        siteTitle={siteMetadata.title}
        siteDescription={siteMetadata.description}
      />
      <div className={styles.index}>
        {content}
      </div>
    </Layout>
  );
};

export default IndexPage;
