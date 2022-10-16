import { FC } from "react";

const SubMenu: FC<{
	setShowSubMenu: any;
	subMenuItems: any;
	handler: (id: string) => void;
}> = ({ setShowSubMenu, subMenuItems, handler }) => {
	return (
		<div
			className='absolute text-sm z-10 w-48 shadow-md bg-black rounded-md py-4 flex flex-col justify-around gap-1'
			onMouseLeave={() => setShowSubMenu(false)}
			style={{
				bottom: 0,
				right: 200,
			}}>
			{subMenuItems.map((item: any) => (
				<div
					className='hover:bg-lightgrey/30 px-2 py-1 text-white'
					key={item.id}
					onClick={() => handler(item.id)}>
					{item.name}
				</div>
			))}
		</div>
	);
};

export default SubMenu;
