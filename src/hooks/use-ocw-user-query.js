import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// TODO: get these ids with queries once they've been simplified by pagination implementation
const lifelongLearnerCourseIds = [
  '1213239',
  '1210619',
  '1212633',
  '1209197',
  '1212665',
  '1210545',
  '1211040',
  '1208928',
  '1212540',
  '1212499',
  '1212066',
  '1214047',
  '1210901',
  '1210826',
  '1205081',
  '1209952',
  '1210952',
  '1211480',
  '1209309',
  '1210692',
  '1213846',
  '1211780',
  '1211454',
  '1209750',
  '1209632',
  '1204149',
  '1214160',
  '1211391',
  '1211718',
  '1209799',
  '1211640',
  '1211287',
];

const educatorCourseIds = [
  '1204324',
  '1206282',
  '1212323',
  '1210150',
  '1212540',
  '1212066',
  '1214047',
  '1205206',
  '1213348',
  '1210692',
  '1204688',
  '1213551',
  '1209632',
  '1204149',
  '1214160',
  '1211391',
  '1209799',
  '1211640',
  '1204993',
  '1211287',
];

const studentCourseIds = [
  '1211688',
  '1213164',
  '1210295',
  '1213868',
  '1204324',
  '1211527',
  '1209985',
  '1212589',
  '1206007',
  '1212419',
  '1209359',
  '1206282',
  '1213497',
  '1214079',
  '1212323',
  '1210150',
  '1209143',
  '1206380',
  '1213268',
  '1206926',
  '1210386',
  '1211821',
  '1213718',
  '1204809',
  '1208966',
  '1213588',
  '1210212',
  '1210753',
  '1206842',
  '1211199',
  '1211238',
  '1211119',
  '1206604',
  '1204851',
  '1205206',
  '1209058',
  '1214122',
  '1210246',
  '1213348',
  '1210428',
  '1213927',
  '1212364',
  '1207309',
  '1213368',
  '1213806',
  '1204176',
  '1206079',
  '1207007',
  '1204688',
  '1208858',
  '1212978',
  '1204729',
  '1213907',
  '1209844',
  '1213551',
  '1210351',
  '1207114',
  '1209514',
  '1209227',
  '1209391',
  '1210992',
  '1210487',
  '1204993',
  '1209918',
  '1208698',
  '1212098',
  '1213442',
  '1213633',
];
// End TODO

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

export const COURSEWARE_QUERY = gql`
  query($coursewareUid: ItemId) {
    allCoursewares(
      first: 100,
      orderBy: [title_ASC],
      filter: {
        id: {eq: $coursewareUid},
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
  }
`;

const useOcwUserQuery = (user) => {
  let id;
  switch (user) {
    case 'lifelong-learner':
      id = randomItem(lifelongLearnerCourseIds);
      break;
    case 'educator':
      id = randomItem(educatorCourseIds);
      break;
    // Student
    default:
      id = randomItem(studentCourseIds);
  }

  return useQuery(COURSEWARE_QUERY, {
    variables: {
      coursewareUid: id,
    },
  });
};

export default useOcwUserQuery;
