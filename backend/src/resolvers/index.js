const { getEventQResolvers } = require("./event.resolver");

const getResolvers = tools => {
  return {
    Query: {
      ...getEventQResolvers(tools),
    },
    //Mutation: {},
  };
};

module.exports = getResolvers;
