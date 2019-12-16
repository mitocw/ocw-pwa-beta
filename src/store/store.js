import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const useStore = () => {
  const [courseSearch, setCourseSearch] = useState('');
  const [courseTopic, setCourseTopic] = useState('All');
  const [courseFeature, setCourseFeature] = useState('Any');
  const [courseLevel, setCourseLevel] = useState('All');
  const [cardType, setCardType] = useState('regular');
  const [favoriteCardType, setFavoriteCardType] = useState('condensed');

  const changeCourseSearch = useCallback(
    searchTerm => setCourseSearch(searchTerm),
  );
  const changeCourseTopic = useCallback(
    event => setCourseTopic(event.detail.value),
  );
  const changeCourseFeature = useCallback(
    event => setCourseFeature(event.detail.value),
  );
  const changeCourseLevel = useCallback(
    event => setCourseLevel(event.detail.value),
  );
  const changeCardType = useCallback(
    event => setCardType(event.currentTarget.dataset.cardType),
  );
  const changeFavoriteCardType = useCallback(
    event => setFavoriteCardType(event.currentTarget.dataset.cardType),
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
