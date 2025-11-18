import React from "react";
import { Link, NavLink } from "react-router";
import { sidebarItems } from "../constants";
import { cn } from "~/lib/utils";

const NavItems = ({ handleClick }: { handleClick?: () => void}) => {
    const user = {
        name: 'Fredrick',
        email: 'contact@fredrick.pro',
        imageUrl:'public/assets/images/david.webp',
    }

    const handleLogout = async () => {
        // await logoutUser();
        // navigate('/sign-in')
    }

    return (
        <section className="nav-items">
            <Link to="/" className="link-logo">
                <img
                    src="/assets/icons/logo.svg"
                    alt="Logo"
                    className="size-[30px]"
                />
                <h1>Tourvisto</h1>
            </Link>

            <div className="container">
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div
                                    className={cn("group nav-item", {
                                        "bg-primary-100 !text-white": isActive,
                                    })}
                                >
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={`
                      group-hover:brightness-0
                      size-0
                      group-hover:invert
                      ${isActive ? "brightness-0 invert" : "text-dark-200"}
                    `}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <footer className="nav-footer">
                    <img src={user?.imageUrl || 'public/assets/images/david.webp'} alt={user?.name || 'David'} referrerPolicy="no-referrer" />

                    <article>
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </article>

                    <button
                        onClick={handleLogout}
                        className="cursor-pointer"
                    >
                        <img
                            src="public/assets/icons/logout.svg"
                            alt="logout"
                            className="size-6"
                        />
                    </button>
                </footer>

            </div>
        </section>
    );
};

export default NavItems;
