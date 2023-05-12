import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRedirectLoggedOutUser } from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetails.scss";
import DOMPurify from "dompurify";

const ProductDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const FRONTEND_URL = import.meta.env.VITE_APP_FRONTEND_URL

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const created = new Date(product.createdAt)
  const updated = new Date(product.updatedAt)

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success"> Em Estoque </span>;
    }
    return <span className="--color-danger"> Fora de Estoque</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  const handleClick = () => {
    sessionStorage.setItem('shouldReloadDashboard', 'true');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="product-detail">
      <button className='--btn --btn-primary' style={{marginTop: "1em"}} onClick={handleClick}> Voltar </button>
      <h3 className="--mt">Detalhes do Produto</h3>
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
              <Card cardClass="group_image">
                {product?.image ? (
                  <img
                    src={product.image.filePath}
                    alt={product.image.fileName}
                  />
                ) : (
                  <p>Nenhuma imagem inserida para este produto</p>
                )}
            </Card>
            <div className="info"> 
              <h4>Disponibilidade: {stockStatus(product.quantity)}</h4>
                <hr />
                <h4>
                  <span className="badge">Nome: </span> &nbsp; {product.name}
                </h4>
                <p>
                  <b>&rarr; SKU: </b> {product.sku}
                </p>
                <p>
                  <b>&rarr; Categoria: </b> {product.category}
                </p>
                <p>
                  <b>&rarr; Preço: </b> {"R$"}
                  {product.price}
                </p>
                <p>
                  <b>&rarr; Quantidade em Estoque: </b> {product.quantity}
                </p>
                <p>
                  <b>&rarr; Valor em Estoque: </b> {"R$"}
                  {product.price * product.quantity}
                </p>
                <hr />
                <p>
                  <b>&rarr; Descrição: </b>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
                ></div>
                <hr />
                <code className="--color-dark">
                  Criado em: {(created.toLocaleString('pt-BR'))}
                </code>
                <br />
                <code className="--color-dark">
                  Ultima Atualização: {(updated.toLocaleString('pt-BR'))}
                </code>
              </div>
            </div>
        )}
    </div>
  );
};

export default ProductDetails;