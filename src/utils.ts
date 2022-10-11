const convertDate = (date: string) => {
	return date.split("T")[0].split("-").reverse().join("-");
};
const convertDuration = (ms: number) => {
	const minutes = Math.floor(ms / 1000 / 60);
	const seconds = ("0" + Math.round((ms / 1000 / 60 - minutes) * 60)).slice(-2);

	return minutes + ":" + seconds;
};



export { convertDate, convertDuration };
