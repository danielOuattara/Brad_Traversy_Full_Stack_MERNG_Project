const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Mongoose Model
const ClientModel = require("./../models/ClientModel");
const ProjectModel = require("./../models/ProjectModel");

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
    client: {
      type: ClientType,
      resolve(parent, args, context) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});

//-----

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, context) {
        return ClientModel.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, context) {
        return ClientModel.find({});
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args, context) {
        return ProjectModel.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, context) {
        return ProjectModel.find({});
      },
    },
  },
});

//--------------------------------------------------------
module.exports = new GraphQLSchema({
  query: RootQuery,
});
