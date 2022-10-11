import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Listitem, Card, ContextMenu } from "@/components";
import { convertDuration } from "@/utils";
import useContextMenu from "@/useContextMenu";
import { search } from "@/api";

const Search = () => {
	const navigate = useNavigate();

	const [query, setQuery] = useState("");
	const [searchResults, setSearchResutls] = useState<any>({
		tracks: [],
		albums: [],
		playlists: [],
		shows: [],
		artists: [],
		episodes: [],
	});

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

	useEffect(() => {
		const getData = setTimeout(async () => {
			console.log("finding song " + query);

			if (query !== "") {
				const data = await search(query);
				const { tracks, albums, playlists, artists, episodes, shows } = data;

				setSearchResutls({
					tracks: tracks.items,
					albums: albums.items,
					playlists: playlists.items,
					shows: shows.items,
					artists: artists.items,
					episodes: episodes.items,
				});
			}
		}, 1000);

		return () => clearTimeout(getData);
	}, [query]);

	useEffect(() => {
		console.log(searchResults);
	}, [searchResults]);

	return (
		<div className='col-span-10 px-8 py-12'>
			<div className='text-4xl font-bold'>Search</div>
			<input
				type='text'
				name='Search'
				id='Search'
				placeholder='Search'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className='mt-4 px-2 py-1 rounded-lg'
			/>
			{isShowMenu && (
				<ContextMenu
					anchorPoints={anchorPoints}
					uri={selectedURI}
					songID={selectedID}
				/>
			)}

			{query && (
				<>
					{" "}
					<div className='my-4 text-2xl'>Songs</div>
					<ul className='mt-8' ref={playlistRef}>
						{searchResults.tracks.map((result: any, index: number) => {
							return (
								<Listitem
									key={result.id}
									uri={result.uri}
									render={(
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
												src={result.album.images[0].url}
												alt='result-image'
												data-testid='listitem-id'
											/>
											<div className='col-span-5'>
												<div
													className='text-sm text-white '
													data-testid='listitem-id'>
													{result.name}
												</div>
												<div data-testid='listitem-id'>
													{result.album.artists[0].name}
												</div>
											</div>

											<div className='col-span-3' data-testid='listitem-id'>
												{result.album.name}
											</div>
											<div className='text-center' data-testid='listitem-id'>
												{convertDuration(result.duration_ms)}
											</div>

											<div
												className='flex flex-col items-center justify-center relative'
												ref={optionRef}
												onClick={(e: any) => {
													setSelectedID(result.id);
													setSelectedURI(result.uri);
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
						})}
					</ul>
					<div className='my-4 text-2xl'>Aritsts</div>
					<ul className='flex flex-wrap justify-around items-center mt-6'>
						{searchResults.artists.map((result: any) => {
							return (
								<Card result={result} key={result.id} subtitle={result.type} />
							);
						})}
					</ul>
					<div className='my-4 text-2xl'>Playlists</div>
					<ul className='flex flex-wrap justify-around items-center mt-6'>
						{searchResults.playlists.map((result: any) => {
							return (
								<Card result={result} key={result.id} subtitle={result.type} />
							);
						})}
					</ul>
					<div className='my-4 text-2xl'>Albums</div>
					<ul className='flex flex-wrap justify-around items-center mt-6'>
						{searchResults.albums.map((result: any) => {
							return (
								<Card result={result} key={result.id} subtitle={result.type} />
							);
						})}
					</ul>
					<div className='my-4 text-2xl'>Shows</div>
					<ul className='flex flex-wrap justify-around items-center mt-6'>
						{searchResults.shows.map((result: any) => {
							return (
								<Card result={result} key={result.id} subtitle={result.type} />
							);
						})}
					</ul>
					<div className='my-4 text-2xl'>Episodes</div>
					<ul className='flex flex-wrap justify-around items-center mt-6'>
						{searchResults.episodes.map((result: any) => {
							return (
								<Card result={result} key={result.id} subtitle={result.type} />
							);
						})}
					</ul>
				</>
			)}
		</div>
	);
};

export default Search;
