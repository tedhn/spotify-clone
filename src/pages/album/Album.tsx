import { getAlbums, getAlbumsTracks } from "@/api";
import { Heart, Listitem, Options } from "@/components";
import { SongType } from "@/types";
import { convertDate, convertDuration } from "@/utils";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const Album = () => {
	const params = useParams();

	const [album, setAlbum] = useState<any>({});

	const [tracks, setTracks] = useState<Array<SongType>>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		onLoad();
	}, [params.id]);

	const onLoad = async () => {
		const albumData = await getAlbums(params.id!);
		const albumTracks = await getAlbumsTracks(params.id!, 0);

		setAlbum(albumData);
		setTracks(albumTracks.items);
	};

	const getMoreSongs = async () => {
		const moreTracks = await getAlbumsTracks(params.id!, tracks.length);

		setTracks([...tracks, ...moreTracks.items]);
	};

	console.log(album.totalTracks, tracks.length);

	return (
		<div className='col-span-10'>
			{" "}
			<Options isSHowHeart={true} isSHowOption={true} />
			<div className='px-8 pb-12'>
				<InfiniteScroll
					dataLength={tracks.length}
					next={getMoreSongs}
					hasMore={album.total_tracks === tracks.length ? false : true}
					loader={<h4 className='py-4'>Loading...</h4>}>
					<div>
						{tracks.map((track: any, index: number) => {
							console.log(track);

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

												{/* 
											<Heart
												isSaved={current.isSavedList[index]}
												isHover={isHover}
												id={track.id}
											/> */}

												<div
													className='text-center col-start-11 col-end-12'
													data-testid='listitem-id'>
													{convertDuration(track.duration_ms)}
												</div>
												<div
													className='flex flex-col items-center justify-center relative'
													// ref={optionRef}
													onClick={(e: any) => {
														// setSelectedID(track.id);
														// setSelectedURI(track.uri);
														// toggleContextMenu(e, menuRef, optionRef);
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
