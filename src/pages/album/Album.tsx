import { checkSaved, getAlbums, getAlbumsTracks, getArtist } from "@/api";
import { Banner, ContextMenu, Heart, Listitem, Options } from "@/components";
import Loading from "@/components/loading/Loading";
import { AlbumType, ArtistType, SongType, TrackType } from "@/types";
import useContextMenu from "@/useContextMenu";
import { convertDuration } from "@/utils";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";

const Album = () => {
	const navigate = useNavigate();
	const params = useParams();

	const {
		playlistRef,
		isShowMenu,
		anchorPoints,
		selectedURI,
		selectedID,
		handleOptionClick,
	} = useContextMenu();

	const [album, setAlbum] = useState<{
		albumData: AlbumType | undefined;
		artistData: ArtistType | undefined;
		tracks: Array<TrackType>;
		isSavedList: Array<boolean>;
		isLoading: boolean;
	}>({
		albumData: undefined,
		artistData: undefined,
		tracks: [],
		isSavedList: [],
		isLoading: true,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		setAlbum({
			albumData: undefined,
			artistData: undefined,
			tracks: [],
			isSavedList: [],
			isLoading: true,
		});
		onLoad();
	}, [params.id]);

	const onLoad = async () => {
		const albumData = await getAlbums(params.id!);
		const artistData = await getArtist(albumData.artists[0].id);
		const { newTracks, newSavedList } = await getSongs(0);

		setAlbum({
			albumData: albumData,
			artistData: artistData,
			tracks: newTracks,
			isSavedList: newSavedList,
			isLoading: false,
		});
	};

	const getSongs = async (offset: number) => {
		const tracks = await getAlbumsTracks(params.id!, offset);

		const isSavedList = await checkSaved(
			tracks.map((track: TrackType) => track.id)
		);

		return { newTracks: tracks, newSavedList: isSavedList };
	};

	const handleLoadMoreSongs = async () => {
		const { newTracks, newSavedList } = await getSongs(album.tracks.length);

		setAlbum({
			...album,
			tracks: [...album.tracks, ...newTracks],
			isSavedList: [...album.isSavedList, ...newSavedList],
		});
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

			{album.isLoading ? (
				<Loading />
			) : (
				<>
					<Banner
						image={
							<img
								data-testid='banner-id'
								src={album.albumData?.images[0].url}
								alt='playlist-image'
								className='object-cover w-64 h-64 '
							/>
						}
						type={
							<div
								data-testid='banner-id'
								className='font-bold uppercase text-xs'>
								{album.albumData?.album_type}
							</div>
						}
						totalTracks={album.albumData?.total_tracks}
						title={album.albumData?.name}
						username={album.albumData?.artists[0].name}
						userImage={album.artistData?.images[0].url}
					/>

					<Options isShowHeart={true} isShowOption={true} />
					<div className='px-8 pb-12'>
						<InfiniteScroll
							dataLength={album.tracks.length}
							next={handleLoadMoreSongs}
							hasMore={
								album.albumData?.total_tracks === album.tracks.length
									? false
									: true
							}
							loader={<h4 className='py-4'>Loading...</h4>}>
							<div ref={playlistRef}>
								{album.tracks.map((track: TrackType, index: number) => {
									if (track !== null) {
										return (
											<Listitem
												key={track.id + index}
												uri={track.uri}
												render={(
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
														<div className='col-span-6'>
															<div
																className='text-sm text-white '
																data-testid='listitem-id'>
																{track.name}
															</div>
															<div
																data-testid='listitem-id'
																className='hover:text-white hover:underline'
																onClick={() =>
																	navigate(
																		`/dashboard/artist/${track.artists[0].id}`
																	)
																}>
																{track.artists[0].name}
															</div>
														</div>

														<div className='col-start-10 col-end-11'>
															<Heart
																isSaved={album.isSavedList[index]}
																isHover={isHover}
																id={track.id}
															/>
														</div>

														<div
															className='text-center '
															data-testid='listitem-id'>
															{convertDuration(track.duration_ms)}
														</div>
														<div
															className='flex flex-col items-center justify-center relative'
															ref={optionRef}
															onClick={(e: React.MouseEvent<HTMLDivElement>) =>
																handleOptionClick(
																	track.id,
																	track.uri,
																	e,
																	menuRef,
																	optionRef
																)
															}>
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

export default Album;
