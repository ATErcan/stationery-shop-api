const buildProductQuery = (req) => {
  const { category, search } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  return query;
};

const buildSortQuery = (req) => {
  const { sort } = req.query;

  if (!sort) {
    return { createdAt: -1 };
  }

  const sortFields = ["name", "price", "createdAt"];
  const isDescending = sort.startsWith("-");
  const field = isDescending ? sort.substring(1) : sort; // Remove "-" for clean field name

  if (!sortFields.includes(field)) {
    return { createdAt: -1 };
  }

  return { [field]: isDescending ? -1 : 1 };
};

module.exports = { buildProductQuery, buildSortQuery };