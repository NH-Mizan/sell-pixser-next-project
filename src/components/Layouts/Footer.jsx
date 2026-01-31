
export default function Footer() {
    return (
        <div className="bg-base-300">
            <footer className="footer w-10/12 mx-auto sm:footer-horizontal  text-base-content py-10">
                <aside>
                    <img src="/images/sell-pixer.webp" alt="hello" className='w-[100px]' />
                    <p className="text-bk">
                        Web solution it.
                        <br />
                        Dinajpur city collage more , Sadar , Dinajpur
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <div className="footer-end bg-black py-2">
                    <p className="text-center text-wt text-sm ">Copyright © 2025 Sell Pixer. All rights reserved. Developed By <a href="https://websolutionit.com/" className="text-red-400  " target="_blank">Websolution IT</a></p>
            </div>
        </div>
    )
}