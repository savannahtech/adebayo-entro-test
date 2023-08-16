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
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select, Spacer
} from "@chakra-ui/react";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import TodoCard from "../../components/todo_card";
import moment from "moment";
import { useForm } from "react-hook-form";
export default function CreateTask() {
  const router = useRouter();
  const { taskId } = router.query;
  const [task, setTask] = React.useState({
    id: "",
    title: "",
    description: "",
    createdAt: "",
    assignee: {
      name: "",
    },
    status: "",
  });
  const toast = useToast();
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
  };

  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {}

  React.useEffect(() => {
    getTask();
  }, []);
  return (
    <Box p={16} bg={"#fff"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box bg={"#F7F9FC"} p={6} w={"80%"} margin={'auto'}>
            <Flex
              display={{ base: "block", md: "flex" }}
              alignItems={"center"}
              mb={8}
            >
              <Image src={"/pocket.svg"} />
              <Box w={8} />
              <Flex alignItems={"center"} gap={8} w={{base: '100%', md: '70%'}} display={{base: 'block', md: 'flex'}} mt={2}>
                <FormControl isInvalid={errors.task_title}>
                  <Input
                    id="task_title"
                    placeholder="Task title"
                    {...register("task_title", {
                      required: "This is required",
                    })}
                    border={'none'}
                    borderRadius={0}
                    borderBottom={'1px solid #E3E4E8'}
                    w={"100%"}
                    _focus={{
                        "border":'none',
                        "borderBottom":'1px solid #E3E4E8'
                    }}
                    _active={{
                        "border":'none',
                        "borderBottom":'1px solid #E3E4E8'
                    }}
                  />
                  <FormErrorMessage>
                    {errors.task_title && errors.task_title.message}
                  </FormErrorMessage>
                </FormControl>
                
                <Flex w={'70%'} mt={2}>
                    <FormControl isInvalid={errors.task_title}>
                        <FormLabel>Assign To</FormLabel>
                        <Select
                            id="task_title"
                            placeholder="e.g Simon"
                            {...register("task_title", {
                            required: "This is required",
                            })}
                            borderColor={"#E3E4E8"}
                            w={"100%"}
                        >
                            <option value="">Hello</option>
                        </Select>
                    <FormErrorMessage>
                        {errors.task_title && errors.task_title.message}
                    </FormErrorMessage>
                    </FormControl>
                </Flex>

                {/* <Text color={"#98A2B3"} fontSize={12} fontWeight={600}>
                  {task?.assignee?.name} .{" "}
                  <Text as={"span"} fontWeight={500}>
                    Creation Date
                  </Text>{" "}
                  <Text as={"span"} fontWeight={400}>
                    {moment(task?.createdAt).format("MMM D, YYYY h:mm a")}
                  </Text>{" "}
                </Text> */}
              </Flex>
            </Flex>
            <Divider />
            {/* <Flex gap={16}>
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
                <Tag borderRadius={16}>
                  {moment(task?.createdAt).format("MMM D, YYYY h:mm a")}
                </Tag>
              </Stack>
              <Stack>
                <Text fontSize={12} fontWeight={500} color={"#98A2B3"}>
                  Assignee
                </Text>
                <Tag borderRadius={16}>Unassigned</Tag>
              </Stack>
            </Flex> */}
            {/* <Box mt={6}>
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
            </Box> */}
            {/* <Box mt={8}>
                <Tabs>
                <TabList>
                    <Tab color={'#1D2939'} fontSize={'14px'} fontWeight={600}>Related tasks</Tab>
                    <Tab color={'#1D2939'} fontSize={'14px'} fontWeight={600}>Watchers</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />
                    <TodoCard />

                    <Flex w={'200px'} gap={3} cursor={'pointer'} fontSize={16} fontWeight={500} color={'#475467'} alignItems={'center'}>
                        <FaPlus />
                        <Text>Link to other tasks</Text>
                    </Flex>
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </Box> */}
          </Box>
        </form>
    </Box>
  );
}
