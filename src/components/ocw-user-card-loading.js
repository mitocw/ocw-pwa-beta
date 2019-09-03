/* eslint-disable no-shadow */
import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import styles from './courseware-list.module.scss';

const OcwUserCardLoading = () => (
  <>
    <div className={styles.coursewareListLoading}>
      <FaCircleNotch className={styles.spinner} />
    </div>
  </>
);

export default OcwUserCardLoading;
