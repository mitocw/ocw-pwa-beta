import { useStaticQuery, graphql } from 'gatsby';

const useCoursewareCardData = (coursewareUid) => {
  const CONTENTFUL_QUERY = graphql`
    {
      allContentfulCourseware(sort: { fields: [trackingTitle], order: ASC }) {
        edges {
          node {
            id
            title,
            fromSemester,
            fromYear,
            trackingTitle,
            imageSrc,
            description {
              description
            }
          }
        }
      }
    }
  `;
  const { allContentfulCourseware } = useStaticQuery(CONTENTFUL_QUERY);
  /*
    We cannot use parameters in our graphQL query, useStaticQuery doesn't allow it as its name
    indicates. So we query all and filter afterwards with regard to coursewareUid.
  */
  return allContentfulCourseware.edges.filter(obj => obj.node.id === coursewareUid)[0].node;
};

export default useCoursewareCardData;
