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
  Select,
  Spacer,
  Button,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useCheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { FaChevronCircleLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import TodoCard from "../../components/todo_card";
import moment from "moment";
import { useForm } from "react-hook-form";
import Head from "next/head";
export default function CreateTask() {
  const router = useRouter();
  const { taskId } = router.query;
  const [users, setUsers] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = React.useState(1);
  const { value: selectedTasks, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const getTasks = async () => {
    try {
      const res = await fetch("/api/tasks");

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
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`/api/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        console.log(data);
      }
    } catch (e) {
      return toast({
        title: "An error occurred.",
        description: `Error when fetching list of tasks: ${e}`,
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
    formState : { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    setValue('relatedTasks', selectedTasks)
    const data = {...values, 'relatedTasks': selectedTasks.join()}
    try {
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        reset()
        toast({
            title: "Success",
            description: "Task Created Successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        router.push('/');
    } catch (error) {
        return toast({
            title: "An error occurred.",
            description: `Error adding task:, ${error}`,
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }

  }

  React.useEffect(() => {
    getTasks();
    getUsers();
  }, []);
  return (
    <Box p={16} bg={"#fff"}>
        <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=yes"
        />
        <meta
          name="description"
          content="Simple Next.js todo web application."
        />
        <title>Create Task</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box bg={"#F7F9FC"} p={6} w={"80%"} margin={"auto"}>
          <Flex mb={5} alignItems={'center'} gap={2} onClick={()=>router.back()} cursor={'pointer'}> <FaChevronCircleLeft />  Go back</Flex>
          <Flex
            display={{ base: "block", md: "flex" }}
            alignItems={"center"}
            mb={8}
          >
            <Image src={"/pocket.svg"} />
            <Box w={8} />
            <Flex
              alignItems={"center"}
              gap={8}
              w={{ base: "100%", md: "70%" }}
              display={{ base: "block", md: "flex" }}
              mt={2}
            >
              <FormControl isInvalid={errors.title !== null}>
                <FormLabel>Task Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Task title"
                  {...register("title", {
                    required: "This is required",
                  })}
                  border={"none"}
                  borderRadius={0}
                  borderBottom={"1px solid #E3E4E8"}
                  w={"100%"}
                  _focus={{
                    border: "none",
                    borderBottom: "1px solid #E3E4E8",
                  }}
                  _active={{
                    border: "none",
                    borderBottom: "1px solid #E3E4E8",
                  }}
                />
                {/* <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage> */}
              </FormControl>

              <Flex w={"70%"} mt={2}>
                <FormControl isInvalid={errors.assignee !== null}>
                  <FormLabel>Assign To</FormLabel>
                  <Select
                    id="assignee"
                    placeholder="e.g Select user"
                    {...register("assignee", {
                      required: "This is required",
                    })}
                    borderColor={"#E3E4E8"}
                    w={"100%"}
                  >
                    {users?.map((e) => (
                      <option key={e?.id} value={e?.id}>
                        {e?.name}
                      </option>
                    ))}
                  </Select>
                  {/* <FormErrorMessage>
                    {errors.assignee && errors.assignee.message}
                  </FormErrorMessage> */}
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
          <Divider />
          {step > 1 && (
            <>
              <Box mt={6} mb={5}>
                <Text py={4} fontSize={12} fontWeight={500} color={"#98A2B3"}>
                  Description
                </Text>
                <FormControl isInvalid={errors.description !== null}>
                  <Textarea
                    bg={"#EEF2F8"}
                    color={"#475467"}
                    id="description"
                    placeholder="Task Description"
                    {...register("description", {
                      required: "This is required",
                    })}
                    border={"none"}
                    borderRadius={"10px"}
                    w={"100%"}
                    rows={7}
                  />
                  {/* <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage> */}
                </FormControl>
              </Box>
              <Box mt={8}>
                <Tabs>
                  <TabList>
                    <Tab color={"#1D2939"} fontSize={"14px"} fontWeight={600}>
                      Related tasks
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      {selectedTasks.map((e) => {
                        const x = tasks.find((x) => x?.id == e);
                        return <TodoCard data={x} />;
                      })}
                      <Flex
                        w={"200px"}
                        gap={3}
                        cursor={"pointer"}
                        fontSize={16}
                        fontWeight={500}
                        color={"#475467"}
                        alignItems={"center"}
                        onClick={onOpen}
                      >
                        <FaPlus />
                        <Text>Link to other tasks</Text>
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Related Tasks</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {tasks?.map((e) => (
                  <Checkbox
                    mb={2}
                    style={{ color: "secondary" }}
                    {...getCheckboxProps({ value: e?.id })}
                  >
                    <Text>{e?.title}</Text>
                  </Checkbox>
                ))}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Flex gap={3} justifyContent={"flex-end"}>
            {
                step == 1 && <Button bg={"#0F52BA"} color={"#fff"} p={5} onClick={()=>setStep(2)}>
              Next
            </Button>
            }
            {
                step > 1 && <Button type="submit" bg={"#DFE3EB"} color={"#475467"} p={5} isLoading={isSubmitting}>
              Finish
            </Button>
            }
            
          </Flex>
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
        </Box>
      </form>
    </Box>
  );
}
