import axios from "axios";
import React, { FC, useState } from "react";

interface PropTypes {
	isSaved: boolean;
	isHover: boolean;
	id: string;
}

const Heart: FC<PropTypes> = ({ isSaved, isHover, id }) => {
	const [toggleSaved, setToggle] = useState(isSaved);

	const handleSaveTracks = async () => {
		if (toggleSaved) {
			console.log("removing ");
			const { data } = await axios.post(
				"http://localhost:3001/removeFromMySavedTracks",
				{
					id: id,
				}
			);

			console.log(data);
		} else {
			console.log("adding");
      			const { data } = await axios.post(
							"http://localhost:3001/addToMySavedTracks",
							{
								id: id,
							}
						);

						console.log(data);
		}

		setToggle(!toggleSaved);
	};

	return (
		<div className='flex justify-center' onClick={handleSaveTracks}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill={toggleSaved ? "#1db954" : "none"}
				viewBox='0 0 24 24'
				strokeWidth={isHover ? 1.5 : 0}
				stroke={toggleSaved ? "#1db954" : "#b3b3b3"}
				className='w-6 h-6'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
				/>
			</svg>{" "}
		</div>
	);
};

export default Heart;
