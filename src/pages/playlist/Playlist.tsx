import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { RootState } from "@/store";
import { Banner, Listitem, Options, ContextMenu, Heart } from "@/components";
import { convertDate, convertDuration } from "@/utils";
import {
	PlaylistDataType,
	PlaylistType,
	SongType,
	TrackType,
	UserType,
} from "@/types";
import useContextMenu from "@/useContextMenu";
import { checkSaved, getPlaylistData, getPlaylistTracks, getUser } from "@/api";
import Loading from "@/components/loading/Loading";

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

	// const playlists = useSelector((state: RootState) => state.playlist.playlists);

	const [playlist, setPlaylist] = useState<{
		playlistData: PlaylistDataType | undefined;
		userData: UserType | undefined;
		isSavedList: Array<boolean>;
		tracks: Array<SongType>;
		isLoading: boolean;
	}>({
		playlistData: undefined,
		userData: undefined,
		tracks: [],
		isSavedList: [],
		isLoading: true,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		setPlaylist({
			playlistData: undefined,
			userData: undefined,
			tracks: [],
			isSavedList: [],
			isLoading: true,
		});
		onLoad();
	}, [params.id]);

	const onLoad = async () => {
		const playlistData = await getPlaylistData(params.id!);
		const user = await getUser(playlistData.owner.id);

		console.log(playlist.tracks);
		const { newTracks, newSavedList } = await getSongs(0);

		setPlaylist({
			...playlist,
			playlistData: playlistData,
			userData: user,
			tracks: newTracks,
			isSavedList: newSavedList,
			isLoading: false,
		});
	};

	const getSongs = async (offset?: number) => {
		const tracks = await getPlaylistTracks(
			params.id!,
			offset !== undefined ? offset : playlist.tracks.length
		);

		const isSavedList = await checkSaved(
			tracks.map((track: SongType) => track.track.id)
		);

		return { newTracks: tracks, newSavedList: isSavedList };
	};

	const handleLoadMoreSongs = async () => {
		const { newTracks, newSavedList } = await getSongs();

		setPlaylist({
			...playlist,
			tracks: [...playlist.tracks, ...newTracks],
			isSavedList: [...playlist.isSavedList, ...newSavedList],
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

			{playlist.isLoading === true ? (
				<Loading />
			) : (
				<>
					<Banner
						image={
							<img
								data-testid='banner-id'
								src={playlist.playlistData?.images[0].url}
								alt='playlist-image'
								className='object-cover w-64 h-64 '
							/>
						}
						type={
							<div
								data-testid='banner-id'
								className='font-bold uppercase text-xs'>
								{playlist.playlistData?.public
									? "public playlist"
									: "private playlist"}
							</div>
						}
						totalTracks={playlist.playlistData?.tracks.total}
						description={playlist.playlistData?.description}
						title={playlist.playlistData?.name}
						username={playlist.playlistData?.owner.display_name}
						followers={playlist.playlistData?.followers.total}
						userImage={playlist.userData?.images[2]?.url}
					/>
					<Options isShowHeart={true} isShowOption={true} />
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
							dataLength={playlist.tracks.length}
							next={handleLoadMoreSongs}
							hasMore={
								playlist.playlistData?.tracks.total === playlist.tracks.length
									? false
									: true
							}
							loader={<Loading />}>
							<div ref={playlistRef}>
								{playlist.tracks.map((song: SongType, index: number) => {
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
													setIsHover: React.Dispatch<
														React.SetStateAction<boolean>
													>
												) => (
													<div
														className='grid grid-cols-12   items-center  font-medium text-xs text-lightgrey py-1 cursor-pointer hover:bg-lightgrey/20 hover:text-white rounded'
														onMouseEnter={() => setIsHover(true)}
														onMouseLeave={() => setIsHover(false)}>
														<div
															className='text-center'
															data-testid='listitem-id'>
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

														<div
															className='col-span-2'
															data-testid='listitem-id'>
															{track.album.name}
														</div>
														<div
															className='text-start'
															data-testid='listitem-id'>
															{convertDate(song.added_at)}
														</div>

														<Heart
															isSaved={playlist.isSavedList[index]}
															isHover={isHover}
															id={track.id}
														/>

														<div
															className='text-center'
															data-testid='listitem-id'>
															{convertDuration(track.duration_ms)}
														</div>
														<div
															className='flex flex-col items-center justify-center relative'
															ref={optionRef}
															onClick={(
																e: React.MouseEvent<HTMLDivElement>
															) => {
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
				</>
			)}
		</div>
	);
};

export default Playlist;
