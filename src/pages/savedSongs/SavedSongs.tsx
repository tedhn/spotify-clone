import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { Banner, ContextMenu, Listitem, Options } from "@/components";
import { setSavedTracks } from "@/Slices/savedTracksSlice";
import { RootState } from "@/store";
import { SongType } from "@/types";
import { convertDate, convertDuration } from "@/utils";
import useContextMenu from "@/useContextMenu";
import { getSavedTracks } from "@/api";
import { useNavigate } from "react-router-dom";

const SavedSongs = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { playlistRef, isShowMenu, anchorPoints, selected, handleOptionClick } =
		useContextMenu();

	const { total } = useSelector((rootState: RootState) => rootState.tracks);

	const [tracks, setTracks] = useState<Array<SongType>>([]);
	const [totalTracks, setTotal] = useState<number>(total);

	const user = useSelector((rootState: RootState) => rootState.auth.user);

	useEffect(() => {
		loadSongs();
	}, []);

	const loadSongs = async () => {
		const data = await getSavedTracks(tracks.length);

		setTracks([...tracks, ...data.items]);

		console.log(data.items);
		dispatch(
			setSavedTracks({ total: data.total, tracks: [...tracks, ...data.items] })
		);
	};

	const handleNavigate = (type: string, id: string) => {
		navigate(`/dashboard/${type}/${id}`);
	};

	return (
		<div className='col-span-10'>
			{isShowMenu && (
				<ContextMenu anchorPoints={anchorPoints} selected={selected} />
			)}

			<Banner
				image={
					<div className='object-cover w-64 h-64 relative bg-black/30'>
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-12 h-12 cursor-pointer hover:stroke-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
								/>
							</svg>
						</div>
					</div>
				}
				type={
					<div data-testid='banner-id' className='font-bold uppercase text-xs'>
						{false ? "public playlist" : "private playlist"}
					</div>
				}
				totalTracks={totalTracks}
				title={"Liked Songs"}
				username={user?.display_name}
				userImage={user?.images[0]?.url}
			/>
			<Options />

			<div className='px-8 pb-12'>
				<div className=' grid grid-cols-12 items-center font-medium text-xs text-lightgrey mb-8 cursor-pointer'>
					<div className='text-center'>#</div>
					<div className='col-span-5 text-start'>TITLE</div>
					<div className='col-span-2 '>ALBUM</div>
					<div className='col-span-2 text-start'>DATE RELEASED</div>
					<div className='flex justify-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
				</div>

				<InfiniteScroll
					dataLength={tracks.length}
					next={loadSongs}
					hasMore={total === tracks.length ? false : true}
					loader={<h4 className='py-4'>Loading...</h4>}>
					<div ref={playlistRef}>
						{tracks.map((song: SongType, index: number) => {
							const { track } = song;
							return (
								<Listitem
									key={song.track.id + index}
									uri={song.track.uri}
									render={(
										isHover: boolean,
										menuRef: HTMLDivElement,
										optionRef: HTMLDivElement,
										setIsHover: React.Dispatch<React.SetStateAction<boolean>>
									) => (
										<div
											className='grid grid-cols-12   items-center  font-medium text-xs text-lightgrey py-1 cursor-pointer hover:bg-lightgrey/20 hover:text-white rounded'
											onMouseEnter={() => setIsHover(true)}
											onMouseLeave={() => setIsHover(false)}>
											<div className='text-center' data-testid='listitem-id'>
												{index + 1}
											</div>
											<img
												className='w-10 h-10'
												src={song.track.album.images[0].url}
												alt='track-image'
												data-testid='listitem-id'
											/>
											<div className='col-span-4'>
												<div
													className='text-sm text-white w-72 overflow-hidden text-ellipsis whitespace-nowrap'
													data-testid='listitem-id'>
													{song.track.name}
												</div>
												<div
													data-testid='listitem-id'
													className='hover:text-white hover:underline'
													onClick={() =>
														handleNavigate("artist", track.artists[0].id)
													}>
													{song.track.album.artists[0].name}
												</div>
											</div>

											<div
												className='col-span-2 hover:text-white hover:underline'
												data-testid='listitem-id'
												onClick={() => handleNavigate("album", track.album.id)}>
												{song.track.album.name}
											</div>
											<div
												className='col-span-2 text-start'
												data-testid='listitem-id'>
												{convertDate(song.added_at)}
											</div>
											<div className='text-center' data-testid='listitem-id'>
												{convertDuration(song.track.duration_ms)}
											</div>

											<div
												className='flex flex-col items-center justify-center relative'
												//@ts-ignore
												ref={optionRef}
												onClick={(e: React.MouseEvent<HTMLDivElement>) => {
													handleOptionClick(
														track.id,
														track.artists[0].id,
														track.album.id,
														track.uri,
														true,
														e,
														menuRef!,
														optionRef!
													);
												}}>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth={1.5}
													stroke='currentColor'
													className='w-6 h-6'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
													/>
												</svg>
											</div>
										</div>
									)}
								/>
							);
						})}
					</div>
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default SavedSongs;
