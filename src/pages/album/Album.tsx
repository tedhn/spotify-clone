import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Album = () => {


	const params = useParams();

  	useEffect(() => {
			window.scrollTo(0, 0);
			onLoad();
		}, [params.id]);


    const onLoad = () => {
      
    }

  return <div className="cols-span-10">{params.id}</div>;
};

export default Album;
