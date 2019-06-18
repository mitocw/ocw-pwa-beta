import { useStaticQuery, graphql } from 'gatsby';

const useStaticBlogData = () => {
  const STATIC_BLOG_QUERY = graphql`
    {
      blog {
        posts {
          id
          title
          date
        }
      }
    }
  `;
  const { blog } = useStaticQuery(STATIC_BLOG_QUERY);

  return blog;
};

export default useStaticBlogData;
