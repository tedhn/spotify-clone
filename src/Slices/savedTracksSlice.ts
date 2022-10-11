import { SongType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface savedTracksSliceType {
	tracks: Array<SongType>;
	total: number;
}

const initialState: savedTracksSliceType = {
	tracks: [],
	total: 0,
};

export const savedTracksSlice = createSlice({
	name: "savedTracks",
	initialState,
	reducers: {
		setSavedTracks: (state: savedTracksSliceType, action: any) => {
			const { payload } = action;

			state.tracks = payload.tracks;
			state.total = payload.total;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSavedTracks } = savedTracksSlice.actions;

export default savedTracksSlice.reducer;
