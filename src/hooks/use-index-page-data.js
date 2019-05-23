import { useStaticQuery, graphql } from 'gatsby';

const useIndexPageData = () => {
  const CONTENTFUL_QUERY = graphql`
    {
      allContentfulCourseware(sort: { fields: [trackingTitle], order: ASC }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const { allContentfulCourseware } = useStaticQuery(CONTENTFUL_QUERY);

  /*
    allContentfulCourseware.edges is an array of objects.
    Flatten it and returns an array of courseware uids.
  */
  return [...allContentfulCourseware.edges.map(obj => obj.node.id)];
};

export default useIndexPageData;
