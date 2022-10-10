export interface ImageType {
	height: number;
	url: string;
	width: number;
}

export interface SongType {
	added_at: string;
	added_by: { id: string };
	track: {
		album: {
			album_type: string;
			artists: Array;
			available_markets: [];
			external_urls: {};
			href: string;
			external_urls: { spotify: string };
			href: string;
			id: string;
			images: Array<{height :number , width : number , url : string}>;
			name: string;
			release_date: string;
			release_date_precision: string;
			total_tracks: number;
			type: string;
			uri: string;
		};
		artists: [];
		available_markets: string;
		disc_number: number;
		duration_ms: number;
		episode: boolean;
		explicit: boolean;
		external_ids: { isrc: string };
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		is_local: false;
		name: string;
		popularity: number;
		preview_url: string;
		track: boolean;
		track_number: number;
		type: string;
		uri: string;
	};
}
