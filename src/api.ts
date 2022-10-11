import { SongType } from "./types.d";
import axios from "axios";

const BASE_API_URL = "http://localhost:3001";

// GENERAL API

export const checkSaved = async (tracks: Array<SongType>) => {
	const idList = tracks.map((track) => track.track.id);

	const { data } = await axios.post(BASE_API_URL + "/checkTracks", {
		idList: idList,
	});

	return data;
};

export const getUser = async (userId: string) => {
	const { data } = await axios.post(BASE_API_URL + "/getUser", {
		userId,
	});

	return data;
};

// PLAYLIST APIS

export const getPlaylistData = async (playlistId: string) => {
	const { data } = await axios.post(BASE_API_URL + "/getPlaylistData", {
		playlistId,
	});

	return data;
};
export const getPlaylistTracks = async (id: string, offset: number) => {
	const { data } = await axios.post(BASE_API_URL + "/getPlaylistTracks", {
		playlistId: id,
		offset,
	});

	return data.tracks;
};
export const addToPlaylist = async (
	uri: string,
	playlistId: string = "3cSpNwEM2C4GMrggDLSDhD"
) => {
	await axios.post(BASE_API_URL + "/addToPlaylist", {
		playlistId: playlistId,
		song: uri,
	});
};

export const removeFromPlaylist = async () => {};

export const search = async (query: string) => {
	const { data } = await axios.post(BASE_API_URL + "/search", {
		q: query,
	});

	return data;
};

// SAVED TRACKS

export const getSavedTracks = async (offset: number) => {
	const { data } = await axios.post(BASE_API_URL + "/savedTracks", {
		offset,
	});

	return data;
};

export const addToSavedTracks = async (id: string) => {
	const { data } = await axios.post(BASE_API_URL + "/addToMySavedTracks", {
		id: id,
	});
};

export const removeFromSavedTracks = async (id: string) => {
	const { data } = await axios.post(BASE_API_URL + "/removeFromMySavedTracks", {
		id,
	});
};

// ALBUM APIS

export const getAlbums = async (id: string) => {
	const { data } = await axios.post(BASE_API_URL + "/getAlbums", {
		id,
	});

	console.log(data);

	return data;
};
export const getAlbumsTracks = async (id: string, offset: number) => {
	const { data } = await axios.post(BASE_API_URL + "/getAlbumsTracks", {
		id,
		offset,
	});

	console.log(data);

	return data;
};
