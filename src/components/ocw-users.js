/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import Store from '../store/store';
import lifelongLearner from '../images/lifelong-learner.jpg';
import educator from '../images/educator.jpg';
import student from '../images/student.jpg';
import styles from './ocw-users.module.scss';

const OcwUsers = () => {
  const {
    setCourseTopic,
    setCourseFeature,
    setCourseLevel,
  } = Store.useContainer();
  const setUserState = useCallback(
    (user) => {
      switch (user) {
        case 'lifelong-learner':
          setCourseTopic('All');
          setCourseFeature('Any');
          setCourseLevel('Graduate');
          break;
        case 'educator':
          setCourseTopic('All');
          setCourseFeature('Instructor Insights');
          setCourseLevel('All');
          break;
        // Student
        default:
          setCourseTopic('All');
          setCourseFeature('Any');
          setCourseLevel('Undergraduate');
      }
    },
  );
  const navigateToDiscovery = useCallback(
    (event) => {
      setUserState(event.currentTarget.getAttribute('data-user'));
      navigate('discovery');
    },
  );

  return (
    <div className={styles.cardList}>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={lifelongLearner}
          alt="Lifelong Learner"
          data-user="lifelong-learner"
          onClick={navigateToDiscovery}
        />
        <h3 className={styles.title}>
          Lifelong Learner
        </h3>
        <p className={styles.description}>
          You are familiar with college coursework and interested in gaining additional knowledge.
        </p>
      </div>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={educator}
          alt="Educator"
          data-user="educator"
          onClick={navigateToDiscovery}
        />
        <h3 className={styles.title}>
          Educator
        </h3>
        <p className={styles.description}>
          You are an instructor interested in finding additional resources for you and your
          students.
        </p>
      </div>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={student}
          alt="Student"
          data-user="student"
          onClick={navigateToDiscovery}
        />
        <h3 className={styles.title}>
          Student
        </h3>
        <p className={styles.description}>
          You are a student looking to supplement your coursework.
        </p>
      </div>
    </div>
  );
};

export default OcwUsers;
