import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const UserSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="🔍 Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default UserSearchBar;
