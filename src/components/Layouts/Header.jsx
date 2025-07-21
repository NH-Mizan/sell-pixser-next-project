import Link from "next/link";

export default function Header() {
    
    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/aboutus">About</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/ourteam">Our Team</Link></li>
                            <li><Link href="/projects">Projects</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Code<span className="color-py">Nest</span>24</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/aboutus">About</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/ourteam">Our Team</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn bg-color color-wt">Live Chat</a>
                </div>
            </div>
        </div>
    )
}