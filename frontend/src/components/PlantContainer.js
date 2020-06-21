import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HEROKU, TOKEN } from "./Constant";
import axios from "axios";

const PlantContainer = () => {
  const params = useParams();
  const [plantDetail, setPlantDetail] = useState({});

 

    useEffect(() => {
      axios({
        method: "GET",
        url: `${HEROKU}/${params.id}`,
        params: {
          token: TOKEN,
        },
      })
        .then((result) => {
            debugger
          setPlantDetail(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [params.id]);

    const singlePlantDisplay = () =>{
        return(
            <div className="plantDisplay">
                <h2>{plantDetail.common_name}</h2>
                <h3>Family Name:</h3>
                <p>{plantDetail.family_common_name !== null ? plantDetail.family_common_name : plantDetail.common_name}</p>
                <h3>Scientific Name:</h3>
                <p>{plantDetail.scientific_name}</p>
                {displayImgs(plantDetail.images)}
            </div>
        )
    };

    const displayImgs =(images) =>{
        debugger;
        let imagesArr = [];
        for(let i in images){
            imagesArr.push(<li><img src={images[i].url}/></li>)
        }
        return imagesArr;
    }


  return (
    <div>
      <h1>Plant Detail</h1>
      {singlePlantDisplay()}
    </div>
  );
};
export default PlantContainer;