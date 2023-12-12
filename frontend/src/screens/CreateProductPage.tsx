import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { AppConfig } from '../config/app.config';
import { FormikConfig, useFormik } from 'formik';
import { Product } from '../interfaces/entities/product.interface';
import { ProductContext } from '../context/product';
import { Spinner } from '../components';
import { toast } from 'react-toastify';

export const CreateProductPage = () => {
  const productService = useContext(ProductContext);
  const [loading, setLoading] = useState(false);

  const fc: FormikConfig<Product> = {
    initialValues: {
      name: '',
      price: 0,
      stock: 0,
      img: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Este campo es requerido!').min(3, 'El nombre debe tener al menos 3 letras!'),
      price: Yup.number().min(0),
      stock: Yup.number().min(0),
      img: Yup.string()
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await toast.promise(productService.create(values), {
        pending: 'Intentando crear el producto...',
        success: 'Producto creado!',
        error: 'Hubo un problema al contactar al servidor...'
      })
      setLoading(false);
      resetForm();
    },
  }

  const { getFieldProps, handleSubmit, touched, errors, isValid, resetForm } = useFormik<Product>(fc);

  useEffect(() => {
    document.title = `${AppConfig().app.name} | Crear un producto`
  }, []);

  return (
    (loading)
      ? (<Spinner size={100} />)
      : (<>
        <h2>Crear un producto nuevo</h2>
        <form onSubmit={ handleSubmit } className='app__form' noValidate>
          <div className="app__form-row">
            <label className='app__form-label' htmlFor="">
              Nombre
              <input type="text"
              className={ errors.name ? 'app__form-label-input-error' : ''}
                placeholder='Escribe el nombre del producto'
                {...getFieldProps('name')} />
              {
                touched.name && errors.name && <span className='app__form-field__error'>
                  {errors.name}
                </span>
              }
            </label>
          </div>
          <div className="app__form-row">
            <label className='app__form-label' htmlFor="">
              Precio:
              <input type="number"
                {...getFieldProps('price')} />
            </label>
            <label className='app__form-label' htmlFor="">
              Disponibles:
              <input type="number"
                {...getFieldProps('stock')} />
            </label>
          </div>
          <div className="app__form-row">
            <label className='app__form-label' htmlFor="">
              URL de la imagen:
              <input type="text"
                {...getFieldProps('img')} />
            </label>
          </div>

          <div className="app__form-row">
            <button className="button-secondary fs-16 m-1"
              onClick={ () => resetForm() }>Limpiar</button>
            <button type='submit' className={
              !isValid ? 'button fs-16 m-1 disabled' : 'button fs-16 m-1'
            }
              disabled={ !isValid }>Crear</button>
          </div>
        </form>
      </>)
  )
}
