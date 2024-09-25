export const paginator = (reqPage, perpage) => {
  const page = !reqPage ? 0 : reqPage - 1;
  const limit = !perpage ? 10 : perpage;
  const offset = page * limit;

  return {
    offset,
    limit,
  };
};
