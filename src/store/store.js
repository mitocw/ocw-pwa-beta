
import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const useStore = () => {
  const [courseTopic, setCourseTopic] = useState('All');
  const [courseFeature, setCourseFeature] = useState('Any');
  const [courseLevel, setCourseLevel] = useState('All');
  const [cardType, setCardType] = useState('regular');

  const changeCourseTopic = useCallback(
    (index, item) => setCourseTopic(item.getAttribute('data-value')),
  );
  const changeCourseFeature = useCallback(
    (index, item) => setCourseFeature(item.getAttribute('data-value')),
  );
  const changeCourseLevel = useCallback(
    (index, item) => setCourseLevel(item.getAttribute('data-value')),
  );
  const changeCardType = useCallback(
    event => setCardType(event.currentTarget.dataset.cardType),
  );

  return {
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
  };
};

const Store = createContainer(useStore);

export default Store;
