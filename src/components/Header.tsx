import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="h-16 flex items-center justify-between px-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-blue-600">Event Calendar</h1>
                
                <nav className="flex items-center gap-4">
                    <Button 
                        variant={location.pathname === '/' ? 'default' : 'outline'}
                        onClick={() => navigate('/')}
                    >
                        Calendar
                    </Button>
                    <Button 
                        variant={location.pathname === '/events' ? 'default' : 'outline'}
                        onClick={() => navigate('/events')}
                    >
                        Events List
                    </Button>
                    <Button 
                        variant={location.pathname === '/dashboard' ? 'default' : 'outline'}
                        onClick={() => navigate('/dashboard')}
                    >
                        Dashboard
                    </Button>
                    <Button variant="ghost" onClick={handleLogout}>
                        Logout
                    </Button>
                </nav>
            </div>
        </header>
    );
}