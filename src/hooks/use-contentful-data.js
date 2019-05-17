import { useStaticQuery, graphql } from 'gatsby';

const useContentfulData = () => {
  const CONTENTFUL_QUERY = graphql`
    {
      allContentfulCourseware(sort: { fields: [courseTitle], order: ASC }) {
        edges {
          node {
            courseUid
            courseTitle
            trackingTitle
            courseImagePath
            coursePath
            instructors {
              name
            }
            masterCourseNumber
            year
            term
            level
            department {
              name
            }
            plainTextDescription {
              plainTextDescription
            }
            topic {
              title
            }
            subtopic {
              title
            }
            speciality {
              title
            }
            pdf_resource {
              path
            }
            media_resource {
              path
            }
            assignments {
              id
            }
          }
        }
      }
    }
  `;
  const { allContentfulCourseware } = useStaticQuery(CONTENTFUL_QUERY);

  return allContentfulCourseware.edges; // Returns an array of nodes
};

export default useContentfulData;
