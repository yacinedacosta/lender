import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios';

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

const categories = [
  "Tout voir",
  "Divers",
  "Services",
  "Outils",
  "Vehicules"
]

const ProductList = () => {
  const [viewType, setViewType] = useState({ grid: true });
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState(["Tout voir"]);

  let {zone} = useParams();

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let sql = zone ? 'http://localhost:5000/api/products/' + zone : 'http://localhost:5000/api/products'
        const response = await axios.get(sql);
        setProducts(response.data); // Met à jour l'état avec les données récupérées depuis l'API
        console.log(sql)
        console.log(response)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // const fetchCategories = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/categories/');
    //     setCategories(categories.join(response.data))
    //   } catch (error) {
    //     console.error('Error fetching categories:', error);
    //   }
    // };

    // fetchCategories();
  }, []);

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              Tous les prêts
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {regions[zone]}
          </li>
        </ol>
      </nav>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
          <ul className="list-group list-group-flush rounded">
            <li className="list-group-item d-none d-lg-block">
              <h5 className="mt-1 mb-2">Catégories</h5>
              <div className="d-flex flex-wrap my-2">
                {categories.map((v, i) => {
                  return (
                    <Link
                      key={i}
                      to="/products"
                      className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                      replace
                    >
                      {v}
                    </Link>
                  );
                })}
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="J'ai besoin de..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {products.map((val, index) => {
                if (viewType.grid) {
                  return (
                    <Product product={val} />
                  );
                }
                return (
                  <ProductH product={val} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
