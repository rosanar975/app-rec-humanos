
import React from 'react';
import { BriefcaseIcon } from './Icons';

type Page = 'dashboard' | 'employees';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const activeLinkClasses = "bg-indigo-600 text-white";
    const inactiveLinkClasses = "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";

    return (
        <header className="bg-white dark:bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <BriefcaseIcon className="h-8 w-8 text-indigo-600"/>
                    <span className="text-xl font-bold text-slate-800 dark:text-white">
                        Panel de RRHH
                    </span>
                </div>
                <nav className="flex items-center gap-2">
                    <button onClick={() => onNavigate('dashboard')} className={`${navLinkClasses} ${currentPage === 'dashboard' ? activeLinkClasses : inactiveLinkClasses}`}>
                        Inicio
                    </button>
                    <button onClick={() => onNavigate('employees')} className={`${navLinkClasses} ${currentPage === 'employees' ? activeLinkClasses : inactiveLinkClasses}`}>
                        Empleados
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
