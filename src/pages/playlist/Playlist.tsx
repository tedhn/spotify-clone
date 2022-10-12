import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { RootState } from "@/store";
import { Banner, Listitem, Options, ContextMenu, Heart } from "@/components";
import { convertDate, convertDuration } from "@/utils";
import { SongType } from "@/types";
import useContextMenu from "@/useContextMenu";
import { checkSaved, getPlaylistData, getPlaylistTracks, getUser } from "@/api";

const Playlist = () => {
	const params = useParams();
	const {
		playlistRef,
		isShowMenu,
		anchorPoints,
		selectedURI,
		selectedID,
		setSelectedURI,
		setSelectedID,
		toggleContextMenu,
	} = useContextMenu();

	const playlists = useSelector((state: RootState) => state.playlist.playlists);
	const playlist = playlists.filter((playlist) => playlist.id === params.id)[0];

	const [current, setCurrent] = useState<any>({
		imageURL: "",
		isPublic: false,
		totalTracks: 0,
		description: "",
		title: "",
		username: "",
		followers: 0,
		userImage: "",
		tracks: [],
		isSavedList: [],
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		onLoad();
	}, [params.id]);

	const onLoad = async () => {
		// const { tracks, playlistData, userImage } = await getPlaylistData(
		// 	playlist.owner.id,
		// 	params.id!
		// );

		const playlistData = await getPlaylistData(params.id!);

		const user = await getUser(playlistData.owner.id);

		const tracks = await getPlaylistTracks(params.id!, current.tracks.length);

		const isSavedList = await checkSaved(
			tracks.map((track: any) => track.track.id)
		);

		setCurrent({
			...current,
			imageURL: playlistData.images[0]?.url,
			isPublic: playlistData.public,
			totalTracks: playlistData.tracks.total,
			description: playlistData.description,
			title: playlistData.name,
			username: playlistData.owner.display_name,
			followers: playlistData.followers.total,
			userImage: user.images[0]?.url,
			tracks: tracks,
			isSavedList: isSavedList,
		});
	};

	const getMoreSongs = async () => {
		const tracks = await getPlaylistTracks(params.id!, current.tracks.length);

		const isSavedList = await checkSaved(tracks);

		setCurrent({
			...current,
			tracks: [...current.tracks, ...tracks],
			isSavedList: [...current.isSavedList, ...isSavedList],
		});
	};

	return (
		<div className='col-span-10' id='scrollableDiv'>
			{isShowMenu && (
				<ContextMenu
					anchorPoints={anchorPoints}
					uri={selectedURI}
					songID={selectedID}
				/>
			)}

			<Banner
				image={
					<img
						data-testid='banner-id'
						src={current.imageURL}
						alt='playlist-image'
						className='object-cover w-64 h-64 '
					/>
				}
				type={
					<div data-testid='banner-id' className='font-bold uppercase text-xs'>
						{current.isPublic ? "public playlist" : "private playlist"} 
					</div>
				}
				totalTracks={current.totalTracks}
				description={current.description}
				title={current.title}
				username={current.username}
				followers={current.followers}
				userImage={current.userImage}
			/>
			<Options isSHowHeart={true} isSHowOption={true} />
			<div className='px-8 pb-12'>
				<div className=' grid grid-cols-12 items-center font-medium text-xs text-lightgrey mb-8 cursor-pointer'>
					<div className='text-center'>#</div>
					<div className='col-span-5 text-start'>TITLE</div>
					<div className='col-span-2 '>ALBUM</div>
					<div className='col-span-2 text-start'>DATE RELEASED</div>
					<div className='col-start-11 col-end-12 flex justify-center'>
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
					dataLength={current.tracks}
					next={getMoreSongs}
					hasMore={current.totalTracks === current.tracks.length ? false : true}
					loader={<h4 className='py-4'>Loading...</h4>}>
					<div ref={playlistRef}>
						{current.tracks.map((song: SongType, index: number) => {
							const { track } = song;

							if (track !== null) {
								return (
									<Listitem
										key={track.id + index}
										uri={track.uri}
										render={(
											// handleClick: () => void,
											isHover: boolean,
											menuRef: any,
											optionRef: any,
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
													src={track.album.images[0].url}
													alt='track-image'
													data-testid='listitem-id'
												/>
												<div className='col-span-4'>
													<div
														className='text-sm text-white '
														data-testid='listitem-id'>
														{track.name}
													</div>
													<div data-testid='listitem-id'>
														{track.album.artists[0].name}
													</div>
												</div>

												<div className='col-span-2' data-testid='listitem-id'>
													{track.album.name}
												</div>
												<div className='text-start' data-testid='listitem-id'>
													{convertDate(song.added_at)}
												</div>

												<Heart
													isSaved={current.isSavedList[index]}
													isHover={isHover}
													id={track.id}
												/>

												<div className='text-center' data-testid='listitem-id'>
													{convertDuration(track.duration_ms)}
												</div>
												<div
													className='flex flex-col items-center justify-center relative'
													ref={optionRef}
													onClick={(e: any) => {
														setSelectedID(track.id);
														setSelectedURI(track.uri);
														toggleContextMenu(e, menuRef, optionRef);
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
							}
						})}
					</div>
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default Playlist;
