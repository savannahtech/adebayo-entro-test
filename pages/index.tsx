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
import {FaChevronRight} from 'react-icons/fa'
import TodoCard from "../components/todo_card";
import React from "react";
import Link from "next/link";
export default function Home() {
  const [tasks, setTasks] = React.useState([]);
  const toast = useToast()
  const getTasks = async () => {
    try {
      const res = await fetch("api/tasks");

      if (res.ok) {
        const data = await res.json();
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
  }

  React.useEffect(() => {
    getTasks();
    
  }, []);

  return (
    <Box p={16} bg={"#fff"}>
      <Center>
        <Box w={'50%'}>
        <Flex gap={2} mb={8}>
        <Text fontSize={"22px"} fontWeight={600}>
          Tasks
        </Text>
        <Link href={'/task/create-task'}>
          <Button bg={"#DFE3EB"} color={"#98A2B3"} fontSize={12} fontWeight={500}>
            New task 
          </Button>
        </Link>
        
      </Flex>
      <Box>
        {
          tasks?.map((e, i) => (
            <TodoCard data={e} key={e?.id} />
          ))
        }
      </Box>
        </Box>
      </Center>
    </Box>
  );
}
