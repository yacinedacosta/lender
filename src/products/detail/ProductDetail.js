import Image from "../placeholder.png";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const regions = {
  "ARA" : "Auvergne Rhône-Alpes",
  "BFC" : "Bourgogne Franche-Comté",
  "BRT" : "Bretagne",
  "CVL" : "Centre Val de Loire",
  "CRS" : "Corse",
  "GE" : "Grand Est",
  "HF" : "Hauts de France",
  "IDF" : "Ile de France",
  "NRM" : "Normandie",
  "NAQ" : "Nouvelle Aquitaine",
  "OCT" : "Occitanie",
  "PDL" : "Pays de la Loire",
  "PACA" : "Provence Alpes Côte d'Azur",
}

function ProductDetail() {

  let {id} = useParams();

  const [product, setProduct] = useState([]);
  const [lender, setLender] = useState([]);

  useEffect(() => {
    const fetchLenderInfos = async () => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/product/' + id);
          setProduct(response.data); // Met à jour l'état avec les données récupérées depuis l'API
          console.log(id)
        } catch (error) {
          console.error('Error fetching produsct:', error);
        }
      };
  
      fetchProduct();

      try {
        const response = await axios.get('http://localhost:5000/api/lenders/' + product.lender_id);
        setLender(response.data); // Met à jour l'état avec les données récupérées depuis l'API
      } catch (error) {
        console.error('Error fetching lender:', error.message);
      }
    };

    fetchLenderInfos();
  }, [id, product]);

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              Tous les prêts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to={"/products/" + product.region}>
              <a className="text-decoration-none link-secondary" href="!#">
                {regions[product.region]}
              </a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={Image}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{product.name}</h2>
            <h4 className="text-muted mb-4"></h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-success py-2 w-100">
                  <FontAwesomeIcon icon={["fas", "phone"]} /> Contactez-moi
                </button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Lender</dt>
              <dd className="col-sm-8 mb-3">{lender.last_name} {lender.first_name}</dd>

              <dt className="col-sm-4">Adresse</dt>
              <dd className="col-sm-8 mb-3">{lender.address}</dd>

              <dt className="col-sm-4">Numéro</dt>
              <dd className="col-sm-8 mb-3">{lender.phone_number}</dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
                {product.description}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
