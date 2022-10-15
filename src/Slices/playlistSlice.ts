import { PlaylistType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface PlaylistSlice {
	playlists: Array<PlaylistType>;
}

const initialState: PlaylistSlice = {
	playlists: [],
};

export const playlistSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		updatePlaylist: (state: PlaylistSlice, action: any) => {
			state.playlists = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updatePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
