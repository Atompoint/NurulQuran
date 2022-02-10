// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }




const createAllPages = require('./createPages/pages')
exports.createPages = async ({ actions , graphql}) =>{
    await createAllPages( { actions, graphql})

}