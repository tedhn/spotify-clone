import { FC, useState, useRef, useEffect } from "react";
import ContextMenu from "../contextMenu/ContextMenu";

interface PropsTypes {
	uri: string;
	render: any;
}
const Listitem: FC<PropsTypes> = ({ uri, render }) => {
	const [isHover, setIsHover] = useState(false);

	const listRef = useRef<any>();
	const optionRef = useRef<any>();

	return (
		<div ref={listRef}>{render(isHover, listRef, optionRef, setIsHover)}</div>
	);
};

export default Listitem;
