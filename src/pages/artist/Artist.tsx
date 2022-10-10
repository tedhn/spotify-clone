import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Artist = () => {
	const params = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
		onLoad();
	}, [params.id]);


  const onLoad =  () => {
    
  }

	return <div className="col-span-10">{params.id}</div>;
};

export default Artist;
