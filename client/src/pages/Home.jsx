import {Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Login, Signup } from "../components";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container maxWidth="xl">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        // bg="white"
        w="100%"
        m="40px 0 15px 0"
        // borderRadius="lg"
        // borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Fuggles" textAlign="center">
          Kgpian's Chat
        </Text>
      </Box>

      <Box style={{ color: 'white' ,background:'#5B5656'}}>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab style={{color:'white'}}>Login</Tab>
            <Tab style={{color:'white'}}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
