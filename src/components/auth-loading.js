import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import styles from './auth-loading.module.scss';

const AuthLoading = () => (
  <div className={styles.spinnerContainer}>
    <FaCircleNotch className={styles.spinner} />
  </div>
);

export default AuthLoading;
