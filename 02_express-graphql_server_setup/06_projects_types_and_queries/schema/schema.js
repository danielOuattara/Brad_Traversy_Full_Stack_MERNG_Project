const { clients, projects } = require("./../sampleData");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//-------------------------------------------------------

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
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
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, context) {
        return clients;
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, context) {
        return projects.find((item) => item.id === args.id);
      },
    },
    projects: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, context) {
        return projects;
      },
    },
  },
});

//--------------------------------------------------------
module.exports = new GraphQLSchema({
  query: RootQuery,
});
