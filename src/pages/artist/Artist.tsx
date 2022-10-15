import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
	checkSaved,
	getArtist,
	getArtistAlbums,
	getArtistRelatedArtists,
	getArtistTopTracks,
} from "@/api";
import { Banner, Card, ContextMenu, Heart, Listitem } from "@/components";
import { convertDuration } from "@/utils";
import useContextMenu from "@/useContextMenu";
import { AlbumType, ArtistType, TrackType } from "@/types";

const Artist = () => {
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

	const [artist, setArtist] = useState<ArtistType | undefined>();
	const [album, setAlbum] = useState<Array<AlbumType>>([]);
	const [tracks, setTracks] = useState<Array<TrackType>>([]);
	const [relatedArtists, setRelatedArtists] = useState<Array<ArtistType>>([]);
	const [isSavedList, setSavedList] = useState<Array<boolean>>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		onLoad();
	}, [params.id]);

	const onLoad = async () => {
		const artistData = await getArtist(params.id!);

		const artistAlbums = await getArtistAlbums(params.id!);
		const topTracks = await getArtistTopTracks(params.id!);
		const relatedArtistsData = await getArtistRelatedArtists(params.id!);
		const savedArr = await checkSaved(
			topTracks.tracks.map((track: TrackType) => track.id)
		);
		setArtist(artistData);
		setAlbum(artistAlbums.items);
		setTracks(topTracks.tracks);
		setRelatedArtists(relatedArtistsData.artists.slice(0, 5));
		setSavedList(savedArr);
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
						src={artist?.images[0].url}
						alt='playlist-image'
						className='object-cover w-64 h-64 '
					/>
				}
				backgroundImage={artist?.images[0].url}
				type={
					<div data-testid='banner-id' className='font-bold uppercase text-xs'>
						{artist?.type}
					</div>
				}
				title={artist?.name}
			/>

			<div className='px-8 pb-12'>
				<div className='my-4 text-2xl'>Popular</div>
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

				<div className='my-4 text-2xl'>Albums</div>
				<ul className='flex flex-wrap justify-around items-center mt-6'>
					{album.map((result: AlbumType) => {
						return (
							<Card result={result} key={result.id} subtitle={result.type} />
						);
					})}
				</ul>
				<div className='my-4 text-2xl'>Artists</div>
				<ul className='flex flex-wrap justify-around items-center mt-6'>
					{relatedArtists.map((result: ArtistType) => {
						return (
							<Card result={result} key={result.id} subtitle={result.type} />
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Artist;
