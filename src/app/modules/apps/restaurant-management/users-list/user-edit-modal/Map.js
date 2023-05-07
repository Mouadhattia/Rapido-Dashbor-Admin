
import React, { useEffect, useState } from 'react';
import iFrameResize from 'iframe-resizer';
import { MapContainer, TileLayer, Popup,Marker } from 'react-leaflet'

function MyMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  


  useEffect(()=>{
    setTimeout(() => {
        let iframe = document.getElementById('wa3');
        console.log(iframe);
        iframe.onload = function() {
            iFrameResize({log:true})
            let map = iframe.contentWindow.document.getElementById('mapDiv');
         console.log(map);
          };
      }, 100);
  },[])


  return (
    <div style={{height:"30vh"}}>
<iframe
  src="https://maps.google.com/maps?q=Av.de%20la%20R%C3%A9publique%20-%20%D8%B4%D8%A7%D8%B1%D8%B9%20%D8%A7%D9%84%D8%AC%D9%8F%D9%85%D9%87%D9%88%D8%B1%D9%8A%D9%91%D8%A9,%20Gabes&t=&z=13&ie=UTF8&iwloc=&output=embed"
  width="600"
  height="300"
  id='wa3'
 
>
</iframe>

    </div>
   
  );
}

export default MyMap;