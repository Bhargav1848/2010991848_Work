import "../Styles/map.css";
import React from "react";
export default function Map() {
  return (
    <div>
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            class="gmap_iframe"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Neelam Hospital,Rajpura&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
          <a href="https://piratebay-proxys.com/">Piratebay</a>
        </div>
      </div>
    </div>
  );
}
