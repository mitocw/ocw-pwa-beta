import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const METADATA_QUERY = graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `;
  const { site } = useStaticQuery(METADATA_QUERY);

  return site;
};

export default useSiteMetadata;
