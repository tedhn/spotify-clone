import { checkSaved, getAlbums, getAlbumsTracks, getArtist } from "@/api";
import { Banner, ContextMenu, Heart, Listitem, Options } from "@/components";
import { AlbumType, ArtistType, SongType, TrackType } from "@/types";
import useContextMenu from "@/useContextMenu";
import { convertDuration } from "@/utils";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const Album = () => {
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

	const [album, setAlbum] = useState<AlbumType>();
	const [artist, setArtist] = useState<ArtistType>();
	const [tracks, setTracks] = useState<Array<TrackType>>([]);
	const [isSavedList, setSavedList] = useState<Array<boolean>>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		onLoad();
	}, [params.id]);

	const onLoad = async () => {
		const albumData = await getAlbums(params.id!);
		const albumTracks = await getAlbumsTracks(params.id!, 0);

		const artist = await getArtist(albumData.artists[0].id);

		const savedArr = await checkSaved(
			albumTracks.items.map((track: TrackType) => track.id)
		);

		setAlbum(albumData);
		setArtist(artist);
		setSavedList(savedArr);
		setTracks(albumTracks.items);
	};

	const getMoreSongs = async () => {
		const moreTracks = await getAlbumsTracks(params.id!, tracks.length);


		setTracks([...tracks, ...moreTracks.items]);
	};

	return (
		<div className='col-span-10'>
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
						src={album?.images[0].url}
						alt='playlist-image'
						className='object-cover w-64 h-64 '
					/>
				}
				type={
					<div data-testid='banner-id' className='font-bold uppercase text-xs'>
						{album?.type}
					</div>
				}
				totalTracks={album?.total_tracks}
				title={album?.name}
				username={album?.artists[0].name}
				userImage={artist?.images[0].url}
			/>

			<Options isSHowHeart={true} isSHowOption={true} />
			<div className='px-8 pb-12'>
				<InfiniteScroll
					dataLength={tracks.length}
					next={getMoreSongs}
					hasMore={album?.total_tracks === tracks.length ? false : true}
					loader={<h4 className='py-4'>Loading...</h4>}>
					<div ref={playlistRef}>
						{tracks.map((track: TrackType, index: number) => {
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
												<div className='col-span-6'>
													<div
														className='text-sm text-white '
														data-testid='listitem-id'>
														{track.name}
													</div>
													<div data-testid='listitem-id'>
														{track.artists[0].name}
													</div>
												</div>

												<div className='col-start-10 col-end-11'>
													<Heart
														isSaved={isSavedList[index]}
														isHover={isHover}
														id={track.id}
													/>
												</div>

												<div className='text-center ' data-testid='listitem-id'>
													{convertDuration(track.duration_ms)}
												</div>
												<div
													className='flex flex-col items-center justify-center relative'
													ref={optionRef}
													onClick={(e: React.MouseEvent<HTMLDivElement>) => {
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

export default Album;
