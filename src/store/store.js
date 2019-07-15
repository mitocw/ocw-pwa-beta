
import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const useStore = () => {
  const [courseTopic, setCourseTopic] = useState('Science');
  const [courseLevel, setCourseLevel] = useState('All');
  const [cardType, setCardType] = useState('regular');

  const changeCourseTopic = useCallback(
    (index, item) => setCourseTopic(item.getAttribute('data-value')),
  );
  const changeCourseLevel = useCallback(
    (index, item) => setCourseLevel(item.getAttribute('data-value')),
  );
  const changeCardType = useCallback(
    event => setCardType(event.currentTarget.dataset.cardType),
  );

  return {
    courseTopic,
    changeCourseTopic,
    courseLevel,
    changeCourseLevel,
    cardType,
    changeCardType,
  };
};

const Store = createContainer(useStore);

export default Store;
