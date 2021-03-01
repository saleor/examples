import { useGetLatestProductsQuery } from './generated/graphql';

type ProductsProps = {
  keyword?: string;
};

function Products({ keyword = 'juice' }: ProductsProps) {
  const { loading, error, data } = useGetLatestProductsQuery({
    variables: {
      keyword,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    const latestProducts = data.products?.edges;

    return (
      <div>
        {latestProducts?.length &&
          latestProducts.map(
            ({ node: { id, name, description, category } }) => (
              <div key={id}>
                <h3>{name}</h3>
                <p>{description}</p>
                <ul>
                  <li>{category?.name}</li>
                </ul>
              </div>
            ),
          )}
      </div>
    );
  }

  return null;
}

export default Products;
