import React, { useState, useEffect } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import styles from "../../assets/style/components/search.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query); 
    };

    return (
        <div className ={`${styles.custom_search}`}> 
        <InputGroup>
            <Form.Control
                type="text"
                placeholder="Nhập từ khóa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>  <BiSearch />Tìm kiếm</Button>
        </InputGroup>
        </div>
    );
}

export default Search;
