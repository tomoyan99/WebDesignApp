// src/renderer/src/App.tsx
import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import SideBar from "./components/SideBar";

function App(): React.ReactElement {
  const [users, setUsers] = useState<{ id: number; name: string; age: number }[]>([]);

  // ユーザーを取得する関数
  const fetchUsers = async () => {
    const fetchedUsers = await window.api.fetchUsers();
    setUsers(fetchedUsers);
  };

  // ユーザーを追加する関数
  const addUser = async () => {
    const newUser = { name: "Yusuke", age: 25 };
    await window.api.addUser(newUser);
    fetchUsers(); // 再取得
  };

  // 初回レンダリング時にユーザーを取得
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Grid h="99vh" templateRows="repeat(4, 1fr)" templateColumns="repeat(5, 1fr)" gap={3}>
      <GridItem rowSpan={4} colSpan={1}>
        <Box bg={"gray"} h={"100%"}>
          <SideBar />
          rowSpan=2
        </Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4}>
        <Box bg={"gray"} h={"100%"}>
          <Button onClick={addUser}>Add User</Button>
        </Box>
      </GridItem>
      <GridItem rowSpan={3} colSpan={4}>
        <Box bg={"gray"} h={"100%"}>
          <h1>Users List</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.age})
              </li>
            ))}
          </ul>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;
