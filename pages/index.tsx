import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import TodoCard from "../components/todo_card";
import React, { useCallback } from "react";
import Link from "next/link";
import { useKeyPress } from "../utils/keypress";
import { useHotkeys } from "react-hotkeys-hook";
export default function Home() {
  const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [prevLastId, setPrevLastId] = React.useState(1);
  const toast = useToast();
  const getTasks = async ({ page = 1, type = 'next' }) => {
    let lastData = prevLastId;
    if (type == 'next') {
      lastData = tasks.slice(-1)[0]?.id;
    }
    try {
      const res = await fetch(`api/tasks?page=${page}&lastID=${lastData}`);
      if (res.ok) {
        const data = await res.json();
        if(tasks.length > 0){
          let ld = tasks.slice(-1)[0]?.id;
          setPrevLastId(ld)
          console.log(ld);

        }
        setTasks(data);
        console.log(data);
      }
    } catch (e) {
      return toast({
        title: "An error occurred.",
        description: `Error when fetching list of tasks:, e ${e}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePaginate = (page:any, type:string) => {
    setPage(page)
    getTasks({ page: page, type:type });
  }


  useHotkeys("ctrl+shift+y", () => alert("New"));

  React.useEffect(() => {
    getTasks({ page: page, type: 'prev' });

    const ctrl1 = (e: KeyboardEvent) => e.ctrlKey && e.key === "1";
    const handler = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        alert("shortcut");
      }
    };

    const ignore = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", ignore);
  }, []);

  return (
    <Box p={16} bg={"#fff"}>
      <Center>
        <Box w={"50%"}>
          <Flex gap={2} mb={8}>
            <Text fontSize={"22px"} fontWeight={600}>
              Tasks
            </Text>
            <Link href={"/task/create-task"}>
              <Button
                bg={"#DFE3EB"}
                color={"#98A2B3"}
                fontSize={12}
                fontWeight={500}
              >
                New task
              </Button>
            </Link>
          </Flex>
          <Box>
            {tasks?.map((e, i) => (
              <TodoCard data={e} key={e?.id} />
            ))}
            {page > 1 && (
              <Button
                bg={"#0F52BA"}
                color={"#fff"}
                p={5}
                onClick={() => handlePaginate(page - 1, 'prev')}
              >
                Previous
              </Button>
            )}
            {tasks.length >= 5 && (
              <Button
                bg={"#0F52BA"}
                color={"#fff"}
                p={5}
                onClick={() => handlePaginate(page + 1, 'next')}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
