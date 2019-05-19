import { useStaticQuery, graphql } from 'gatsby';

const useContentfulData = () => {
  const CONTENTFUL_QUERY = graphql`
    {
      allContentfulCourseware(sort: { fields: [trackingTitle], order: ASC }) {
        edges {
          node {
            id
            trackingTitle
            title
            masterCourseNumber
            imageSrc
            imageDescription {
              imageDescription
            }
            description {
              description
            }
            department {
              depNo
            }
            url
            shortUrl
            courseLevel
            departmentNumber
            instructors {
              directoryTitle
              firstName
              lastName
            }
            tags {
              name
            }
            toSemester
            fromSemester
            toYear
            fromYear
            sortAs
            language
          }
        }
      }
    }
  `;
  const { allContentfulCourseware } = useStaticQuery(CONTENTFUL_QUERY);

  return allContentfulCourseware.edges; // Returns an array of nodes
};

export default useContentfulData;
