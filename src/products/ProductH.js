import Image from "./placeholder.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductH(props) {
  
  let product = props.product;

  const name = product.name;
  const id_lender = product.lender_id;

  const [lender, setLender] = useState([]);

  useEffect(() => {
    const fetchLenderInfos = async () => {
      try {
        let get = 'http://localhost:5000/api/lenders/' + id_lender
        const response = await axios.get(get);
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
        <div className="row g-0">
          <div className="col-4">
            <Link to="/product/1" href="!#" replace>
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt=""
                src={Image}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {name}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {lender.first_name}
                </span>
                <div className="mt-auto d-flex">
                <Link to="/product/1" href="!#" replace>
                  <button className="btn btn-outline-success ms-auto">
                    <FontAwesomeIcon icon={["fas", "phone"]} /> Contactez-moi
                  </button>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
