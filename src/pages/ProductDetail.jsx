import { useParams } from "react-router-dom";

function ProductDetail() {
  const { barcode } = useParams();
  return <h2>Product Detail: {barcode}</h2>;
}

export default ProductDetail;
