const { slash } = require(`gatsby-core-utils`)
const customTemplates = ["/favourite/", "/", "/favourite", "favourite"]
const singlePageTemplate = require.resolve(`../src/templates/Page.js`)

const GET_PAGES = `
query GET_PAGES {
  allContentfulCategories {
    edges {
      node {
        categoryName
      }
    }
  }
}
`

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions

  const fetchPosts = async () => {
    // Do query to get all posts and pages, this will return the posts and pages.
    return await graphql(GET_PAGES).then(({ data }) => {
      // console.log("Content is", data);
      const {
        allContentfulCategories: { edges },
      } = data

      return { pages: edges }
    })
  }

  // When the above fetchPosts is resolved, then loop through the results i.e pages to create pages.
  await fetchPosts().then(({ pages }) => {
    // 2. Create Single PAGE: Loop through all pages and create single pages for pages.
    pages &&
      // eslint-disable-next-line array-callback-return
      pages.map((page, index) => {
        // If its not a custom template, create the page.
        if (!customTemplates.includes(page.node.categoryName)) {
          createPage({
            path: `${page.node.categoryName.split(" ").join("").toLowerCase()}`,
            component: slash(singlePageTemplate),
            context: { categoryName: page.node.categoryName }, // pass single page Name in context, so its available in the singlePagetTemplate in props.pageContext.
          })
        }
      })
  })
}
