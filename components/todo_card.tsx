import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function TodoCard({data = {
    id: '',
    title: '',
    description: '',
    createdAt: '',
    assignee: {
        name: '',
    },
    status: '',

}}) {
  return (
    <Link href={`/task/${data?.id}`}> 
        <Card
            py={2}
            px={5}
            mb={4}
            _hover={{
                boxShadow:
                "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
            }}
            >
            <CardBody>
                <Flex display={{ base: "block", md: "flex" }} alignItems={"center"}>
                <Image src={"/pocket.svg"} />
                <Box w={8} />
                <Stack>
                    <Text color={"#101828"} fontSize={14} fontWeight={600}>
                    {data?.title}
                    </Text>
                    <Text color={"#98A2B3"} fontSize={12} fontWeight={600}>
                    {data?.assignee?.name} .{" "}
                    <Text as={"span"} fontWeight={500}>
                        Creation Date
                    </Text>{" "}
                    <Text as={"span"} fontWeight={400}>
                    {moment(data?.createdAt).format('MMM D, YYYY h:mm a')}
                    </Text>{" "}
                    </Text>
                </Stack>
                <Box w={28} />
                <Flex
                    borderLeft={"1px solid #DFE3EB"}
                    px={5}
                    py={2}
                    alignItems={"center"}
                    minW={{ md: "180px" }}
                    display={{ base: "block", md: "flex" }}
                >
                    <Box
                    h={12}
                    ml={{ md: 3 }}
                    p={3}
                    border={"1px solid #DFE3EB"}
                    borderRadius={"6px"}
                    minW={{ md: "76px" }}
                    >
                    <Text fontSize={12} fontWeight={500} color={"#475467"}>
                        {data?.status}
                    </Text>
                    </Box>
                    <Spacer />
                    <FaChevronRight fontSize={24} color="#98A2B3" />
                </Flex>
                </Flex>
            </CardBody>
            </Card>
    </Link>
  );
}
