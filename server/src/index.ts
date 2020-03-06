import { GraphQLServer } from "graphql-yoga";
import { prisma, Prisma } from "./generated/prisma-client";

interface Context {
  prisma: Prisma;
}

const resolvers = {
  Query: {
    list(parent: unknown, args: unknown, context: Context) {
      return context.prisma.items();
    }
  },
  Mutation: {
    // the args are typed as any due to a deep, weird type error
    async add(parent: unknown, { item }: any, context: Context) {
      await context.prisma.createItem({ value: item });
      return context.prisma.items();
    },
    async delete(parent: unknown, { id }: any, context: Context) {
      await context.prisma.deleteItem({ id });
      return context.prisma.items();
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
