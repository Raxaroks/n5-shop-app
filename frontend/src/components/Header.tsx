import appLogo from '../assets/images/app-logo.png';

export interface HeaderProps {
	appName: string;
}

export const Header = ({ appName }: HeaderProps) => {
	const toggleDarkmode = () => {
		document.querySelector(':root')?.classList.add('toggle');
		document.querySelector(':root')?.classList.toggle('dark');
		document.querySelector(':root')?.classList.remove('toggle');
	};

	return (
		<div className='app__header'>
			{/* app logo */}
			<span className='header__logo'>
				<img src={appLogo} alt={`${appName} logo`} />
				<h4>{`${appName}`}</h4>
			</span>

			{/* app theme switcher */}
			<label className='header__switcher'>
				<input type='checkbox' onChange={toggleDarkmode} />
				<div></div>
			</label>
		</div>
	);
};
