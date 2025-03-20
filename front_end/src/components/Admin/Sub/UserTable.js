import React from "react";

const UserTable = () => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Nguyễn Văn A</td>
          <td>van.a@gmail.com</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;
