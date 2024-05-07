import Image from "./placeholder.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

function Product(props) {

  let product = props.product;

  const name = product.name;
  const id_lender = product.lender_id;
  const id = product.id

  const [lender, setLender] = useState([]);

  useEffect(() => {
    const fetchLenderInfos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lenders/' + id_lender);
        setLender(response.data); // Met à jour l'état avec les données récupérées depuis l'API
      } catch (error) {
        console.error('Error fetching lender:', error);
      }
    };

    fetchLenderInfos();
  }, []);

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={"/product/" + id} href="!#" replace>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={Image}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {name}
          </h5>
          <p className="card-text text-center text-muted mb-0">Proposé par : {lender.first_name}</p>
          <div className="d-grid d-block">
          <Link to={"/product/" + id} href="!#" replace>
            <button className="btn btn-outline-success mt-3">
              <FontAwesomeIcon icon={["fas", "phone"]} /> Contactez-moi
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
