import { useStaticQuery, graphql } from 'gatsby';

const useDatoCMSData = (coursewareUid) => {
  const DATO_CMS_QUERY = graphql`
    {
      allDatoCmsCoursewareModel {
        edges {
          node {
            id
            trackingTitleField
            titleField
          }
        }
      }
    }  
  `;
  const { allDatoCmsCoursewareModel } = useStaticQuery(DATO_CMS_QUERY);
  /*
    We cannot use parameters in our graphQL query, useStaticQuery doesn't allow it as its name
    indicates. So we query all and filter afterwards with regard to coursewareUid.
  */
  return allDatoCmsCoursewareModel.edges.filter(obj => obj.node.id === coursewareUid)[0].node;
};

export default useDatoCMSData;
