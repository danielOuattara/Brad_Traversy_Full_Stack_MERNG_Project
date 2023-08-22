const graphql = require("graphql");
const { clients, projects } = require("./../sampleData");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql;

//-------------------------------------------------------

const ClientType = new GraphQLObjectType({
  name: "Clients",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, context) {
        return clients.find((item) => item.id === args.id);
      },
    },
  },
});

//--------------------------------------------------------
module.exports = new GraphQLSchema({
  query: RootQuery,
});
