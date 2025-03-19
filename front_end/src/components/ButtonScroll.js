import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import styles from "../assets/style/components/button.module.css";
const ButtonScroll = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        showButton && (
            <Button className={styles.button_scroll} onClick={scrollToTop}>
                <FaArrowUp />
            </Button>
        )
    );
};

export default ButtonScroll;
