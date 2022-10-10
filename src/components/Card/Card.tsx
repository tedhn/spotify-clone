import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PropsType {
	result: any;
	subtitle: string;
}

const Card: FC<PropsType> = ({ result, subtitle }) => {
	const navigate = useNavigate();

	const handleOnClick = (type: string, id: string) => {
		navigate(`/dashboard/${type}/${id}`);
	};
	return (
		<div
			className='flex w-44 flex-col items-center justify-center gap-2 px-4 my-2 rounded-md cursor-pointer bg-black/30 hover:bg-grey/30'
			onClick={() => handleOnClick(result.type, result.id)}>
			{result.images.length !== 0 ? (
				<img
					src={result.images[0].url}
					alt='404'
					className='w-32 h-32 mt-4 rounded-full object-cover'
				/>
			) : (
				<div className='relative w-32 h-32 mt-4 rounded-full object-fit bg-darkgrey/50'>
					<div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
						?
					</div>
				</div>
			)}
			<div className='w-full my-4 text-left '>
				<div className='w-28 overflow-hidden text-sm text-left text-ellipsis whitespace-nowrap'>
					{result.name}
				</div>
				<div className='w-full text-sm text-left'>{subtitle}</div>
			</div>
		</div>
	);
};

export default Card;
