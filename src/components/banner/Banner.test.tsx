import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

const mockData = {
	publicPlaylist: {
		imageURL:
			"https://i.scdn.co/image/ab67706c0000bebb113d39d5338fcb7acbe472d7",
		isPublic: true,
		followers: 0,
		totalTracks: 10,
		description: "random Description",
		title: "playlist",
		userImage:
			"https://i.scdn.co/image/ab6775700000ee85ab7ed94f82515df82c45b849",
		username: "username1",
	},
};

describe("Banner Component", () => {
	test("renders with all components", () => {
		render(
			<Banner
				imageURL={mockData.publicPlaylist.imageURL}
				isPublic={mockData.publicPlaylist.isPublic}
				totalTracks={mockData.publicPlaylist.totalTracks}
				description={mockData.publicPlaylist.description}
				title={mockData.publicPlaylist.title}
				username={mockData.publicPlaylist.username}
				followers={mockData.publicPlaylist.followers}
				userImage={mockData.publicPlaylist.userImage}
			/>
		);

		expect(screen.getByText("public playlist")).toBeTruthy();
		expect(screen.getByText("random Description")).toBeTruthy();
		expect(screen.getByText("playlist")).toBeTruthy();
		expect(screen.getByText("0 likes")).toBeTruthy();
		expect(screen.getByText("10 songs")).toBeTruthy();
		expect(screen.getByText("username1")).toBeTruthy();
		expect(screen.getByAltText("user-image")).toBeTruthy();
		expect(screen.getByAltText("playlist-image")).toBeTruthy();

		expect(screen.getAllByTestId("banner-id").length).toBe(8);
	});

	test("renders with no user image", () => {
		render(
			<Banner
				imageURL={mockData.publicPlaylist.imageURL}
				isPublic={mockData.publicPlaylist.isPublic}
				totalTracks={mockData.publicPlaylist.totalTracks}
				description={mockData.publicPlaylist.description}
				title={mockData.publicPlaylist.title}
				username={mockData.publicPlaylist.username}
				followers={mockData.publicPlaylist.followers}
			/>
		);
		expect(screen.getByText("public playlist")).toBeTruthy();
		expect(screen.getByText("random Description")).toBeTruthy();
		expect(screen.getByText("playlist")).toBeTruthy();
		expect(screen.getByText("0 likes")).toBeTruthy();
		expect(screen.getByText("10 songs")).toBeTruthy();
		expect(screen.getByText("username1")).toBeTruthy();
		expect(screen.queryByAltText("user-image")).toBeFalsy();
		expect(screen.getByAltText("playlist-image")).toBeTruthy();

		expect(screen.getAllByTestId("banner-id").length).toBe(7);
	});
	test("renders with no description", () => {
		render(
			<Banner
				imageURL={mockData.publicPlaylist.imageURL}
				isPublic={mockData.publicPlaylist.isPublic}
				totalTracks={mockData.publicPlaylist.totalTracks}
				title={mockData.publicPlaylist.title}
				username={mockData.publicPlaylist.username}
				followers={mockData.publicPlaylist.followers}
				userImage={mockData.publicPlaylist.userImage}
			/>
		);

		expect(screen.getByText("public playlist")).toBeTruthy();
		expect(screen.queryByText("random Description")).toBeFalsy();
		expect(screen.getByText("playlist")).toBeTruthy();
		expect(screen.getByText("0 likes")).toBeTruthy();
		expect(screen.getByText("10 songs")).toBeTruthy();
		expect(screen.getByText("username1")).toBeTruthy();
		expect(screen.getByAltText("user-image")).toBeTruthy();
		expect(screen.getByAltText("playlist-image")).toBeTruthy();

		expect(screen.getAllByTestId("banner-id").length).toBe(7);
	});
});
