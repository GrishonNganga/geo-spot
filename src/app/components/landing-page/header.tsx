import Nav from "../header/nav";
import Logo from "../header/logo";

export default function Header() {
    return (
        <div className="container">
            <Nav>
                <Logo />
            </Nav>
        </div>
    )
}