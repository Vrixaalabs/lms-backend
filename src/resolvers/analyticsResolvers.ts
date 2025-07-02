export const analyticsResolvers = {
  Query: {
    generateCustomReport: async (_, { metrics, filters }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await ReportService.generate(metrics, filters, user.id);
    }
  }
};