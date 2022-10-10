import { FC } from "react";

interface PropsTypes {
	image: any;
	isPublic: boolean;
	followers?: number;
	totalTracks: number;
	description?: string;
	title: string;
	userImage?: string;
	username: string;
}

const Banner: FC<PropsTypes> = (props) => {
	const {
		image,
		isPublic,
		followers = undefined,
		totalTracks,
		description,
		title,
		userImage,
		username,
	} = props;

	return (
		<div className='w-full flex justify-start items-end gap-10 px-8 py-4 mt-4'>
			{image}

			<div className='flex gap-4 flex-col'>
				<div data-testid='banner-id' className='font-bold uppercase text-xs'>
					{isPublic ? "public" : "private"} playlist
				</div>
				<div data-testid='banner-id' className='font-black text-6xl'>
					{title}
				</div>
				{description ? (
					<div data-testid='banner-id' className='font-medium'>
						{description}
					</div>
				) : null}

				<div className='flex items-center justify-start gap-2 text-xs font-medium'>
					{userImage ? (
						<img
							data-testid='banner-id'
							className='rounded-full w-8 h-8'
							src={userImage}
							alt='user-image'
						/>
					) : null}
					<div data-testid='banner-id'>{username}</div>.
					{followers !== undefined ? 
				(	<div data-testid='banner-id'>{followers} likes.</div>) : null}
					<div data-testid='banner-id'>{totalTracks} songs</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
