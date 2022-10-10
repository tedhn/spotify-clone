export default {
	preset: "ts-jest",
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		// "\\.svg$": "<rootDir>/__mocks__/svg.js",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	testEnvironment: "jest-environment-jsdom",
};