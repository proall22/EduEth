import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	user: any;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			validateToken(token);
		}
	}, []);

	const validateToken = async (token: string) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/auth/validate`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
				setIsAuthenticated(true);
			} else {
				logout();
			}
		} catch (error) {
			logout();
		}
	};

	const login = (token: string) => {
		localStorage.setItem("authToken", token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
