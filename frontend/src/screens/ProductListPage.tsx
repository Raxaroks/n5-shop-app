import { useContext, useEffect, useMemo, useState } from 'react'
import { ProductContext } from '../context/product/product.context';
import { Pagination } from '../interfaces/common';
import { Product } from '../interfaces/entities/product.interface';
import { Spinner, ProductCard } from '../components';
import { AppConfig } from '../config/app.config';
import { ShoppingCartContext } from '../context/shopping-cart';

export type ProductPagination = Pagination & {
  products: Product[]
}

export const ProductListPage = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<ProductPagination>({
    total: 0,
    limit: 5,
    page: 1,
    products: []
  });

  const productService = useContext(ProductContext);
  const { items } = useContext(ShoppingCartContext);

  const fetchUsers = useMemo( () => async () => {
    try {
      setLoading(true);
      const { limit, page } = pagination;
      const response = await productService.findAll(limit, page);

      setPagination({
        ...pagination,
        products: response.products,
        total: response.total
      });
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  }, [pagination.page, items] );

  const movePage = (amount: number) => {
    const { page, } = pagination;
    const newPage = page+amount;

    setPagination({
      ...pagination,
      page: (newPage !== 0) ? newPage : 1,
    });
  }

  const areMorePages = (): boolean => {
    const { total, limit, products, page } = pagination;

    const inPreviousPage = limit * (page-1);
    const paginated = inPreviousPage + products.length

    if (paginated < total) return true;
    else return false;
  }

  useEffect( () => {
    document.title = `${ AppConfig().app.name } | Lista de Productos`
    fetchUsers();
  }, [fetchUsers] );

  const { products } = pagination;

  return (loading)
    ? (<Spinner size={100} />)
    : (
      (products.length > 0)
        ? <>
            <div className='product__pagination'>
              <h4>Page: { pagination.page }</h4>
              <div className="product__pagination-buttons">
                <button className={
                  (pagination.page === 1)
                    ? 'button fs-18 disabled'
                    : 'button fs-18'
                }
                  disabled={ (pagination.page === 1) }
                  onClick={ () => movePage(-1) }>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className={
                  (areMorePages())
                    ? 'button fs-18'
                    : 'button fs-18 disabled'
                }
                  onClick={ () => movePage(1) }
                  disabled={ !areMorePages() }>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="product__list">
              { products.map(prdct => (<ProductCard key={prdct.id} product = { prdct } />)) }
            </div>
          </>
        : <h2 className='m-auto'>No data to display</h2>
    )
}
