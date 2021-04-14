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
    const latestProducts = data.products?.edges || [];

    return (
      <div className='d-grid gap-3'>
        {latestProducts?.length > 0 &&
          latestProducts.map(
            ({ node: { id, name, description, category } }) => (
              <div key={id} className='card'>
                <div className='card-body'>
                  <h3 className='card-title'>{name}</h3>
                  <p className='card-subtitle'>{category?.name}</p>
                  <p>{description}</p>
                </div>
              </div>
            ),
          )}
      </div>
    );
  }

  return null;
}

export default Products;
