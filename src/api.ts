import { SongType } from "./types.d";
import axios from "axios";

const BASE_API_URL = "http://localhost:3001/";

export const checkSaved = async (tracks: Array<SongType>) => {
	const idList = tracks.map((track) => track.track.id);

	const { data } = await axios.post("http://localhost:3001/checkTracks", {
		idList: idList,
	});

	return data;
};

export const getPlaylistData = async (userId: string, playlistId: string) => {
	const { data } = await axios.post(
		"http://localhost:3001/getPlaylistPageData",
		{
			playlistId,
			userId,
		}
	);

	return {
		playlistData: data.playlistData,
		userImage: data.userImage,
		tracks: data.tracks,
	};
};

export const getPlaylistTracks = async (id: string, offset: number) => {
	const { data } = await axios.post("http://localhost:3001/getPlaylistTracks", {
		playlistId: id,
		offset,
	});

	return data.tracks;
};

export const getSavedTracks = async (offset: number) => {
	const { data } = await axios.post("http://localhost:3001/savedTracks", {
		offset,
	});

	return data;
};

export const addToSavedTracks = async (id: string) => {
	const { data } = await axios.post(
		"http://localhost:3001/addToMySavedTracks",
		{
			id: id,
		}
	);
};

export const removeFromSavedTracks = async (id: string) => {
	const { data } = await axios.post(
		"http://localhost:3001/removeFromMySavedTracks",
		{
			id,
		}
	);
};

export const addToPlaylist = async (
	uri: string,
	playlistId: string = "3cSpNwEM2C4GMrggDLSDhD"
) => {
	await axios.post("http://localhost:3001/addToPlaylist", {
		playlistId: playlistId,
		song: uri,
	});
};

export const removeFromPlaylist = async () => {};

export const search = async (query: string) => {
	const { data } = await axios.post("http://localhost:3001/search", {
		q: query,
	});

	return data;
};
