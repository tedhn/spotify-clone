export interface ImageType {
	height: number;
	url: string;
	width: number;
}

export interface SongType {
	added_at: string;
	added_by: { id: string };
	track: TrackType;
}
export interface TrackType {
	album: AlbumType;
	artists: Array;
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
}

export interface AlbumType {
	album_type: string;
	artists: Array;
	available_markets: [];
	external_urls: {};
	href: string;
	external_urls: { spotify: string };
	href: string;
	id: string;
	images: Array<{ height: number; width: number; url: string }>;
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface ArtistType {
	followers: { href: string | null; total: number };
	genres: Array<string>;
	href: string;
	id: string;
	images: Array<ImageType>;
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface PlaylistType {
	collaborative: boolean;
	description: string;
	external_url: { spotify: string };
	href: string;
	id: string;
	image: Array<ImageType>;
	name: string;
	owner: UserType;
	primary_color: null;
	public: true;
	snapshot_id: string;
	type: string;
	uri: string;
}

export interface UserType {
	country: string;
	display_name: string;
	email: string;
	external_url: { spotify: string };
	href: string;
	id: string;
	images: Array<ImageType>;
	product: string;
	type: string;
	uri: string;
}
