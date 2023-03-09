import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    useLocation,
    Navigate,
} from 'react-router-dom';
import Userfront from "@userfront/react";
import './App.css';

Userfront.init("xbpx6j4b");

const SignupForm = Userfront.build({
    toolId: "raamkbk"
});

const LoginForm = Userfront.build({
    toolId: "allaokn"
});

const PasswordResetForm = Userfront.build({
    toolId: "baamobl"
});

function App() {
    return (
        <article className="container">
            <Router>
                <header className="sticky">
                    <ul>
                        <NavLink className="button" to="/">Home</NavLink>
                        <NavLink className="button" to="/login">Login</NavLink>
                        <NavLink className="button" to="/reset">Reset</NavLink>
                        <NavLink className="button" to="/dashboard">Dashboard</NavLink>
                    </ul>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset" element={<PasswordReset />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
        </article>
    );
}

function Home() {
    return (
        <>
            <h1>Home</h1>
        </>
    );
}
function Login() {
    return (
        <>
            <h1>Login</h1>
            <LoginForm />
        </>
    );
}
function PasswordReset() {
    return(
        <>
            <h1>Password Reset</h1>
            <PasswordResetForm />
        </>
    );
}
function Dashboard() {
    const userData = JSON.stringify(Userfront.user, null,2);
    return (
        <>
            <h1>Dashboard</h1>
            <pre>{userData}</pre>
            <button onClick={Userfront.logout}>Logout</button>
        </>
    );
}

function RequireAuth({ children }: any): any {
    let location = useLocation();
    if(!Userfront.tokens.accessToken){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default App;
