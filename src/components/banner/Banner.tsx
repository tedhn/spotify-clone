import { FC } from "react";

interface PropsTypes {
	image?: React.ReactNode;
	type: React.ReactNode;
	followers?: number;
	totalTracks?: number;
	description?: string;
	title: string | undefined;
	userImage?: string;
	username?: string;
	backgroundImage?: string;
}

const Banner: FC<PropsTypes> = (props) => {
	const {
		image,
		type,
		followers = undefined,
		totalTracks,
		description,
		title,
		userImage,
		username = "",
		backgroundImage = "",
	} = props;

	return (
		<div className='col-span-10 flex justify-start items-end gap-10 px-8 py-4 mt-4'>
			{image}

			<div className='flex gap-4 flex-col'>
				{type}
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
					{username !== "" ? (
						<div data-testid='banner-id'>{username}</div>
					) : null}
					{followers !== undefined ? (
						<div data-testid='banner-id'>{followers} likes</div>
					) : null}
					{totalTracks !== undefined ? (
						<div data-testid='banner-id'>{totalTracks} songs</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Banner;
