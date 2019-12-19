import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const timeout = 200; // Used to let select and button change state before courseware rerendering

const useStore = () => {
  const [courseSearch, setCourseSearch] = useState('');
  const [courseTopic, setCourseTopic] = useState('All');
  const [courseFeature, setCourseFeature] = useState('Any');
  const [courseLevel, setCourseLevel] = useState('All');
  const [cardType, setCardType] = useState('regular');
  const [favoriteCardType, setFavoriteCardType] = useState('condensed');

  const changeCourseSearch = useCallback(
    searchTerm => setTimeout(() => setCourseSearch(searchTerm), timeout),
  );
  const changeCourseTopic = useCallback(
    event => {
      const { value } = event.detail;
      setTimeout(() => setCourseTopic(value), timeout);
    },
  );
  const changeCourseFeature = useCallback(
    event => {
      const { value } = event.detail;
      setTimeout(() => setCourseFeature(value), timeout);
    },
  );
  const changeCourseLevel = useCallback(
    event => {
      const { value } = event.detail;
      setTimeout(() => setCourseLevel(value), timeout);
    },
  );
  const changeCardType = useCallback(
    event => {
      const value = event.currentTarget.dataset.cardType;
      setTimeout(() => setCardType(value), timeout);
    },
  );
  const changeFavoriteCardType = useCallback(
    event => {
      const value = event.currentTarget.dataset.cardType;
      setTimeout(() => setFavoriteCardType(value), timeout);
    },
  );

  return {
    courseSearch,
    setCourseSearch,
    changeCourseSearch,
    courseTopic,
    setCourseTopic,
    changeCourseTopic,
    courseFeature,
    setCourseFeature,
    changeCourseFeature,
    courseLevel,
    setCourseLevel,
    changeCourseLevel,
    cardType,
    changeCardType,
    favoriteCardType,
    changeFavoriteCardType,
  };
};

const Store = createContainer(useStore);

export default Store;
