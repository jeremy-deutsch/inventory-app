import { GraphQLServer } from "graphql-yoga";
import { prisma, Prisma } from "./generated/prisma-client";

interface Context {
  prisma: Prisma;
}

const resolvers = {
  Query: {
    feed: (parent: unknown, args: unknown, context: Context) => {
      return context.prisma.posts({ where: { published: true } });
    },
    drafts: (parent: unknown, args: unknown, context: Context) => {
      return context.prisma.posts({ where: { published: false } });
    },
    post: (parent: unknown, { id }: any, context: Context) => {
      return context.prisma.post({ id });
    }
  },
  Mutation: {
    createDraft(parent: unknown, { title, content }: any, context: Context) {
      return context.prisma.createPost({
        title,
        content
      });
    },
    deletePost(parent: unknown, { id }: any, context: Context) {
      return context.prisma.deletePost({ id });
    },
    publish(parent: unknown, { id }: any, context: Context) {
      return context.prisma.updatePost({
        where: { id },
        data: { published: true }
      });
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
