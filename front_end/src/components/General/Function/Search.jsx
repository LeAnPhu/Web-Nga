import React, { useState, useEffect } from "react";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import styles from "../../../assets/style/components/search.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        onSearch({ query, category, status, minPrice, maxPrice });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={styles.custom_search}>
            <InputGroup className="mb-2">
                <Form.Control
                    type="text"
                    placeholder="Nhập từ khóa..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button variant="primary" onClick={handleSearch}>
                    <BiSearch /> Tìm kiếm
                </Button>
            </InputGroup>

            <Row className="mb-2">
                <Col>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Chọn danh mục</option>
                        <option value="Áo Nam">Áo Nam</option>
                        <option value="Quần Nam">Quần Nam</option>
                        <option value="Giày Dép">Giày Dép</option>
                    </Form.Select>
                </Col>

                <Col>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Trạng thái</option>
                        <option value="Còn hàng">Còn hàng</option>
                        <option value="Hết hàng">Hết hàng</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Giá tối thiểu"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Col>

                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Giá tối đa"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Search;
