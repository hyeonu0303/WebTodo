import { useEffect, useState } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
  faStar,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@chakra-ui/react";
import CustomModal from "./modal";
import UserStatus from "../../components/UserStatus";
import { useDispatch } from "react-redux";
import {login} from '../../store/userSlice';
const MainPage = () => {
  let dispatch = useDispatch();

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const googleName = urlParams.get('googleName');
    if(googleName){
      dispatch(login(googleName));
    }
    const kakaoName = urlParams.get('kakaoName');
    if(kakaoName) dispatch(login(kakaoName));
  },[dispatch])

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const iconSize = "2x";
  const iconMarginBottom = "1rem";

  // 모달 부분
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 투두 부분
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: new Date().getTime(), text };
    setTodos([...todos, newTodo]);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Grid
        h="100%"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={[1, 12, 12]}
          colSpan={[12, 1, 1]}
          bg="var(--mainColor)"
          textAlign={["center", "left"]}
          padding="2rem"
        >
          <Flex
            direction={["row", "column"]}
            alignItems={["center", "flex-start"]}
            justifyContent={["space-between", "flex-start"]}
            h="100%"
          >
            <FontAwesomeIcon
              icon={faHouse}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom }}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom }}
            />
            <FontAwesomeIcon
              icon={faBell}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom, marginLeft: 4 }}
            />
            <FontAwesomeIcon
              icon={faGear}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom, marginLeft: 2.7 }}
            />
          {/* 유저이름 로그인상태 */}
          <UserStatus></UserStatus>
          </Flex>

        </GridItem>
        <GridItem
          rowSpan={[3, 5, 12]}
          colSpan={[12, 11, 3]}
          padding={["1rem", "2rem"]}
        >
          <h1>Your Calendar</h1>
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <p>Selected date: {selectedDate.toDateString()}</p>
        </GridItem>
        <GridItem rowSpan={[7, 7, 12]} colSpan={[12, 11, 7]}>
          
          <Button onClick={openModal}>모달 열기</Button>
          <CustomModal
            isOpen={modalOpen}
            onClose={closeModal}
            onConfirm={addTodo}
          />
          <div className="todo">
            <h2>Todo 목록</h2>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <label>
                    <input type="checkbox" />
                    {todo.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};

export default MainPage;
