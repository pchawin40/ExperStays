// frontend/src/components/HomeFooterBar/HomeFooterBar.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './HomeFooterBar.css';

//? HomeFooterBar component
const HomeFooterBar = () => {
  return (
    <div className="outer-footer-container">
      <div className="footer-content-container">
        {/* map */}
        <div id="DIV_MAP">
          <button id="inner_div_map_button">
            Show map
            <i class="fa-solid fa-map"></i>
          </button>
        </div>


        <div className="lower_div_container">
          <div id="DIV_1">
            <span className="inner_div_1_content" id="SPAN_2">© 2022 Airbnb, Inc.</span>
            <span className="inner_div_1_content" id="SPAN_3">·</span>
            <a href="" className="inner_div_1_content" id="A_4">Privacy</a>
            <span className="inner_div_1_content" id="SPAN_5">·</span>
            <a href="" className="inner_div_1_content" id="A_6">Terms</a>
            <span className="inner_div_1_content" id="SPAN_7">·</span>
            <a href="" className="inner_div_1_content" id="A_8">Sitemap</a>
          </div>

          <div id="DIV_2">
            <div id="inner_div_1">
              <span className="inner_div_1_content">
                {/* globe icon */}
                <i className="fa-solid fa-globe" id="inner_div_1_globe"></i>
              </span>
              <span className="inner_div_1_content">
                {/* Language */}
                English (US)
              </span>
            </div>

            <div id="inner_div_2">
              <span className="inner_div_2_content_a">
                {/* currency */}
                $
              </span>
              <span className="inner_div_2_content_b">
                {/* dollar sign */}
                USD
              </span>
            </div>

            <div id="inner_div_3">
              {/* Support & resources */}
              <span className="inner_div_3_content">Support & resources</span>
              <i class="fa-solid fa-angle-up"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export HomeFooterBar
export default HomeFooterBar;
