import { useRouter } from "next/router";
import React from "react";
import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Center,
  Divider,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useToast
} from "@chakra-ui/react";
import { FaChevronCircleLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import TodoCard from "../../components/todo_card";
import moment from "moment";

type TaskDetailType = {
  id: '',
  title: '',
  description: '',
  createdAt: '',
  assignee: {
      name: '',
  },
  status: '',
  relatedTasks: []
};

export default function TaskDetail() {
  const router = useRouter();
  const { taskId } = router.query;
  const [task, setTask] = React.useState<TaskDetailType>();
  const toast = useToast()
  const getTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`);
      if (res.ok) {
        const data = await res.json();
        setTask(data);
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
    getTask();
    
  }, []);
  return (
    <Box p={16} bg={"#fff"}>
      <Center>
        <Box bg={"#F7F9FC"} p={6} w={"50%"}>
          <Flex mb={5} alignItems={'center'} gap={2} onClick={()=>router.back()} cursor={'pointer'}> <FaChevronCircleLeft/>  Go back</Flex>
          <Flex
            display={{ base: "block", md: "flex" }}
            alignItems={"center"}
            mb={8}
          >
            <Image src={"/pocket.svg"} />
            <Box w={8} />
            <Stack>
              <Text color={"#101828"} fontSize={14} fontWeight={600}>
                {task?.title}
              </Text>
              <Text color={"#98A2B3"} fontSize={12} fontWeight={600}>
                {task?.assignee?.name} .{" "}
                <Text as={"span"} fontWeight={500}>
                  Creation Date
                </Text>{" "}
                <Text as={"span"} fontWeight={400}>
                  {moment(task?.createdAt).format('MMM D, YYYY h:mm a')}
                </Text>{" "}
              </Text>
            </Stack>
          </Flex>
          <Divider />
          <Flex gap={16}>
            <Stack>
              <Text fontSize={12} fontWeight={500} color={"#98A2B3"}>
                Status
              </Text>
              <Tag borderRadius={16}>{task?.status}</Tag>
            </Stack>
            <Stack>
              <Text fontSize={12} fontWeight={500} color={"#98A2B3"}>
                Date created
              </Text>
              <Tag borderRadius={16}>{moment(task?.createdAt).format('MMM D, YYYY h:mm a')}</Tag>
            </Stack>
            <Stack>
              <Text fontSize={12} fontWeight={500} color={"#98A2B3"}>
                Assignee
              </Text>
              <Tag borderRadius={16}>Unassigned</Tag>
            </Stack>
          </Flex>
          <Box mt={6}>
            <Text py={4} fontSize={12} fontWeight={500} color={"#98A2B3"}>
              Description
            </Text>
            <Flex alignItems={"center"} gap={2}>
              <Box
                p={5}
                bg={"#EEF2F8"}
                fontSize={13}
                fontWeight={500}
                color={"#475467"}
              >
                {task?.description}
              </Box>
              <FaChevronRight color="#98A2B3" />
            </Flex>
          </Box>
          <Box mt={8}>
            <Tabs>
              <TabList>
                <Tab color={'#1D2939'} fontSize={'14px'} fontWeight={600}>Related tasks</Tab>
                <Tab color={'#1D2939'} fontSize={'14px'} fontWeight={600}>Watchers</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {
                    task?.relatedTasks?.map(e => (
                      <TodoCard data={e} />
                    ))
                  }

                  {/* <Flex w={'200px'} gap={3} cursor={'pointer'} fontSize={16} fontWeight={500} color={'#475467'} alignItems={'center'}>
                    <FaPlus />
                    <Text>Link to other tasks</Text>
                  </Flex> */}
                </TabPanel>
                <TabPanel>
                  <p>Watchers!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
