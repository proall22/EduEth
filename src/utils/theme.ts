export const getInitialTheme = (): boolean => {
	const savedTheme = localStorage.getItem("darkMode");
	if (savedTheme !== null) {
		return JSON.parse(savedTheme);
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const setThemeToStorage = (isDark: boolean) => {
	localStorage.setItem("darkMode", JSON.stringify(isDark));
	if (isDark) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
};
